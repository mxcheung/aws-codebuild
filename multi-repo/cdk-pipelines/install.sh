#!/bin/bash
# Creates pipeline via cdk

echo "Welcome fortunes cdk workshop multi repo pipeline"
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines

cdk init app --language typescript

npm install @aws-cdk/aws-dynamodb @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/core aws-sdk @aws-cdk/aws-iam

npm install @aws-cdk/aws-codebuild @aws-cdk/aws-codecommit @aws-cdk/aws-codedeploy @aws-cdk/aws-codepipeline @aws-cdk/aws-codepipeline-actions @aws-cdk/pipelines

npm install @aws-cdk/aws-s3

npm install @aws-cdk/aws-kms


cdk bootstrap

cdk synth

cdk deploy


