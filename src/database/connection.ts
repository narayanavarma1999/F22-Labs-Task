import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",  
  database: "taskdb",
  synchronize: true,     
  entities: [Product,Category],
});
