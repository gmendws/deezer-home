const routerPublishMusic = require('express').Router()
const User = require('../models/Music')

routerPublishMusic.post('/publishMusic', async (req, res) => {
    const { nameMusic, singer } = req.body
  
    if (!nameMusic) {
      return res.status(422).json({ msg: "O nome da música é obrigatório!" })
    }
  
    if (!singer) {
      return res.status(422).json({ msg: "O cantor é obrigatório!" })
    }
  
    const musicExists = await User.findOne({ nameMusic: nameMusic})
    if(musicExists) {
      return res.status(422).json({ msg: "Música já cadastrada!" })  
    }
  
    const music = new Music({
      nameMusic, 
      singer
    })
  
    try {
      await music.save()
  
      res.status(201).json({msg: "Música cadastrada com sucesso!"})
    } catch(error) {
      console.log(error)
      res
        .status(500)
        .json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!"})
    }
  })

  module.exports = routerPublishMusic