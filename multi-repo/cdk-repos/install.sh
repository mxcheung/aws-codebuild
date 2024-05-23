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
cp  ../aws-codebuild/WorkshopRepo2/.gitignore .

cd /home/ec2-user/environment/WorkshopRepo

cdk init app --language typescript

npm install @aws-cdk/aws-dynamodb @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/core aws-sdk @aws-cdk/aws-iam

npm install @aws-cdk/aws-codebuild @aws-cdk/aws-codecommit @aws-cdk/aws-codedeploy @aws-cdk/aws-codepipeline @aws-cdk/aws-codepipeline-actions @aws-cdk/pipelines

npm install @aws-cdk/aws-s3


cdk bootstrap

cdk synth

cdk deploy

cd /home/ec2-user/environment/WorkshopRepo
git init && git add -A && git commit -m "init"
git remote add origin https://git-codecommit.us-east-1.amazonaws.com/v1/repos/WorkshopRepo
git push origin master
git checkout -b main
git push origin main

