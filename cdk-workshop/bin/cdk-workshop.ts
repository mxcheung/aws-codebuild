#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';
import { WorkshopPipelineStack } from '../lib/pipeline-stack';

//const app = new cdk.App();
//new CdkWorkshopStack(app, 'CdkWorkshopStack');

const app = new cdk.App();
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
