const express = require("express")
const router = express()

router.use("/api/languages", require("./LanguageRoutes"))
router.use("/api/frameworks", require("./FrameworkRoutes"))
router.use("/api/tools", require("./ToolRoutes"))
router.use("/api/projects-tools", require("./ProjectToolRoutes"))
router.use("/api/databases", require("./DatabaseRoutes"))
router.use("/api/projects-database", require("./ProjectDatabaseRoutes"))
router.use("/api/projects-host", require("./ProjectHostRoutes"))
router.use("/api/projects-frontend", require("./ProjectFrontendRoutes"))
router.use("/api/projects-backend", require("./ProjectBackendRoutes"))
router.use("/api/projects", require("./ProjectRoutes"))
router.use("/api/interpersonal-skills", require("./InterpersonalSkillRoutes"))
router.use("/api/contact-forms", require("./ContactFormRoutes"))
router.use("/api/faqs", require("./FaqRoutes"))
router.use("/api/form-subjects", require("./FormSubjectRoutes"))
router.use("/api/adm", require("./AdmRoutes"))
router.use("/api/logs", require("./LogRoutes"))
router.use("/api/social-media", require("./SocialMediaRoutes"))

router.get("/", (req, res) => {
    res.send("API Working!")
})

module.exports = router