
const Product  = require('../../../models/epharmacy_models/product_model/product_model');
const Helper = require('../../../util/helpers')

const helper = new Helper()

//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

  helper.log(req)
  
  try {

    const { productId } = req.params;

    const product = await Product.findOne({where : {productId: productId}})

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    return res.status(200).json({ message: 'Product deleted successfully' });
    
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });

  }
};