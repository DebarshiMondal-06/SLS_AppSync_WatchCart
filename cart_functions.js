const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();


const getByCategory = (category) => {
    var params = {
        TableName: 'WatchTable',
        IndexName: 'watch-category-index',
        KeyConditionExpression: 'category = :category',
        ExpressionAttributeValues: {
            ':category': category
        }
    };
    return params;
};
const getUser = (userId) => {
    var params = {
        TableName: "Cart_Table",
        KeyConditionExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
            ':user_id': userId,
        }
    };
    return params;
};
const addToCart = (user_id, watch_id, count, name, brand, price) => {
    var paramsADD = {
        TableName: "Cart_Table",
        Item: {
            user_id,
            watch_id,
            count,
            watch: {
                name,
                brand,
                price
            }
        }
    };
    return paramsADD;
};


const filter_filed = async(value) => {
    if (value.field === 'getByCategory') {
        var { category } = value.arguments;
        const result = await DynamoDB.query(getByCategory(category)).promise();
        return result.Items;
    }
    if (value.field === 'addCart') {
        var { user_id, watch_id, count, name, brand, price } = value.arguments;
        return await DynamoDB.put(addToCart(user_id, watch_id, count, name, brand, price)).promise();
    }
    if (value.field === 'getCarts') {
        var { user_id } = value.arguments;
        const result = await DynamoDB.query(getUser(user_id)).promise();
        var filterItems = [];
        filterItems = result.Items.filter((item) => {
            return item.count !== 0;
        });
        return filterItems;
    }
    if (value.field === 'getUserWatchCount') {
        var { user_id, watch_id } = value.arguments;
        const result = await DynamoDB.get({ TableName: "Cart_Table", Key: { user_id, watch_id } }).promise();
        return result.Item;
    } 
    else {
        return 0;
    }
};


exports.handler = async(event) => {
    return await filter_filed(event);
};
