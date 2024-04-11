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
    const tools = await Tool.findAll()

    res.status(200).json(tools)
}

const getProjectToolById = async (req, res) => {
    const { id } = req.params

    const tool = await Tool.findByPk(id)

    res.status(200).json(tool)
}

const updateProjectTool = async (req, res) => {
    const { id } = req.params
    const { name, proficiency } = req.body

    try {
        // Verify if tool ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da ferramenta é obrigatório!" })
        }

        // Verify if tool exists
        const toolExists = await Tool.findByPk(id)
        if (!toolExists) {
            return res.status(422).json({ error: "Essa ferramenta não existe!" })
        }

        if (!name && !proficiency) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na ferramenta!" })
        }

        if (name) {
            toolExists.name = name
        }

        if (proficiency && proficiency >= 0 && proficiency <= 100) {
            toolExists.proficiency = proficiency
        }

        // Update tool
        await toolExists.save()
        return res.status(200).json({ message: "Ferramenta atualizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteProjectTool = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if tool ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da ferramenta é obrigatório!" })
        }

        // Verify if tool exists
        const toolExists = await Tool.findByPk(id)
        if (!toolExists) {
            return res.status(422).json({ error: "Essa ferramenta não existe!" })
        }

        // Delete tool
        await Tool.destroy({ where: { id } })
        return res.status(200).json({ message: "Ferramenta deletada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectTool,
    getAllProjectTools,
    getProjectToolById,
    updateProjectTool,
    deleteProjectTool,
}