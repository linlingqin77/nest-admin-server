import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Permission } from '../permission/entities/permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Role, Menu, Permission])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
