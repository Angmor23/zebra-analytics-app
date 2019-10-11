const path = require('path');

module.exports = {
	root: path.resolve(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	include: /node_modules\/((@paradigm|@media-platform|@media-ui)\/).*/,
};
