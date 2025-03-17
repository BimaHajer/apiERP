/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleService } from 'src/role/service/role/role.service';

@Controller('roles')
@ApiTags('roles')
export class RoleController {
 constructor(private readonly roleService: RoleService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    async find() {
        return this.roleService.findRoles();
    }
}
