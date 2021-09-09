const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentoSchema = new Schema({
    id_tipo_documento: Schema.Types.ObjectId,
    id_serie: Schema.Types.ObjectId,
    id_entidad: Schema.Types.ObjectId,
    fecha_emision: { type: Date, default: Date.now },
    numero_factura: { type: Number, default: 0 },
});

module.exports = mongoose.model('Documento', DocumentoSchema);