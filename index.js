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
        /* "https://portfolio-frontend-phi-one.vercel.app",
        "https://portfolio-frontend-phi-one.vercel.app/",
        "https://portfolio-frontend-phi-one.vercel.app/login", */
        "http://localhost:5173"
    ]
}))

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Routes
const router = require("./routes/Router.js")

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})