const fs = require('fs');
const path = require('path');

const p = path.join(require.main.path, 'data', 'products.json');

const getProductsFromFile = cb => {   
        fs.readFile(p, (err, fileContent) =>{
            if(err || fileContent ==''){
                cb([]);
            }else{
                cb(JSON.parse(fileContent));
                // console.log(JSON.parse(fileContent));
            }
        });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        this.id = Math.random().toString();
        getProductsFromFile( products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) =>{
                console.log(err);
            });
        });
    }

    static fetchAll (cb) {
        getProductsFromFile(cb)
    }
}