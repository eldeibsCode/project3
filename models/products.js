const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        if(!this.id){
            return db.execute(`INSERT INTO project3.products (title, price, description, imageUrl) VALUES ("${this.title}", ${this.price}, "${this.description}", "${this.imageUrl}")`);
        }else{
            return db.execute(`INSERT INTO project3.products (id, title, price, description, imageUrl) VALUES (${this.id}, "${this.title}", ${this.price}, "${this.description}", "${this.imageUrl}")`);
        }   
    }

    static deleteById(id){
    
    }

    static fetchAll () {
        return db.execute('SELECT * FROM products');
    }

    static findById(id, cb){
        
    }
}