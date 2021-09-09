const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetalleSchema = new Schema({
    id_documento: Schema.Types.ObjectId,
    descripcion: String,
    precio_unitario: Schema.Types.Decimal128,
    cantidad: Number,
    monto_igv: Schema.Types.Decimal128,
    descuento: { type: Number, default: 0.0 },
    isc: { type: Number, default: 0.0 },
    importe_venta: Schema.Types.Decimal128,
    observacion: String,
});

module.exports = mongoose.model('Detalle', DetalleSchema);