const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000

const app = express()
const publicPath = path.join(__dirname, 'build')
const p5Path = path.join(__dirname, "p5")

app.use("/p5/2",express.static(p5Path))
app.use(express.static(publicPath))


app.get("/p5/2", (req, res, next)=>{
    res.sendFile(path.join(p5Path, 'p5.html'))
})

app.get("/p5/*", (req, res)=>{
    res.redirect("/")
})

app.get("/*", (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, (err)=>{
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Server Running. Listening on port ${port}`)
})
