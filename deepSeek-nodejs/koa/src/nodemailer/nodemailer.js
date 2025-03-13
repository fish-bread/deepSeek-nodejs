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
module.exports = transporter