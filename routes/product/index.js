const productModel = require('../../models').Product;
const Router = require('express').Router;
const router = new Router();

router.post('/add-product', async (req, res) => {
  const { productName, productCategory, productPrice } = req.body;
  if (!productName) return res.status(400).send({ error: '`productName` is required' });
  if (!productCategory) return res.status(400).send({ error: '`productCategory` is required' });
  if (!productPrice) return res.status(400).send({ error: '`productPrice` is required' });
  try {
    const data = await productModel.findOneByName(productName, productCategory)
    if (data) return res.status(500).send({ error: '`product` is already added' })
    else {
      await productModel.create(req.body)
      return res.status(200).send({ code: 200, status: 'success' })
    }
  }
  catch (error) {
    let message = error.message;
    res.status(500).send({ code: 500, status: 'failed', error, message });
    throw error;
  }
});
router.get('/:product_id', (req, res) => {
  return productModel.listProductById(req.params.product_id)
    .then(product => {
      if (product)
        return res.status(200).send({ code: 200, status: 'success', product: product });
      else
        return res.status(400).send({ code: 400, status: 'failed', message: "Product Id not Exist" });
    })
    .catch(error => {
      let message = error.message;
      if (error.code === 20404) message = 'Invalid credentials';
      res.status(500).send({ code: 500, status: 'failed', error, message });
      throw error;
    });
});
router.delete('/:productID', (req, res) => {
  const { productID } = req.params;
  return productModel.deleteProductByID(productID).then(() => {
    return res.status(200).send({ code: 200, status: 'success' });
  })
    .catch(error => {
      let message = error.message;
      res.status(500).send({ code: 500, status: 'failed', error, message });
      throw error;
    });
});
router.post('/get-list', (req, res) => {
  const { offset, limit } = req.body;
  if (typeof (offset) === 'number' && offset < 0) return res.status(400).send({ error: '`offset` is required' });
  if (!limit) return res.status(400).send({ error: '`limit` is required' });
  return productModel.listProduct(offset, limit)
    .then(product => {
      return res.status(200).send({ code: 200, status: 'success', product: product });
    })
    .catch(error => {
      let message = error.message;
      if (error.code === 20404) message = 'Invalid credentials';
      res.status(500).send({ code: 500, status: 'failed', error, message });
      throw error;
    });
});
router.put('/update-product', async (req, res) => {
  const { id } = req.body
  if (!id) return res.status(400).send({ code: 400, status: "failed", message: "id is required" })
  try {
    await productModel.updateProductByID(id, req.body)
      return res.status(200).send({ code: 200, status: "success", message: "Product Updated successfully" })
  } catch (err) {
    console.error(err)
    return res.send(err.message)
  }

})

router.post('/search-product',async(req,res)=>{
  const {hashtags} = req.body
  if(!hashtags) return res.status(400).send({ code: 400, status: "failed", message: "hastag is required" })
  try{
    const result =  await productModel.searchProductByhastag(hashtags);
    return res.status(200).send({ code: 200, status: "success", product: result })
  } catch (err) {
    console.error(err)
    return res.send(err.message)
  }

})

module.exports = router;
