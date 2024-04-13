const { ProjectHost } = require('../models')

const insertProjectHost = async (req, res) => {
    const { URL, projectId } = req.body

    if (!URL || URL === "") {
        return res.status(400).json({ error: "A URL da hospedagem é obrigatória!" })
    }

    if (!projectId || projectId === "") {
        return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
    }

    try {
        // Verify if project host already exists
        const projectHostAlreadyExists = await ProjectHost.findOne({ where: { URL, projectId } })
        if (projectHostAlreadyExists) {
            return res.status(409).json({ error: "Essa já é a atual hospedagem!" })
        }

        // Create project host
        const newProjectHost = await ProjectHost.create({ URL, projectId })
        return res.status(200).json({ message: "Hospedagem adicionada ao projeto com sucesso!", newProjectHost })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjectsHost = async (req, res) => {
    const projectsHost = await ProjectHost.findAll()

    res.status(200).json(projectsHost)
}

const getProjectHostById = async (req, res) => {
    const { id } = req.params

    const projectHost = await ProjectHost.findByPk(id)

    res.status(200).json(projectHost)
}

const updateProjectHost = async (req, res) => {
    const { id } = req.params
    const { URL } = req.body

    try {
        // Verify if project host ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da hospedagem do projeto é obrigatório!" })
        }

        // Verify if project host exists
        const projectHostExists = await ProjectHost.findByPk(id)
        if (!projectHostExists) {
            return res.status(422).json({ error: "Esse projeto ainda não tem uma hospedagem registrada!" })
        }

        if (!URL) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na hospedagem!" })
        }

        if (URL) {
            projectHostExists.URL = URL
        }

        // Update project host
        await projectHostExists.save()
        return res.status(200).json({ message: "Hospedagem atualizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteProjectHost = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project host ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da hospedagem do projeto é obrigatório!" })
        }

        // Verify if project host exists
        const projectHostExists = await ProjectHost.findByPk(id)
        if (!projectHostExists) {
            return res.status(422).json({ error: "Esse projeto ainda não tem uma hospedagem registrada!" })
        }

        // Delete project host
        await ProjectHost.destroy({ where: { id } })
        return res.status(200).json({ message: "Hospedagem deletada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectHost,
    getAllProjectsHost,
    getProjectHostById,
    updateProjectHost,
    deleteProjectHost,
}