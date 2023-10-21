const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    stdId: { type: String, required: true },
    name: String,
    yos: String,
    dob: String,
    email: String,
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
