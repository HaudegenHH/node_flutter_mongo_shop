const mongoose = require('mongoose')

const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            categoryName: {
                type: String,
                required: true,
                unique: true
            },
            categoryDescription: {
                type: String,
                required: false,
            },
            categoryImage: {
                type: String,
            }
        },
        {
            toJSON: {
                transform: function(doc, ret) {                    
                    // unique _id that mongodb gives each document
                    ret.categoryId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                } 
            }
        } 
    )
)

module.exports = {
    category
}