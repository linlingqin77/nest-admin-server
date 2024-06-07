/**
 * @desc 时长 常量
 */

// 登录时生成token存入redis设置的过期时间(秒)
export const TOKEN_FIRST_SET_TIME: number = 18000;

// 验证码存入redis设置的过期时间(秒)
export const CAPCODE_FIRST_SET_TIME: number = 180;

// 有效期内接收请求token自动续期有效时长(秒)
export const TOKEN_AUTOMATIC_RENEWAL_TIME: number = 1800;
