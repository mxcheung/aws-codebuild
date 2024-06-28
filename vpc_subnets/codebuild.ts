import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as s3 from '@aws-cdk/aws-s3';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import an existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVpc', {
      vpcId: 'vpc-1234567890abcdef0', // Replace with your VPC ID
    });

    // Import existing subnets
    const privateSubnet1 = ec2.Subnet.fromSubnetAttributes(this, 'PrivateSubnet1', {
      subnetId: 'subnet-1234567890abcdef0', // Replace with your private subnet ID
      availabilityZone: 'us-west-2a', // Replace with the appropriate AZ
    });

    const privateSubnet2 = ec2.Subnet.fromSubnetAttributes(this, 'PrivateSubnet2', {
      subnetId: 'subnet-0987654321fedcba', // Replace with your private subnet ID
      availabilityZone: 'us-west-2b', // Replace with the appropriate AZ
    });

    // Create a security group
    const securityGroup = new ec2.SecurityGroup(this, 'MySecurityGroup', {
      vpc,
      description: 'Allow all outbound traffic',
      allowAllOutbound: true,
    });

    // Allow inbound access for CodeBuild
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS traffic');

    // Create a CodeBuild project
    const codeBuildProject = new codebuild.PipelineProject(this, 'MyCodeBuildProject', {
      vpc,
      securityGroups: [securityGroup],
      subnetSelection: { subnets: [privateSubnet1, privateSubnet2] },
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        privileged: true,
      },
    });

    // Define the source artifact
    const sourceOutput = new codepipeline.Artifact();

    // Create a CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.S3SourceAction({
              actionName: 'S3Source',
              bucket: s3.Bucket.fromBucketName(this, 'SourceBucket', 'my-source-bucket'),
              bucketKey: 'source.zip',
              output: sourceOutput,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CodeBuild',
              project: codeBuildProject,
              input: sourceOutput,
            }),
          ],
        },
      ],
    });
  }
}

const app = new cdk.App();
new MyPipelineStack(app, 'MyPipelineStack');
app.synth();
