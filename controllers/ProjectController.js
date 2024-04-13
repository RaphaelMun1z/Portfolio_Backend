const { Project, ProjectHost } = require('../models')

const insertProject = async (req, res) => {
    const { name, description, stack, isHosted, usedTools, usedDatabase } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome do projeto é obrigatório!" })
    }

    if (!description || description === "") {
        return res.status(400).json({ error: "A descrição do projeto é obrigatória!" })
    }

    if (!stack || stack === "") {
        return res.status(400).json({ error: "A stack do projeto é obrigatória!" })
    }

    if (isHosted === null || isHosted === "") {
        return res.status(400).json({ error: "A situação da hospedagem do projeto é obrigatória!" })
    }

    if (usedTools === null || usedTools === "") {
        return res.status(400).json({ error: "A situação do uso de ferramentas no projeto é obrigatória!" })
    }

    if (usedDatabase === null || usedDatabase === "") {
        return res.status(400).json({ error: "A situação do uso de banco de dados para o projeto é obrigatória!" })
    }

    try {
        // Verify if project already exists
        const projectAlreadyExists = await Project.findOne({ where: { name } })
        if (projectAlreadyExists) {
            return res.status(409).json({ error: "Já existe um projeto com esse nome!" })
        }

        // Create project
        const newProject = await Project.create({ name, description, stack, isHosted, usedTools, usedDatabase })
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