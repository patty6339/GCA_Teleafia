
const Product  = require('../../../models/epharmacy_models/product_model/product_model');
const Helper = require('../../../util/helpers')

const helper = new Helper()

//GET SINGLE PRODUCT
exports.getOneProduct = async (req, res) => {

  helper.log(req)

  try {

    const { id } = req.params

    const product = await Product.findOne({ where : { productId: id }})

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });

  }
};