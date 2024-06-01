import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class ApiGatewayCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ApiGatewayCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    

    // Reference to the existing Lambda function by name
    const existingFortuneLambda = lambda.Function.fromFunctionName(
      this,
      'ExistingFortuneFunction',
      'fortunes'
    );

    // Create the API Gateway REST API
    const api = new apigateway.RestApi(this, 'FortuneApi', {
      restApiName: 'Fortune Service',
      description: 'This service serves fortunes.',
    });

    // Integrate the Lambda function with the API Gateway
    const getFortuneIntegration = new apigateway.LambdaIntegration(existingFortuneLambda, {
      requestTemplates: { 'application/json': '{"statusCode": 200}' },
    });

    // Create the /fortunes endpoint
    api.root.addResource('fortunes').addMethod('GET', getFortuneIntegration);
    
    
    
  }
}
