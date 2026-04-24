require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const cors = require("cors");

app.use(cors({
  origin: "https://interview-pro0.vercel.app",
  credentials: true
}));

connectToDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port 3000 ${PORT}`)
})