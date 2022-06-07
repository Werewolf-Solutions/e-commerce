// Load Product model
const Product = require('../models/Product')

// Load User model
const User = require('../models/User')

/**
 * 
 * @desc    get all products
 * @route   GET /users/products
 * @access  Public
 * @params  -
 * @returns products
 */
const getProducts = async (req, res, next) => {
    let products = await Product.find()
    // console.log(products)
    if (products) {
        res.send({products})
    } else {
        res.send({msg: 'Add product'})
    }
}

/**
 * 
 * @desc    create product
 * @route   POST /users/create-product
 * @access  Private
 * @params  product: category, name, description, price
 * @returns product, msg
 */
const createProduct = async (req, res, next) => {
    let {product} = req.body
    let {name, price, description, category} = product
    const { userId } = req.session
    let user = await User.findById(userId)
    if (user && user.admin) {
        let new_product = new Product({name, price, description, category, quantity: 0})
        await new_product.save()
        res.send({msg: 'New product added!', product: new_product})
    } else {
        res.send({msg: 'Please sign in as admin or make an account'})
    }
}

/**
 * 
 * @desc    update product
 * @route   POST /users/update-product
 * @access  Private
 * @params  product: category, name, description, price
 * @returns product, msg
 */
const updateProduct = async (req, res, next) => {
    let {product} = req.body
    let {_id, name, price, description, category, img} = product
    let item = await Product.findById({_id: _id})
    console.log(item)
    const { userId } = req.session
    let user = await User.findById(userId)
    if (user && user.admin) {
        if (name && name != item.name) {
            item.name = name
        }
        if (description && description != item.description) {
            item.description = description
        }
        if (price && price != item.price) {
            item.price = price
        }
        if (category && category != item.category) {
            item.category = category
        }
        if (img && img != item.img) {
            item.img = img
        }
        await item.save()
        res.send({msg: 'Item updated!', item})
    } else {
        res.send({msg: "Please sign in as admin or make an account or missing product"})
    }
}


/**
 * 
 * @desc    delete product
 * @route   POST /users/delete-product
 * @access  Private
 * @params  product: _id
 * @returns product, msg
 */
const deleteProduct = async (req, res, next) => {
    let {product} = req.body
    const { userId } = req.session
    let user = await User.findById(userId)
    if (user && user.admin && product) {
        await Product.findByIdAndDelete(product._id)
        res.send({msg: 'Item deleted!'})
    } else {
        res.send({msg: 'Please sign in as admin or make an account or missing product'})
    }
}

/**
 * 
 * @desc    upload img
 * @route   POST /users/upload-img
 * @access  Private
 * @params  img from input file
 * @returns img path, mimetype, filename, msg
 */
const uploadImg = async (req, res, next) => {
    // console.log(req.file)
    if (!req.file) {
      res.send({msg: 'No file uploaded'})
    } else {
      res.send({msg: 'Image uploaded', img: {
        path: req.file.path,
        mimetype: req.file.mimetype,
        filename: req.file.filename
      }})
    }
    // let buffer = fs.readFileSync(imgPath)
    // let new_product = await Product.findById(product._id)
    // new_product.img.data = buffer
    // new_product.img.contentType = 'image/png'
    // await new_product.save()
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    uploadImg
}