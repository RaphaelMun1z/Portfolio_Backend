const { ProjectBackend } = require('../models')

const insertProjectBackend = async (req, res) => {
    const { languageId, frameworkId, repository, projectId } = req.body

    if (!languageId || isNaN(languageId) || languageId === "") {
        return res.status(400).json({ error: "O identificador da linguagem utilizada no backend é obrigatório!" })
    }

    if (!frameworkId || isNaN(frameworkId) || frameworkId === "") {
        return res.status(400).json({ error: "O identificador do framework utilizado no backend é obrigatório!" })
    }

    if (!repository || repository === "") {
        return res.status(400).json({ error: "O repositório do projeto é obrigatório!" })
    }

    if (!projectId || isNaN(projectId) || projectId === "") {
        return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
    }

    try {
        // Verify if project backend already exists
        const projectBackendAlreadyExists = await ProjectBackend.findOne({ where: { languageId, frameworkId, projectId } })
        if (projectBackendAlreadyExists) {
            return res.status(409).json({ error: "Esse backend já está adicionado a esse projeto!" })
        }

        // Create project backend
        const newProjectBackend = await ProjectBackend.create({ languageId, frameworkId, repository, projectId })

        return res.status(200).json({ message: "Backend do projeto cadastrado com sucesso!", newProjectBackend })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjectsBackend = async (req, res) => {
    const projectsBackend = await ProjectBackend.findAll({
    })

    res.status(200).json(projectsBackend)
}

const getProjectBackendById = async (req, res) => {
    const { id } = req.params

    const projectBackend = await ProjectBackend.findByPk(id)

    res.status(200).json(projectBackend)
}

const updateProjectBackend = async (req, res) => {
    const { id } = req.params
    const { languageId, frameworkId, repository } = req.body

    try {
        // Verify if project backend ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do projeto backend é obrigatório!" })
        }

        // Verify if project backend exists
        const projectBackendExists = await ProjectBackend.findByPk(id)
        if (!projectBackendExists) {
            return res.status(422).json({ error: "Esse projeto backend não existe!" })
        }

        if (!languageId && !frameworkId && !repository) {
            return res.status(200).json({ message: "Nenhuma alteração realizada no projeto backend!" })
        }

        if (languageId) {
            projectBackendExists.languageId = languageId
        }

        if (frameworkId) {
            projectBackendExists.frameworkId = frameworkId
        }

        if (repository) {
            projectBackendExists.repository = repository
        }

        // Update project backend
        await projectBackendExists.save()
        return res.status(200).json({ message: "Projeto backend atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteProjectBackend = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project backend ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do projeto backend é obrigatório!" })
        }

        // Verify if project backend exists
        const projectBackendExists = await ProjectBackend.findByPk(id)
        if (!projectBackendExists) {
            return res.status(422).json({ error: "Esse projeto backend não existe!" })
        }

        // Delete project backend
        await ProjectBackend.destroy({ where: { id } })
        return res.status(200).json({ message: "Projeto backend deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectBackend,
    getAllProjectsBackend,
    getProjectBackendById,
    updateProjectBackend,
    deleteProjectBackend,
}