import * as AWS from 'aws-sdk';

const awsConfigParams = {
  region: process.env.AWS_DEFAULT_REGION,
};
if (process.env.AWS_ACCESS_KEY_ID) {
  awsConfigParams['accessKeyId'] = process.env.AWS_ACCESS_KEY_ID;
}
if (process.env.AWS_SECRET_ACCESS_KEY) {
  awsConfigParams['secretAccessKey'] = process.env.AWS_SECRET_ACCESS_KEY;
}
if (process.env.AWS_SESSION_TOKEN) {
  awsConfigParams['sessionToken'] = process.env.AWS_SESSION_TOKEN;
}

AWS.config.update(awsConfigParams);

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
export default dynamoClient;
