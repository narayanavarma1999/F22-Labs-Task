import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./database/connection";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.route"

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Running the middlware");
  next();
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

app.use(requestLogger);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL Database");
  })
  .catch((error) => console.error("DB Connection Error:", error));

// product and category routes
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error Occurred:", err);

  if (Array.isArray(err) && err[0]?.constraints) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.map((e) => e.constraints),
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
