#!/bin/bash

# Variables
REPLACE_REGION="{REPLACE_REGION}"
REPLACE_ACCOUNT_ID="{REPLACE_ACCOUNT_ID}"
CDK_PIPELINE_FILE="bin/cdk-pipelines.ts"

CURRENT_REGION=$(aws configure get region)
CURRENT_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

sed -i "s/${REPLACE_REGION}/${CURRENT_REGION}/g" "$CDK_PIPELINE_FILE"
sed -i "s/${REPLACE_ACCOUNT_ID}/${CURRENT_ACCOUNT_ID}/g" "$CDK_PIPELINE_FILE"

echo "Replaced ${REPLACE_REGION} with ${CURRENT_REGION} in ${CDK_PIPELINE_FILE}"
echo "Replaced ${REPLACE_ACCOUNT_ID} with ${CURRENT_ACCOUNT_ID} in ${CDK_PIPELINE_FILE}"
