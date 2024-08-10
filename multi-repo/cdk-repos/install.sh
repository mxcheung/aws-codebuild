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
git clone codecommit::us-east-1://api_gateway_repo
git clone codecommit::us-east-1://dynamodb_repo
git clone codecommit::us-east-1://lambda_repo
git clone codecommit::us-east-1://s3_repo
git clone codecommit::us-east-1://cloud_watch_repo
git clone codecommit::us-east-1://chaos_monkey_repo

echo "git commit dynamodb-cdk to dynamodb_repo"
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb-cdk/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb-cdk/lambda  /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb-cdk/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb-cdk/test  /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb-cdk/*  /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
cd /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
git add .
git commit -m "initial commit"
git push origin master

echo "git commit lambda-cdk to lambda_repo"
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/lambda-cdk/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/lambda_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/lambda-cdk/lambda  /home/ec2-user/environment/aws-codebuild/multi-repo/lambda_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/lambda-cdk/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/lambda_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/lambda-cdk/test  /home/ec2-user/environment/aws-codebuild/multi-repo/lambda_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/lambda-cdk/*  /home/ec2-user/environment/aws-codebuild/multi-repo/lambda_repo
cd /home/ec2-user/environment/aws-codebuild/multi-repo/lambda_repo
git add .
git commit -m "initial commit"
git push origin master

echo "git commit api-gateway-cdk to api_gateway_repo"
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/api-gateway-cdk/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/api_gateway_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/api-gateway-cdk/lambda  /home/ec2-user/environment/aws-codebuild/multi-repo/api_gateway_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/api-gateway-cdk/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/api_gateway_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/api-gateway-cdk/test  /home/ec2-user/environment/aws-codebuild/multi-repo/api_gateway_repo
cp -Rf /home/ec2-user/environment/aws-codebuild/multi-repo/api-gateway-cdk/*  /home/ec2-user/environment/aws-codebuild/multi-repo/api_gateway_repo
cd /home/ec2-user/environment/aws-codebuild/multi-repo/api_gateway_repo
git add .
git commit -m "initial commit"
git push origin master

echo "git commit aws-s3 to s3_repo"
cp -Rf /home/ec2-user/environment/aws-s3/s3-cdk/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
cp -Rf /home/ec2-user/environment/aws-s3/s3-cdk/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
cp -Rf /home/ec2-user/environment/aws-s3/s3-cdk/data-folder  /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
cp -Rf /home/ec2-user/environment/aws-s3/s3-cdk/*  /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
cp /home/ec2-user/environment/mxcheung.github.io/cookie.jpg /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo/data-folder
cd /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
git add .
git commit -m "initial commit"
git push origin master

echo "git commit aws-chaos-monkey to chaos_monkey_repo"
cp -Rf /home/ec2-user/environment/aws-chaos-monkey/dynamodb/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/chaos_monkey_repo
cp -Rf /home/ec2-user/environment/aws-chaos-monkey/dynamodb/lambda  /home/ec2-user/environment/aws-codebuild/multi-repo/chaos_monkey_repo
cp -Rf /home/ec2-user/environment/aws-chaos-monkey/dynamodb/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/chaos_monkey_repo
cp -Rf /home/ec2-user/environment/aws-chaos-monkey/dynamodb/test  /home/ec2-user/environment/aws-codebuild/multi-repo/chaos_monkey_repo
cp -Rf /home/ec2-user/environment/aws-chaos-monkey/dynamodb/*  /home/ec2-user/environment/aws-codebuild/multi-repo/chaos_monkey_repo
cd /home/ec2-user/environment/aws-codebuild/multi-repo/chaos_monkey_repo
git add .
git commit -m "initial commit"
git push origin master
