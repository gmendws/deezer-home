const cors = require("cors");
const PORT = process.env.PORT || 3000;
const  path = require("path"),
  express = require("express"),
  app = express();

const cadastraUsuario = require("./routes/cadastraUsuario.js");
const login = require("./routes/login.js");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());


app.post("/cadastrar", (req, res) => {
    cadastraUsuario.cadastrar
});
app.post("/login", (req, res) => {
    login.entrar
})


app.listen(PORT);
