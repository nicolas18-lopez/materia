const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

//middleware para aanalizar los datos JSON
app.use(express.json());

//Configuracion para la conexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "materia",
});

//Conetar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado con exito a la base de datos");
  }
});

//crear una nueva materia
app.post("/materia", (req, res) => {
  const materia = req.body;
  const sql =
    "INSERT INTO materia (nombremateria, descripcion, nota) VALUES(?, ?, ?)";

  db.query(
    sql,
    [materia.nombremateria, materia.descripcion, materia.nota],
    (err, result) => {
      if (err) {
        console.error("error a crear una nueva materia:", err);
        res.status(500).json({ error: "error al crear una nueva materia" });
      } else {
        console.log({ message: "materia creada", id: result.insertid });
      }
    }
  );
});

//Iniciar el Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en httt://localhost:${port}`);
});
