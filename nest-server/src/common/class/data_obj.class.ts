/**
 * @description: 封装返回值数据
 */
export class DataObj<A> {
  private data: A;
  constructor(data: A) {
    this.data = data;
  }
  static create<A>(data: A) {
    return new DataObj<A>(data);
  }
}
