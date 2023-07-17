import mongoose from "mongoose";

const inspectionSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true,
        },
        certificate_number: {
            type: Number,
            unique: true,
            required: true,
        },
        business_name: {
            type: String,
            unique: true,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        result: {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            required: true,
        },
        address: {
            city: {
                type: String,
                required: true
            },
            zip: {
                type: Number,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            }
        },
    },
    {
        timestamp: true,
    })

const Inspection = mongoose.models.Inspection || mongoose.model('Inspection', inspectionSchema)

export default Inspection;