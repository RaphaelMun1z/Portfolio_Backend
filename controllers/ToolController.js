const { Tool, ProjectTool, sequelize } = require('../models')

const insertTool = async (req, res) => {
    const { name, proficiency } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome da ferramenta é obrigatório!" })
    }

    if (!proficiency || proficiency === "") {
        return res.status(400).json({ error: "O nível de proeficiência com a ferramenta é obrigatório!" })
    }

    if (proficiency < 0 || proficiency > 100) {
        return res.status(422).json({ error: "O nível de proeficiência está fora dos limites permitidos (0-100)!" })
    }

    try {
        // Verify if tool already exists
        const toolAlreadyExists = await Tool.findOne({ where: { name } })
        if (toolAlreadyExists) {
            return res.status(409).json({ error: "Essa ferramenta já existe!" })
        }

        // Create tool
        const newTool = await Tool.create({ name, proficiency })
        return res.status(200).json({ message: "Ferramenta cadastrada com sucesso!", newTool })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllTools = async (req, res) => {
    const tools = await Tool.findAll()

    const toolUsageCounts = await ProjectTool.findAll({
        attributes: ['toolId', [sequelize.fn('COUNT', 'toolId'), 'usageCount']],
        group: ['toolId']
    });

    const totalUsageMap = {};

    toolUsageCounts.forEach(usage => {
        const toolId = usage.toolId;
        const count = usage.dataValues.usageCount;
        totalUsageMap[toolId] = count;
    });

    const toolsWithTotalUsageCount = tools.map(tool => ({
        ...tool.toJSON(),
        usageCount: totalUsageMap[tool.id] || 0,
    }));

    res.status(200).json(toolsWithTotalUsageCount)
}

const getToolById = async (req, res) => {
    const { id } = req.params

    const tool = await Tool.findByPk(id)

    res.status(200).json(tool)
}

const updateTool = async (req, res) => {
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
            // Verify if tool already exists
            const toolAlreadyExists = await Tool.findOne({ where: { name } })
            if (toolAlreadyExists) {
                return res.status(409).json({ error: "Essa ferramenta já existe!" })
            }

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

const deleteTool = async (req, res) => {
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
    insertTool,
    getAllTools,
    getToolById,
    updateTool,
    deleteTool,
}