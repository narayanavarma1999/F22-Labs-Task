import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { IsNotEmpty, IsString, Length } from "class-validator";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
 
  @IsString()
  @IsNotEmpty({ message: "Category name is required" })
  @Length(3, 50, {
    message: "Category name must be between 2 and 50 characters",
  })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
