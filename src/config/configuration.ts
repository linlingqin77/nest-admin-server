import { registerAs } from '@nestjs/config';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('app_global', () => ({
    APP_PROT: process.env.APP_PROT,
    APP_HOST: process.env.APP_HOST,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PWD: process.env.DATABASE_PWD,
    DATABASE_LIB: process.env.DATABASE_LIB,
    DATABASE_CHARSET: process.env.DATABASE_CHARSET,
    UPLOAD_PREFIX: process.env.UPLOAD_PREFIX

}));


// APP_PROT = 3000
// APP_HOST = localhost

// DATABASE_HOST = localhost
// DATABASE_PORT = 3306
// DATABASE_NAME = root
// DATABASE_PWD = 123456
// DATABASE_LIB = change_number_system