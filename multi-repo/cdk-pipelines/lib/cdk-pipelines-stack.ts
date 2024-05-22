import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codebuild from '@aws-cdk/aws-codebuild';

export class CdkPipelinesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPipelinesQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const repositories = [
      'repo1',
      'repo2',
      'repo3' // Add your repository names here
    ];

    repositories.forEach(repoName => {
      const repository = codecommit.Repository.fromRepositoryName(this, `${repoName}-repo`, repoName);

      const sourceOutput = new codepipeline.Artifact();
      
      const pipeline = new codepipeline.Pipeline(this, `${repoName}-pipeline`, {
        pipelineName: `${repoName}-pipeline`,
        stages: [
          {
            stageName: 'Source',
            actions: [
              new codepipeline_actions.CodeCommitSourceAction({
                actionName: 'CodeCommit',
                repository: repository,
                output: sourceOutput,
                branch: 'main', // Specify the branch
              }),
            ],
          },
          {
            stageName: 'Build',
            actions: [
              new codepipeline_actions.CodeBuildAction({
                actionName: 'Build',
                project: new codebuild.PipelineProject(this, `${repoName}-build`, {
                  projectName: `${repoName}-build`,
                  environment: {
                    buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
                  },
                }),
                input: sourceOutput,
                outputs: [new codepipeline.Artifact()],
              }),
            ],
          },
        ],
      });
    });

  }
}
