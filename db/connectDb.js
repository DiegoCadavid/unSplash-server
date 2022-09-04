const moongose = require('mongoose');
const connectDb = async () => {
    await moongose.connect(process.env.MONGODB__URL);
}

module.exports = connectDb;