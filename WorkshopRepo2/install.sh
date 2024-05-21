#!/bin/bash
# Creates pipeline via cdk

echo "Welcome fortunes cdk workshop pipeline"
mkdir /home/ec2-user/environment/WorkshopRepo
cd /home/ec2-user/environment/WorkshopRepo
cp -R ../aws-codebuild/WorkshopRepo2/bin/ .
cp -R ../aws-codebuild/WorkshopRepo2/lambda/ .
cp -R ../aws-codebuild/WorkshopRepo2/lib/ .
cp -R ../aws-codebuild/WorkshopRepo2/test/ .
cp  ../aws-codebuild/WorkshopRepo2/* .

cd /home/ec2-user/environment/WorkshopRepo

cdk init app --language typescript

npm install @aws-cdk/aws-dynamodb @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/core aws-sdk @aws-cdk/aws-iam

npm install @aws-cdk/aws-codebuild @aws-cdk/aws-codecommit @aws-cdk/aws-codedeploy @aws-cdk/aws-codepipeline @aws-cdk/aws-codepipeline-actions @aws-cdk/pipelines

npm install @aws-cdk/aws-s3


cdk bootstrap

cdk synth

cdk deploy

