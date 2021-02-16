# Running Javascript package locally
This package can be run locally, via `npm start`.  You will need a couple of env vars to do that:
```
LOCAL_MODE=true
AWS_REGION=us-east-1
AWS_PROFILE=my-aws-account
```
The AWS_PROFILE should be a profile that can read and write data from DynamoDB in your account.  For more info on setting up profiles, please see:
(https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)

I chose to use a profile because I currently have 5 AWS accounts on the computer I was using (4 for work and one personal).  It's the only way to know which one is which.

Running it this way will use the `localtest.js` file in the `src/` directory, which uses a simulated Lambda event to call the Lambda code.  You can also
debug with VS Code or your choice of IDE by providing the appropriate environment variables.