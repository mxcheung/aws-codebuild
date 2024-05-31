#!/bin/bash
# Creates pipeline via cdk

echo "Welcome fortunes cdk workshop multi repo pipeline"
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-repos

cdk init app --language typescript

npm install @aws-cdk/aws-dynamodb @aws-cdk/aws-lambda @aws-cdk/aws-apigateway @aws-cdk/core aws-sdk @aws-cdk/aws-iam

npm install @aws-cdk/aws-codebuild @aws-cdk/aws-codecommit @aws-cdk/aws-codedeploy @aws-cdk/aws-codepipeline @aws-cdk/aws-codepipeline-actions @aws-cdk/pipelines

npm install @aws-cdk/aws-s3


cdk bootstrap

cdk synth

cdk deploy

echo "git clone repos"

cd /home/ec2-user/environment/aws-codebuild/multi-repo/
git clone codecommit::us-east-1://repo1
git clone codecommit::us-east-1://repo2
git clone codecommit::us-east-1://repo3

echo "git commit code to repos"

cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/lambda  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/test  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/*  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cd /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
git add .
git commit -m "initial commit"
git push origin master


