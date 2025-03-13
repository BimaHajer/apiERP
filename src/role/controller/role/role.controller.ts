import { Controller, Get} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from 'src/role/service/role/role.service';

@Controller('roles')
@ApiTags('roles')
export class RoleController {
 constructor(private readonly roleService: RoleService) {}

    //@UseGuards(JwtAuthGuard)
    @Get('/')
    @ApiBearerAuth()
    async find() {
        return this.roleService.findRoles();
    }
}
