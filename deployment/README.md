# vanity-numbers-connect Deployment
# Deploying
In order to deploy to your AWS account, run the `apply.sh` script while in the `deployment` directory.

This will run the CloudFormation scripts and create a new stack in your account called `voicefoundry-ajd`.

You can run this using standard AWS access methods (access key and secret), or a profile.  To run the with a profile provide the `--profile` switch, as in the command below `./apply.sh --profile myprofile`.

The `apply.sh` script executes the following steps:
* Create the `voicefoundry-ajd` stack, with the following resources: two DynamoDB tables, one Lambda, one custom resource Lambda, and one IAM role that is used by both Lambdas.  Note that the Lambda created by the CloudFormation YAML is a placeholder.
* Executes the `apply-lambda.sh` script.  This takes a build of the Lambda code in the Javascript directory, zips it, and uploads it as the Lambda definition.  I chose this because it offers a few advantages.
  * The Lambda code can be deployed independently.  In a CI/CD environment, you will very likely want to do this.
  * The project is self contained.  Somehow, at some point, the code needs to get created as a zip file, and put *somewhere*.  This keeps the bootstrapping activity right in the project itself.
* Executes the `getcontactflow.sh` script. This gets the contact flow with the proper Lambda ARN inserted so that you can install it into the Connect instance without modification.   This is in a file called `generatedContactFlow.json`.

To update the stack, if you made changes, you can run the `update.sh` script to do that.  That will execute an `cloudformation update` on the `voicefoundry-ajd` stack.

# Completing the install
To complete the project install, follow these steps. Unfortunately there wasn't a good way to do this automatically.
* Go to the AWS Connect page at (https://console.aws.amazon.com/connect/home?region=us-east-1), and choose your instance.
* Then, choose Contact Flows.
* Under the AWS Lambda heading, choose the `vanity-num-generator` function, and click `+ Add Lambda Function`.  This will allow the function to be used from your Connect instance.
* Now, log into your Connect instance.
* Go to the `/connect/contact-flows` sub page, and choose Create Contact Flow. From the Save dropdown, click the arrow and choose `Import flow`.
* Now, go to the `/connect/numbers` subpage.  Choose a phone number by clicking on it.
* Choose the contact flow you just imported, and hit Save.
* You can now dial to this number, and it will work with the Lambda!