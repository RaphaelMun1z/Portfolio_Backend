const { InterpersonalSkill } = require('../models')

const insertInterpersonalSkill = async (req, res) => {
    const { name, proficiency } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome da habilidade interpessoal é obrigatório!" })
    }

    if (!proficiency || proficiency === "") {
        return res.status(400).json({ error: "O nível de proeficiência com a habilidade interpessoal é obrigatório!" })
    }

    if (proficiency < 0 || proficiency > 100) {
        return res.status(422).json({ error: "O nível de proeficiência está fora dos limites permitidos (0-100)!" })
    }

    try {
        // Verify if interpersonal skill already exists
        const InterpersonalSkillAlreadyExists = await InterpersonalSkill.findOne({ where: { name } })
        if (InterpersonalSkillAlreadyExists) {
            return res.status(409).json({ error: "Essa habilidade interpessoal já existe!" })
        }

        // Create interpersonal skill
        const newInterpersonalSkill = await InterpersonalSkill.create({ name, proficiency })
        return res.status(200).json({ message: "Habilidade interpessoal cadastrada com sucesso!", newInterpersonalSkill })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllInterpersonalSkills = async (req, res) => {
    const interpersonalSkills = await InterpersonalSkill.findAll()

    res.status(200).json(interpersonalSkills)
}

const getInterpersonalSkillById = async (req, res) => {
    const { id } = req.params

    const interpersonalSkill = await InterpersonalSkill.findByPk(id)

    res.status(200).json(interpersonalSkill)
}

const updateInterpersonalSkill = async (req, res) => {
    const { id } = req.params
    const { name, proficiency } = req.body

    try {
        // Verify if interpersonal skill ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da habilidade interpessoal é obrigatório!" })
        }

        // Verify if interpersonal skill exists
        const interpersonalSkillExists = await InterpersonalSkill.findByPk(id)
        if (!interpersonalSkillExists) {
            return res.status(422).json({ error: "Essa habilidade interpessoal não existe!" })
        }

        if (!name && !proficiency) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na habilidade interpessoal!" })
        }

        if (name) {
            interpersonalSkillExists.name = name
        }

        if (proficiency && proficiency >= 0 && proficiency <= 100) {
            interpersonalSkillExists.proficiency = proficiency
        }

        // Update interpersonal skill
        await interpersonalSkillExists.save()
        return res.status(200).json({ message: "Habilidade interpessoal atualizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteInterpersonalSkill = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if interpersonal skill ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da habilidade interpessoal é obrigatório!" })
        }

        // Verify if interpersonal skill exists
        const interpersonalSkillExists = await InterpersonalSkill.findByPk(id)
        if (!interpersonalSkillExists) {
            return res.status(422).json({ error: "Essa habilidade interpessoal não existe!" })
        }

        // Delete interpersonal skill
        await InterpersonalSkill.destroy({ where: { id } })
        return res.status(200).json({ message: "Habilidade interpessoal deletada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertInterpersonalSkill,
    getAllInterpersonalSkills,
    getInterpersonalSkillById,
    updateInterpersonalSkill,
    deleteInterpersonalSkill,
}