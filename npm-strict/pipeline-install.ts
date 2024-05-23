import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for artifacts
    const artifactBucket = new s3.Bucket(this, 'ArtifactBucket');

    // CodeBuild project
    const codeBuildProject = new codebuild.PipelineProject(this, 'CodeBuildProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'echo Setting NPM strict settings...',
              'npm config set strict-ssl true',
              'echo Installing NPM dependencies...',
              'npm install'
            ]
          },
          pre_build: {
            commands: [
              'echo Preparing for build...'
            ]
          },
          build: {
            commands: [
              'echo Building the project...',
              'npm run build'
            ]
          },
          post_build: {
            commands: [
              'echo Build completed.',
              'npm test'
            ]
          }
        },
        artifacts: {
          files: [
            '**/*'
          ],
          'base-directory': 'build'
        }
      })
    });

    // CodePipeline source artifact
    const sourceOutput = new codepipeline.Artifact();

    // CodePipeline build artifact
    const buildOutput = new codepipeline.Artifact();

    // CodePipeline
    new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      artifactBucket: artifactBucket,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.GitHubSourceAction({
              actionName: 'GitHub_Source',
              owner: '<your-github-username>',
              repo: '<your-github-repo>',
              oauthToken: cdk.SecretValue.secretsManager('github-token'),
              output: sourceOutput,
              branch: 'main'
            })
          ]
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CodeBuild',
              project: codeBuildProject,
              input: sourceOutput,
              outputs: [buildOutput]
            })
          ]
        }
      ]
    });
  }
}
