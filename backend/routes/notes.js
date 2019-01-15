const notesRouter = require("express").Router();
const Note = require("../model/noteModel");
const NoteDetail = require("../model/noteDetailsModel");

/**
 * @description Generic response
 * @param {} err 
 * @param {Response} res - Reponse instance
 * @param {Object} data - Optional data to be sent
 */
function reponse(err, res, data) {
    if (err) return res.status(500).json( err );
    return !data ?  res.sendStatus(200) :
                    res.status(200).json( data );
}

/**
 * @description Get the data from the DB
 * @param res - response object in which to write the response.
 */
notesRouter.get("/", (_, res) => {
    NoteDetail.find((err, data) => reponse(err, res, data));
});

/**
 * @description Get the data from the DB
 * @param res - response object in which to write the response.
 */
notesRouter.get("/:id", (req, res) => {
    NoteDetail.findById(req.params.id, (err, data) => reponse(err, res, [data]));
});

/**
 * @description Adds the data from the DB
 * @param req - request object with the values.
 * @param res - response object in which to write the response.
 */
notesRouter.post("/putData", (req, res) => {
    let data = new NoteDetail();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => reponse(err, res, data));
});

/**
 * @description Updates the data from the DB
 * @param req - request object with the values.
 * @param res - response object in which to write the response.
 */
notesRouter.patch("/updateData", (req, res) => {
    const { id, update } = req.body;
    NoteDetail.findOneAndUpdate(id, update, err => reponse(err, res));
});

/**
 * @description Erase the data from the DB
 * @param req - request object with the values.
 * @param res - response object in which to write the response.
 */
notesRouter.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    NoteDetail.findOneAndDelete({ _id: id }, err => reponse(err, res));
});

module.exports = notesRouter;