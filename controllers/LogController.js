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

const getLanguageById = async (req, res) => {
    const { id } = req.params

    const language = await Language.findByPk(id)

    res.status(200).json(language)
}

const updateLanguage = async (req, res) => {
    const { id } = req.params
    const { name, proficiency } = req.body

    try {
        // Verify if language ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da linguagem é obrigatório!" })
        }

        // Verify if language exists
        const languageExists = await Language.findByPk(id)
        if (!languageExists) {
            return res.status(422).json({ error: "Essa linguagem não existe!" })
        }

        if (!name && !proficiency) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na linguagem!" })
        }

        if (name) {
            // Verify if language already exists
            const languageAlreadyExists = await Language.findOne({ where: { name } })
            if (languageAlreadyExists) {
                return res.status(409).json({ error: "Essa linguagem já existe!" })
            }

            languageExists.name = name
        }

        if (proficiency && proficiency >= 0 && proficiency <= 100) {
            languageExists.proficiency = proficiency
        }

        // Update language
        await languageExists.save()
        return res.status(200).json({ message: "Linguagem atualizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteLanguage = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if language ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da linguagem é obrigatório!" })
        }

        // Verify if language exists
        const languageExists = await Language.findByPk(id)
        if (!languageExists) {
            return res.status(422).json({ error: "Essa linguagem não existe!" })
        }

        // Delete language
        await Language.destroy({ where: { id } })
        return res.status(200).json({ message: "Linguagem deletada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertLanguage,
    getAllLanguages,
    getLanguageById,
    updateLanguage,
    deleteLanguage,
}