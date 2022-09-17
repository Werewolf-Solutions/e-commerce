const axios = require("axios");

/**
 *
 * @desc    get all products
 * @route   GET /users/products
 * @access  Public
 * @params  -
 * @returns products
 */
export async function getProducts() {
  let res = await axios.get("users/products");
  return res.data.products;
}

/**
 *
 * @desc    create product
 * @route   POST /users/create-product
 * @access  Private
 * @params  product: category, name, description, price
 * @returns product, msg
 */
export async function createProduct(product) {
  let res = await axios.post("users/create-product", { product });
  // console.log(res.data)
  return res.data.product;
}

/**
 *
 * @desc    update product
 * @route   POST /users/update-product
 * @access  Private
 * @params  product: category, name, description, price
 * @returns product, msg
 */
export async function updateProduct(product) {
  let res = await axios.post("users/update-product", { product });
  // console.log(res.data)
}

/**
 *
 * @desc    delete product
 * @route   POST /users/delete-product
 * @access  Private
 * @params  product: _id
 * @returns product, msg
 */
export async function deleteProduct(product) {
  let res = await axios.post("users/delete-product", { product });
  // console.log(res.data)
}

/**
 *
 * @desc    upload img
 * @route   POST /users/upload-img
 * @access  Private
 * @params  img from input file
 * @returns img path, mimetype, filename, msg
 */
export async function uploadImg(file, product) {
  // Create an object of formData
  const formData = new FormData();

  // Details of the uploaded file
  // console.log(file)

  // Update the formData object
  formData.append("file", file, file.name);

  // Request made to the backend api
  // Send formData object
  // let res = await axios.post("/users/upload-img",
  //     {product: props.product, file, formData})
  let res = await axios.post("users/upload-img", formData);
  // console.log(res.data)
  let { img } = res.data;
  product.img = img;
  // console.log(product)
  let response = await axios.post("users/update-product", { product });
  // console.log(response.data)
}

/**
 *
 * @desc    update category
 * @route   POST /users/update-category
 * @access  Private
 * @params  category
 * @returns products, msg
 */
export async function updateCategory(category, new_category) {
  let res = await axios.post("users/update-category", {
    category,
    new_category,
  });
  // console.log(res.data)
}
