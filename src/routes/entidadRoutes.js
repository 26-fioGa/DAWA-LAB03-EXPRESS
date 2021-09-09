const express = require('express');
const router = express.Router();
const Entidad = require('../models/entidad.js')

router.get('/entidades', async(req, res) => {
    const list_entidades = await Entidad.find();
    res.render('entidades', {
        list_entidades
    });
});
router.post('/addEntidad', async(req, res) => {
    const new_entidad = new Entidad(req.body);
    await new_entidad.save();
    res.redirect('/entidades');
});
router.get('/editEntidad/:id', async(req, res) => {
    const { id } = req.params;
    const entidad = await Entidad.findById(id);
    res.render('editEntidad', {
        entidad
    });
});
router.post('/editEntidad/:id', async(req, res) => {
    const { id } = req.params;
    await Entidad.update({ _id: id }, req.body);
    res.redirect('/entidades');

});
router.get('/deleteEntidad/:id', async(req, res) => {
    const { id } = req.params;
    await Entidad.remove({ _id: id });
    res.redirect('/entidades');
});
module.exports = router;