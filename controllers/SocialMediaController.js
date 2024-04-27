const { SocialMedia } = require('../models')

const insertSocialMedia = async (req, res) => {
    const { instagram, github, linkedin } = req.body

    if (!instagram || instagram === "") {
        return res.status(400).json({ error: "O instagram é obrigatório!" })
    }

    if (!github || github === "") {
        return res.status(400).json({ error: "O github é obrigatório!" })
    }

    if (!linkedin || linkedin === "") {
        return res.status(400).json({ error: "O linkedin é obrigatório!" })
    }

    try {
        // Verify if social media already exists
        const socialMediaAlreadyExists = await SocialMedia.findOne()
        if (socialMediaAlreadyExists) {
            return res.status(409).json({ error: "Rede social já existe!" })
        }

        // Create social media
        const newSocialMedia = await SocialMedia.create({ instagram, github, linkedin })
        return res.status(200).json({ message: "Linguagem cadastrada com sucesso!", newSocialMedia })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getSocialMedia = async (req, res) => {
    const socialMedia = await SocialMedia.findOne()

    res.status(200).json(socialMedia)
}

const updateSocialMedia = async (req, res) => {
    const { instagram, github, linkedin } = req.body

    try {
        // Verify if social media exists
        const socialMediaExists = await SocialMedia.findOne()
        if (!socialMediaExists) {
            return res.status(422).json({ error: "Rede social não existe!" })
        }

        if (!instagram && !github && !linkedin) {
            return res.status(200).json({ message: "Nenhuma alteração realizada na rede social!" })
        }

        if (instagram) {
            socialMediaExists.instagram = instagram
        }

        if (github) {
            socialMediaExists.github = github
        }

        if (linkedin) {
            socialMediaExists.linkedin = linkedin
        }

        // Update social media
        await socialMediaExists.save()
        return res.status(200).json({ message: "Rede social atualizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertSocialMedia,
    getSocialMedia,
    updateSocialMedia,
}