const mongoose = require('mongoose')
const { Schema } = mongoose
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/deep_seek_users',{
});
db.on('connected', (err) => {
    if(err) {
        console.log('users数据库连接失败'+err);
    }
    else {
        console.log('连接users数据库成功')
    }
});
const UserSchema = new Schema({
    user_uid: { type:Number, unique: true, required: true },
    user_history: [{
        history_id: { type: String, required: true },
        history: [
            {user: { type: String }, assistant: {type: String}}
        ]
    }]
})
const userHistoryModel = db.model('userHistory', UserSchema, 'userHistory')
module.exports = userHistoryModel;