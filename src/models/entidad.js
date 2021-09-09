const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entidadSchema = new Schema({
    tipo_documento_descripcion: String,
    numero_documento: String,
    razon_social: String,
    correo_electronico: String,
    direccion: String,
    telefono: String,
});

module.exports = mongoose.model('Entidad', entidadSchema);