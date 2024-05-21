import { IsNotEmpty } from 'class-validator';
export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名不可为空' })
  name: string;
  orderNum: number;
  parentId: number;
  menuType: string;
  icon: string;
  @IsNotEmpty({ message: '组件路径不可为空' })
  component: string;
  @IsNotEmpty({ message: '路由不可为空' })
  path: string;
  createBy: string;
}
