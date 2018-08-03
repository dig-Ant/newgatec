const multiparty = require('multiparty');

const getFileFromRequest = (key,req) => new Promise((resolve, reject) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) reject(err);
    const file = files[key][0]; // get the file from the returned files object
    console.log(fields);
    if (!file) reject('File was not found in form data.');
    else resolve(file);
  });
});
module.exports = getFileFromRequest;