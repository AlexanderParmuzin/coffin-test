const mongoose = require("mongoose");

module.exports = async function connectionFactory(connectUrl) {
  const connection = await mongoose.connect(connectUrl);

  connection.models.User = connection.model("User", require("./schemas/user"));

  return connection;
}
