const mongoose = require('mongoose');
const { Schema } =  mongoose;
const courseSchema = new Schema({
  course_id: String,
  subject: String,
  catalog_number: String,
  title: String,
});

mongoose.model('course', courseSchema);