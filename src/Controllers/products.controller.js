import ProductModel from "../Models/product.model.js";

export class productControlller {
  getProducts(req, res) {
    let products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  getAddForm(req, res) {
    return res.render("productForm", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  addNewProduct(req, res) {
    const { name, price, desc } = req.body;
    const imageUrl = "Images/" + req.file.filename;
    ProductModel.addProduct(name, price, desc, imageUrl);
    let products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  getProductbyId(req, res, next) {
    const id = req.params.id;
    const product = ProductModel.getById(id);

    if (product) {
      return res.render("update-product", {
        product: product,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.send("Product not found");
    }
  }

  updateProduct(req, res) {
    ProductModel.updateProductbyNew(req.body);
    let products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getById(id);
    console.log("here");
    if (!product) {
      res.send("Product not found");
    }

    ProductModel.deleteThisProduct(id);
    let products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }
}
