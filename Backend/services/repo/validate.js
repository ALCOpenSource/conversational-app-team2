exports.username = async (model, payload) => {
  const exists = model.findOne({ username: payload });
  return exists;
};

exports.email = async (model, payload) => {
  const exists = model.findOne({ email: payload });
  return exists;
};
