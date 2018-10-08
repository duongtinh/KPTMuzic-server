module.exports = (app) => {
    const medias = require('../controllers/media.controller.js');

    // Create a new media
    app.post('/medias', medias.create);

    // Retrieve all medias
    app.get('/medias', medias.findAll);

    // Retrieve a single Note with mediaId
    app.get('/medias/:mediaId', medias.findOne);

    // Update a Note with mediaId
    app.put('/medias/:mediaId', medias.update);

    // Delete a Note with mediaId
    app.delete('/medias/:mediaId', medias.delete);
}