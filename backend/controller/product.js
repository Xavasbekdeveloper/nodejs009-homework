import { Products, validateProduct } from "../models/productSchema.js";

class ProductsController {
  async get(req, res) {
    try {
      const products = await Products.find()
        .populate([{ path: "userId", select: ["fname", "username"] }])
        .sort({ createdAt: -1 });
      if (!products.length) {
        return res.status(400).json({
          msg: "Product is not defined",
          variant: "error",
          payload: null,
        });
      }
      const total = await Products.countDocuments();
      res.status(200).json({
        msg: "All products",
        variant: "success",
        payload: products,
        total,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  //   async create(req, res) {
  //     try {
  //       let urls = req.files.map(
  //         (i) => `${req.protocol}://${req.get("host")}/upload/${i.filename}`
  //       );
  //       let newProduct = {
  //         title: req.body.title,
  //         price: req.body.price,
  //         oldPrice: req.body.oldPrice,
  //         desc: req.body.desc,
  //         info: req.body.info,
  //         category: req.body.category,
  //         rating: req.body.rating,
  //         urls,
  //         available: req.body.available,
  //         stock: req.body.stock,
  //       };
  //       const { error } = validateProduct(newProduct);
  //       if (error) {
  //         return res.status(400).json({
  //           msg: error.details[0].message,
  //           variant: "warning",
  //           payload: null,
  //         });
  //       }
  //       const product = await Products.create(newProduct);
  //       res.status(201).json({
  //         msg: "Product is created",
  //         variant: "success",
  //         payload: product,
  //       });
  //     } catch {
  //       res.status(500).json({
  //         msg: "Server error",
  //         variant: "error",
  //         payload: null,
  //       });
  //     }
  //   }

  async create(req, res) {
    try {
      const urls = req.files.map(
        (i) => `${req.protocol}://${req.get("host")}/upload/${i.filename}`
      );

      let newProduct = { ...req.body, urls };

      const { error } = validateProduct(newProduct);

      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }

      const product = await Products.create(newProduct);

      return res.status(201).json({
        msg: "Product is created",
        variant: "success",
        payload: product,
      });
    } catch {
      return res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new ProductsController();
