const express = require("express")
const router = express()

router.use("/api/languages", require("./LanguageRoutes"))
router.use("/api/tools", require("./ToolRoutes"))
router.use("/api/project-tools", require("./ProjectToolRoutes"))

router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router