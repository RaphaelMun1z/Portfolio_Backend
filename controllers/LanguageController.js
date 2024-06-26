const { Language, ProjectFrontend, ProjectBackend, sequelize } = require('../models')

const insertLanguage = async (req, res) => {
    const { name, proficiency } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome da linguagem é obrigatório!" })
    }

    if (!proficiency || proficiency === "") {
        return res.status(400).json({ error: "O nível de proeficiência com a linguagem é obrigatório!" })
    }

    if (proficiency < 0 || proficiency > 100) {
        return res.status(422).json({ error: "O nível de proeficiência está fora dos limites permitidos (0-100)!" })
    }

    try {
        // Verify if language already exists
        const languageAlreadyExists = await Language.findOne({ where: { name } })
        if (languageAlreadyExists) {
            return res.status(409).json({ error: "Essa linguagem já existe!" })
        }

        // Create language
        const newLanguage = await Language.create({ name, proficiency })
        return res.status(200).json({ message: "Linguagem cadastrada com sucesso!", newLanguage })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllLanguages = async (req, res) => {
    const languages = await Language.findAll()

    const frontendUsage = await ProjectFrontend.findAll({
        attributes: ['languageId', 'projectId'],
    });

    const backendUsage = await ProjectBackend.findAll({
        attributes: ['languageId', 'projectId'],
    });

    const projectsFrontendArray = frontendUsage.map((frontProject) => ({
        [frontProject.projectId]: frontProject.languageId
    }));

    const projectsBackendArray = backendUsage.map((backProject) => ({
        [backProject.projectId]: backProject.languageId,
    }));

    let array = [...projectsBackendArray, ...projectsFrontendArray]

    const result = array.filter((objeto, indice, self) =>
        indice === self.findIndex((t) => (
            JSON.stringify(t) === JSON.stringify(objeto)
        ))
    );

    result.sort((a, b) => {
        const aKey = Object.keys(a)[0];
        const bKey = Object.keys(b)[0];
        return aKey.localeCompare(bKey);
    });

    const countMap = {};

    result.forEach(objeto => {
        const chave = Object.keys(objeto)[0];
        const valor = Object.values(objeto)[0];
        if (countMap[valor]) {
            countMap[valor] += 1;
        } else {
            countMap[valor] = 1;
        }
    });

    const usage = Object.entries(countMap).map(([chave, valor]) => ({ [chave]: valor }));

    const languagesWithUsage = languages.map(language => {
        const usageObj = usage.find(u => Object.keys(u)[0] === String(language.id));
        const usageValue = usageObj ? Object.values(usageObj)[0] : 0;
        return {
            ...language.toJSON(),
            usageCount: usageValue
        };
    });

    res.status(200).json(languagesWithUsage)
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
        return res.status(200).json({ message: "Linguagem deletada com sucesso!", id: parseInt(id) })
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