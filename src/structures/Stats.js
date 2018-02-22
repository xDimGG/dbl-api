class Stats {
	constructor(data) {
		/**
		 * The amount of servers a bot's in per shard
		 * @type {number[]}
		 */
		this.shards = data.shards;

		/**
		 * The amount of shards a bot has
		 * @type {number?}
		 */
		this.shardCount = data.shard_count || null;

		/**
		 * The amount of servers a bot's in
		 * @type {number?}
		 */
		this.serverCount = data.server_count || null;
	}
}

module.exports = Stats;