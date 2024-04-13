const { Project, ProjectHost, ProjectTool, Tool, ProjectDatabase, Database } = require('../models')

const insertProject = async (req, res) => {
    const { name, description, stack, isHosted, URL, usedTools, toolsIdArray, usedDatabase, databaseId } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome do projeto é obrigatório!" })
    }

    if (!description || description === "") {
        return res.status(400).json({ error: "A descrição do projeto é obrigatória!" })
    }

    if (!stack || stack === "") {
        return res.status(400).json({ error: "A stack do projeto é obrigatória!" })
    }

    switch (stack) {
        case "Frontend":
            break;
        case "Backend":
            break;
        case "Fullstack":
            break;
        default:
            return res.status(400).json({ error: "Valor inválido para a stack!" })
            break;
    }

    // Host
    if (isHosted === null || isHosted === undefined || isHosted === "") {
        return res.status(400).json({ error: "A situação da hospedagem do projeto é obrigatória!" })
    }

    if (isHosted) {
        if (!URL || URL === "") {
            return res.status(400).json({ error: "A URL da hospedagem é obrigatória!" })
        }
    }

    // Tools
    if (usedTools === null || usedTools === undefined || usedTools === "") {
        return res.status(400).json({ error: "A situação do uso de ferramentas no projeto é obrigatória!" })
    }

    if (usedTools) {
        if (!Array.isArray(toolsIdArray) || !toolsIdArray || toolsIdArray === "") {
            return res.status(400).json({ error: "O identificador da(s) ferramenta(s) é obrigatório!" })
        }

        toolsIdArray.map((toolId) => {
            if (isNaN(toolId)) {
                return res.status(400).json({ error: "O identificador da(s) ferramenta(s) precisa ser válido!" })
            }
        })
    }

    // Database
    if (usedDatabase === null || usedDatabase === undefined || usedDatabase === "") {
        return res.status(400).json({ error: "A situação do uso de banco de dados para o projeto é obrigatória!" })
    }

    if (usedDatabase) {
        if (!databaseId || isNaN(databaseId) || databaseId === "") {
            return res.status(400).json({ error: "O identificador do banco de dados é obrigatório!" })
        }
    }

    try {
        // Verify if project already exists
        const projectAlreadyExists = await Project.findOne({ where: { name } })
        if (projectAlreadyExists) {
            return res.status(409).json({ error: "Já existe um projeto com esse nome!" })
        }

        // Create project
        const newProject = await Project.create({ name, description, stack, isHosted, usedTools, usedDatabase })
        const projectId = newProject.id;

        if (isHosted) {
            await ProjectHost.create({ URL, projectId })
        }

        if (usedTools) {
            toolsIdArray.map(async (toolId) => {
                await ProjectTool.create({ toolId, projectId })
            })
        }

        if (usedDatabase) {
            await ProjectDatabase.create({ databaseId, projectId })
        }

        return res.status(200).json({ message: "Projeto cadastrado com sucesso!", newProject })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjects = async (req, res) => {
    const projects = await Project.findAll({
        include: [{
            model: ProjectHost,
            attributes: ['id', 'URL'],
            required: false
        },
        {
            model: ProjectTool,
            attributes: ['id'],
            include: [{
                model: Tool,
                attributes: ['name']
            }],
            required: false
        },
        {
            model: ProjectDatabase,
            attributes: ['id'],
            include: [{
                model: Database,
                attributes: ['name']
            }],
            required: false
        }]
    })

    res.status(200).json(projects)
}

const getProjectById = async (req, res) => {
    const { id } = req.params

    const project = await Project.findByPk(id)

    res.status(200).json(project)
}

const updateProject = async (req, res) => {
    const { id } = req.params
    const { name, description, stack, isHosted, usedTools, usedDatabase } = req.body

    try {
        // Verify if project ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
        }

        // Verify if project exists
        const projectExists = await Project.findByPk(id)
        if (!projectExists) {
            return res.status(422).json({ error: "Esse projeto não existe!" })
        }

        if (!name && !description && !stack && !isHosted && !usedTools && !usedDatabase) {
            return res.status(200).json({ message: "Nenhuma alteração realizada no projeto!" })
        }

        if (name) {
            projectExists.name = name
        }

        if (description) {
            projectExists.description = description
        }

        if (stack) {
            projectExists.stack = stack
        }

        if (isHosted) {
            projectExists.isHosted = isHosted
        }

        if (usedTools) {
            projectExists.usedTools = usedTools
        }

        if (usedDatabase) {
            projectExists.usedDatabase = usedDatabase
        }

        // Update project
        await projectExists.save()
        return res.status(200).json({ message: "Projeto atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
        }

        // Verify if project exists
        const projectExists = await Project.findByPk(id)
        if (!projectExists) {
            return res.status(422).json({ error: "Esse projeto não existe!" })
        }

        // Delete project
        await Project.destroy({ where: { id } })
        return res.status(200).json({ message: "Projeto deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
}