const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Person', // assuming your user model is named Person
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // adds createdAt and updatedAt
});

module.exports = mongoose.model('Expense', expenseSchema);
