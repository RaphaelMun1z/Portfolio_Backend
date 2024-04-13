const { Framework, Language } = require('../models')

const insertFramework = async (req, res) => {
    const { name, languageId, proficiency } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome do framework é obrigatório!" })
    }

    if (!languageId || isNaN(languageId) || languageId === "") {
        return res.status(400).json({ error: "O identificador da linguagem do framework é obrigatório!" })
    }

    if (!proficiency || proficiency === "") {
        return res.status(400).json({ error: "O nível de proeficiência com o framework é obrigatório!" })
    }

    if (proficiency < 0 || proficiency > 100) {
        return res.status(422).json({ error: "O nível de proeficiência está fora dos limites permitidos (0-100)!" })
    }

    try {
        // Verify if framework already exists
        const frameworkAlreadyExists = await Framework.findOne({ where: { name, languageId } })
        if (frameworkAlreadyExists) {
            return res.status(409).json({ error: "Esse framework já existe!" })
        }

        // Create framework
        const newFramework = await Framework.create({ name, languageId, proficiency })
        return res.status(200).json({ message: "Framework cadastrado com sucesso!", newFramework })
    } catch (error) {
        console.error("Erro ao verificar se o framework já existe:", error);
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllFrameworks = async (req, res) => {
    const frameworks = await Framework.findAll({
        include: {
            model: Language,
            attributes: ['id', 'name'],
            required: false
        },
    })

    res.status(200).json(frameworks)
}

const getFrameworkById = async (req, res) => {
    const { id } = req.params

    const framework = await Framework.findByPk(id)

    res.status(200).json(framework)
}

const updateFramework = async (req, res) => {
    const { id } = req.params
    const { name, languageId, proficiency } = req.body

    try {
        // Verify if framework ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do framework é obrigatório!" })
        }

        // Verify if framework exists
        const frameworkExists = await Framework.findByPk(id)
        if (!frameworkExists) {
            return res.status(422).json({ error: "Esse framework não existe!" })
        }

        if (!name && !languageId && !proficiency) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na linguagem!" })
        }

        if (name) {
            frameworkExists.name = name
        }

        if (languageId) {
            frameworkExists.languageId = languageId
        }

        if (proficiency && proficiency >= 0 && proficiency <= 100) {
            frameworkExists.proficiency = proficiency
        }

        // Update framework
        await frameworkExists.save()
        return res.status(200).json({ message: "Framework atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteFramework = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if framework ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do framework é obrigatório!" })
        }

        // Verify if framework exists
        const frameworkExists = await Framework.findByPk(id)
        if (!frameworkExists) {
            return res.status(422).json({ error: "Esse framework não existe!" })
        }

        // Delete framework
        await Framework.destroy({ where: { id } })
        return res.status(200).json({ message: "Framework deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertFramework,
    getAllFrameworks,
    getFrameworkById,
    updateFramework,
    deleteFramework,
}