const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//create express service
const app = express();

//BBDD
dbConnection();

//CORS
app.use(cors());

//Public directory
app.use(express.static('public'));

//parse body
app.use(express.json());

//Rutes
app.use('/api/auth', require('./routes/auth'));

//listen requests
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
