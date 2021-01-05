var assert = require('assert');
const validation = require('../validation/validation');
describe('InputValidation', function() {
    describe('Date', function() {
        it('should return valid date', function(done) {
            assert.strictEqual(validation.isValidDate("2020-01-01"), true );
            done();
        })
    });
    describe('Name', function() {
        it('should return valid name', function(done) {
            assert.strictEqual(validation.isAlphabets("Tamil"), true );
            done();
        })
    });
    describe('Email', function() {
        it('should return valid email', function(done) {
            assert.strictEqual(validation.isValidEmail("abc@gmail.com"), true );
            done();
        })
    });
    describe('Confirmation', function() {
        it('should return valid confirmation', function(done) {
            assert.strictEqual(validation.isValidConfirmation("Yes"), true );
            done();
        })
    });
    describe('Selection', function() {
        it('should return valid selection', function(done) {
            assert.strictEqual(validation.isValidSelection("1"), true );
            done();
        })
    });
});
