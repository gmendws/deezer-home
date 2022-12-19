const routerLogin = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

routerLogin.post("/auth/login", async (req, res) => {
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

  module.exports = routerLogin