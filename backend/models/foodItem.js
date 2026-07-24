const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter food item name"],
        trim: true,
        maxLength: [100, "Food_item name can't more than 100"]
    },
    price: {
        type: Number,
        required: [true, "please enter price"],
        maxLength: [5, "Food_item price can't more than 5"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "please enter desc"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        pubilc_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    }],
    menu: {
        type: mongoose.Schema.ObjectId,
        ref: "Menu"
    },
    stock: {
        type: Number,
        required: [true, "Please enter food_item stock"],
        maxLength: [5, "Food_items stock can't be more than 5"],
        default: 0
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
        Comment: {
            type: String,
            required: true,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("FoodItem", foodSchema);
//fooditems
