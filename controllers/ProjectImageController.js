const { ProjectImage, Project } = require('../models')

const insertProjectImage = async (req, res) => {
    const { projectId } = req.body

    if (!projectId || projectId === "") {
        return res.status(400).json({ error: "O identificador do projeto é obrigatório!" })
    }

    if (req.file) {
        image = req.file.filename
    } else {
        return res.status(400).json({ error: "A imagem do projeto é obrigatória!" })
    }

    try {
        // Verify if project exists
        const projectExists = await Project.findByPk(projectId)
        if (!projectExists) {
            return res.status(409).json({ error: "Esse projeto não existe!" })
        }

        // Create project image
        const newProjectImage = await ProjectImage.create({ image, projectId })
        return res.status(200).json({ message: "Imagem adicionada ao projeto com sucesso!", newProjectImage })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

const getProjectImagesById = async (req, res) => {
    const { id } = req.params

    const projectId = id

    // Verify if project Image ID was passed
    if (isNaN(parseInt(projectId))) {
        return res.status(400).json({ error: "O identificador da imagem do projeto é obrigatório!" })
    }

    const projectImages = await ProjectImage.findAll({
        where: { projectId: parseInt(projectId) },
        include: [{
            model: Project,
            attributes: ['id', 'name']
        }]
    })

    res.status(200).json(projectImages)
}

const deleteProjectImage = async (req, res) => {
    const { id } = req.params

    try {
        // Verify if project Image ID was passed
        if (isNaN(id)) {
            return res.status(400).json({ error: "O identificador da imagem do projeto é obrigatório!" })
        }

        // Verify if project Image exists
        const projectImageExists = await ProjectImage.findByPk(id)
        if (!projectImageExists) {
            return res.status(422).json({ error: "Essa imagem não existe!" })
        }

        // Delete project Image
        await ProjectImage.destroy({ where: { id } })
        return res.status(200).json({ message: "Imagem deletada com sucesso!", id: parseInt(id) })
    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor. Por favor, tente novamente mais tarde." })
    }
}

module.exports = {
    insertProjectImage,
    getProjectImagesById,
    deleteProjectImage,
}