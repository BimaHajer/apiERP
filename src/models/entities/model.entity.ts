/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "../../brands/entities/brand.entity";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Modeles")
export class Model {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
  
    @ApiProperty()
    @Column('text', { name: 'name', nullable: true })
    name: string | null;
  

    @ApiProperty()
    @Column('text', { name: 'picture', nullable: true })
    picture: string | null;

    @Column('text', { name: 'description', nullable: true })
    description: string | null;
    


    @ApiProperty()
    @Column('boolean', { name: 'active', nullable: true, default: true })
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


    @ApiProperty()
    @ManyToOne(() => Brand, (brand: Brand) => brand.id)
    @JoinColumn({ name: "brandId" })
    brandId: number | null;
  
    @BeforeInsert()
    eventCreatedAt() {
      this.createdAt = new Date();
    }
  
    @BeforeUpdate()
    eventUpdatedAt(): void {
      this.updatedAt = new Date();
    }
  
    @BeforeRemove()
    eventDeletedAt() {
      this.deletedAt = new Date();
    }
}

export { Brand };
