const { Faq } = require('../models')

const insertFaq = async (req, res) => {
    const { question, answer } = req.body

    if (!question || question === "") {
        return res.status(400).json({ error: "A pergunta é obrigatória!" })
    }

    if (!answer || answer === "") {
        return res.status(400).json({ error: "A resposta é obrigatória!" })
    }

    try {
        // Verify if faq already exists
        const faqAlreadyExists = await Faq.findOne({ where: { question } })
        if (faqAlreadyExists) {
            return res.status(409).json({ error: "Essa pergunta já existe!" })
        }

        // Create faq
        const newFaq = await Faq.create({ question, answer })
        return res.status(200).json({ message: "Faq cadastrada com sucesso!", newFaq })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllFaqs = async (req, res) => {
    const faqs = await Faq.findAll()

    res.status(200).json(faqs)
}

const getFaqById = async (req, res) => {
    const { id } = req.params

    const faq = await Faq.findByPk(id)

    res.status(200).json(faq)
}

const updateFaq = async (req, res) => {
    const { id } = req.params
    const { question, answer } = req.body

    try {
        // Verify if faq ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da faq é obrigatório!" })
        }

        // Verify if faq exists
        const faqExists = await Faq.findByPk(id)
        if (!faqExists) {
            return res.status(422).json({ error: "Essa faq não existe!" })
        }

        if (!question && !answer) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na faq!" })
        }

        if (question) {
            faqExists.question = question
        }

        if (answer) {
            faqExists.answer = answer
        }

        // Update faq
        await faqExists.save()
        return res.status(200).json({ message: "Faq atualizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteFaq = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if faq ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da faq é obrigatório!" })
        }

        // Verify if faq exists
        const faqExists = await Faq.findByPk(id)
        if (!faqExists) {
            return res.status(422).json({ error: "Essa faq não existe!" })
        }

        // Delete faq
        await Faq.destroy({ where: { id } })
        return res.status(200).json({ message: "Faq deletada com sucesso!", id: parseInt(id) })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertFaq,
    getAllFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
}