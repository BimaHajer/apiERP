/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class RoleDto {
    
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  level?: number;

  @ApiProperty()
  readonly active?: boolean;

  users: any;
}