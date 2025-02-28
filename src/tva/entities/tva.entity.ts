import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tva')
export class Tva {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column('decimal', { name: 'value', nullable: true })
  value: number | null;

  @ApiProperty()
  @Column("boolean", { name: "active", nullable: true, default: true })
  active: boolean | false;

  @ApiProperty()
  @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @ApiProperty()
  @Column('integer', { name: 'createdBy', nullable: true })
  createdBy: number | null;

  @ApiProperty()
  @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @ApiProperty()
  @Column('integer', { name: 'updatedBy', nullable: true })
  updatedBy: number | null;

  @ApiProperty()
  @Column('timestamp with time zone', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @BeforeInsert()
  eventCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  eventUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeRemove()
  eventDeletedAt() {
    this.deletedAt = new Date();
  }
}
