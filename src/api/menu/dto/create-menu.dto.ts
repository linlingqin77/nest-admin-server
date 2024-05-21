import { IsNotEmpty } from 'class-validator';
export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名不可为空' })
  name: string;
  order_num: number;
  parent_id: number;
  menu_type: string;
  icon: string;
  @IsNotEmpty({ message: '组件路径不可为空' })
  component: string;
  @IsNotEmpty({ message: '路由不可为空' })
  path: string;
  create_by: string;
}
