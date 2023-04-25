import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { watch_id } = ctx.args;
  return dynamoDBGetItemRequest({ watch_id });
}

export function response(ctx) {
  let { name } = ctx.result;
  if (!name) return util.error("Watch ID Not Found!");
  return ctx.result;
}


function dynamoDBGetItemRequest(key) {
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues(key),
  };
}