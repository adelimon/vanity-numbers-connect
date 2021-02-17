# vanity-numbers-connect

## About
This package generates vanity numbers from an incoming phone number, via a Lambda event.  It is modularized so that the Lambda executes the bare minimum code.  Logic is left to the files in the module.

## Algorithm
The algorithm which generates the numbers from a given phone number using mneumonics and a phone keypad.  Area code is preserved, but the rest of the phone number is used to generate a vanity number.

Note that some numbers on a keypad don't generate very well but the algoritm does the best it can with those.  For example, excluding certain letters on the keypad, and subtituting "0" as a "O" in the words generated.  This works well for reading them, and OK for when they are spoken by the Contact Flow.

Since the area code is preserved (for ease of remembering the number), the algorithm attempts to put a vowel, or a vowel like character such as 0 or 1, in the second and fifth positions of the "words".  The code then chooses the five entries from the list of mneumonics, or, if none are present, chooses the numbers with just letters in them instead. Some phone numbers simply don't work well for generating a mneumonic.  This includes ones with a lot of repeating characters, or ones that don't correspond to vowels, such as repeated 7s or 5s.

The 5 that are chosen are among the "best" choices as they are mneumonic.

## Pre-requisites
The deployment makes the following assumptions:
* You have NodeJS 10 or greater instaled. I developed using 12.6.0 but this was just what I had installed to begin with.

## Running Javascript package locally
This package can be run locally, via `npm start`.  You will need a couple of env vars to do that:
```
LOCAL_MODE=true
AWS_REGION=us-east-1
AWS_PROFILE=my-aws-account
```
The AWS_PROFILE should be a profile that can read and write data from DynamoDB in your account.  For more info on setting up profiles, please see:
(https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)

I chose to use a profile because I currently have 5 AWS accounts on the computer I was using (4 for work and one personal).  It's the only way to know which one is which.

Running it this way will use the `localtest.js` file in the `src/` directory, which uses a simulated Lambda event to call the Lambda code.  You can also debug with VS Code or your choice of IDE by providing the appropriate environment variables.  I used VSCode as it is the tool I use daily to write Javascript (and anything else I need to use regularly, even Java).

## Unit testing
This package is unit tested via the standard tools (`mocha`, with `sinon` for mocking).  It provides coverage with `nyc`.

Run `npm test` to execute tests and code coverage.  Code coverage and tests are on core files (`database` and `vanityNumbers`).  Coverage is near 100%, only missing one condition (error thrown from the database class.)

## Deployment
The package is deployed as part of a Lambda using the YAML file and shell scripts in the `deployment` folder.