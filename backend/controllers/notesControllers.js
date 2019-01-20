var notesControllers = function (NoteModel, NoteDetailModel) {

    /**
     * @description Generic response
     * @param {} err 
     * @param {Response} res - Reponse instance
     * @param {Object} data - Optional data to be sent
     * @param {Number} status - status to be sent
     */
    var reponse = (err, res, data, status = 200) => {
        if (err) return res.status(500).json(err);
        return !data ? res.sendStatus(status) :
            res.status(status).json(data);
    }

    var get = (res) => {
        NoteModel.find((err, data) => reponse(err, res, data));
    }

    var getById = (req, res) => {
        NoteModel.findById(req.params.id, (err, data) => reponse(err, res, [data]));
    }

    var getDescriptionById = (req, res) => {
        NoteModel
            .findById(req.params.id)
            .populate('descriptionId')
            .exec((err, data) => {
                data.descriptionId = data.descriptionId.description;
                reponse(err, res, data)
            });
    }

    var getFullIformationById = (req, res) => {
        NoteModel
            .findById(req.params.id)
            .populate('descriptionId')
            .exec((err, data) => {
                reponse(err, res, data)
            });
    }

    var post = (req, res) => {
        //shoudl use transaction, mongoose has those with session
        const { title, category, deadLine, description } = req.body;

        //create a function that vaidates exsitence of all required fields
        //I coudl add typescript here and be sure fo type, what if title is 465 or true?
        if (!title || !category || !deadLine || !description) {
            res.status(400);
            res.send('All parameters are required');
        }
        else {
            let NewNoteDetail = new NoteDetailModel();
            NewNoteDetail.description = description;

            NewNoteDetail.save(err => {

                if (err) return reponse(err, res);

                let NewNote = new NoteModel();
                NewNote.title = title;
                NewNote.category = category;
                NewNote.deadLine = deadLine;
                NewNote.descriptionId = NewNoteDetail._id;

                NewNote.save(err => reponse(err, res, NewNoteDetail, 201));
            })
        }
    }

    var patch = (req, res) => {
        for (const attribute in req.body) {
            //Should sanitize, check if values are keys of note
            //need to test
            //If I change desciption I need to go to the other doc
            //Need to find a nice way to determine if needed and do so.
            if (NoteModel.hasOwnProperty(attribute)) {
                const value = req.body[attribute];
            }
        }
        NoteModel.findByIdAndUpdate(id, (update, err) => reponse(err, res, update));
    }

    //I can't call it delete, "[ts] Variable declaration expected. [1134]"
    /**
     * 
     */
    var deleteNote = (req, res) => {
        const { id } = req.body;
        NoteModel.findByIdAndDelete(id, (err, note) => {
            if (err) {
                reponse(err, res);
            }
            if (note) {
                NoteDetailModel.deleteOne({ noteId: note._id }, err => { reponse(err, res) });
            }
        })
    }

    return {
        get: get,
        getById: getById,
        post: post,
        patch: patch,
        delete: deleteNote
    }
}

module.exports = notesControllers;