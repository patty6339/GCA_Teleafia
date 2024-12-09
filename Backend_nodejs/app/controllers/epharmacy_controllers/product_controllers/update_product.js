const Product = require('../../../models/epharmacy_models/product_model/product_model');
const Helper = require('../../../util/helpers')

const helper = new Helper()

// UPDATE PRODUCTS
exports.updateProduct = async (req, res) => {

  helper.log(req)

  const { productId } = req.params;
  const { name,category,description,price,image } = req.body;

  try {
    const product = await Product.findOne({ where: { productId: productId } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    

    await product.update({
      name: name,
      category: category,
      description: description,
      price: price,
      image: image,
    });

    return res.status(200).json({ message: 'Product updated successfully', product });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
