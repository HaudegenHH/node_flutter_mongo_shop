const { MONGO_DB_CONFIG } = require('../config/app.config')
const { category } = require('../models/category.model')

// params and cb will be used inside the controller
async function createCategory(params, callback) {
    if(!params.categoryName) {
        return callback({
            message: "Category Name required"
        }, "")
    }

    const model = new category(params)
    model.save()
    .then(response => {
        return callback(null, response)
    }).catch(error => {
        return callback(error)
    })
}

async function getCategories(params, callback) {
    const categoryName = params.categoryName
    // fetching with help of regex only the records that match categoryName
    var condition = categoryName 
    ? {categoryName: { $regex: new RegExp(categoryName), $options: "i"},}
    : {}
     
    // pagination (default page size will be 10)
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE

    let page = (Math.abs(params.page) || 1) - 1

    // since categoryId will come by default, you only have to define
    // categoryName and cImage as the columns that you want back
    category
    .find(condition, 'categoryName categoryImage')
    .limit(perPage)
    .skip(perPage * page)
    .then(response => {
        return callback(null, response)
    }).catch(error => {
        return callback(error)
    })

}

async function getCategoryById(params, callback) {
    const categoryId = params.categoryId
    
    category
    .findById(categoryId)
    .then(response => {
        if(!response) {
            callback(`Category not found with id: ${categoryId}`)
        } else {
            callback(null, response)
        }
    }).catch(error => {
        return callback(error)
    })
}

async function updateCategory(params, callback) {
    const categoryId = params.categoryId
    
    category
    .findByIdAndUpdate(categoryId, params, {useFindAndModify: false})
    .then(response => {
        if(!response) {
            callback(`Category not found with id: ${categoryId}`)
        } else {
            callback(null, response)
        }
    }).catch(error => {
        return callback(error)
    })
}

async function deleteCategory(params, callback) {
    const categoryId = params.categoryId
    
    category
    .findByIdAndDelete(categoryId)
    .then(response => {
        if(!response) {
            callback(`Category not found with id: ${categoryId}`)
        } else {
            callback(null, response)
        }
    }).catch(error => {
        return callback(error)
    })
}


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}