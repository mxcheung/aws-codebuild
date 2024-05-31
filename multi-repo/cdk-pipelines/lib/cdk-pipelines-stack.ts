import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from '@aws-cdk/aws-kms';

export class CdkPipelinesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const buildArtifact = new codepipeline.Artifact();
    const deployArtifact = new codepipeline.Artifact();
    
    // Create a KMS key
//    const key = new kms.Key(this, 'MyKey', {
//      enableKeyRotation: true,
//    });


    // Create S3 bucket for storing build artifacts
    // Create an S3 bucket with KMS encryption
    const bucket = new s3.Bucket(this, 'PipelineBucket', {
      versioned: true
    });
    
    // Define a function to create a pipeline for a given repository
    const createPipeline = (repoName: string, repoBranch: string) => {
      const repository = codecommit.Repository.fromRepositoryName(this, `${repoName}-Repo`, repoName);

      const pipeline = new codepipeline.Pipeline(this, `${repoName}-Pipeline`, {
        pipelineName: `${repoName}-Pipeline`,
        artifactBucket: bucket
      });

      const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
        actionName: 'CodeCommit_Source',
        repository: repository,
        branch: repoBranch,
        output: sourceArtifact,
      });

      const buildProject = new codebuild.PipelineProject(this, `${repoName}-BuildProject`, {
        buildSpec: codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              commands: ['npm install'],
            },
            build: {
              commands: [
                         'aws sts get-caller-identity', 
                         'npm run build', 
                         'npx cdk synth'
                        ],
            },
          },
        }),
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        },
      });

      const buildAction = new codepipeline_actions.CodeBuildAction({
        actionName: 'Build',
        project: buildProject,
        input: sourceArtifact,
        outputs: [buildArtifact],
      });
      
      // Define the deploy project
      const deployProject = new codebuild.PipelineProject(this, `${repoName}-DeployProject`, {
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        },
        buildSpec: codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            pre_build: {
              commands: [
                'npm install -g aws-cdk',
                'npm install',
              ],
            },
            build: {
              commands: [
                'npm run build',
                'npx cdk bootstrap',
                'npx cdk synth',
                'npx cdk deploy --require-approval never',
              ],
              
             
            },
          },
        }),
      });
      
      

      // Import an existing IAM Role by its ARN
  //    const cdkCodePipelineActionCodeBuildRole = iam.Role.fromRoleArn(this, 'cdkCodePipelineActionCodeBuildRole', 'arn:aws:iam::147483643341:role/YourExistingRoleName');

      // Define an IAM Role
      const myRole = new iam.Role(this,  `${repoName}-PipelineRole`, {
        assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'), // Change as per your requirement
        description: 'An example IAM role in AWS CDK',
      });
  
      // Attach a policy to the role
      myRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'));


      // Define the deploy action
      const deployAction = new codepipeline_actions.CodeBuildAction({
        actionName: 'CDKDeploy',
        project: deployProject,
        input: sourceArtifact,
        outputs: [deployArtifact]
      });
      

      

      pipeline.addStage({
        stageName: 'Source',
        actions: [sourceAction],
      });

      pipeline.addStage({
        stageName: 'Build',
        actions: [buildAction],
      });

      pipeline.addStage({
        stageName: 'Deploy',
        actions: [deployAction],
      });
      
      return pipeline;
    };

    // Create pipelines for repo1, repo2, and repo3
    createPipeline('repo1', 'master');
    createPipeline('repo2', 'master');
    createPipeline('repo3', 'master');    
    
  }
}
