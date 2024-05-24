import { IsNotEmpty } from 'class-validator';
export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名不可为空' })
  name: string;
  @IsNotEmpty({ message: '显示顺序不可为空' })
  order: number;
  parent_id: number;
  type: number;
  icon: string;
  component: string;
  @IsNotEmpty({ message: '路由地址不可为空' })
  router_path: string;
  router_params: string;
  create_by: string;
  permission: string;
  is_frame: number;
  is_cache: number;
  visible: number;
  status: number;
}
