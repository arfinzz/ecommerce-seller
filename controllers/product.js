const Product=require('../models/product');
const path=require('path');



exports.displayHome=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','index.html'));
};

exports.getProducts=(req,res,next)=>{
    Product.findAll()
    .then(products=>{
        res.json(products);
    })
};

exports.addProducts=(req,res,next)=>{
    console.log(req.body);
    Product.create({itemName:req.body.itemName,price:req.body.price})
    .then(()=>{
        res.json({statue:"ok"});
    })
    .then(err=>{
        console.log(err);
    });
    
};

exports.deleteProducts=(req,res,next)=>{
    const idToDelete=req.params.id;
    Product.findAll({where:{
        id:idToDelete
    }})
    .then(product=>{
        return product[0].destroy();
    })
    .then(()=>{
        res.json({statue:"ok"});
    })
    .then(err=>{
        console.log(err);
    })
    
};