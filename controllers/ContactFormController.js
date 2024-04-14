const { ContactForm, FormSubject } = require('../models')

const insertContactForm = async (req, res) => {
    const { personName, subjectId, message } = req.body

    if (!personName || personName === "") {
        return res.status(400).json({ error: "O nome é obrigatório!" })
    }

    if (!subjectId || isNaN(subjectId) || subjectId === "") {
        return res.status(400).json({ error: "O identificador do assunto é obrigatório!" })
    }

    if (!message || message === "") {
        return res.status(400).json({ error: "A mensagem é obrigatória!" })
    }

    try {
        // Verify if contact form already exists
        const contactFormAlreadyExists = await ContactForm.findOne({ where: { personName, subjectId, message } })
        if (contactFormAlreadyExists) {
            return res.status(409).json({ error: "Esse formulário já existe!" })
        }

        // Create contact form
        const newContactForm = await ContactForm.create({ personName, subjectId, message })
        return res.status(200).json({ message: "Formulário cadastrado com sucesso!", newContactForm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllContactForms = async (req, res) => {
    const contactForms = await ContactForm.findAll({
        include: {
            model: FormSubject,
            attributes: ['id', 'subject'],
            required: false
        },
    })

    res.status(200).json(contactForms)
}

const getContactFormById = async (req, res) => {
    const { id } = req.params

    const contactForm = await ContactForm.findByPk(id)

    res.status(200).json(contactForm)
}

const updateContactForm = async (req, res) => {
    const { id } = req.params
    const { personName, subjectId, message } = req.body

    try {
        // Verify if contact form ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do formulário é obrigatório!" })
        }

        // Verify if contact form exists
        const contactFormExists = await ContactForm.findByPk(id)
        if (!contactFormExists) {
            return res.status(422).json({ error: "Esse formulário não existe!" })
        }

        if (!personName && !subjectId && !message) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na linguagem!" })
        }

        if (personName) {
            contactFormExists.personName = personName
        }

        if (subjectId) {
            contactFormExists.subjectId = subjectId
        }

        if (message) {
            contactFormExists.message = message
        }

        // Update contact form
        await contactFormExists.save()
        return res.status(200).json({ message: "Formulário atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteContactForm = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if contact form ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do formulário é obrigatório!" })
        }

        // Verify if contact form exists
        const contactFormExists = await ContactForm.findByPk(id)
        if (!contactFormExists) {
            return res.status(422).json({ error: "Esse formulário não existe!" })
        }

        // Delete contact form
        await ContactForm.destroy({ where: { id } })
        return res.status(200).json({ message: "Formulário deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertContactForm,
    getAllContactForms,
    getContactFormById,
    updateContactForm,
    deleteContactForm,
}