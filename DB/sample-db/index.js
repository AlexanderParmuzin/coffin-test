const mongoose = require("mongoose");

module.exports = async function connectionFactory(connectUrl) {
  const connection = await mongoose.connect(connectUrl);

  connection.models.User = connection.model("User", require("./schemas/user"));
  // connection.models.Company = connection.model("Company", require("./schemas/companies"));

  return connection;
}
