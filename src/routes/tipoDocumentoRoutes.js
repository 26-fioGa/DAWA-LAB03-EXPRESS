const express = require('express');
const router = express.Router();
const TipoDocumento = require('../models/tipoDocumento.js');

router.get('/tipos', async(req, res) => {
    const list_tipo_documentos = await TipoDocumento.find();
    res.render('typeDocs', {
        list_tipo_documentos
    });
});
router.post('/addTypeDocument', async(req, res) => {
    const new_tipo_documento = new TipoDocumento(req.body);
    await new_tipo_documento.save();
    res.redirect('/tipos');
});
router.get('/editTypeDocument/:id', async(req, res) => {
    const { id } = req.params;
    const tipo_documento = await TipoDocumento.findById(id);
    res.render('editTypeDoc', {
        tipo_documento
    });
});
router.post('/editTypeDocument/:id', async(req, res) => {
    const { id } = req.params;;
    await TipoDocumento.update({ _id: id }, req.body);
    res.redirect('/tipos');

});
router.get('/deleteTypeDocument/:id', async(req, res) => {
    const { id } = req.params;
    await TipoDocumento.remove({ _id: id });
    res.redirect('/tipos');
});
module.exports = router;