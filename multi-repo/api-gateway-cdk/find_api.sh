#!/bin/bash

# List all API Gateways
api_ids=$(aws apigateway get-rest-apis --query 'items[*].id' --output text)

for api_id in $api_ids; do
    # Get tags for each API Gateway
    tags=$(aws apigateway get-tags --resource-arn arn:aws:apigateway:us-east-1::/restapis/$api_id)

    # Check if the tags contain "department: marketing"
    if echo $tags | grep -q '"Project": "MyProject"'; then
        echo "API Gateway ID with department marketing: $api_id"
    fi
done
