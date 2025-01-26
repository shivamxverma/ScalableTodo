const mongoose = require('mongoose');

async function Connect(url){
  await mongoose.connect(url)
    .then(()=>{console.log('Mongodb is Connected')});
}

module.exports = {
  Connect
}