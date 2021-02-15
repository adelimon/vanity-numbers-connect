#!/bin/bash
profile=$1

echo "deploying CloudFormation stack..."
aws cloudformation create-stack $1 --stack-name ajdvoicefoundry --template-body file:///Users/adelimon/github/vanity-numbers-connect/deployment/dynamo-lambda.yaml --capabilities CAPABILITY_IAM

echo "Waiting 2 minutes for stack completion before installing real Lambda code we just built..."
count=0
total=12
pstr="[=======================================================================]"
while [ $count -lt $total ]; do
  sleep 10
  count=$(( $count + 1 ))
  pd=$(( $count * 73 / $total ))
  printf "\r%3d.%1d%% %.${pd}s" $(( $count * 100 / $total )) $(( ($count * 1000 / $total) % 10 )) $pstr
done

echo "Updating Lambda function with real code..."
./apply-lambda.sh