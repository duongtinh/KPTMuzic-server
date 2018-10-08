const Media = require('../models/media.model.js');

// Create and Save a new media
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Media name can not be empty"
        });
    }

    if (!req.body.link) {
        return res.status(400).send({
            message: "Media link can not be empty"
        });
    }

    // Create a media
    const media = new Media({
        mediaId: req.body.mediaId || "Untitled Media",
        name: req.body.name,
        date: req.body.date,
        link: req.body.link,
        type: req.body.type
    });

    // Save media in the database
    Media.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the media."
            });
        });
};

// Retrieve and return all medias from the database.
exports.findAll = (req, res) => {
    Media.find()
        .then(medias => {
            res.send(medias);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medias."
            });
        });
};

// Find a single media with a mediaId
exports.findOne = (req, res) => {
    Media.findById(req.params.mediaId)
        .then(media => {
            if (!media) {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            res.send(media);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            return res.status(500).send({
                message: "Error retrieving media with id " + req.params.mediaId
            });
        });
};

// Update a media identified by the mediaId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "name can not be empty"
        });
    }

    if (!req.body.link) {
        return res.status(400).send({
            message: "link can not be empty"
        });
    }

    // Find media and update it with the request body
    Media.findByIdAndUpdate(req.params.mediaId, {
        mediaId: req.body.mediaId || "Untitled Media",
        name: req.body.name,
        date: req.body.date,
        link: req.body.link,
        type: req.body.type
    }, { new: true })
        .then(media => {
            if (!media) {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            res.send(media);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            return res.status(500).send({
                message: "Error updating media with id " + req.params.mediaId
            });
        });
};

// Delete a media with the specified mediaId in the request
exports.delete = (req, res) => {
    Media.findByIdAndRemove(req.params.mediaId)
        .then(media => {
            if (!media) {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            res.send({ message: "media deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            return res.status(500).send({
                message: "Could not delete media with id " + req.params.mediaId
            });
        });
};