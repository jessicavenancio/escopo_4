
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//config swagger
const swagger = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
app.use("/api", swagger.serve, swagger.setup(swaggerDoc));


//config BD
const {connection, authenticate} = require("./database/database");
authenticate(connection);

//configurar a rota
const rotaPedidos = require("./routes/pedidos.js");
const rotaEntregadores = require("./routes/entregadores.js");
const rotaFiltragem = require("./routes/filtragem");//

app.use(rotaPedidos);
app.use(rotaEntregadores);
app.use(rotaFiltragem);//


app.listen(3000, ()=>{
    connection.sync();//{force:true}
    console.log("Servidor rodando em http://localhost:3000");
});
