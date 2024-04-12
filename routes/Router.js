const express = require("express")
const router = express()

router.use("/api/languages", require("./LanguageRoutes"))
router.use("/api/tools", require("./ToolRoutes"))
router.use("/api/projects-tools", require("./ProjectToolRoutes"))
router.use("/api/databases", require("./DatabaseRoutes"))
router.use("/api/projects-database", require("./ProjectDatabaseRoutes"))

router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router