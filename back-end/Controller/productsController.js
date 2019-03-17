const data = require("../mockData.json");
const productModel = require("../Model/productsModel");

exports.initializeData = () => {
  console.log("asdsadsa");
  data.forEach(item => {
    let prodect = new productModel();

    prodect.imageUrl = item.imageUrl;
    prodect._id = item._id;
    prodect.product = item.product;
    prodect.price = item.price;
    prodect.inStock = item.inStock;

    prodect.save();
    console.log(prodect);
  });
};

exports.getProducts = (req, res) => {
  try {
    productModel
      .aggregate([
        { $skip: req.body.skip },
        { $sort: { _id: 1 } },
        { $limit: 10 },
        { $match: {} }
      ])
      .exec((err, docs) => {
        res.send(docs);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.filterProducts = (req, res) => {
  try {
    productModel
      .aggregate([
        { $skip: req.body.skip },
        { $sort: { _id: 1 } },
        { $limit: 10 },
        { $match: { product: { $regex: req.body.search } } }
      ])
      .exec((err, docs) => {
        res.send(docs);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
