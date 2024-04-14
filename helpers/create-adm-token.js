const jwt = require("jsonwebtoken")

const createAdmToken = async (adm, req, res) => {
    // Create Token
    const token = jwt.sign({
        name: adm.name,
        id: adm.id,
    }, "+q7bgkWT6o")

    // Return Token
    return res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        admId: adm.id,
    })
}

module.exports = createAdmToken