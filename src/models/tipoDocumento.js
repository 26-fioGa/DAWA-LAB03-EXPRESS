const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoDocumentoSchema = new Schema({
    codigo: String,
    descripcion: String,
    abreviacion: String,
});

module.exports = mongoose.model('Tipo_Documento', tipoDocumentoSchema);