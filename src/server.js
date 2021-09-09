const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// ---Conexión a la base de datos---
mongoose.connect('mongodb://localhost/Facturacion')
    .then(db = console.log('--Conectada a la BD--'))
    .catch(err => console.log(err));

// ---Importando rutas---
const routesDocs = require('./routes/documentoRoutes');
const routesTipoDoc = require('./routes/tipoDocumentoRoutes');
const routesEntidad = require('./routes/entidadRoutes');
const routesSerie = require('./routes/serieRoutes');
const routesDetalle = require('./routes/detalleRoutes');

// ---Configuraciones---
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(__dirname + '/public'));
app.use('/docs', express.static(__dirname + '/docs'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ---Middlewares---
app.use(morgan('dev'));
// Modulo para recibir data de formulario
app.use(express.urlencoded({ extended: false }));

// ---Rutas---
// CRUD DOCUMENTOS
app.get('/', routesDocs);
app.post('/addDoc', routesDocs);
app.get('/deleteDoc/:id', routesDocs);
app.get('/editDoc/:id', routesDocs);
app.post('/editDoc/:id', routesDocs);
// CRUD TIPO-DOCUMENTO
app.get('/tipos', routesTipoDoc);
app.post('/addTypeDocument', routesTipoDoc);
app.get('/deleteTypeDocument/:id', routesTipoDoc);
app.get('/editTypeDocument/:id', routesTipoDoc);
app.post('/editTypeDocument/:id', routesTipoDoc);
// CRUD ENTIDAD
app.get('/entidades', routesEntidad);
app.post('/addEntidad', routesEntidad);
app.get('/deleteEntidad/:id', routesEntidad);
app.get('/editEntidad/:id', routesEntidad);
app.post('/editEntidad/:id', routesEntidad);
// CRUD SERIE
app.get('/series', routesSerie);
app.post('/addSerie', routesSerie);
app.get('/deleteSerie/:id', routesSerie);
app.get('/editSerie/:id', routesSerie);
app.post('/editSerie/:id', routesSerie);
// CRUD DETALLE
app.get('/detalle/:id', routesDetalle);
app.post('/addDetalle', routesDetalle);
app.get('/deleteDetalle/:id', routesDetalle);
app.get('/generateReport/:id', routesDetalle);


// ---Iniciamos el servidor---
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});