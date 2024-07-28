# Multi repo Pipeline


Creating a basic CI/CD pipeline for a list of repositories in AWS CodeCommit using AWS CDK (Cloud Development Kit) in TypeScript

### Synopsis: 
- create repos via codecommit
- cdk pipeline to create code pipelines per repo


Building The Project
================

  
# create cloud 9 via cloudshell
```
aws cloud9 create-environment-ec2 \
    --name my-demo-env \
    --description "My demonstration development environment." \
    --instance-type t3.small --image-id amazonlinux-2023-x86_64
```
  
# step 1 - quickstart

```
git clone https://github.com/mxcheung/aws-chaos-monkey.git
git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-repos
. ./install.sh
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./install.sh
sleep 5m
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./retry_stage.sh api_gateway_repo-Pipeline  Deploy
cd /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
aws dynamodb batch-write-item --request-items file://items.json
```

# step 2 - retry stage and load data

```
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./retry_stage.sh api_gateway_repo-Pipeline  Deploy
cd /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
aws dynamodb batch-write-item --request-items file://items.json

```



# step 3 - view cookies page via github pages
View the fortune cookies app here
Static html calls 
   * api gateway
   * aws lambda
   * aws dynamodb
     

https://mxcheung.github.io/

Source code for Static html is here https://github.com/mxcheung/mxcheung.github.io

