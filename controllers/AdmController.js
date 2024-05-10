const { Adm } = require('../models')

// Helpers
const createAdmToken = require('../helpers/create-adm-token');
const getToken = require("../helpers/get-token")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const insertAdm = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "O nome é obrigatório!" })
    }

    if (!email || email === "") {
        return res.status(400).json({ error: "O e-mail é obrigatório!" })
    }

    if (!password || password === "") {
        return res.status(400).json({ error: "A senha é obrigatória!" })
    }

    if (!confirmPassword || confirmPassword === "") {
        return res.status(400).json({ error: "A confirmação de senha é obrigatória!" })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "As senhas não são iguais!" })
    }

    try {
        // Verify if adm already exists
        const admAlreadyExists = await Adm.findOne()
        if (admAlreadyExists) {
            return res.status(409).json({ error: "Já existe uma conta ADM cadastrada!" })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Create adm
        const newAdm = await Adm.create({ name, email, password: passwordHash })
        await createAdmToken(newAdm, req, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const loginAdm = async (req, res) => {
    const { email, password } = req.body

    if (!email || email === "") {
        return res.status(400).json({ error: "O e-mail é obrigatório!" })
    }

    if (!password || password === "") {
        return res.status(400).json({ error: "A senha é obrigatória!" })
    }

    try {
        // Verify if adm already exists
        const admExists = await Adm.findOne({ where: { email } })
        if (!admExists) {
            return res.status(409).json({ error: "Credenciais inválidas!" })
        }

        const checkPassword = await bcrypt.compare(password, admExists.password)

        if (!checkPassword) {
            return res.status(409).json({ error: "Credenciais inválidas!" })
        }

        await createAdmToken(admExists, req, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const checkAdm = async (req, res) => {
    let currentAdm

    if (req.headers.authorization) {
        const token = getToken(req)
        const decoded = jwt.verify(token, '+q7bgkWT6o')

        currentAdm = await Adm.findByPk(decoded.id)

        currentAdm.password = undefined
    } else {
        currentAdm = null
    }

    res.status(200).send(currentAdm)
}

const getAdm = async (req, res) => {
    const adm = await Adm.findOne({
        attributes: ['id', 'name'],
    })

    res.status(200).json(adm)
}

const updateAdm = async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body

    try {
        // Verify if adm ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador do adm é obrigatório!" })
        }

        // Verify if adm exists
        const admExists = await Adm.findByPk(id)
        if (!admExists) {
            return res.status(422).json({ error: "Adm não encontrado!" })
        }

        if (!name && !email && !password) {
            return res.status(200).json({ message: "Nenhuma alteração realizada!" })
        }

        if (name) {
            // Verify if adm already exists
            const admAlreadyExists = await Adm.findOne({ where: { name } })
            if (admAlreadyExists) {
                return res.status(409).json({ error: "Esse já é o atual nome!" })
            }

            admExists.name = name
        }

        if (email) {
            admExists.email = email
        }

        if (password) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            admExists.password = passwordHash
        }

        // Update adm
        await admExists.save()
        return res.status(200).json({ message: "Adm atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertAdm,
    loginAdm,
    checkAdm,
    getAdm,
    updateAdm
}