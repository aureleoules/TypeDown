// module.exports = function(env) {
//   if(process.env.NODE_ENV === 'prod') {
//       return require('./webpack.prod.js');
//   }
//   return require(`./webpack.dev.js`)
// }

module.exports = require(`./webpack.dev.js`);
