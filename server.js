var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

var mongoos = require('mongoose');

var product = require('./product');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.port || 8090;

var router = express.Router();


app.use(cors());

app.use('/api', router);

app.listen(port);

console.log('REST API is running at port : ' + port);

mongoos.connect('mongodb://localhost:27017/products');


router.use(function (req, res, next) {
    console.log('Loggin of request will be done here.');
    next();
});

//Insert Product
router.route('/products').post(function (req, res) {
    var p = new product();
    p.title = req.body.title;
    p.price = req.body.price;
    p.instock = req.body.instock;
    p.photo = req.body.photo;
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Product Created !' })
    })
});


//Get All Product
router.route('/products').get(function (req, res) {
    product.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.send(products)
    });
});

//Get Product By Id
router.route('/products/:product_id').get(function (req, res) {

    product.findById(req.params.product_id, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    })
});

//Update Product
router.route('/products/:product_id').put(function (req, res) {
    product.findById(req.params.product_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.title = req.body.title;
        prod.price = req.body.price;
        prod.instock = req.body.instock;
        prod.save(function (err) {
            if (err)
                res.send(err);
            res.json({message:'Product Updates'});
        });
    });
});

//Delete Product
router.route('/products/:product_id').delete(function(req,res){
    product.remove({_id:req.params.product_id},function(err,prod){
        if(err){
            res.send(err);
        }
        res.json({message : 'Successfully Deleted'});
    });
});