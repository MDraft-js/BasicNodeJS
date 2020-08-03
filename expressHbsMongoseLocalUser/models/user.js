const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: "Course",
                    required: true,
                }
            }
        ],
    }
})

userSchema.methods.addToCart = function (course) {
    let items = [...this.cart.items]
    const indx = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })

    if (indx >= 0) {
        items[indx].count = items[indx].count + 1;
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = {items: items}
    return this.save()
}

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]
    const indx = items.findIndex(item => item.courseId.toString() === id.toString())
    if (items[indx].count === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[indx].count--
    }

    this.cart = { items };
    this.save()
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save()
}

module.exports = model('User', userSchema)