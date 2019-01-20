var sinon = require('sinon');
    should = require('should');

    //https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7

describe('Basic Mocha String Test', function () {
    describe('Post', () => {
        it('should not allow empty values on note post', function () {
            var Note = function() {
                this.save = function () { };
            }

            var NoteDetail = function() {
                this.save = function () { };
            }

            var req = {
                body: {
                    title: "John Paul C.",
                    deadLine: 'shoudl be a date', //shoudl create another test for testing types
                    description: 'description'
                    //category: 'category'
                },
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            const NoteController = require("../controllers/notesControllers")(Note, NoteDetail);
            NoteController.post(req, res);
            //Bad Request                               First Time Call and first Time Argument
            res.status.calledWith(400).should.equal(true, 'Bad Status');
            res.send.calledWith('All parameters are required').should.equal(true);
        });
    })

});