/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("images")
export class Image {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @ApiProperty()
    @Column("text", { name: "label", nullable: true })
    label: string | null

    @ApiProperty()
    @Column("text", { name: "path", nullable: true })
    path: string | null

    @ApiProperty()
    @Column("boolean", { name: "active", nullable: true, default: true })
    active: boolean | null

    @ApiProperty()
    @Column("timestamp with time zone", { name: "createdAt", nullable: true })
    createdAt: Date | null

    @ApiProperty()
    @Column("integer", { name: "createdBy", nullable: true })
    createdBy: number | null

    @ApiProperty()
    @Column("timestamp with time zone", { name: "updatedAt", nullable: true })
    updatedAt: Date | null

    @ApiProperty()
    @Column("integer", { name: "updatedBy", nullable: true })
    updatedBy: number | null

    @ApiProperty()
    @Column("timestamp with time zone", { name: "deletedAt", nullable: true })
    deletedAt: Date | null


    @ApiProperty()
    @ManyToOne(() => Product, (product: Product) => product.id)
    @JoinColumn({ name: "productId" })
    productId: number | null

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