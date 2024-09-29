require("dotenv").config()

const express = require('express')
const path = require("path")
const cors = require("cors")

const port = process.env.PORT

const app = express()

// Config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Solve CORS
app.use(cors({
    credentials: true,
    origin: [
        "https://portfolioraphaelmuniz.tech"
        //"http://localhost:5173"
    ]
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://portfolioraphaelmuniz.tech");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Routes
const router = require("./routes/Router.js")

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})