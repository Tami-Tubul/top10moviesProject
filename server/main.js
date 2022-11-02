const express = require("express")
const cors = require("cors") 
const app = express()
const moviesRouter = require("./routes/moviesRouter")

app.use(cors())
app.use(express.json())
app.use("/api/movies",moviesRouter)

app.listen(1010)
console.log("top10movies server is running...")