const userHistoryModel = require('../mongoDB/userHistory.mongooser.js')
const { v4: uuidv4 } = require('uuid'); // 导入 uuidv4 函数
class UserHistoryService {
    // 创建和添加用户历史
    async createUserHistory(history, title, uid) { // 需要传入 uid 参数
        try {
            //  不需要自己生成 uid，findOneAndUpdate with upsert 会处理
            const newHistoryItem = { id: uuidv4(), historyUrl: history, title: title, };

            const updatedUser = await userHistoryModel.findOneAndUpdate(
                { uid: uid }, // 使用传入的 uid
                { $push: { history: newHistoryItem } },
                { new: true, upsert: true }
            );
            if (updatedUser) {
                console.log('创建/更新用户历史成功:', updatedUser);
                return updatedUser; // 返回更新后的用户文档
            } else {
                console.error('创建/更新用户历史失败');
                return null; // 或抛出错误
            }
        } catch (error) {
            console.error('创建/更新用户历史发生错误:', error);
            //  这里可以根据你的需要抛出错误或返回 null
            throw error;  //  或者 return null;
        }
    }
    //通过uid查找用户
    async searchUserHistoryUid(userUid) {
        const uidOk = await userHistoryModel.findOne({uid: userUid}, {}, {})
        if (uidOk) {
            const { uid, history } = uidOk
            console.log('用户查找成功','uid:', uid, 'history:', history);
            console.log('执行uid查询', uidOk)
            return { uid, history }
        } else {
            console.log('未找到用户')
            return ''
        }
    }
    //通过history删除用户
    async updateUserHistory( id, uid ) {
        const result = await userHistoryModel.findOneAndUpdate(
            { uid: uid }, // 查找条件：uid 匹配
            { $pull: { history: { id: id } } },// 更新操作：从 history 数组中移除 id 匹配的元素
            { new: true }
        );
        if (!result) {
            throw Error = '未查询到用户历史';
        } else {
            return result;
        }
    }
}
module.exports =new UserHistoryService;