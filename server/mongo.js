const mongoose = require('mongoose');

exports.connect = async (settings) => {

  try {

    const url = `mongodb+srv://ashok:ashok@cluster0.lw48m.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(url);
    console.log('Connected to MongoDB');

  }
  catch (err) {

    console.error(err);

  }
}