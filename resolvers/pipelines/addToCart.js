import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { price } = ctx.prev.result;
  const { watch_id, user_id, count } = ctx.arguments;
  return dynamodbPutRequest({ key: { watch_id, user_id }, values: { count, price } });
}

export function response(ctx) {
  return ctx.result;
}


function dynamodbPutRequest({ key, values }) {
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues(key),
    attributeValues: util.dynamodb.toMapValues(values),
  };
}