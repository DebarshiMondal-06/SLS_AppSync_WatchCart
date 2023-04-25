const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();


const filter_filed = async(value) => {
    if (value.field === 'getUserWatchCount') {
        var { user_id, watch_id } = value.arguments;
        const result = await DynamoDB.get({ TableName: "Cart_Table", Key: { user_id, watch_id } }).promise();
        return result.Item;
    } 
    else {
        return null;
    }
};


exports.handler = async(event) => {
    return await filter_filed(event);
};
