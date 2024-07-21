#!/bin/bash

# Function to retry failed actions in the deploy stage
retry_stage() {
    local pipeline_name="$1"
    local stage_name="$2"

    echo "Checking for failed actions in stage $stage_name..."

    # Get the last pipeline execution ID
    pipeline_execution_id=$(aws codepipeline list-pipeline-executions --pipeline-name "$pipeline_name" \
                            --query "pipelineExecutionSummaries[0].pipelineExecutionId" --output text)

    if [[ -z $pipeline_execution_id ]]; then
        echo "Failed to retrieve the last pipeline execution ID for pipeline $pipeline_name."
        exit 1
    fi

    echo "Last pipeline execution ID for $pipeline_name: $pipeline_execution_id"

    # List failed actions in the specified stage
    failed_actions=$(aws codepipeline list-action-executions --pipeline-name "$pipeline_name" \
                    --pipeline-execution-id "$pipeline_execution_id" \
                    --query "actionExecutionDetails[?stageName == '$stage_name' && status == 'Failed']")

    if [[ -z $failed_actions ]]; then
        echo "No failed actions found in stage $stage_name."
        return 0
    fi

    echo "Found failed actions in stage $stage_name:"

    # Retry the deploy stage with failed actions
    echo "Retrying stage $stage_name..."

    aws codepipeline retry-stage-execution --pipeline-name $pipeline_name  --pipeline-execution-id $pipeline_execution_id   --stage-name $stage_name   

    echo "Retry initiated for stage $stage_name."
}

# Check if required arguments are provided
if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <pipeline-name> <stage-name>"
    exit 1
fi

# Call the retry function with provided arguments
retry_stage "$1" "$2"
