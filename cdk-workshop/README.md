# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


# step 1 - quickstart

```
git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/cdk-workshop
. ./install.sh

```

# step 2 - test
```
cloud_user:~/environment/aws-codebuild/cdk-workshop (main) $ curl  https://06zja4ccod.execute-api.us-east-1.amazonaws.com/prod/
Hello, CDK! You've hit /
```
https://cdkworkshop.com/20-typescript/70-advanced-topics/200-pipelines/2000-create-repo.html
