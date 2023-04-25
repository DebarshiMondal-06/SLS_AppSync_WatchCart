import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const { args } = ctx;
     return dynamoDBGetItemRequest({ ...args });
//   return dynamoDBGetItemRequest({ user_id: ctx.args.user_id, watch_id: ctx.args.watch_id  });
}

export function response(ctx) {
  return ctx.result;
}

function dynamoDBGetItemRequest(key) {
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues(key),
  };
}