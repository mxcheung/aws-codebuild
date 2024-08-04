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
. ./replace-api-id.sh  
. ./make-bucket-public.sh
