const express=require('express');
const path=require('path');
const productRouter=require('./routes/product');
const Product=require('./models/product');
const sequelize=require('./utils/database');
const bodyParser=require('body-parser');

const app=express();

const p=path.dirname(process.mainModule.filename);

app.use(express.static(path.join(p,'public')));
app.use(bodyParser.json({extended:true}));



app.use(productRouter);

//{force:true}
sequelize.sync({force:true})
.then((result)=>{
    return Product.findByPk(1);
})
.then((product)=>{
    if(!product)
    {
       return Product.create({itemName:"pen",price:21});
    }
    return product;
})
.then(()=>{
    console.log('listening')
    app.listen(3300);
})
.catch((err)=>{
    console.log(err);
})