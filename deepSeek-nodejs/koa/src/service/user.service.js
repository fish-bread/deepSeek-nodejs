const userModel = require('../mongoDB/user.mongoose.js')
let newUid = 10000000000;
let defaultName = '用户';
class UserService {
    //创建用户
    async createUser(email) {
        const maxUid = await userModel.findOne().sort({user_uid:-1}).exec()
       
        if (maxUid) {
            console.log('查询最大uid为',maxUid.user_uid)
            newUid = maxUid.user_uid + 1 
        }
        const user =new userModel(
            {user_name: defaultName + newUid, user_email: email, user_uid:newUid}
        )
        await user.save()
        console.log('执行创建');
        return user
    }
    //删除用户
    async deleteUser(userUid) {
        const search = new UserService()
        const user = await search.searchUserUid(userUid);// 使用 searchUserUid 查找用户
        if (!user) {
            return { message: '用户不存在' };  // 如果没有找到用户，返回错误信息
        } else {
            const result = await userModel.deleteOne({user_uid: userUid},{});
            if (result.deletedCount === 0) {
                return {success: false, message: '未找到用户或用户已删除'};
            }
            return {success: true, message: '用户删除成功'};
        }
    }
    //通过邮箱查找用户
    async searchUser(email) {
        const findOk = await userModel.findOne({user_email: email,},{},{})
        if (findOk) {
            const { user_email ,user_phone ,user_name, user_uid, user_headshot, user_background } = findOk
            console.log('用户查找成功', 'username:', user_name, 'uid:', user_uid, 'headshot:', user_headshot, 'background:' , user_background );
            return { user_email, user_phone,user_name, user_uid, user_headshot,user_background }
        } else {
            return undefined
        }
    }
    //通过uid查找用户
    async searchUserUid(userUid) {
        const uidOk = await userModel.findOne({user_uid: userUid}, {}, {})
        if (uidOk) {
            const { user_email ,user_phone, user_uid, user_name,user_headshot, user_background} = uidOk
            console.log('用户查找成功', 'username:', user_name, 'uid:', user_uid, 'headshot:', user_headshot);
            console.log('执行uid查询', uidOk)
            return { user_email ,user_phone,user_uid, user_name, user_headshot, user_background}
        } else {
            console.log('未找到用户')
            return ''
        }
    }
    //更改用户名字
    async changeUser(userNewName, userUid ) {
        const search = new UserService()
        const user = await search.searchUserUid(userUid);  // 使用 searchUserUid 查找用户
        if (!user) {
            return { error: '用户不存在' };  // 如果没有找到用户，返回错误信息
        }
        // 如果找到了用户，更新用户名
        const updatedUser = await userModel.findOneAndUpdate(
            { user_uid: userUid },  // 查找条件
            { user_name: userNewName },  // 更新的字段
            { new: true }  // 返回更新后的文档
        );
        if (updatedUser) {
            console.log('用户名更新成功', updatedUser);
            return { userNewName: updatedUser.user_name, userNewUid: userUid };  // 返回更新后的用户名
        } else {
            return { error: '更新失败' };  // 如果更新失败，返回错误信息
        }
    }
    //更改用户头像图片路径
    async changeUserHeadshot(userNewHeadshot , userUid) {
        const search = new UserService()
        const user = await search.searchUserUid(userUid)
        if (!user) {
            return { error: '用户不存在' };  // 如果没有找到用户，返回错误信息
        }
        // 如果找到了用户，更新用户图片路径
        const updatedUser = await userModel.findOneAndUpdate(
            { user_uid: userUid },  // 查找条件
            { user_headshot: userNewHeadshot },  // 更新的字段
            { new: true }  // 返回更新后的文档
        );
        if (updatedUser) {
            console.log('用户图片路径更新成功', updatedUser);
            return { userNewUid: userUid, imageUrl: userNewHeadshot };  // 返回更新后的用户Uid
        } else {
            return { error: '更新失败' };  // 如果更新失败，返回错误信息
        }
    }
}
module.exports =new UserService;