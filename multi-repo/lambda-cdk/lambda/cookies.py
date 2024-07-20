from aws_xray_sdk.core import patch_all, xray_recorder
from aws_xray_sdk.core import lambda_launcher


# Patch all supported libraries (boto3, requests, etc.)
patch_all()

# Initialize X-Ray recorder
xray_recorder.configure(service='LambdaCookies')
def lambda_handler(event, context):
    # Start a segment for the entire Lambda execution
    xray_recorder.begin_segment('LambdaCookies')    
    print("In lambda handler")
    import boto3
    import botocore
    import random
    import json
    from boto3.dynamodb.conditions import Key, Attr
    from botocore.vendored import requests

    fortid = (random.randint(1,16))
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('fortunes')

    response = table.get_item(
        Key={
            'fort_id': fortid
        },
        ProjectionExpression='fortune'
        
    )
    
    json_string = json.dumps(response)
    resp_dict=json.loads(json_string)
    fort_string=json.dumps(resp_dict['Item'])
    fort_dict=json.loads(fort_string)

    resp = {
         "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(fort_dict['fortune'])
    }
    xray_recorder.end_segment()
    return resp
    
