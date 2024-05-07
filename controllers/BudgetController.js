const { Budget } = require('../models')

const insertBudget = async (req, res) => {
    const { name, contact, description, references } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome é obrigatório!" })
    }

    if (!contact || contact === "") {
        return res.status(400).json({ error: "O Contato é obrigatório!" })
    }

    if (!description || description === "") {
        return res.status(400).json({ error: "A descrição do projeto é obrigatório!" })
    }

    if (!references || references === "") {
        return res.status(400).json({ error: "É necessário ao menos uma referência!" })
    }

    try {
        // Verify if budget already exists
        const budgetAlreadyExists = await Budget.findOne({ where: { name, contact, description, references } })
        if (budgetAlreadyExists) {
            return res.status(409).json({ error: "Esse orçamento já existe!" })
        }

        // Create budget
        const newBudget = await Budget.create({ name, contact, description, references })
        return res.status(200).json({ message: "Orçamento cadastrado com sucesso!", newBudget })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getAllBudgets = async (req, res) => {
    const budgets = await Budget.findAll()

    res.status(200).json(budgets)
}

const getBudgetById = async (req, res) => {
    const { id } = req.params

    const budget = await Budget.findByPk(id)

    res.status(200).json(budget)
}

const deleteBudget = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if budget ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do orçamento é obrigatório!" })
        }

        // Verify if budget exists
        const budgetExists = await Budget.findByPk(id)
        if (!budgetExists) {
            return res.status(422).json({ error: "Esse orçamento não existe!" })
        }

        // Delete budget
        await Budget.destroy({ where: { id } })
        return res.status(200).json({ message: "Orçamento deletado com sucesso!", id: parseInt(id) })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertBudget,
    getAllBudgets,
    getBudgetById,
    deleteBudget
}