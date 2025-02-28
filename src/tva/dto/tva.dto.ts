import { IsString, IsEmail } from 'class-validator';
import { Decimal128 } from 'typeorm';

export class tvaDto {  
  
  @IsString()
  readonly value: number; 

  createdBy?: number;
}