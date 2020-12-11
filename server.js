const dotenv = require('dotenv').config({path: '.env'})
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

if (process.env.ENVIRONMENT === 'prd') {
    var options = {
        cert: fs.readFileSync('/etc/pki/Segure.AI/WildCard-Segure.ai.crt'),
        key: fs.readFileSync('/etc/pki/Segure.AI/WildCard-Segure.ai.key'),
        ca: fs.readFileSync('/etc/pki/Segure.AI/AlphaSSL-CA-SHA256-G2.crt')
    }

    https.createServer(options, app).listen(process.env.PORT, () => {
        console.log(`Listen at https://localhost:${process.env.PORT}`)
    })
}
else {
    app.listen(process.env.PORT, function () {
        console.log(`Listen at http://localhost:${process.env.PORT}`)
    })
}
