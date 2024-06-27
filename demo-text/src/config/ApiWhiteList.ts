/**
 * @file 接口白名单队列
 */

// token 自动续期逻辑的忽略名单  有调用接口就续期
export const TOKEN_AUTOMATIC_RENEWAL_IGNORE_LIST: Array<string> = [
    '/api/auth/authcode', // 获取图片验证码
    '/api/auth/comparecode', // 验证图片验证码
    '/api/auth/login', // 登录
    '/api/user/register', // 注册
    '/api/user/loginOut', // 退出登录
];

// JWT 鉴权忽略检测的接口名单
export const JWT_IGNORE_LIST: Array<string> = [
    '/api/auth/authcode', // 获取图片验证码
    '/api/auth/comparecode', // 验证图片验证码
    '/api/auth/login', // 登录
    '/api/user/register', // 注册
];