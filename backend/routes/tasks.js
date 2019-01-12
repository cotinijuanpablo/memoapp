const router = require("express").Router();
const Notes = require("../model/notes");
const NoteDetail = require("../model/notedetails");

/**
 * @description response
 * @param {} err 
 * @param {Response} res - Reponse instance
 * @param {Object} data - Optional data to be sent
 */
function reponse(err, res, data) {
    if (err) return res.json({ success: false, error: err });
    return !data ?  res.json({ success: true }) :
                    res.json({ success: true, data: data });
}

/**
 * @description Get the data from the DB
 * @param res - response object in which to write the response.
 */
router.get("/", (_, res) => {
    Notes.find((err, data) => reponse(err, res, data));
});

/**
 * @description Get the data from the DB
 * @param res - response object in which to write the response.
 */
router.get("/:id", (req, res) => {
    Notes.find({ id: req.params.id }, (err, data) => reponse(err, res, data));
});

/**
 * @description Adds the data from the DB
 * @param req - request object with the values.
 * @param res - response object in which to write the response.
 */
router.post("/putData", (req, res) => {
    let data = new Notes();

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
router.patch("/updateData", (req, res) => {
    const { id, update } = req.body;
    Notes.findOneAndUpdate(id, update, err => reponse(err, res));
});

/**
 * @description Erase the data from the DB
 * @param req - request object with the values.
 * @param res - response object in which to write the response.
 */
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Notes.findOneAndDelete({ _id: id }, err => reponse(err, res));
});

module.exports = router;