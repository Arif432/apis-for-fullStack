const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"]
    },
    price: {
        type: Number,
        required: [true, "please provide name"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        // enum :['ikea','liddy','marcos','caressa']
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            message: "{VALUE} is'nt supported"
        }
    }
})

module.exports = mongoose.model("all-items", productSchema)