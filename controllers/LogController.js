const { Log } = require('../models')

const insertLog = async (req, res) => {
    const { type } = req.body

    if (!type || type === "") {
        return res.status(400).json({ error: "O tipo de log é obrigatório!" })
    }

    try {
        // Create log
        const newLog = await Log.create({ type })
        return res.status(200).json({ message: "Log cadastrada com sucesso!", newLog })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllLogs = async (req, res) => {
    const logs = await Log.findAll()

    res.status(200).json(logs)
}

const getLogById = async (req, res) => {
    const { id } = req.params

    const log = await Log.findByPk(id)

    res.status(200).json(log)
}

const resetLogs = async (req, res) => {
    await Log.destroy({ where: { type: 'Access' } })

    return res.status(200).json({ message: "Log's de acesso resetada com sucesso!" })
}

module.exports = {
    insertLog,
    getAllLogs,
    getLogById,
    resetLogs,
}