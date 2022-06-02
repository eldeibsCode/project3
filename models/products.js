const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save(){
       const p = path.join(require.main.path, 'data', 'products.json');
       console.log('Pp:', p);
       let products = [];
       fs.readFile(p, (err, fileContent) => {
           if(!err){
                products = JSON.parse(fileContent);
           }
           products.push(this);
           fs.writeFile(p, JSON.stringify(products), (err) =>{
               console.log(err);
           });
       });
    }

    static fetchAll(cb){
        const p = path.join(require.main.path, 'data', 'products.json');
        console.log('Pp:', p);
        fs.readFile(p, (err, fileContent) =>{
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}