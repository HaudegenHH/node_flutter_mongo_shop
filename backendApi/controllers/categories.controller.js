const categoryService = require('../services/category.service')
const upload = require('../middleware/category.upload')

exports.create = (req, res, next) => {
    upload(req, res, function(err) {
        if(err) {
            next()
        } else {
            const path = req.file != undefined 
            ? req.file.path.replace(/\\/g, '/')  // replacing backslash with slash
            : ''

            var model = {
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription,
                categoryImage: path != "" ? "/" + path : ""
            }

            categoryService.createCategory(model, (error, results) => {
                if(error) {
                    return next(error)
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    })
                }
            })
        }
    })
}

exports.findAll = (req, res, next) => {
    var model = {
        categoryName: req.query.categoryName,
        pageSize: req.query.pageSize,
        page: req.query.page
    }

    categoryService.getCategories(model, (error, results) => {
        if(error) {
            return next(error)
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    })

}

// /api/categories/id
exports.findOne = (req, res, next) => {
    var model = {
        categoryId: req.params.id,
    }

    categoryService.getCategoryById(model, (error, results) => {
        if(error) {
            return next(error)
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    })
}

exports.update = (req, res, next) => {
    upload(req, res, function(err) {
        if(err) {
            next()
        } else {
            const path = req.file != undefined 
            ? req.file.path.replace(/\\/g, '/')  // replacing backslash with slash
            : ''

            var model = {
                categoryId: req.params.id,
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription,
                categoryImage: path != "" ? "/" + path : ""
            }

            categoryService.updateCategory(model, (error, results) => {
                if(error) {
                    return next(error)
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results,
                    })
                }
            })
        }
    })
}

exports.delete = (req, res, next) => {
    var model = {
        categoryId: req.params.id,
    }

    categoryService.deleteCategory(model, (error, results) => {
        if(error) {
            return next(error)
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            })
        }
    })

}