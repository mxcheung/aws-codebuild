import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Tags } from '@aws-cdk/core';

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

    // Enable CORS on the /fortunes resource
    const fortunesResource = api.root.addResource('fortunes');

    // Add GET method without authorization
    // Add GET method with CORS enabled
    fortunesResource.addMethod('GET', getFortuneIntegration, {
      authorizationType: apigateway.AuthorizationType.NONE,
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
          },
        },
      ],
    });
  

    // Add an OPTIONS method to handle CORS preflight requests
    fortunesResource.addMethod('OPTIONS', new apigateway.MockIntegration({
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': "'*'",
            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET'",
          },
        },
      ],
      passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
      requestTemplates: {
        'application/json': '{"statusCode": 200}'
      },
    }), {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': true,
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
          },
        },
      ],
    });
    
    // Add tags to the API Gateway
    cdk.Tags.of(api).add('Environment', 'Production');
    cdk.Tags.of(api).add('Project', 'MyProject');
  }
}
