process.env.LOCAL_MODE = true;

const assert = require('assert');
const sinon = require('sinon');
const AWS = require('aws-sdk');

const vanityNumbers = require('../vanityNumbers');
const database = require('../database');

let sinonSandbox;

beforeEach((done) => {
	sinonSandbox = sinon.createSandbox();
	done();
});

afterEach((done) => {
    sinonSandbox.restore()
    done();
});

describe('vanity numbers tests', function() {
	it ('should produce five numbers', function() {
		let result = vanityNumbers.getVanityNumbers('+2013987987', 5);
		assert.strictEqual(result.length, 5);
	});

	it ('should produce a ten digit number with - characters', function() {
		let phoneNumber = '+12013987987';
		let result = vanityNumbers.getVanityNumbers(phoneNumber, 5);
		for (let number of result) {
			assert.strictEqual(number.length, 12);
		}
	});

	it ('should produce a number with number mneumonics', function() {
		let phoneNumber = '+0000000000';
		let result = vanityNumbers.getVanityNumbers(phoneNumber, 5);
		for (let number of result) {
			assert.strictEqual(number.length, 12);
		}
	});
});

describe('database tests', function() {
	it ('should put an item in DynamoDB and return quietly.', async function() {
		sinonSandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({
			promise: function () {
				return Promise.resolve(result);
			}
		});
		let phoneNumber = '+12013987987';
		let result = vanityNumbers.getVanityNumbers(phoneNumber, 5);
		await database.upsert(phoneNumber, result);
	});
	it ('should put an item in DynamoDB and return an error.', async function() {
		sinonSandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({
			promise: function () {
				return Promise.reject(result);
			}
		});
		let phoneNumber = '+12013987987';
		let result = vanityNumbers.getVanityNumbers(phoneNumber, 5);
		try {
			await database.upsert(phoneNumber, result);
			// fail if we get here because this should error.
			assert.strictEqual(false, true);
		} catch (err) {

		}
	});
});