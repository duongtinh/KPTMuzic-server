const Document = require('../models/document.model.js');

// Create and Save a new document
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "document name can not be empty"
        });
    }

    if (!req.body.content) {
        return res.status(400).send({
            message: "document link can not be empty"
        });
    }

    // Create a document
    const document = new Document({
        documentId: req.body.documentId || "Untitled document",
        name: req.body.name,
        date: req.body.date,
        content: req.body.content,
        type: req.body.type
    });

    // Save document in the database
    Document.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the document."
            });
        });
};

// Retrieve and return all documents from the database.
exports.findAll = (req, res) => {
    Document.find()
        .then(documents => {
            res.send(documents);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving documents."
            });
        });
};

// Find a single document with a documentId
exports.findOne = (req, res) => {
    Document.findById(req.params.documentId)
        .then(document => {
            if (!document) {
                return res.status(404).send({
                    message: "document not found with id " + req.params.documentId
                });
            }
            res.send(document);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "document not found with id " + req.params.documentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving document with id " + req.params.documentId
            });
        });
};

// Update a document identified by the documentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "name can not be empty"
        });
    }

    if (!req.body.content) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    // Find document and update it with the request body
    Document.findByIdAndUpdate(req.params.documentId, {
        documentId: req.body.documentId || "Untitled document",
        name: req.body.name,
        date: req.body.date,
        content: req.body.content,
        type: req.body.type
    }, { new: true })
        .then(document => {
            if (!document) {
                return res.status(404).send({
                    message: "document not found with id " + req.params.documentId
                });
            }
            res.send(document);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "document not found with id " + req.params.documentId
                });
            }
            return res.status(500).send({
                message: "Error updating document with id " + req.params.documentId
            });
        });
};

// Delete a document with the specified documentId in the request
exports.delete = (req, res) => {
    Document.findByIdAndRemove(req.params.documentId)
        .then(document => {
            if (!document) {
                return res.status(404).send({
                    message: "document not found with id " + req.params.documentId
                });
            }
            res.send({ message: "document deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "document not found with id " + req.params.documentId
                });
            }
            return res.status(500).send({
                message: "Could not delete document with id " + req.params.documentId
            });
        });
};