cd /home/ec2-user/environment/
git clone https://github.com/mxcheung/mxcheung.github.io.git
git clone https://github.com/mxcheung/aws-s3.git
git clone https://github.com/mxcheung/aws-chaos-monkey.git
# git clone https://github.com/mxcheung/aws-codebuild.git
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-repos
. ./install.sh
cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./install.sh

# Number of minutes to loop
DURATION=5
# Loop for the specified duration
for (( i=1; i<=DURATION; i++ ))
do
  echo "Minute $i: Wait for api Status message"
  sleep 60
done

cd /home/ec2-user/environment/aws-codebuild/multi-repo/cdk-pipelines
. ./retry_stage.sh api_gateway_repo-Pipeline  Deploy
cd /home/ec2-user/environment/aws-codebuild/multi-repo/dynamodb_repo
aws dynamodb batch-write-item --request-items file://items.json

# Number of minutes to loop
DURATION=3
# Loop for the specified duration
for (( i=1; i<=DURATION; i++ ))
do
  echo "Minute $i: Status message"
  sleep 60
done

cd /home/ec2-user/environment/aws-codebuild/multi-repo/s3_repo
. ./replace-api-id.sh  
. ./make-bucket-public.sh
