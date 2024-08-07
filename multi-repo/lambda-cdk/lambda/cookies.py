import logging
import boto3
import botocore
import random
import json

from aws_xray_sdk.core import patch_all, xray_recorder
from aws_xray_sdk.core import lambda_launcher


# Initialize X-Ray recorder
xray_recorder.configure(service='LambdaCookies')

# Patch all supported libraries (boto3, requests, etc.)
patch_all()

logger = logging.getLogger()
logger.setLevel(logging.INFO)


@xray_recorder.capture('get_fortune_id')
def get_fortune_id():
     print("get_fortune_id")
     fortid = (random.randint(1,16))
     return fortid

@xray_recorder.capture('get_fortune')
def get_fortune():
    dynamodb = boto3.resource("dynamodb")
    fortid = get_fortune_id()
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
    return fort_string


@xray_recorder.capture("cookieshandler")
def lambda_handler(event, context):
    print("In lambda handler")
    from boto3.dynamodb.conditions import Key, Attr
    from botocore.vendored import requests
    logger.info('got event{}'.format(event))
#    fortid = get_fortune_id()
#    dynamodb = boto3.resource("dynamodb")
    fort_string = get_fortune()
    fort_dict=json.loads(fort_string)

    resp = {
         "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(fort_dict['fortune'])
    }
    return resp
    
