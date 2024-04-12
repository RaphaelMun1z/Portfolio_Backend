const languagesController = require('./LanguageController')
const toolsController = require('./ToolController')
const projectToolController = require('./ProjectToolController')
const databaseController = require('./DatabaseController')
const projectDatabaseController = require('./ProjectDatabaseController')

module.exports = {
    languages: languagesController,
    tools: toolsController,
    projectsTools: projectToolController,
    databases: databaseController,
    projectsDatabase: projectDatabaseController,
}