const path = require('path');

// eprecated
// module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename);