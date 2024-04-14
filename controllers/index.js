const languagesController = require('./LanguageController')
const toolsController = require('./ToolController')
const projectToolController = require('./ProjectToolController')
const databaseController = require('./DatabaseController')
const projectDatabaseController = require('./ProjectDatabaseController')
const projectHostController = require('./ProjectHostController')
const projectFrontendController = require('./ProjectFrontendController')
const projectBackendController = require('./ProjectBackendController')
const frameworksController = require('./ProjectController')
const projectsController = require('./ProjectController')
const interpersonalSkillController = require('./InterpersonalSkillController')

module.exports = {
    languages: languagesController,
    tools: toolsController,
    projectsTools: projectToolController,
    databases: databaseController,
    projectsDatabase: projectDatabaseController,
    projectsHost: projectHostController,
    projects: projectsController,
    frameworks: frameworksController,
    projectsFrontend: projectFrontendController,
    projectsBackend: projectBackendController,
    interpersonalSkills: interpersonalSkillController
}