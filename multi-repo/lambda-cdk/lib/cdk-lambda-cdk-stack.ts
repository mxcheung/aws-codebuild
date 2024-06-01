import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';
import { RemovalPolicy, Stack, StackProps, Duration } from 'aws-cdk-lib';

export class CdkLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Reference to the existing DynamoDB table
    const table = dynamodb.Table.fromTableName(this, 'FortunesTable', 'fortunes');

    // Create lambda function
    const lambdaFunction = new lambda.Function(this, 'YourLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'cookies.lambda_handler', // Assuming the Python file is named "main.py" and the function is named "lambda_handler"
      code: lambda.Code.fromAsset(path.join(__dirname, '/../lambda')),
      functionName: 'fortunes',
      timeout: Duration.minutes(3),
      environment: {
        DYNAMODB_TABLE: 'fortunes'
      }
    });
    
    
    // Grant the Lambda function read/write permissions to the DynamoDB table
    table.grantReadWriteData(lambdaFunction);
    
    
  }
}
