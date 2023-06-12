const express=require('express');

const productController=require('../controllers/product');

const router=express.Router();

router.get('/',productController.displayHome);
router.get('/getProducts',productController.getProducts);
router.post('/addProduct',productController.addProducts);
router.get('/deleteProduct/:id',productController.deleteProducts);


module.exports=router;