const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000

const app = express()
const publicPath = path.join(__dirname, 'build')
const p5Path = path.join(__dirname, "p5")
app.use(express.static(publicPath))
app.use(express.static(p5Path))

app.get("/", (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.get("/p5", (req, res)=>{
    res.sendFile(path.join(p5Path, 'p5.html'))
})

app.listen(port, (err)=>{
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Server Running. Listening on port ${port}`)
})
