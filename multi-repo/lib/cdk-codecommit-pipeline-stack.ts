import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codebuild from '@aws-cdk/aws-codebuild';

export class CdkCodecommitPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

const app = new cdk.App();
new CdkCodecommitPipelineStack(app, 'CdkCodecommitPipelineStack');
app.synth();
