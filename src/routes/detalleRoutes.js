const express = require('express');
const router = express.Router();
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const Detalle = require('../models/detalle.js')
const Documento = require('../models/documento.js')
const Serie = require('../models/serie.js')
const TipoDocumento = require('../models/tipoDocumento.js')
const Entidad = require('../models/entidad.js')

router.get('/detalle/:id', async(req, res) => {
    const { id } = req.params;
    const detalle = await Detalle.find({ id_documento: id });
    console.log(detalle)
    const list_docs = await Documento.find();
    // const list_series = await Serie.find();
    // const list_type_docs = await TipoDocumento.find();
    // const list_entidades = await Entidad.find();
    res.render('detalle', {
        detalle,
        list_docs,
        // list_series,
        // list_type_docs,
        // list_entidades
    });
});
router.post('/addDetalle', async(req, res) => {
    var precio_unitario = req.body.precio_unitario;
    var cantidad = req.body.cantidad;
    var monto_igv = 0.0;
    var importe_venta = 0;
    for (i = 1; i <= cantidad; i++) {
        monto_igv += (0.18 * precio_unitario);
    }
    var monto_igv_real = Math.round(monto_igv * 100) / 100;
    importe_venta = (parseFloat(precio_unitario) + monto_igv) * parseFloat(cantidad)
    var importe_venta_real = Math.round(importe_venta * 100) / 100;
    var aditionalData = { monto_igv: monto_igv_real, importe_venta: importe_venta_real }
    Object.assign(req.body, aditionalData);
    const new_detalle = new Detalle(req.body);
    await new_detalle.save();
    res.redirect('/');
});
router.get('/deleteDetalle/:id', async(req, res) => {
    const { id } = req.params;
    await Detalle.remove({ _id: id });
    res.redirect('/');
});
router.get('/generateReport/:id', async(req, res) => {
    const { id } = req.params;
    const detalle = await Detalle.findById(id);
    const html = fs.readFileSync(path.join(__dirname, '../views/report.html'), 'utf-8')
    const fileName = Math.random() + '_reporte' + '.pdf';
    const document = {
        html: html,
        data: {
            detalle: detalle,
        },
        path: './docs/' + fileName
    }
    pdf.create(document).
    then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    });
    const filepath = 'http://localhost:3000/docs/' + fileName;

    res.render('donwload', {
        path: filepath
    });
});
module.exports = router;