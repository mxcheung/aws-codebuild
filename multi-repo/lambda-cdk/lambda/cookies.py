import logging
import boto3
import botocore
import random
import json

from aws_xray_sdk.core import patch_all, xray_recorder
from aws_xray_sdk.core import lambda_launcher
import time
from datetime import datetime

# Initialize X-Ray recorder
xray_recorder.configure(service='LambdaCookies')

cloudwatch = boto3.client('cloudwatch')
# Patch all supported libraries (boto3, requests, etc.)
patch_all()

logger = logging.getLogger()
logger.setLevel(logging.INFO)


@xray_recorder.capture('get_fortune_id')
def get_fortune_id():
    start_time = time.time()
    print("get_fortune_id")
    fortid = (random.randint(1,16))
    end_time = time.time()
    execution_time = end_time - start_time
    message_type = 'MT210' 
    country_code = 'AU'
    region = 'ap-southeast-2'
    status = 'NACK'
    publish_metric('NACK', fortid, message_type, country_code, region, status, unit='Count')
    publish_metric('NACK', fortid, message_type, country_code, region, status, unit='Count')
    return fortid
    
@xray_recorder.capture('get_fortune')
def get_fortune():
    start_time = time.time()
    dynamodb = boto3.resource("dynamodb")
    fortid = get_fortune_id()
    logger.info(f'fortid: {fortid}')
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
    end_time = time.time()
    execution_time = end_time - start_time
#    logger.info(f'get_fortune_execution_time: {execution_time}')
    message_type = 'MT210' 
    country_code = 'US'
    region = 'us-east-1'
    status = 'ACK'
    publish_metric('ACK', fortid, 'MT210' , country_code, region, status, unit='Count')
    publish_metric('ACK', fortid, 'MT103' , country_code, region, status, unit='Count')
    publish_metric('ACK', fortid, 'MT103' , country_code, region, status, unit='Count')
    publish_metric('ACK', fortid, 'MT100' , country_code, region, status, unit='Count')
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
    

def publish_metric(name, value, message_type, country_code, region, status, unit='Count'):
    response = cloudwatch.put_metric_data(
        Namespace='MessageProcessing',  # Replace with a meaningful namespace
        MetricData=[
            {
                'MetricName': name,
                'Dimensions': [
                    {
                        'Name': 'MessageType',
                        'Value': message_type
                    }                
                ],
                'Value': value,
                'Unit': unit
            },
        ]
    )
    logger.info(f'Metric published: {name} with value {value}')
