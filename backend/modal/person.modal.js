const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    // destination: { type: String, required: true },
    // filename: { type: String, required: true },
    // path: { type: String, required: true },
    data: { type: Buffer, required: true }, 
    size: { type: Number, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true }, 
});


const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    residentialAddress: {
        street1: { type: String, required: true },
        street2: { type: String },
    },
    permanentAddress: {
        street1: { type: String, required: true },
        street2: { type: String },
    },
    files: [FileSchema], 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
