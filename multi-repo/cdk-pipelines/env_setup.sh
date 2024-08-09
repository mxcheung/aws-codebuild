#!/bin/bash

# Variables
TAG_KEY="Project"
TAG_VALUE="Cookies"
CURRENT_REGION="{CURRENT_REGION}"
CURRENT_ACCOUNT_ID="{CURRENT_ACCOUNT_ID}"
CDK_PIPELINE_FILE="bin/cdk-pipelines.ts"

CURRENT_REGION=$(aws configure get region)
CURRENT_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

sed -i "s/${CURRENT_REGION}/${CURRENT_REGION}/g" "$CDK_PIPELINE_FILE"
sed -i "s/${CURRENT_ACCOUNT_ID}/${CURRENT_ACCOUNT_ID}/g" "$CDK_PIPELINE_FILE"
