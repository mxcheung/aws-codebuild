import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkReposStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a list of repository names
    const repoNames = [
      'api_gateway_repo', 
      'dynamodb_repo', 
      'lambda_repo',
      'chaos_monkey_repo'
    ];

    // Create a repository for each name in the list
    repoNames.forEach(repoName => {
      new codecommit.Repository(this, repoName, {
        repositoryName: repoName,
      });
    });
    
  }
}
