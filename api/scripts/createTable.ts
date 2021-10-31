import AWS from 'aws-sdk';

(async () => {
  try {
    if (!['docker', 'development'].includes(process.env.NODE_ENV)) {
      throw "Can't perform migration on NODE_ENV other than docker or development";
    }
    const client = new AWS.DynamoDB({
      region: process.env.AWS_DEFAULT_REGION,
      endpoint: new AWS.Endpoint(process.env.DB_ENDPOINT),
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    let result = await createTable(client, process.env.DYNAMO_TABLE_NAME);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();

function createTable(dynamo: AWS.DynamoDB, tableName: string) {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'PK',
        AttributeType: 'S',
      },
      {
        AttributeName: 'SK',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'PK',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'SK',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  return new Promise((resolve, reject) => {
    dynamo.createTable(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
