# Running Javascript package locally
This package can be run locally.  You will need a couple of env vars to do that:
```
LOCAL_MODE=true
AWS_REGION=us-east-1
AWS_PROFILE=my-aws-account
```
The AWS_PROFILE should be a profile that can read and write data from DynamoDB in your account.  For more info on setting up profiles, please see:
(https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)