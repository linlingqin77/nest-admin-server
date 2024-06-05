import { IsNotEmpty } from 'class-validator';
export class CreateMenuDto {
  id?: number;
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'order is required' })
  order: number;
  parent_id: number;
  type: string;
  icon: string;
  component: string;
  @IsNotEmpty({ message: 'router_path is required' })
  router_path: string;
  router_params: string;
  create_by: string;
  permission: string;
  is_frame: string;
  is_cache: string;
  visible: string;
  status: string;
}
