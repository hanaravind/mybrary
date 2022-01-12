if(process.env.NODE_ENV !== 'production') {
    require('dotenv').parse()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRoutes = require('./routes/index')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(expressLayouts)
app.use(express.static('public'))

app.use(indexRoutes)

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection

db.on('error', error => console.log(error))
db.once('open', () => console.log('connected'))


app.listen(port, () => {
    console.log('server listening on ', port)
})