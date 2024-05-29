# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

# step 1 - quickstart

```
git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-repos
. ./install.sh
```

# step 2 - clone repos

```
cd /home/ec2-user/environment/aws-codebuild/multi-repo/
git clone codecommit::us-east-1://repo1
git clone codecommit::us-east-1://repo2
git clone codecommit::us-east-1://repo3
```

# step 3 - copy code
```
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/bin  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/lambda  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/lib  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/test  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cp -Rf /home/ec2-user/environment/aws-codebuild/WorkshopRepo2/*  /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
cd /home/ec2-user/environment/aws-codebuild/multi-repo/repo1
git add .
git commit -m "initial commit"
git push origin master
```
