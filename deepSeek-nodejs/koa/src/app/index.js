const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('koa2-cors')
const path = require('path');
const serve = require('koa-static');
const userRouter = require('../router/user.router.js')
//jwt变量
const koaJwt = require('koa-jwt')
const JWT_SECRET = require('../UserController')
//koa
const app = new Koa();
app.on('error',err=>{
    console.log(err);
})
//跨域
app.use(cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization','token',
        'Content-Disposition','Content-Length'], //设置获取其他自定义字段
    credentials: true  //允许携带cookie
}))
//静态配置
const staticPath = path.join(__dirname, '..', '..', 'static');
console.log('staticPath', staticPath);
app.use(serve(staticPath));
//post请求前置
app.use(koaBody({
    formLimit: '10mb', // 表单数据的最大限制
    jsonLimit: '10mb', // JSON 数据的最大限制
    textLimit: '10mb', // 文本数据的最大限制
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置最大文件大小为 200MB
    }
}))
app.use(koaJwt({secret: JWT_SECRET}).unless({path: [/^\/user_login_email/, /^\/user_login_phone/,/^\/user_sendEmail/, /^\/static/]}));

// 使用 koa-jwt 中间件验证 JWT
//用户路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
module.exports = app;