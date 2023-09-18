import type { AWS } from '@serverless/typescript';
import {functions} from "@functions/routes";

const serverlessConfiguration: AWS = {
  service: 'chat-lambda-test',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region: 'eu-central-1',
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      tb1: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'test_partition_key',
              AttributeType: 'S'
            },
            {
              AttributeName: 'test_sort_key',
              AttributeType: 'S'
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          KeySchema: [
            {
              AttributeName: 'test_partition_key',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'test_sort_key',
              KeyType: 'RANGE'
            },
          ],
          TableName: 'tb1',
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
