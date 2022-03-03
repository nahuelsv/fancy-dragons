import type { AWS } from '@serverless/typescript';

import dragons from '@functions/dragons';
import auth from '@functions/auth';

const serverlessConfiguration: AWS = {
  service: 'fancy-dragons',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dotenv-plugin',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    iam: {
      role: {
          statements: [
            {
              Effect: "Allow", 
              Action: ["dynamodb:Query", "dynamodb:Scan", "dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:DeleteItem",
                       "xray:PutTraceSegments", "xray:PutTelemetryRecords"],
              Resource: "*"
            }
          ]
      }
    },
    tracing: {
      apiGateway: true,
      lambda: true
    },
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    },
  },
  // import the function via paths
  functions:  { ...dragons, ...auth } ,
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
};

module.exports = serverlessConfiguration;
