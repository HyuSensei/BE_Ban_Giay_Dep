const db = require("../../models/index");

const getProductHome = async (req, res) => {
  try {
    let product1 = await db.Product.findAll({
      where: {
        CategoryId: 1,
      },
    });
    let product2 = await db.Product.findAll({
      where: {
        CategoryId: 2,
      },
    });
    res.status(200).json({
      success: true,
      message: "Sản phẩm trang chủ !",
      product1: product1,
      product2: product2,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await db.Product.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductDetailCart = async (req, res) => {
  try {
    let id = req.params.id;
    let StorageId = req.params.storage_id;
    let product = await db.Product.findOne({
      include: [
        {
          model: db.Color,
          attributes: ["name"],
        },
        {
          model: db.Price,
          attributes: ["id", "StorageId", "ProductId", "price_product"],
          include: {
            model: db.Storage,
            attributes: ["name"],
          },
          where: {
            StorageId: StorageId,
          },
        },
      ],
      where: {
        id: id,
      },
    });
    res.status(200).json({
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductHome,
  getProductDetail,
  getProductDetailCart,
};
