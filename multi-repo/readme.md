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
git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/multi-repo
. ./setup.sh
cd /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
. ./make-bucket-public.sh
. ./cloud-front.sh

```  
# step 1A - quickstart

```
git clone https://github.com/mxcheung/mxcheung.github.io.git
git clone https://github.com/mxcheung/aws-s3.git
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
cd /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
sleep 3m
. ./replace-api-id.sh  
. ./make-bucket-public.sh

```

# step 2 - retry stage and load data

```
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./retry_stage.sh api_gateway_repo-Pipeline  Deploy
cd /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
aws dynamodb batch-write-item --request-items file://items.json

```

# step 3 - replace api gateway id and make s3 bucket public

```
cd /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
. ./replace-api-id.sh  
. ./make-bucket-public.sh 
```

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::s3cdkstack-mys3bucket4646df6f-yyjkfr3jrftk/*"
    }
  ]
}

```

```
aws s3api put-bucket-policy --bucket s3cdkstack-mys3bucket4646df6f-yyjkfr3jrftk --policy file://bucket-policy.json


aws s3api put-public-access-block --bucket s3cdkstack-mys3bucket4646df6f-yyjkfr3jrftk --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

aws s3 cp /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo/data-folder/index.html s3://s3cdkstack-mys3bucket4646df6f-yyjkfr3jrftk/

```

# step 4 - view cookies page via github pages
View the fortune cookies app here
Static html calls 
   * api gateway
   * aws lambda
   * aws dynamodb
     

https://mxcheung.github.io/

Source code for Static html is here https://github.com/mxcheung/mxcheung.github.io

