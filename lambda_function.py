import json
import re
import boto3
import os
import base64
import csv
from datetime import datetime
from collections import defaultdict
from io import StringIO
from dateutil.relativedelta import relativedelta

# eventIDでログをグループ化
def group_by_event(log):
    pattern = r'event:(\w+)'
    lines = log.split('\n')

    grouped_lines = defaultdict(list)
    current_event = None
    for line in lines:
        match = re.search(pattern, line)
        if match:
            current_event = match.group(1)
        if current_event:
            grouped_lines[current_event].append(line)
    return grouped_lines

# 1リクエスト分のログを抽出
def extract_matches_from_log(log):
    log = '\n'.join(log)
    pattern = r'\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3})\].*?event:(\w+).*?(\{.*?\}).*?http_status : (\d+)\[.*?\] system execute time :(\d+)'
    matches = re.findall(pattern, log, re.DOTALL)
    return matches

# payloadをBase64デコード
def decode_payload(payload):
    missing_padding = len(payload) % 4
    if missing_padding:
        payload += '='* (4 - missing_padding)
    decoded_payload = base64.urlsafe_b64decode(payload).decode('utf-8')
    payload_dict = json.loads(decoded_payload)
    return payload_dict

# 利用状況を抽出
def extract_situation_of_utilization(matches, start_date, end_date):
    date_and_auth_objects = []
    for match in matches:
        match_date = datetime.strptime(match[0], '%Y-%m-%d %H:%M:%S.%f')
        start_datetime =  match_date.strftime('%Y-%m-%d %H:%M:%S.%f')
        event_id = match[1]
        json_str = match[2] + "}}"
        http_status = match[3]
        execute_time = match[4]

        if start_date <= match_date <= end_date:
            json_obj = json.loads(json_str)
            if "http_request_recieve" in json_obj and "headers" in json_obj["http_request_recieve"] and "authorization" in json_obj["http_request_recieve"]["headers"]:
                auth = json_obj["http_request_recieve"]["headers"]["authorization"].replace('Bearer ', '')
                payload = auth.split('.')[1]
                payload_dict = decode_payload(payload)
                client_id = payload_dict.get('cid', '')
                date_and_auth_objects.append((event_id, client_id, start_datetime, http_status, execute_time))
    return date_and_auth_objects

def lambda_handler(event, context):
    situation_of_utilizations = []
    csv_output = StringIO()
    csv_writer = csv.writer(csv_output)
    try:
        # 環境変数設定
        #year = os.environ['TARGET_YEAR'] # 対象年
        #month = os.environ['TARGET_MONTH'] # 対象月
        #app_name = os.environ['APP_NAME'] # 対象API名
        bucket = os.environ['TARGET_BUCKET'] # 対象S3バケット名
        start_date = datetime.strptime(os.environ['START_DATE'], '%Y-%m-%d %H:%M:%S') # 抽出開始期間
        end_date = datetime.strptime(os.environ['END_DATE'], '%Y-%m-%d %H:%M:%S') # 抽出終了期間
        year = '2024' # 対象年
        month = '04' # 対象月
        app_name = 'app1' # 対象API名

        s3 = boto3.client('s3')

        # 対象月とその前後の月を計算
        folder = 'public/' + app_name + '/' + year + '/' + month + '/'
        target_date = datetime(int(year), int(month), 1)
        months_and_years = [(target_date + relativedelta(months=i)).strftime('%Y/%m') for i in range(-1, 2)]

        for month_and_year in months_and_years:
            folder = 'public/' + app_name + '/' + month_and_year + '/'

            response = s3.list_objects_v2(Bucket=bucket, Prefix=folder)
            if 'Contents' in response:
                files = [item['Key'] for item in response['Contents'] if item['Key'].endswith('.txt')]
                print(files)
                for file in files:
                    obj = s3.get_object(Bucket=bucket, Key=file)
                    file_content = obj['Body'].read().decode('utf-8')
                    events = group_by_event(file_content)
                    for event, log in events.items():
                        situation_of_utilization = extract_situation_of_utilization(extract_matches_from_log(log), start_date, end_date)
                        situation_of_utilizations.extend(situation_of_utilization)
        # 重複排除
        situation_of_utilizations = list(set(situation_of_utilizations))
        # ソート
        situation_of_utilizations = sorted(situation_of_utilizations, key=lambda x: x[2])
        # CSV形式で出力
        csv_writer.writerow(['Event ID', 'Client ID', 'Start Datetime', 'HTTP Status', 'Execute Time'])
        for row in situation_of_utilizations:
            csv_writer.writerow(row)
    except Exception as e:
        return str(e)
    finally:
        print('situation_of_utilizations:', csv_output.getvalue())
    return {
        'statusCode': 200,
        'body': csv_output.getvalue()
    }