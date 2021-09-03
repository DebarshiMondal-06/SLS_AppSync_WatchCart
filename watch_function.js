const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();


const getOneWatch = (watch_id) => {
    var params = {
        TableName: "WatchTable",
        KeyConditionExpression: 'watch_id = :watch_id',
        ExpressionAttributeValues: {
            ':watch_id': watch_id,
        }
    };
    return params;
};

const addWatch = ({ name, brand, price, description, category }) => {
    var watch_id = Math.floor(100000 + Math.random() * 900000);
    var params = {
        Item: { watch_id, name, brand, price, description, category },
        TableName: "WatchTable",
    };
    return params;
};


const filterFields = async(value) => {
    if (value.field === 'getWatch') {
        var { watch_id } = value.arguments;
        var getItem = await DynamoDB.query(getOneWatch(watch_id)).promise();
        return getItem.Items[0];
    }
    if (value.field === 'addWatch') {
        return await DynamoDB.put(addWatch(value.arguments)).promise();
    }
    if (value.field === 'addUser') {
        var { email } = value.arguments;
        return await DynamoDB.put({ TableName: 'User_Table', Item: { email } }).promise();
    }
    if (value.field === 'getUsers') {
        var getUsers = await DynamoDB.scan({ TableName: "User_Table" }).promise();
        return getUsers.Items;
    }
    if (value.field === 'getUser') {
        var { email } = value.arguments;
        const result = await DynamoDB.get({ TableName: "User_Table", Key: { email } }).promise();
        if (result) return result.Item;
        else return null;
    }
    else {
        var getItems = await DynamoDB.scan({ TableName: "WatchTable" }).promise();
        return getItems.Items;
    }
};



exports.handler = async(event) => {
    return await filterFields(event);
};
