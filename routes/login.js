const { MongoClient } = require('mongodb');
const pkg = require('jsonwebtoken');
const { sign } = pkg;
const express = require('express')
const app = express()

class login {
    entrar(request, response) {
      const uri =
        "mongodb+srv://gmendws:vDpDpokSsbI4PKSs@cluster0.vghpoaf.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      client.connect((err) => {
        const collection = client.db("projeto").collection("users");
  
         
          collection.find(request.body).toArray((err, user) => {
              if (err) {
                console.log(err);
                return;
              }
              if (user.length < 1) {
                  return response.status(404).json({ erro: "Erro de autenticação." });
              }
              if (user.length < 1) {
                  return response.status(404).json({ erro: "Erro de autenticação." });
              }
      
  
              const token = sign({}, "codigoSecreto", {
                  subject: new String(user.username),
                  expiresIn: "1h",
                });
                
                return response.json({token});
            });
          });
  
  
      client.close();
    }
  }

  module.exports = login
