const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

 const userRoutes = require("./routes/userRoutes");
 const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();
connectDB();

const app = express();



const allowedOrigins = [
  "https://mivine-essentials.vercel.app",  // your frontend (production)
  "http://localhost:5173"                  // local dev (Vite)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or Postman requests
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Mivine Essentials Backend");
});

// API routes
 app.use("/api/users", userRoutes);
 app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribeRoutes);

// Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);



// //Export for Vercel serverless functions
module.exports = app;

//Start server only when running locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running locally on http://localhost:${PORT}`)
  );
}

