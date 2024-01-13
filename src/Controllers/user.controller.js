import ProductModel from "../Models/product.model.js";
import UserModel from "../Models/user.model.js";

export default class userController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }

  addUser(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("login", { errorMessage: null });
  }

  userLogin(req, res) {
    const { email, password } = req.body;
    const users = UserModel.get();

    const credentials = users.find(
      (person) => person.email === email && person.password === password
    );

    if (!credentials) {
      return res.render("login", { errorMessage: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    const products = ProductModel.get();
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
    res.clearCookie("lastVisit");
  }
}
