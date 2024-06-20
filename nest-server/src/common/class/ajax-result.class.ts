/*
 * @Description: 返回值封装对象
 */
export class AjaxResult {
  readonly code: number;
  readonly msg: string;
  readonly data: any;
  // [key: string]: any;

  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
    // Object.assign(this, data);
  }

  static success(msg = '操作成功', code = 200, data?: any) {
    return new AjaxResult(code, msg, data);
  }

  static error(msg = '操作失败', code = 500, data?: any) {
    return new AjaxResult(code, msg, data);
  }
}
