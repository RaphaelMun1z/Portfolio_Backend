const { ProjectDatabase, Database } = require('../models')

const insertProjectDatabase = async (req, res) => {
    const { databaseId, projectId } = req.body

    if (!databaseId || databaseId === "" || isNaN(databaseId)) {
        return res.status(400).json({ error: "O identificador do banco de dados é obrigatório!" })
    }

    if (!projectId || projectId === "" || isNaN(projectId)) {
        return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
    }

    try {
        // Verify if project database already exists
        const projectDatabaseAlreadyExists = await ProjectDatabase.findOne({ where: { databaseId, projectId } })
        if (projectDatabaseAlreadyExists) {
            return res.status(409).json({ error: "Esse banco de dados já foi incluso nesse projeto!" })
        }

        // Create project database
        const newProjectDatabase = await ProjectDatabase.create({ databaseId, projectId })
        return res.status(200).json({ message: "Banco de dados foi adicionado ao projeto com sucesso!", newProjectDatabase })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjectsDatabase = async (req, res) => {
    const projectsDatabase = await ProjectDatabase.findAll({
        include: [{
            model: Database,
            attributes: ['id', 'name', 'proficiency']
        }]
    })

    res.status(200).json(projectsDatabase)
}

const getProjectDatabaseById = async (req, res) => {
    const { id } = req.params

    const projectDatabase = await ProjectDatabase.findByPk(id)

    res.status(200).json(projectDatabase)
}

const getProjectDatabaseByDatabaseId = async (req, res) => {
    const { databaseId } = req.params

    const projectsDatabase = await ProjectDatabase.findAll({ where: { databaseId } })

    res.status(200).json(projectsDatabase)
}

const getProjectDatabaseByProjectId = async (req, res) => {
    const { projectId } = req.params

    const projectsDatabase = await ProjectDatabase.findAll({ where: { projectId } })

    res.status(200).json(projectsDatabase)
}

const deleteProjectDatabase = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project database ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do banco de dados do projeto é obrigatório!" })
        }

        // Verify if project database exists
        const projectDatabaseExists = await ProjectDatabase.findByPk(id)
        if (!projectDatabaseExists) {
            return res.status(422).json({ error: "Esse banco de dados não está incluso nesse projeto!" })
        }

        // Delete database
        await ProjectDatabase.destroy({ where: { id } })
        return res.status(200).json({ message: "Banco de dados do projeto deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectDatabase,
    getAllProjectsDatabase,
    getProjectDatabaseById,
    getProjectDatabaseByDatabaseId,
    getProjectDatabaseByProjectId,
    deleteProjectDatabase,
}