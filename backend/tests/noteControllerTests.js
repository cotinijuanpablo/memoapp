var sinon = require('sinon'),
    should = require('should');

describe('Basic Mocha String Test', function () {
    describe('Post', () => {
        it('should not allow empty title on note post', function () {
            var Note = (Book) => {
                this.save() = function () { };
            };
            var req = {
                body: {
                    title: "John Paul C.",
                },
            };
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            //Bad Request                               First Time Call and first Time Argument
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
        it('should return first charachter of the string', function () {
            assert.equal("Hello".charAt(0), 'H');
        });
    })

});