const express = require('express');
const router = express.Router();
const Serie = require('../models/serie.js')
const TipoDocumento = require('../models/tipoDocumento.js')


router.get('/series', async(req, res) => {
    const list_type_docs = await TipoDocumento.find();
    const list_series = await Serie.find();
    res.render('series', {
        list_series,
        list_type_docs
    });
});
router.post('/addSerie', async(req, res) => {
    const new_serie = new Serie(req.body);
    await new_serie.save();
    res.redirect('/series');
});
router.get('/editSerie/:id', async(req, res) => {
    const { id } = req.params;
    const list_type_docs = await TipoDocumento.find();
    const serie = await Serie.findById(id);
    res.render('editSerie', {
        serie,
        list_type_docs
    });
});
router.post('/editSerie/:id', async(req, res) => {
    const { id } = req.params;
    await Serie.update({ _id: id }, req.body);
    res.redirect('/series');

});
router.get('/deleteSerie/:id', async(req, res) => {
    const { id } = req.params;
    await Serie.remove({ _id: id });
    res.redirect('/series');
});
module.exports = router;