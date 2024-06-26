/*
 * @Description: 分页响应参数
 */

export class PaginatedDto<T> {
  /* 总条数 */
  total: number;
  rows: T[];
}
