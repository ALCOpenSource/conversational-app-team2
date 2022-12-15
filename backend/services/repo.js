/* Not used at the moment */
exports.username = (model, payload) => {
  const exists = model.findOne({ username: payload });
  return exists;
};

exports.email = (model, payload) => {
  const exists = model.findOne({ email: payload });
  return exists;
};
