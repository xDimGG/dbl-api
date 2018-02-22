const Bot = require('./Bot');

class Results {
	constructor(data) {
		/**
		 * The returned bots
		 * @type {Bot[]}
 		 */
		this.bots = data.bots.map(bot => new Bot(bot));

		/**
		 * The amount of bots displayed per page
		 * @type {number}
		 */
		this.limit = data.limit;

		/**
		 * The amount of bots skipped
		 * @type {number}
		 */
		this.offset = data.offset;

		/**
		 * The amount of bots on the current page
		 * @type {number}
		 */
		this.count = data.count;

		/**
		 * The total number of bots that match your query
		 * @type {number}
		 */
		this.total = data.total;
	}
}

module.exports = Results;