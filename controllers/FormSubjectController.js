const { FormSubject } = require('../models')

const insertFormSubject = async (req, res) => {
    const { subject, formType } = req.body

    if (!subject || subject === "") {
        return res.status(400).json({ error: "O assunto é obrigatório!" })
    }

    if (!formType || formType === "") {
        return res.status(400).json({ error: "O tipo de formulário é obrigatório!" })
    }

    if (formType !== "Doubt" && formType !== "Report") {
        return res.status(400).json({ error: "Valor inválido para o tipo de formulário!" })
    }

    try {
        // Verify if form subject already exists
        const formSubjectAlreadyExists = await FormSubject.findOne({ where: { subject, formType } })
        if (formSubjectAlreadyExists) {
            return res.status(409).json({ error: "Esse assunto já existe!" })
        }

        // Create form subject
        const newFormSubject = await FormSubject.create({ subject, formType })
        return res.status(200).json({ message: "Assunto cadastrado com sucesso!", newFormSubject })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllFormSubjects = async (req, res) => {
    const formSubjects = await FormSubject.findAll()

    res.status(200).json(formSubjects)
}

const getFormSubjectById = async (req, res) => {
    const { id } = req.params

    const formSubject = await FormSubject.findByPk(id)

    res.status(200).json(formSubject)
}

const getFormSubjectByFormType = async (req, res) => {
    const { type } = req.params

    const formSubjects = await FormSubject.findAll({ where: { formType: type } })

    res.status(200).json(formSubjects)
}

const updateFormSubject = async (req, res) => {
    const { id } = req.params
    const { subject, formType } = req.body

    try {
        // Verify if form subject ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do assunto é obrigatório!" })
        }

        // Verify if form subject exists
        const formSubjectExists = await FormSubject.findByPk(id)
        if (!formSubjectExists) {
            return res.status(422).json({ error: "Esse assunto não existe!" })
        }

        if (!subject && !formType) {
            return res.status(200).json({ message: "Nenhuma alteração realizada no assunto!" })
        }

        if (subject) {
            formSubjectExists.subject = subject
        }

        if (formType) {
            formSubjectExists.formType = formType
        }

        // Update form subject
        await formSubjectExists.save()
        return res.status(200).json({ message: "Assunto atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteFormSubject = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if form subject ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do assunto é obrigatório!" })
        }

        // Verify if form subject exists
        const formSubjectExists = await FormSubject.findByPk(id)
        if (!formSubjectExists) {
            return res.status(422).json({ error: "Esse assunto não existe!" })
        }

        // Delete form subject
        await FormSubject.destroy({ where: { id } })
        return res.status(200).json({ message: "Assunto deletado com sucesso!", id: parseInt(id) })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertFormSubject,
    getAllFormSubjects,
    getFormSubjectById,
    getFormSubjectByFormType,
    updateFormSubject,
    deleteFormSubject,
}