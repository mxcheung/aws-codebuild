# Multi repo Pipeline


Creating a basic CI/CD pipeline for a list of repositories in AWS CodeCommit using AWS CDK (Cloud Development Kit) in TypeScript

### Synopsis: 
- create repos via codecommit
- cdk pipeline to create code pipelines per repo


Building The Project
================
  
# step 1 - quickstart

```
git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-repos
. ./install.sh
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./install.sh

```

# step 2 - retry stage and load data

```
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./retry_stage.sh repo3-Pipeline  Deploy
cd /home/ec2-user/environment/aws-codebuild/multi-repo/repo2
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

