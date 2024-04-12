const { Database } = require('../models')

const insertDatabase = async (req, res) => {
    const { name, proficiency } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome do banco de dados é obrigatório!" })
    }

    if (!proficiency || proficiency === "") {
        return res.status(400).json({ error: "O nível de proeficiência com o banco de dados é obrigatório!" })
    }

    if (proficiency < 0 || proficiency > 100) {
        return res.status(422).json({ error: "O nível de proeficiência está fora dos limites permitidos (0-100)!" })
    }

    try {
        // Verify if database already exists
        const databaseAlreadyExists = await Database.findOne({ where: { name } })
        if (databaseAlreadyExists) {
            return res.status(409).json({ error: "Esse banco de dados já existe!" })
        }

        // Create database
        const newDatabase = await Database.create({ name, proficiency })
        return res.status(200).json({ message: "Banco de dados cadastrado com sucesso!", newDatabase })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllDatabases = async (req, res) => {
    const databases = await Database.findAll()

    res.status(200).json(databases)
}

const getDatabaseById = async (req, res) => {
    const { id } = req.params

    const database = await Database.findByPk(id)

    res.status(200).json(database)
}

const updateDatabase = async (req, res) => {
    const { id } = req.params
    const { name, proficiency } = req.body

    try {
        // Verify if database ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do banco de dados é obrigatório!" })
        }

        // Verify if database exists
        const databaseExists = await Database.findByPk(id)
        if (!databaseExists) {
            return res.status(422).json({ error: "Esse banco de dados não existe!" })
        }

        if (!name && !proficiency) {
            return res.status(200).json({ message: "Nenhuma alteração realizada no banco de dados!" })
        }

        if (name) {
            databaseExists.name = name
        }

        if (proficiency && proficiency >= 0 && proficiency <= 100) {
            databaseExists.proficiency = proficiency
        }

        // Update database
        await databaseExists.save()
        return res.status(200).json({ message: "Banco de dados atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const deleteDatabase = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if database ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do banco de dados é obrigatório!" })
        }

        // Verify if database exists
        const databaseExists = await Database.findByPk(id)
        if (!databaseExists) {
            return res.status(422).json({ error: "Esse banco de dados não existe!" })
        }

        // Delete database
        await Database.destroy({ where: { id } })
        return res.status(200).json({ message: "Banco de dados deletado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertDatabase,
    getAllDatabases,
    getDatabaseById,
    updateDatabase,
    deleteDatabase,
}