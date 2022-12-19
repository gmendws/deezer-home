const routerRegister = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

routerRegister.post('/auth/register', async (req, res) => {
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

  module.exports = routerRegister