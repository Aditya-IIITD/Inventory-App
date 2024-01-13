import express from "express";
import { productControlller } from "./src/Controllers/products.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middlewares/validationMiddleware.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import userController from "./src/Controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const server = express();

server.use(cookieParser());
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(express.static("Public"));
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "Views"));

server.use(ejsLayouts);
server.use(express.urlencoded({ extended: true }));

const controller = new productControlller();
const user = new userController();
server.get("/register", user.getRegister);
server.get("/login", user.getLogin);
server.get("/", setLastVisit, auth, controller.getProducts);
server.get("/new", auth, controller.getAddForm);
server.get("/logout", user.logout);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  controller.addNewProduct
);
server.get("/update-product/:id", auth, controller.getProductbyId);
server.post("/update-product", auth, controller.updateProduct);
server.post("/delete-product/:id", auth, controller.deleteProduct);
server.post("/register", user.addUser);
server.post("/login", user.userLogin);

server.use(express.static("src/Views"));

server.listen(3400, () => {
  console.log("Server is listening to 3400");
});
