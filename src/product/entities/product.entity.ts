/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { category } from "src/category/entities/category.entity";
import { Image } from "src/image/image/entities/image.entity";
import { Model } from "src/models/entities/model.entity";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product{
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @ApiProperty()
  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @ApiProperty()
  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ApiProperty()
  @Column('decimal', { name: 'tva', nullable: true })
  tva: number | null;
  
  @ApiProperty()
  @Column('decimal', { name: 'priceHT', nullable: true })
  priceHT: number | null;

  @ApiProperty()
  @Column('decimal', { name: 'priceTTC', nullable: true })
  priceTTC: number | null;

  @ApiProperty()
  @Column('integer', { name: 'initialQuantity', nullable: true })
  initialQuantity: number | null;

  @ApiProperty()
  @Column('integer', { name: 'remainingQuantity', nullable: true })
  remainingQuantity: number | null;

  @ApiProperty()
  @ManyToOne(() => category, (category: category) => category.id)
  @JoinColumn({ name: "categoryId" })
  categoryId: number | null;

  @ApiProperty()
  @ManyToOne(() => Model, (Model: Model) => Model.id)
  @JoinColumn({ name: "modelId" })
  modelId: number | null;
  
  
  @ApiProperty()
  @OneToMany(() => Image, (image: Image) => image.productId)
  images: Image[]
  
  @ApiProperty()
  @Column("boolean", { name: "active", nullable: true, default: true })
  active: boolean | false;

  @ApiProperty()
  @Column("timestamp with time zone", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @ApiProperty()
  @Column("integer", { name: "createdBy", nullable: true })
  createdBy: number | null;

  @ApiProperty()
  @Column("timestamp with time zone", { name: "updatedAt", nullable: true })
  updatedAt: Date | null;

  @ApiProperty()
  @Column("integer", { name: "updatedBy", nullable: true })
  updatedBy: number | null;

  @ApiProperty()
  @Column("timestamp with time zone", { name: "deletedAt", nullable: true })
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