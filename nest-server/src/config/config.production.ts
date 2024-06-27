import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: 'xiaoqi666',
  },
  // typeorm 配置
  database: {
    type: 'mysql', //数据库类型
    host: 'localhost', //数据库地址
    port: 3306, //数据库端口
    username: 'www', //数据库账号
    password: '123456', //数据库密码
    database: 'nest-server', //数据库名称
    autoLoadModels: true, //模型自动加载，无需在在配置处重复写实体。
    synchronize: true, //如果为true 自动加载的模型将被同步进数据库，生产环境要关闭，否则可能因为字段的删除而造成数据的丢失。
    logging: false, //是否启动日志记录
  },
  // redis 配置
  redis: {
    host: 'localhost',
    port: '6379',
    password: '123456',
    db: '0',
  },

  // 队列reids 配置
  bullRedis: {
    host: 'localhost',
    port: '6379',
    password: '123456',
  },

  //文件上传地址  例如： E:/upload/test
  uploadPath: '',
  // 静态资源前缀
  staticPrefix: '/admin',
  // 是否演示环境
  isDemoEnvironment: true,
});
