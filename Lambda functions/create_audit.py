import json
import boto3
from botocore.exceptions import ClientError
from collections import OrderedDict

def lambda_handler(event, context):
    #The input values are all the values that we have to write in the same order
    #No need to save the 95 and 99 risk values lists
    s = str(event.get('s'))
    r = str(event.get('r'))
    h = str(event.get('h'))
    d = str(event.get('d'))
    t = str(event.get('t'))
    p = str(event.get('p'))
    profit_loss = str(event.get('profit_loss'))
    av95 = str(event.get('av95'))
    av99 = str(event.get('av99'))
    time = str(event.get('time'))
    cost = str(event.get('cost'))
    #Hardcoded name of the bucket and name of the json file called 'audit.json'
    bucket_name = 'maxbucketcw'
    file_name = 'audit.json'
    s3 = boto3.client('s3')
    new_entry = OrderedDict([
        ('s', s),
        ('r', r),
        ('h', h),
        ('d', d),
        ('t', t),
        ('p', p),
        ('profit_loss', profit_loss),
        ('av95', av95),
        ('av99', av99),
        ('time', time),
        ('cost', cost)
    ])
    
    try:
        response = s3.get_object(Bucket=bucket_name, Key=file_name)
        file_content = response['Body'].read().decode('utf-8')
        data = json.loads(file_content)
        
        #Check for any problems related to data' not being a list
        if isinstance(data, dict):
            data = [data]
        elif not isinstance(data, list):
            data = []
        data.append(new_entry)
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            #If 'audit.json' does not exist we can create one and give it the data
            data = [new_entry]
        else:
            raise e
    
    updated_file_content = json.dumps(data, indent=4)
    s3.put_object(Bucket=bucket_name, Key=file_name, Body=updated_file_content)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Audit was updated successfully (can proceed to read from it)')
    }

