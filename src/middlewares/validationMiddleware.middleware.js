import { body, validationResult } from "express-validator";

const validationMiddleware = async (req, res, next) => {
  //rules
  const rules = [
    body("name").isLength({ min: 1 }).withMessage("Name is invalid"),
    body("price")
      .isInt({ gt: 0 })
      .withMessage("Price must be a positive value"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }

      return true;
    }),
  ];

  //run validator
  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  //check for errors
  if (!validationErrors.isEmpty()) {
    return res.render("productForm", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
};

export default validationMiddleware;
