const mongoose =  require('mongoose')




const Registration = mongoose.Schema(
    {
        regNo: {
            type: String,
            required: true

        },
        year: {
            type: String,
            required: true

        },
        make: {
            type: String,
            required: true

        },
        bodyType: {
            type: String,
            required: true,

        },
        capacity: {
            type: Number,
            required: true
        },
        model: {
            type: String,
            required: true

        },
        engine: {
            type: String,
            required: true

        },
    }
)





module.exports = mongoose.model('Registration', Registration);