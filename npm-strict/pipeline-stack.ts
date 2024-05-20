import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = s3.Bucket.fromBucketName(this, 'MyBucket', 'your-bucket-name');

    const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            'runtime-versions': {
              nodejs: '14',
            },
            commands: [
              'echo "Installing dependencies"',
              'echo "Downloading certificate from S3"',
              'aws s3 cp s3://your-bucket-name/your-certificate.pem /tmp/your-certificate.pem',
              'echo "Configuring npm to use the certificate"',
              'npm config set cafile /tmp/your-certificate.pem',
            ],
          },
          pre_build: {
            commands: ['echo "Pre-build phase"'],
          },
          build: {
            commands: ['echo "Build phase"', 'npm install'],
          },
          post_build: {
            commands: ['echo "Post-build phase"'],
          },
        },
        artifacts: {
          files: ['**/*'],
        },
      }),
    });

    buildProject.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.bucketArn + '/*'],
    }));

    const sourceOutput = new codepipeline.Artifact();

    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.CodeCommitSourceAction({
              actionName: 'CodeCommit_Source',
              repository: codecommit.Repository.fromRepositoryName(this, 'Repository', 'repository-name'),
              branch: 'master',
              output: sourceOutput,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CodeBuild',
              project: buildProject,
              input: sourceOutput,
              outputs: [new codepipeline.Artifact()],
            }),
          ],
        },
      ],
    });
  }
}

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack');
