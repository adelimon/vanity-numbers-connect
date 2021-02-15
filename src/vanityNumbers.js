/**
 * Convert a number to a letter on a phone keypad with some slight modifications.
 *
 * @param {integer} number to covert to a letter.
 * @returns the number as a character.
 */
function convertToLetter(number) {
	// keypad to look up number/letter conversions.  Note that some keys have been modified,
	// in order to more easily provide mneumonics that sound like english words.
    let numberLookup = {
        0: ['0'],
        1: ['1'],
        2: ['A', 'B', 'C'],
        3: ['D', 'E', 'F'],
        4: ['G', 'H', 'I'],
        5: ['K', 'L'],
        6: ['M', 'N', 'O'],
        7: ['R', 'S'],
        8: ['T', 'U', 'V'],
        9: ['W', 'Y', 'Z'],
    };
    let numberArray = numberLookup[number];
    let randomLetter = numberArray[0];
    if (numberArray.length > 1) {
		// [Math.floor(Math.random() * favorites.length)
        randomLetter = numberArray[Math.floor(Math.random() * numberArray.length)];
    }
    return randomLetter;
}

/**
 * Generate an array of vanity numbers from a given phone number using mneumonics and
 * a phone keypad.
 *
 * @param {string} phoneNumberPart The part of a phone number to make into vanity words.
 * @param {*} desiredCount How many vanity numbers you'd like to generate.
 * @return an array of strings representing vanity numbers, with the duplicates filtered.
 */
function generateVanityParts(phoneNumberPart, desiredCount) {
	let vanityParts = {};
    for (let index = 0; index < desiredCount; index++) {

		// using an array here, so I can join it instead of string concatenation which
        // can get confusing in javascript with numbers and the + operator.  There is a way to
        // make it work; this is much cleaner,.
        let vanityNumberArray = [];
        for (let index = 0; index < phoneNumberPart.length; index++) {
            let oneNumber = phoneNumberPart[index];
            vanityNumberArray.push(convertToLetter(oneNumber));
        }
        let convertedNumber = (vanityNumberArray.join(''));
		vanityParts[convertedNumber] = convertedNumber;
    }
	// we could have duplicates, so filter those out.
	return Object.keys(vanityParts);
}

/**
 * Whether or not the vanity number contains letters that match english language sounds.
 *
 * @param {string} numberWordPart a vanity phone number part
 * @return boolean
 */
function isMneumonic(numberWordPart) {
	// check for vowels in key positions to see if this part "makes a sound" in
	// English so we can use it as a number part.
	let vowels = ['A', 'E', 'I', '1', 'L', 'O', '0', 'Y'];
	// check for vowels in the first or second letter of each word.
	let partIsMneumonic = (
		(vowels.includes(numberWordPart[0]) && !vowels.includes(numberWordPart[1])) ||
		(!vowels.includes(numberWordPart[0]) && vowels.includes(numberWordPart[1])) ||
		(vowels.includes(numberWordPart[3]) && !vowels.includes(numberWordPart[4])) ||
		(!vowels.includes(numberWordPart[3]) && vowels.includes(numberWordPart[4]))
	);
	// make sure there are no repeats...AA or EE or OO for example.
	partIsMneumonic = (partIsMneumonic &&
		(numberWordPart[0] != numberWordPart[1]) &&
		(numberWordPart[3] !== numberWordPart[4])
	);

	return partIsMneumonic;
}

/**
 * This will use the number's own exchange and line to generate the words for
 * a phone number.  IE 585-CAR-CARS.
 * @param {string} phoneNumber a phone number to generate vanity numbers from.
 * @param {integer} desiredCount how many numbers to generate.
 */
function getVanityNumbers(phoneNumber, desiredCount) {
	// cleanup any extraneous characters in the phone number
	phoneNumber = phoneNumber.replace('+1', '');
	// remove the area code, otherwise, the number could be confusing to
    // the users of it.  585-CAR-CARS makes sense.  JUL-CAR-CARS just requires
	// you to think about the area code and exchange first. :)
    let areaCode = phoneNumber.substring(0, 3);

	let exchangeAndLine = phoneNumber.substring(3, 10);

	// generate way more parts than we need so we can find ones that sound like
	// english language words of sorts.
	let vanityParts = generateVanityParts(exchangeAndLine, desiredCount*20);

	let mneumonicVanityParts = [];

	// check the vanity parts to find one that sounds like a word, and grab those if we can
	for (let vanity of vanityParts) {
		if (isMneumonic(vanity)) {
			mneumonicVanityParts.push(vanity);
		}
	}

	let vanityNumbers = [];
	if (mneumonicVanityParts.length >= desiredCount) {
		vanityNumbers = mneumonicVanityParts.slice(0, desiredCount);
	} else {
		vanityNumbers = vanityParts.slice(0, desiredCount);
	}
	let fullVanityNumbers = [];
	for (let vanityNumber of vanityNumbers) {
		let fullNumber = areaCode + ' ' + vanityNumber.substring(0, 3) + ' ' + vanityNumber.substring(3, 7);
		fullVanityNumbers.push(fullNumber);
	}
	return fullVanityNumbers;
}

module.exports = {
	getVanityNumbers: getVanityNumbers,
}