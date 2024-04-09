const express = require("express")
const router = express()

router.use("/api/languages", require("./LanguageRoutes"))

router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router