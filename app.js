const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000

const app = express()
const publicPath = path.join(__dirname, 'build')

app.use(express.static(publicPath))

app.get("/", (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, (err)=>{
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Server Running. Listening on port ${port}`)
})
