import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  name: string;
  permissionIds: number[];
  menuIds: number[];
}
