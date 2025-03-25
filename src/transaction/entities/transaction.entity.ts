/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ApiProperty()
  @Column('decimal', { name: 'amout', nullable: true })
  amout: number | null;

  @ApiProperty()
  @Column("text", { name: "ban", nullable: true })
  ban: string | null;

  @ApiProperty()
  @Column('boolean', { name: 'isCompleted', nullable: true, default: true })
  isCompleted: boolean | false;

  @ApiProperty()
  @Column('boolean', { name: 'isCredit', nullable: true, default: true })
  isCredit: boolean | false;

  @ApiProperty()
  @Column('boolean', { name: 'isOver', nullable: true, default: true })
  isOver: boolean | false;

  @ApiProperty()
  @Column('integer', { name: 'sourceId', nullable: true })
  sourceId: number | null;

  @ApiProperty()
  @Column('integer', { name: 'operationNumber', nullable: true })
  operationNumber: number | null;

  @ApiProperty()
  @Column('timestamp with time zone', { name: 'dueDate', nullable: true })
  dueDate: Date | null;

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
