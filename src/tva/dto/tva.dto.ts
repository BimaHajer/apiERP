/* eslint-disable */
import { IsString } from 'class-validator';
export class tvaDto {  
  
  @IsString()
  readonly value: number; 

  createdBy?: number;
}