#!/bin/bash
echo "Building Lambda zip file from source..."
zip -jr lambda.zip ../src/*.js
echo "Updating Lambda on package..."
aws lambda update-function-code --profile claudia --function-name vanity-num-generator1 --region us-east-1 --zip-file fileb://./lambda.zip
rm -v ./lambda.zip