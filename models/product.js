const Sequelize=require('sequelize');

const db=require('../utils/database');

const Product=db.define('product',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    itemName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

});

module.exports=Product;