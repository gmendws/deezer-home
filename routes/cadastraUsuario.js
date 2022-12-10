const { MongoClient } = require('mongodb');

class cadastraUsuario {
  cadastrar(req, res) {
    const { username, email, password } = req.body;

    const uri =
      "mongodb+srv://gmendws:vDpDpokSsbI4PKSs@cluster0.vghpoaf.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      const collection = client.db("projeto").collection("users");

      try {
        collection.insertOne({
          name: username,
          email: email,
          password: password,
        });
        return res.json({ data: "Cadastrado" });
      } catch (error) {
        console.log(error);
      }

      client.close();
    });
  }

}

module.exports = cadastraUsuario
