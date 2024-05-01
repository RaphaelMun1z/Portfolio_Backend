const {
    Project,
    ProjectHost,
    ProjectTool,
    Tool,
    ProjectDatabase,
    Database,
    ProjectFrontend,
    ProjectBackend,
    Language,
    Framework
} = require('../models')
const { Op } = require('sequelize');

const insertProject = async (req, res) => {
    const { name, description, type, stack, isHosted, URL, usedTools, toolsIdArray, usedDatabase, databaseId } = req.body

    const frontend = {
        languageId: req.body.fLanguageId,
        frameworkId: req.body.fFrameworkId,
        repository: req.body.fRepository,
        projectId: req.body.fProjectId
    }

    const backend = {
        languageId: req.body.bLanguageId,
        frameworkId: req.body.bFrameworkId,
        repository: req.body.bRepository,
        projectId: req.body.bProjectId
    }

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome do projeto é obrigatório!" })
    }

    if (!description || description === "") {
        return res.status(400).json({ error: "A descrição do projeto é obrigatória!" })
    }

    if (req.file) {
        bannerImage = req.file.filename
    } else {
        return res.status(400).json({ error: "O banner do projeto é obrigatório!" })
    }

    if (!stack || stack === "") {
        return res.status(400).json({ error: "A stack do projeto é obrigatória!" })
    }

    switch (stack) {
        case "Frontend":
            if (!frontend.languageId || isNaN(frontend.languageId) || frontend.languageId === "") {
                return res.status(400).json({ error: "O identificador da linguagem utilizada no frontend é obrigatório!" })
            }

            if (!frontend.frameworkId || isNaN(frontend.frameworkId) || frontend.frameworkId === "") {
                return res.status(400).json({ error: "O identificador do framework utilizado no frontend é obrigatório!" })
            }

            if (!frontend.repository || frontend.repository === "") {
                return res.status(400).json({ error: "O repositório do projeto frontend é obrigatório!" })
            }

            // Verify if language exists
            const frontendLanguageExists = await Language.findByPk(frontend.languageId)
            if (!frontendLanguageExists) {
                return res.status(422).json({ error: "Essa linguagem não existe!" })
            }

            // Verify if framework already exists
            const frontendFrameworkExists = await Framework.findByPk(frontend.frameworkId)
            if (!frontendFrameworkExists) {
                return res.status(409).json({ error: "Esse framework não existe!" })
            }
            break;

        case "Backend":
            if (!backend.languageId || isNaN(backend.languageId) || backend.languageId === "") {
                return res.status(400).json({ error: "O identificador da linguagem utilizada no backend é obrigatório!" })
            }

            if (!backend.frameworkId || isNaN(backend.frameworkId) || backend.frameworkId === "") {
                return res.status(400).json({ error: "O identificador do framework utilizado no backend é obrigatório!" })
            }

            if (!backend.repository || backend.repository === "") {
                return res.status(400).json({ error: "O repositório do projeto backend é obrigatório!" })
            }

            // Verify if language exists
            const backendLanguageExists = await Language.findByPk(backend.languageId)
            if (!backendLanguageExists) {
                return res.status(422).json({ error: "Essa linguagem não existe!" })
            }

            // Verify if framework already exists
            const backendFrameworkExists = await Framework.findByPk(backend.frameworkId)
            if (!backendFrameworkExists) {
                return res.status(409).json({ error: "Esse framework não existe!" })
            }
            break;

        case "Fullstack":
            if (!frontend.languageId || isNaN(frontend.languageId) || frontend.languageId === "") {
                return res.status(400).json({ error: "O identificador da linguagem utilizada no frontend é obrigatório!" })
            }

            if (!frontend.frameworkId || isNaN(frontend.frameworkId) || frontend.frameworkId === "") {
                return res.status(400).json({ error: "O identificador do framework utilizado no frontend é obrigatório!" })
            }

            if (!frontend.repository || frontend.repository === "") {
                return res.status(400).json({ error: "O repositório do projeto frontend é obrigatório!" })
            }

            if (!backend.languageId || isNaN(backend.languageId) || backend.languageId === "") {
                return res.status(400).json({ error: "O identificador da linguagem utilizada no backend é obrigatório!" })
            }

            if (!backend.frameworkId || isNaN(backend.frameworkId) || backend.frameworkId === "") {
                return res.status(400).json({ error: "O identificador do framework utilizado no backend é obrigatório!" })
            }

            if (!backend.repository || backend.repository === "") {
                return res.status(400).json({ error: "O repositório do projeto backend é obrigatório!" })
            }

            // Verify if language exists
            const fullstack_frontendLanguageExists = await Language.findByPk(frontend.languageId)
            if (!fullstack_frontendLanguageExists) {
                return res.status(422).json({ error: "Essa linguagem não existe!" })
            }

            // Verify if framework already exists
            const fullstack_frontendFrameworkExists = await Framework.findByPk(frontend.frameworkId)
            if (!fullstack_frontendFrameworkExists) {
                return res.status(409).json({ error: "Esse framework não existe!" })
            }

            // Verify if language exists
            const fullstack_backendLanguageExists = await Language.findByPk(backend.languageId)
            if (!fullstack_backendLanguageExists) {
                return res.status(422).json({ error: "Essa linguagem não existe!" })
            }

            // Verify if framework already exists
            const fullstack_backendFrameworkExists = await Framework.findByPk(backend.frameworkId)
            if (!fullstack_backendFrameworkExists) {
                return res.status(409).json({ error: "Esse framework não existe!" })
            }
            break;
        default:
            return res.status(400).json({ error: "Valor inválido para a stack!" })
            break;
    }

    if (!type || type === "" || type === null) {
        return res.status(400).json({ error: "O tipo de projeto é obrigatório!" })
    }

    if (type !== "Web" && type !== "Desktop" && type !== "Mobile" && type !== "EmbeddedProgramming") {
        return res.status(400).json({ error: "Valor inválido para o tipo!" })
    }

    // Host
    if (isHosted === null || isHosted === undefined || isHosted === "") {
        return res.status(400).json({ error: "A situação da hospedagem do projeto é obrigatória!" })
    }

    if (isHosted === "yes") {
        if (!URL || URL === "") {
            return res.status(400).json({ error: "A URL da hospedagem é obrigatória!" })
        }
    }

    // Tools
    if (usedTools === null || usedTools === undefined || usedTools === "") {
        return res.status(400).json({ error: "A situação do uso de ferramentas no projeto é obrigatória!" })
    }

    if (Boolean(usedTools) === true) {
        if (!toolsIdArray || toolsIdArray.length === 0 || toolsIdArray === "") {
            return res.status(400).json({ error: "O identificador da(s) ferramenta(s) é obrigatório!" })
        }

        const toolsArray = [...toolsIdArray];
        
        const toolsArrayInt = toolsArray
            .map((tool) => parseInt(tool))
            .filter((tool) => !isNaN(tool));

        toolsArrayInt.map((toolId) => {
            if (isNaN(toolId)) {
                return res.status(400).json({ error: "O identificador da(s) ferramenta(s) precisa ser válido!" })
            }
        })
    }

    // Database
    if (usedDatabase === null || usedDatabase === undefined || usedDatabase === "") {
        return res.status(400).json({ error: "A situação do uso de banco de dados para o projeto é obrigatória!" })
    }

    if (Boolean(usedDatabase) === true) {
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
        const newProject = await Project.create({ name, description, bannerImage, type, stack, isHosted, usedTools, usedDatabase })
        const projectId = newProject.id;

        if (isHosted === 'yes') {
            await ProjectHost.create({ URL, projectId })
        }

        if (Boolean(usedTools) === true) {
            const toolsArray = [...toolsIdArray]

            const toolsArrayInt = toolsArray
                .map((tool) => parseInt(tool))
                .filter((tool) => !isNaN(tool));

            await Promise.all(
                toolsArrayInt.map(async (toolId) => {
                    await ProjectTool.create({ toolId, projectId })
                })
            )
        }

        if (Boolean(usedDatabase) === true) {
            await ProjectDatabase.create({ databaseId, projectId })
        }

        switch (stack) {
            case "Frontend":
                await ProjectFrontend.create({ languageId: frontend.languageId, frameworkId: frontend.frameworkId, repository: frontend.repository, projectId: newProject.id })
                break;
            case "Backend":
                await ProjectBackend.create({ languageId: backend.languageId, frameworkId: backend.frameworkId, repository: backend.repository, projectId: newProject.id })
                break;
            case "Fullstack":
                await ProjectFrontend.create({ languageId: frontend.languageId, frameworkId: frontend.frameworkId, repository: frontend.repository, projectId: newProject.id })
                await ProjectBackend.create({ languageId: backend.languageId, frameworkId: backend.frameworkId, repository: backend.repository, projectId: newProject.id })
                break;
            default:
                break;
        }

        return res.status(200).json({ message: "Projeto cadastrado com sucesso!", newProject })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjects = async (req, res) => {
    const { projectName, projectType, projectStack, databaseId, languagesId, frameworksId } = req.query;

    const whereClause = {};

    if (projectName) {
        whereClause.name = { [Op.like]: `%${projectName}%` };
    }

    if (projectStack) {
        whereClause.stack = projectStack
    }

    if (projectType) {
        whereClause.type = projectType
    }

    if (databaseId) {
        whereClause['$ProjectDatabase.Database.id$'] = { [Op.eq]: databaseId };
    }

    const filterClauses = []

    if (languagesId && languagesId.length > 0) {
        const languagesIdArray = languagesId.split(',').map(id => parseInt(id.trim(), 10));

        const languageWhereClauses = languagesIdArray.map(languageId => ({
            [Op.or]: [
                { '$ProjectFrontend.Language.id$': { [Op.eq]: languageId } },
                { '$ProjectBackend.Language.id$': { [Op.eq]: languageId } }
            ]
        }));

        filterClauses.push({ [Op.and]: languageWhereClauses });
    }

    if (frameworksId && frameworksId.length > 0) {
        const frameworksIdArray = frameworksId.split(',').map(id => parseInt(id.trim(), 10));

        const frameworkWhereClauses = frameworksIdArray.map(frameworkId => ({
            [Op.or]: [
                { '$ProjectFrontend.Framework.id$': { [Op.eq]: frameworkId } },
                { '$ProjectBackend.Framework.id$': { [Op.eq]: frameworkId } }
            ]
        }));

        filterClauses.push({ [Op.and]: frameworkWhereClauses });
    }

    if (filterClauses.length > 0) {
        whereClause[Op.and] = filterClauses;
    }

    try {
        const projects = await Project.findAll({
            where: Object.keys(whereClause).length > 0 ? whereClause : null,
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
                    attributes: ['id', 'name']
                }],
                required: false
            },
            {
                model: ProjectDatabase,
                attributes: ['id'],
                include: [{
                    model: Database,
                    attributes: ['id', 'name']
                }],
                required: false
            },
            {
                model: ProjectFrontend,
                attributes: ['id', 'repository'],
                include: [{
                    model: Language,
                    attributes: ['id', 'name']
                }, {
                    model: Framework,
                    attributes: ['id', 'name']
                }],
                required: false
            },
            {
                model: ProjectBackend,
                attributes: ['id', 'repository'],
                include: [{
                    model: Language,
                    attributes: ['id', 'name']
                }, {
                    model: Framework,
                    attributes: ['id', 'name']
                }],
                required: false
            }]
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error('Erro ao recuperar projetos:', error);
        res.status(500).json({ error: 'Erro ao recuperar projetos' });
    }
};

const getAllReducedProjects = async (req, res) => {
    const reducedProjects = await Project.findAll()

    res.status(200).json(reducedProjects)
}

const getProjectById = async (req, res) => {
    const { id } = req.params

    const project = await Project.findByPk(id, {
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
                attributes: ['id', 'name']
            }],
            required: false
        },
        {
            model: ProjectDatabase,
            attributes: ['id'],
            include: [{
                model: Database,
                attributes: ['id', 'name']
            }],
            required: false
        },
        {
            model: ProjectFrontend,
            attributes: ['id', 'repository'],
            include: [{
                model: Language,
                attributes: ['id', 'name']
            }, {
                model: Framework,
                attributes: ['id', 'name'],
                include: {
                    model: Language,
                    attributes: ['id', 'name']
                },
            }],
            required: false
        },
        {
            model: ProjectBackend,
            attributes: ['id', 'repository'],
            include: [{
                model: Language,
                attributes: ['id', 'name']
            }, {
                model: Framework,
                attributes: ['id', 'name'],
                include: {
                    model: Language,
                    attributes: ['id', 'name']
                },
            }],
            required: false
        }]
    })

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
    getAllReducedProjects,
    getProjectById,
    updateProject,
    deleteProject,
}