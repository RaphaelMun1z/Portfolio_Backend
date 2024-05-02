const { Report } = require('../models')

const insertReport = async (req, res) => {
    const { subject, message } = req.body

    if (!subject || subject === "") {
        return res.status(400).json({ error: "O assunto é obrigatório!" })
    }

    if (!message || message === "") {
        return res.status(400).json({ error: "A mensagem é obrigatória!" })
    }

    try {
        // Verify if report already exists
        const reportAlreadyExists = await Report.findOne({ where: { subject, message } })
        if (reportAlreadyExists) {
            return res.status(409).json({ error: "Esse relato já existe!" })
        }

        // Create report
        const newReport = await Report.create({ subject, message })
        return res.status(200).json({ message: "Bug relatado com sucesso!", newReport })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllReports = async (req, res) => {
    const reports = await Report.findAll()

    res.status(200).json(reports)
}

const getReportById = async (req, res) => {
    const { id } = req.params

    const report = await Report.findByPk(id)

    res.status(200).json(report)
}

const deleteReport = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if report ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do report é obrigatório!" })
        }

        // Verify if report exists
        const reportExists = await Report.findByPk(id)
        if (!reportExists) {
            return res.status(422).json({ error: "Esse report não existe!" })
        }

        // Delete report
        await Report.destroy({ where: { id } })
        return res.status(200).json({ message: "Report deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertReport,
    getAllReports,
    getReportById,
    deleteReport
}