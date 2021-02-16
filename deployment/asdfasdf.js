          var aws = require('aws-sdk')
          var response = require('cfn-response')
          exports.handler = function(event, context) {
              console.log("REQUEST RECEIVED:\n" + JSON.stringify(event))
              let responseData = {};
              let lambdaArn =  event.ResourceProperties.VanityNumbersArn;
              responseData.lambdaArn = lambdaArn;
              responseData.contactFlowJson = {"modules":[{"id":"4d36a741-bc87-4035-b3fa-9c8390e687ac","type":"PlayPrompt","branches":[{"condition":"Success","transition":"7eefafd6-402f-4759-967c-b017ef5f3969"}],"parameters":[{"name":"Text","value":"Thanks for calling the AJD VoiceFoundry vanity number generation hotline!  \n\nNow we will use AWS Lambda to generate a few vanity numbers based on your incoming phone number.  These will preserve your area code, and use the rest of your phone number to generate mneumonics based on your number.  So you too can have a fun number for your friends!\n\nNow calling AWS Lambda to generate your numbers.","namespace":null},{"name":"TextToSpeechType","value":"text"}]},{"id":"7329da0c-3dcb-4661-a72e-95b6e841a4a4","type":"PlayPrompt","branches":[{"condition":"Success","transition":"96f62f74-1905-40cd-acca-714c0782717a"}],"parameters":[{"name":"Text","value":"$.External.responseMessage","namespace":null},{"name":"TextToSpeechType","value":"text"}]},{"id":"96f62f74-1905-40cd-acca-714c0782717a","type":"Disconnect","branches":[],"parameters":[]},{"id":"7eefafd6-402f-4759-967c-b017ef5f3969","type":"InvokeExternalResource","branches":[{"condition":"Success","transition":"7329da0c-3dcb-4661-a72e-95b6e841a4a4"},{"condition":"Error","transition":"431f29e2-cca7-44e4-a449-90a38c2d327b"}],"parameters":[{"name":"FunctionArn","value":"arn:aws:lambda:us-east-1:425610073499:function:vanity-num-generator","namespace":null},{"name":"TimeLimit","value":"8"}],"target":"Lambda"},{"id":"431f29e2-cca7-44e4-a449-90a38c2d327b","type":"PlayPrompt","branches":[{"condition":"Success","transition":"96f62f74-1905-40cd-acca-714c0782717a"}],"parameters":[{"name":"Text","value":"Sorry, we failed to find the state for your phone number's area code.","namespace":null},{"name":"TextToSpeechType","value":"text"}]}],"version":"1","type":"contactFlow","start":"4d36a741-bc87-4035-b3fa-9c8390e687ac"}
              const docClient = new aws.DynamoDB.DocumentClient();
              let saveObject = {
                'Version': 'Latest',
                'ContactFlowJson': JSON.stringify(responseData.contactFlowJson),
              }
              let params = {
                TableName: 'ContactFlow',
                Item: saveObject,
              }
              docClient.put(params, function(err, data) {
                if (err) {
                  console.log("Error", err);
                } else {
                  console.log("Success", data);
                }
              });
              response.send(event, context, 'SUCCESS', responseData);
          }
