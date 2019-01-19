const notesRouter = require("express").Router();
const Note = require("../model/noteModel");
const NoteDetail = require("../model/noteDetailsModel");
const NoteController = require("../controllers/notesControllers")(Note, NoteDetail);    //Should send it like this?

// Check middleware, with the next, maybe I can use it to generalize the code if many methods has the same initial part, like a find in the
// findxandY
// y can be update, delete or the simply find can be a initial of the rest.

/**
 * @description Operations over notes
 */
notesRouter
    .get('/',(_, res) => {NoteController.get(res)})
    .get('/:id', (req, res) => {NoteController.getById(req, res)})
    .post('/', (req, res) => {NoteController.post(req, res)})
    .patch('/', (req, res) => {NoteController.patch(req, res)})
    .delete('/', (req, res) => {NoteController.delete(req, res)});

module.exports = notesRouter;