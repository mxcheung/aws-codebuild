mkdir cdk-codecommit-pipeline
cd cdk-codecommit-pipeline
cdk init app --language typescript

npm install @aws-cdk/aws-codepipeline @aws-cdk/aws-codepipeline-actions @aws-cdk/aws-codecommit @aws-cdk/aws-codebuild
