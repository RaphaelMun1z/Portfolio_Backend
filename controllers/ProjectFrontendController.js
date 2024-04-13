const { ProjectFrontend } = require('../models')

const insertProjectFrontend = async (req, res) => {
    const { languageId, frameworkId, repository, projectId } = req.body

    if (!languageId || isNaN(languageId) || languageId === "") {
        return res.status(400).json({ error: "O identificador da linguagem utilizada no frontend é obrigatório!" })
    }

    if (!frameworkId || isNaN(frameworkId) || frameworkId === "") {
        return res.status(400).json({ error: "O identificador do framework utilizado no frontend é obrigatório!" })
    }

    if (!repository || repository === "") {
        return res.status(400).json({ error: "O repositório do projeto é obrigatório!" })
    }

    if (!projectId || isNaN(projectId) || projectId === "") {
        return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
    }

    try {
        // Verify if project frontend already exists
        const projectFrontendAlreadyExists = await ProjectFrontend.findOne({ where: { languageId, frameworkId, projectId } })
        if (projectFrontendAlreadyExists) {
            return res.status(409).json({ error: "Esse frontend já está adicionado a esse projeto!" })
        }

        // Create project frontend
        const newProjectFrontend = await ProjectFrontend.create({ languageId, frameworkId, repository, projectId })

        return res.status(200).json({ message: "Frontend do projeto cadastrado com sucesso!", newProjectFrontend })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjectsFrontend = async (req, res) => {
    const projectsFrontend = await ProjectFrontend.findAll({
    })

    res.status(200).json(projectsFrontend)
}

const getProjectFrontendById = async (req, res) => {
    const { id } = req.params

    const projectFrontend = await ProjectFrontend.findByPk(id)

    res.status(200).json(projectFrontend)
}

const updateProjectFrontend = async (req, res) => {
    const { id } = req.params
    const { languageId, frameworkId, repository } = req.body

    try {
        // Verify if project frontend ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do projeto frontend é obrigatório!" })
        }

        // Verify if project frontend exists
        const projectFrontendExists = await ProjectFrontend.findByPk(id)
        if (!projectFrontendExists) {
            return res.status(422).json({ error: "Esse projeto frontend não existe!" })
        }

        if (!languageId && !frameworkId && !repository) {
            return res.status(200).json({ message: "Nenhuma alteração realizada no projeto frontend!" })
        }

        if (languageId) {
            projectFrontendExists.languageId = languageId
        }

        if (frameworkId) {
            projectFrontendExists.frameworkId = frameworkId
        }

        if (repository) {
            projectFrontendExists.repository = repository
        }

        // Update project frontend
        await projectFrontendExists.save()
        return res.status(200).json({ message: "Projeto frontend atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteProjectFrontend = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project frontend ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do projeto frontend é obrigatório!" })
        }

        // Verify if project frontend exists
        const projectFrontendExists = await ProjectFrontend.findByPk(id)
        if (!projectFrontendExists) {
            return res.status(422).json({ error: "Esse projeto frontend não existe!" })
        }

        // Delete project frontend
        await ProjectFrontend.destroy({ where: { id } })
        return res.status(200).json({ message: "Projeto frontend deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectFrontend,
    getAllProjectsFrontend,
    getProjectFrontendById,
    updateProjectFrontend,
    deleteProjectFrontend,
}