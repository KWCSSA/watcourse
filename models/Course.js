const mongoose = require('mongoose');
const { Schema } = mongoose;
const courseSchema = new Schema({
	subject: String,
	catalogNumber: String,
	title: String,
	term: Number,
	lastUpdated: Number
});
courseSchema.index({ term: -1 });

mongoose.model('course', courseSchema);
