import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  id: number;
  name: string;
  permission_ids: number[];
  menus_ids: number[];
  notes: string;
  code: string;
  order: number;
  status: string;
}
