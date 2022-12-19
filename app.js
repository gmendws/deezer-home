require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require("cors");

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

//register user
const register = require('./routes/register')
app.use('auth/register', register)

//login user
const login = require('./routes/login')
app.use('/auth/login', login)

//publish music
const publishMusic = require('./routes/publishMusic')
app.use('/publishMusic', publishMusic)

//connect mongo
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.set('strictQuery', true);

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vghpoaf.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectado ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

