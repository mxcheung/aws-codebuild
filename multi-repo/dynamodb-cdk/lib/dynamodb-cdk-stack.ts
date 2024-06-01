import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamodbCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'DynamodbCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });


    // Create multiple DynamoDB tables using the helper function
    this.createDynamoDBTable('CookiesTable1');
    this.createDynamoDBTable('CookiesTable2');
    this.createDynamoDBTable('CookiesTable3');
  }

  private createDynamoDBTable(tableName: string) {
    new dynamodb.Table(this, tableName, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'cookieType', type: dynamodb.AttributeType.STRING },
      tableName: tableName
    });

  }
}
