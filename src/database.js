const AWS = require('aws-sdk');

if (process.env.LOCAL_MODE) {
	let credentials = new AWS.SharedIniFileCredentials(
		{ profile: process.env.AWS_PROFILE }
	);
	AWS.config.credentials = credentials;
}
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Save or update a phone number and its associated vanity numbers.
 * This implementation uses DynamoDB but it doesn't have to. This could easily be swapped out if needed.
 *
 * @param {string} phoneNumber The phone number being saved.
 * @param {array} vanityList The associated vanity numbers.
 */
async function upsert(phoneNumber, vanityList) {
	let upsertDate = new Date();
    let saveObject = {
        "CallerNumber": phoneNumber,
        "VanityNumbers": vanityList,
		// implemented for sorting later on
        "LastUpdated": upsertDate.getTime(),
		// implemented for human readable diagnostics
		"LastUpdatedReadable": upsertDate.toUTCString(),
    }
    let params = {
        TableName: 'VanityNumber1',
        Item: saveObject,
    };
    try {
        let data = await docClient.put(params).promise();
        console.log(`Successfully inserted ${vanityList.length} vanity numbers for ${phoneNumber}`);
        console.log(JSON.stringify(data));
    } catch (err) {
        console.error(`Unable to insert vanity numbers for ${phoneNumber}.   The error is ${err.toString()}`);
        console.error(JSON.stringify(error));
        throw err;
    }
}

module.exports = {
	upsert: upsert,
}