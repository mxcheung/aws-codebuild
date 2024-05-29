# Multi repo Pipeline


Creating a basic CI/CD pipeline for a list of repositories in AWS CodeCommit using AWS CDK (Cloud Development Kit) in TypeScript

# step 1 - quickstart

```
git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./install.sh

```

# Outstanding issues

```
User: arn:aws:sts::412820548471:assumed-role/CdkPipelinesStack-repo1DeployProjectRole7EE8A22F-KVFhV4XUvKg6/AWSCodeBuild-fada12b0-3a69-4e0c-b176-caadffcaf707 is not authorized to perform: cloudformation:DescribeStacks on resource: arn:aws:cloudformation:us-east-1:412820548471:stack/CDKToolkit/02d04c30-1dbb-11ef-9ca1-12bc77a96d15 because no identity-based policy allows the cloudformation:DescribeStacks action
```
