//puppeteer与//cookie
//邮件验证
const nodemailer = require('nodemailer');
// 创建邮件传输器
const transporter = nodemailer.createTransport({
    service: '163', // 例如 'gmail', 'qq', '163' 等
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: 'zx3434241933@163.com',
        pass: 'PBhwZ3BwcGVQ74C8' // 或 app password
    }
});
// 存储验证码和过期时间的键值对
const verificationCodes = new Map();
// 生成六位验证码
function generateVerificationCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}
//调用
const Router = require('@koa/router');
const { createUser, searchUser, changeUser, deleteUser, changeUserHeadshot, searchUserBackground} = require('../service/user.service.js')
const {searchUserHistoryUid, updateUserHistory } = require('../service/userHistory.service');
const router = new Router();
//文件存储
const multer = require('@koa/multer');
const syncFs = require('fs')
const fs = require('fs').promises;
const path = require('path');
// Multer 配置 (内存存储)
const storage = multer.memoryStorage();
const upload = multer({ storage });
//jwt设置
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../UserController')

//创建和登录用户
router.post('/user_login_email', async (ctx, next) => {
    const {user_email, user_captcha} = ctx.request.body;
    console.log('验证码',user_captcha);
    // 获取存储的验证码
    const storedCode = verificationCodes.get(user_email);
    // 验证验证码是否有效
    if (!storedCode || storedCode.code !== user_captcha || Date.now() > storedCode.expires) {
        ctx.status = 400; // Bad Request
        ctx.body = { message: '无效或过期的验证码' };
        console.log('验证码验证失败')
        // 清除已经失效的验证码
        if ( storedCode && Date.now() > storedCode.expires) {
          verificationCodes.delete(user_email);
        }
        return; // 停止后续操作
    }
    // 验证码验证成功，清除验证码
    verificationCodes.delete(user_email);
    console.log('验证码验证成功')
    try {
        //检查用户是否存在
        const search = await searchUser(user_email);
        console.log('用户',search);
        if (ctx.request.body && search === undefined && user_captcha) {
            console.log('用户未创建',ctx.request.body);
            const user = await createUser(user_email);
            ctx.status = 201;
            console.log('创建用户成功')
            const newSearch = await searchUser(user_email);
            const token = jwt.sign({user_email: user_email, user_uid: newSearch.user_uid}, JWT_SECRET, { expiresIn: '24h' });
            ctx.body = {
                mission: '用户未存在,已成功创建',
                user: {
                    user_name: newSearch.user_name,
                    user_email: newSearch.user_email,
                    user_phone: newSearch.user_phone,
                    user_uid: newSearch.user_uid,
                    user_headshot: newSearch.user_headshot,
                    user_background: newSearch.user_background  
                },
                user_token: token,
            }
        }
    else {
        console.log('用户已创建')
        const newSearch = await searchUser(user_email);
        if (ctx.headers.authorization) {
            console.log('有token:', ctx.headers.authorization);
            console.log('登录状态');
        } else {
            console.log('无token')
            console.log('离线状态')
        }
        const token = jwt.sign({user_email: user_email, user_uid: newSearch.user_uid}, JWT_SECRET, { expiresIn: '24h' });
        ctx.body = {
            mission: '用户已存在',
            user: {
                user_name: newSearch.user_name,
                user_email: newSearch.user_email,
                user_phone: newSearch.user_phone,
                user_uid: newSearch.user_uid,
                user_headshot: newSearch.user_headshot,
                user_background: newSearch.user_background
            },
            user_token: token,
        }
        ctx.status = 200;
    }
} catch (err) {
        console.error('用户注册/登录错误:'); // 更详细的错误信息
        ctx.throw(500, '服务器内部错误'); // Internal Server Error
        console.log(err);
    }
    await next()
})
// 发送邮件验证码的路由
router.post('/user_sendEmail', async (ctx,next) => {
    console.log('触发邮件')
    try {
        const { to } = ctx.request.body; // 获取邮件信息
        // 检查是否已存在该邮箱的验证码，如果存在则删除
        if (verificationCodes.has(to)) {
            console.log('删除之前的验证码 for', to);
            verificationCodes.delete(to);
        }
        // 生成验证码并设置过期时间
        const verificationCode = generateVerificationCode();
        const expirationTime = Date.now() + 30 * 60 * 1000; // 30分钟过期
        verificationCodes.set(to, { code: verificationCode, expires: expirationTime });
        // 读取 HTML 文件内容
        const emailTemplatePath = path.join(__dirname,'../../static/emailHtml.html'); // 调整路径
        let htmlContent = await fs.readFile(emailTemplatePath, 'utf-8');
        // 替换验证码占位符
        htmlContent = htmlContent.replace('${verificationCode}', verificationCode);
    const mailOptions = {
        from: 'zx3434241933@163.com',
        to,
        subject: '验证你的邮箱', // 设置默认主题
        html: htmlContent // 设置默认内容
    };
    await transporter.sendMail(mailOptions); // 发送邮件
    ctx.body = { message: '邮件发送成功' }; // 返回成功信息
} catch (error) {
    console.error('Error sending email:', error);
    ctx.throw(500, 'Failed to send email'); // 抛出错误
}
    await next()
});
//验证用户登录状态
router.post('/user_login_token', async (ctx,next) => {
    try {
        // 通过 koa-jwt 自动校验 token 有效性
        // 如果 token 过期会直接抛出 401 错误
        const decoded = ctx.state.user; // 通过 koa-jwt 解析后的 token 数据
        ctx.body = { code: 200, data: decoded };
    } catch (error) {
        ctx.status = 401;
        ctx.body = { code: 401, message: 'Token expired' };
    }
})
//查找用户与更改用户名字
router.post('/user/changeUserName', async (ctx, next) => {
    const { userName , userUid } = ctx.request.body; 
    if (ctx.request.body) {
        console.log('用户更改的新名字', ctx.request.body)
        const res = await changeUser(userName , userUid)
        if (res.error) {
            ctx.status = 400;  // 如果更新失败，返回 400 错误
            ctx.body = {
                message: res.error,
            };
        } else {
            ctx.status = 200;  // 更新成功，返回 200 状态
            ctx.body = {
                userName: res.userNewName,  // 返回更新后的用户名
                userUid: res.userNewUid,
            };
        }
    } else {
        ctx.status = 400;  // 如果没有传递必要的参数，返回 400 错误
        ctx.body = {
            message: '缺少必要参数',
        };
    }
    await next()
})
//查找用户并更改头像
router.post('/user/changeUserHeadshot', upload.single('Headshot'), async (ctx, next) => {
    const { userUid }  = ctx.request.body
    const file = ctx.file;
    if (!userUid || !file) {
        ctx.status = 400;
        ctx.body = { message: '缺少 userUid  或文件' };
        return;
    }
    try {
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${userUid}${fileExtension}`;
        const filePath = path.resolve(__dirname, '..', '..', 'static', 'userHeadshot', newFileName);
        await fs.writeFile(filePath, file.buffer);
        const userNewHeadshot = `/userHeadshot/${newFileName}`; // 新的头像路径
        // 调用你的 changeUserHeadshot 函数
        const updateResult = await changeUserHeadshot(userNewHeadshot, userUid);
        if (updateResult.error) { // 检查是否有错误
            ctx.status = 400;
            ctx.body = { 
                message: updateResult.error,
            };
            return;
        }
        ctx.status = 200;
        console.log('头像',userNewHeadshot)
        ctx.body = {
            message: '头像更新成功',
            imageUrl: userNewHeadshot // 返回新的头像路径
        };
    } catch (error) {
        console.error('头像保存失败:', error);
        ctx.status = 500;
        ctx.body = { message: '头像保存失败: ' + error.message }; // 返回更详细的错误信息
    }
    await next()
})
//查询用户背景
router.post('/user/searchUserBackground',async (ctx) => {
    const { userUid } = ctx.request.body
    const userBackground = await searchUserBackground(userUid)
    ctx.body = {
        background:userBackground
    }
})
//删除用户
router.post('/user/deleteUser', async (ctx, next) => {
    const { userUid } = ctx.request.body;
    if (ctx.request.body) {
        ctx.status = 200;
        const name = await deleteUser(userUid);
        ctx.body = {
            message: name.message,
        }
    }
    else {
        ctx.response.body = ctx.request.body;
        ctx.status = 500;
        console.log('用户输入信息为空')
    }
    await next()
})
//用户历史
router.post('/user/userHistory', async (ctx) => {
    const { userUid } = ctx.request.body;
    const user = await searchUserHistoryUid(userUid);
    if (!user) {
        ctx.throw(404, '用户不存在');
        return
    }
    try {
        console.log('用户历史', user.history);
        ctx.body = {
            history: user.history
        }
    } catch (err) {
        console.log(err);
        ctx.status = 400;
    }
})
//删除用户历史
router.post('/user/updateUserHistory', async (ctx) => {
    const { userUid, id } = ctx.request.body;
    const result = await updateUserHistory(id, userUid);
    if (!result) {
        ctx.status = 400;
    } else {
        try {
            console.log('用户历史', result);
            ctx.body = {
                history:result.history
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    }
})

module.exports = router;