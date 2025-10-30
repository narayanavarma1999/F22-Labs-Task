import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  Length,
} from "class-validator";
import { Category } from "./category.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @IsNotEmpty({ message: "Product name is required" })
  @Length(3, 50, {
    message: "Category name must be between 2 and 50 characters",
  })
  name: string|undefined;

  @Column("decimal", { precision: 10, scale: 2 })
  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be greater than 0" })
  price!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  @IsNotEmpty({ message: "Product must belong to a category" })
  category!: Category;

  @CreateDateColumn()
  created_at!: Date;
}
