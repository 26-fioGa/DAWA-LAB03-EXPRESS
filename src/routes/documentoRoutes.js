const express = require('express');
const router = express.Router();
const Documento = require('../models/documento.js')
const Serie = require('../models/serie.js')
const TipoDocumento = require('../models/tipoDocumento.js')
const Entidad = require('../models/entidad.js')

router.get('/', async(req, res) => {
    const list_docs = await Documento.find();
    const list_series = await Serie.find();
    const list_type_docs = await TipoDocumento.find();
    const list_entidades = await Entidad.find();
    res.render('docs', {
        list_docs,
        list_series,
        list_type_docs,
        list_entidades
    });
});
router.post('/addDoc', async(req, res) => {
    const id_tipo_documento = req.body.id_tipo_documento
    const serie = await Serie.find({ id_tipo_documento: id_tipo_documento });
    for (var i = 0; i < serie.length; i++) {
        var id_serie = serie[i]._id
    }
    var aditionalData = { id_serie: id_serie }
    Object.assign(req.body, aditionalData);
    const new_doc = new Documento(req.body);
    await new_doc.save();
    res.redirect('/');
});
router.get('/editDoc/:id', async(req, res) => {
    const { id } = req.params;
    const doc = await Documento.findById(id);
    const list_series = await Serie.find();
    const list_entidades = await Entidad.find();
    const list_type_docs = await TipoDocumento.find();
    res.render('editDoc', {
        doc,
        list_type_docs,
        list_entidades,
        list_series
    });
});
router.post('/editDoc/:id', async(req, res) => {
    const id_tipo_documento = req.body.id_tipo_documento
    const serie = await Serie.find({ id_tipo_documento: id_tipo_documento });
    for (var i = 0; i < serie.length; i++) {
        var id_serie = serie[i]._id
    }
    var aditionalData = { id_serie: id_serie }
    Object.assign(req.body, aditionalData);
    const { id } = req.params;
    await Documento.update({ _id: id }, req.body);
    res.redirect('/');

});
router.get('/deleteDoc/:id', async(req, res) => {
    const { id } = req.params;
    await Documento.remove({ _id: id });
    res.redirect('/');
});
module.exports = router;