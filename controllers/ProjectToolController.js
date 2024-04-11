const { ProjectTool } = require('../models')

const insertProjectTool = async (req, res) => {
    const { toolId, projectId } = req.body

    if (!toolId || toolId === "" || isNaN(toolId)) {
        return res.status(400).json({ error: "O identificador da ferramenta é obrigatório!" })
    }

    if (!projectId || projectId === "" || isNaN(projectId)) {
        return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
    }

    try {
        // Verify if project tool already exists
        const projectToolAlreadyExists = await ProjectTool.findOne({ where: { toolId, projectId } })
        if (projectToolAlreadyExists) {
            return res.status(409).json({ error: "Essa ferramenta já foi inclusa nesse projeto!" })
        }

        // Create project tool
        const newProjectTool = await ProjectTool.create({ toolId, projectId })
        return res.status(200).json({ message: "Ferramenta foi adicionada no projeto com sucesso!", newProjectTool })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllProjectTools = async (req, res) => {
    const projectTools = await ProjectTool.findAll()

    res.status(200).json(projectTools)
}

const getProjectToolById = async (req, res) => {
    const { id } = req.params

    const projectTool = await ProjectTool.findByPk(id)

    res.status(200).json(projectTool)
}

const getProjectToolByToolId = async (req, res) => {
    const { toolId } = req.params

    const projectTools = await ProjectTool.findAll({ where: { toolId } })

    res.status(200).json(projectTools)
}

const getProjectToolByProjectId = async (req, res) => {
    const { toolId } = req.params

    const projectTools = await ProjectTool.findAll({ where: { toolId } })

    res.status(200).json(projectTools)
}

const deleteProjectTool = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project tool ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da ferramenta do projeto é obrigatório!" })
        }

        // Verify if project tool exists
        const projectToolExists = await ProjectTool.findByPk(id)
        if (!projectToolExists) {
            return res.status(422).json({ error: "Essa ferramenta não está inclusa nesse projeto!" })
        }

        // Delete tool
        await ProjectTool.destroy({ where: { id } })
        return res.status(200).json({ message: "Ferramenta do projeto deletada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectTool,
    getAllProjectTools,
    getProjectToolById,
    deleteProjectTool,
}