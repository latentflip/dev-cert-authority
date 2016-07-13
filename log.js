module.exports.ok = function (str) {
  console.log(` ✅  ${str}`);
};

module.exports.wait = function (str) {
  console.log(` ⏳  ${str}`);
};

module.exports.success = function (str) {
  console.log(` 🎉  ${str}`);
};

module.exports.warn = function (str) {
  console.log(` ⚠️ ${str}`);
};
