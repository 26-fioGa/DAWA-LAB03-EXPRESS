const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SerieSchema = new Schema({
    id_tipo_documento: Schema.Types.ObjectId,
    descripcion: String,
    correlativo: { type: Number, default: 0 },
});

module.exports = mongoose.model('Serie', SerieSchema);