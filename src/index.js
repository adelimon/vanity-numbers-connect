const vanityNumbers = require('./vanityNumbers');
const database = require('./database');

exports.handler = async function(event, context) {
    // TODO implement
	let phoneNumber = event.Details.ContactData.CustomerEndpoint.Address;

	let vanityList = vanityNumbers.getVanityNumbers(phoneNumber,5);
    +15854140030
    let spokenNumber = phoneNumber.substring(2,5) + ' ' + phoneNumber.substring(5, 8) + ' ' + phoneNumber.substring(8, 12);
    let spokenNumberMessage = `Your vanity numbers for ${spokenNumber} are ${vanityList.join(' ')}`;

    let response = {
        statusCode: 200,
        body: JSON.stringify(vanityList),
        responseMessage: spokenNumberMessage,
    };
	try {
        await database.upsert(phoneNumber, vanityList);
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = JSON.stringify(err);
    }
    console.log(response.responseMessage);
    return response;
};
