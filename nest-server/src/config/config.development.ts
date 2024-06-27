import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || 'xiaoqi666',
  },
  // typeorm 配置
  database: {
    type: process.env.MYSQL_TYPE || 'mysql', //数据库类型
    host: process.env.MYSQL_HOST || 'localhost', //数据库地址
    port: process.env.MYSQL_PORT || 3306, //数据库端口
    username: process.env.MYSQL_USERNAME || 'root', //数据库账号
    password: process.env.MYSQL_PASSWORD || '123456', //数据库密码
    database: process.env.MYSQL_DATABASE || 'nest-server', //数据库名称
    autoLoadModels: true, //模型自动加载，无需在在配置处重复写实体。
    synchronize: true, //如果为true 自动加载的模型将被同步进数据库，生产环境要关闭，否则可能因为字段的删除而造成数据的丢失。
    logging: false, //是否启动日志记录
  },
  // redis 配置
  redis: {
    host: process.env.REDIS_HOST || 'localhost3',
    port: process.env.REDIS_PORT || '6379w',
    password: process.env.REDIS_PASSWORD || '123456',
    db: process.env.REDIS_DB || '0',
  },

  // 队列reids 配置
  bullRedis: {
    host: process.env.BULL_REDIS_HOST || 'localhost',
    port: process.env.BULL_REDIS_PROT || '6379',
    password: process.env.BULL_REDIS_PASSWORD || '123456',
  },

  //文件上传地址  例如： E:/upload/test
  uploadPath: process.env.UPLOAD_PATH || '',
  // 静态资源前缀
  staticPrefix: process.env.STATIC_PREFIX || '',
  // 是否演示环境
  isDemoEnvironment: false,
});
