const userHistoryModel = require('../mongoDB/userHistory.mongooser.js')
class UserHistoryService {
    // 创建和添加用户历史
    async createUserHistory(history, uid) { // 需要传入 uid 参数
        try {
            // 查找是否已经存在相同的 history_id
            const existingHistory = await userHistoryModel.findOne({ user_uid: uid, 'user_history.history_id': history.history_id });

            if (existingHistory) {
                // 如果存在相同的 history_id，更新现有的记录
                const updatedUser = await userHistoryModel.findOneAndUpdate(
                    { user_uid: uid, 'user_history.history_id': history.history_id },
                    { $push: { 'user_history.$.history': { $each: history.history } } },
                    { new: true }
                );

                if (updatedUser) {
                    console.log('更新用户历史成功:', updatedUser);
                    return updatedUser;
                } else {
                    console.error('更新用户历史失败');
                    return null;
                }
            } else {
                // 如果不存在相同的 history_id，创建新的记录
                const newHistoryItem = { history_id: history.history_id, history: history.history };

                const updatedUser = await userHistoryModel.findOneAndUpdate(
                    { user_uid: uid },
                    { $push: { user_history: newHistoryItem } },
                    { new: true, upsert: true }
                );

                if (updatedUser) {
                    console.log('创建/更新用户历史成功:', updatedUser);
                    return updatedUser;
                } else {
                    console.error('创建/更新用户历史失败');
                    return null;
                }
            }
        } catch (error) {
            console.error('创建/更新用户历史发生错误:', error);
            throw error;
        }
    }
    //通过uid查找用户
    async searchUserHistoryUid(userUid) {
        const uidOk = await userHistoryModel.findOne({user_uid: userUid}, {}, {})
        if (uidOk) {
            const { user_uid, user_history } = uidOk
            console.log('用户查找成功','uid:', user_uid, 'history:', user_history);
            console.log('执行uid查询', uidOk)
            return { user_uid, user_history }
        } else {
            console.log('用户没有历史记录')
            return ''
        }
    }
    //通过history删除用户
    async updateUserHistory( id, uid ) {
        const result = await userHistoryModel.findOneAndUpdate(
            { user_uid: uid }, // 查找条件：uid 匹配
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