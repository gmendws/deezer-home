require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require("cors");

const app = express()

app.use(express.json())

const User = require('./models/User')

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());


app.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmpassword } = req.body

  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" })
  }

  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" })
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" })
  }

  if(password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" })
  }

  const userExists = await User.findOne({ email: email})
  if(userExists) {
    return res.status(422).json({ msg: "Por favor utilize outro e-mail!" })  
  }

  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    name, 
    email,
    password: passwordHash
  })

  try {
    await user.save()

    res.status(201).json({msg: "Usuario criado com sucesso!"})
  } catch(error) {
    console.log(error)
    res
      .status(500)
      .json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!"})
  }
})

//login user
app.post("/auth/login", async (req, res) => {
  const {email, password} = req.body

  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório!" })
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" })
  }

  const user = await User.findOne({ email: email})
  if(!user) {
    return res.status(422).json({ msg: "Usuario não encontrado!" })  
  }

  const checkPassword = await bcrypt.compare(password, user.password)
  if(!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" })  
  }

  try{
    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user._id
    },
    secret,
    )

    res.status(200).json({msg: "Autenticação realizada com sucesso", token})
  } catch(err) {
    console.log(err)
    res
      .status(500)
      .json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!"})  
  }
})

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

