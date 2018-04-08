const Results = require('./structures/Results');
const Profile = require('./structures/Profile');
const Stats = require('./structures/Stats');
const User = require('./structures/User');
const Bot = require('./structures/Bot');

const { EventEmitter } = require('events');
const Constants = require('./Constants');
const Snekfetch = require('snekfetch');
const Util = require('./Util');
const http = require('http');

/** @extends {EventEmitter} */
class Client extends EventEmitter {
	/**
	 * @typedef {Object} ClientOptions
	 * @prop {string} [id] Your bot's ID
	 * @prop {string} [token] Your DBL token
	 * @prop {string} [base] API Base
	 * @prop {number} [port] The port for the server to listen to. Not necessary if you don't want the server functionality
	 * @prop {string} [path=/] The path to accept requests on
	 */

	/**
	 * @param {ClientOptions} options Options for the client.
	 */
	constructor({ id, token, base = `${Constants.base}/api`, port, path = '/' } = {}) {
		super();
		this.id = id;
		this.token = token;
		this.base = base;

		if (port) {
			this.path = path;
			this.server = http.createServer(this.handler);
			this.server.listen(port);
		}
	}

	/**
	 * Fetch an endpoint.
	 * @param {string} endpoint The endpoint to fetch
	 * @param {boolean} [authorized=false] Whether to authorize this request
	 * @param {string} [method=GET] The request method
	 * @returns {Snekfetch} The request
	 */
	fetch(endpoint, authorized = false, method = 'GET') {
		const request = new Snekfetch(method, `${this.base}${endpoint}`);
		if (authorized) request.set('Authorization', this.token);

		return request;
	}

	/**
	 * Fetch a user's information.
	 * @param {string} id The user's ID
	 * @returns {Promise<Profile>} The user
	 */
	fetchUser(id) {
		if (!id) return Promise.reject(new TypeError('No ID Provided'));

		return this
			.fetch(`/users/${id}`)
			.then(res => new Profile(res.body));
	}

	/**
	 * Fetch a bot's information.
	 * @param {string} [id=this.id] The bot's id
	 * @returns {Promise<Bot>} The bot
	 */
	fetchBot(id = this.id) {
		if (!id) return Promise.reject(new TypeError('No ID Provided'));

		return this
			.fetch(`/bots/${id}`)
			.then(res => new Bot(res.body));
	}

	/**
	 * @typedef {Object} SearchOptions
	 * @prop {number} [limit=10] The maximum amount of bots to display
	 * @prop {number} [offset=0] The amount of bots to ski[]
	 * @prop {string} [search] A custom search query (i.e. "library:discord.js starboard")
	 * @prop {string} [sort] What to sort the bots by
	 * @prop {string|string[]} [fields] A list of fields to show (i.e. "id,disciminator,username")
	 */

	/**
	 * Fetch bots.
	 * @param {SearchOptions} [options] Search options
	 * @returns {Promise<Results>} Results
	 */
	fetchBots({ limit = 10, offset = 0, search, sort, fields } = {}) {
		return this
			.fetch('/bots')
			.query({ limit, offset, search, sort, fields: Array.isArray(fields) ? fields.join() : fields })
			.then(res => new Results(res.body));
	}

	/**
	 * @typedef {Object} VoteOptions
	 * @prop {boolean} [id=this.id] The bot's ID
	 * @prop {boolean} [onlyids=false] Whether to return profiles or just user ids
	 * @prop {number} [days] The number of days to limit the upvotes to [0-31]
	 */

	/**
	 * Fetch votes.
	 * @param {VoteOptions} [options] Options
	 * @returns {string[]|User[]} Returns either an array of ids or users depending on `onlyids`
	 */
	fetchVotes({ id = this.id, onlyids = false, days = '' } = {}) {
		if (!id) return Promise.reject(new TypeError('No ID Provided'));

		return this
			.fetch(`/bots/${id}/votes`, true)
			.query({ onlyids, days })
			.then(res => onlyids ? res.body : res.body.map(user => new User(user)));
	}

	/**
	 * Fetch stats.
	 * @param {string} [id=this.id] The bot's ID
	 * @returns {Promise<Stats>} Stats
	 */
	fetchStats(id = this.id) {
		if (!id) return Promise.reject(new TypeError('No ID Provided'));

		return this
			.fetch(`/bots/${id}/stats`)
			.then(res => new Stats(res.body));
	}

	/**
	 * Check if a user has upvoted.
	 * @param {string} userId The user's ID
	 * @param {string} [id=this.id] The bot's ID
	 * @returns {Promise<boolean>} A boolean based on if the user has upvoted
	 */
	hasVoted(userId, id = this.id) {
		if (!userId) return Promise.reject(new TypeError('No user ID Provided'));
		if (!id) return Promise.reject(new TypeError('No bot ID Provided'));

		return this
			.fetch(`/bots/${id}/check`, true)
			.query({ userId })
			.then(res => Boolean(res.body.voted));
	}

	/**
	 * @typedef {Object} StatsData
	 * @prop {string} [id=this.id] The bot's ID
	 * @prop {number|number[]} [serverCount] The amount of servers the bot's in. Act's like `shards` if it's an array
	 * @prop {number[]} [shards] The amount of servers the bot's in per shard
	 * @prop {string} [shardID] The index of the shard that's sending data
	 * @prop {number} [shardCount] The amount of servers the shard has
	 */

	/**
	 * Fetch stats.
	 * @param {StatsData} data Stats data
	 * @returns {Promise<boolean>} True if the request went through
	 */
	updateStats({ id = this.id, serverCount = null, shards = null, shardID = null, shardCount = null } = {}) {
		if (!id) return Promise.reject(new TypeError('No ID Provided'));

		return this
			.fetch(`/bots/${id}/stats`, true, 'POST')
			.send({ server_count: serverCount, shards, shard_id: shardID, shard_count: shardCount })
			.then(() => true);
	}

	/**
	 * Request handler for the server.
	 * @param {Object} request Request Object
	 * @param {Object} response Response Object
	 * @returns {void}
	 * @private
	 */
	get handler() {
		return async (request, response) => {
			const end = code => {
				response.writeHead(code);
				response.end();
			};

			if (this.path && request.url !== this.path)
				return end(404);

			if (request.method !== 'POST')
				return end(405);

			if (request.headers['content-type'] !== 'application/json')
				return end(415);

			if (request.headers['user-agent'] !== 'DBL')
				return end(400);

			try {
				const body = await Util.readStream(request);
				const json = JSON.parse(body);

				if (json.bot && json.user && json.type)
					if (json.type === 'upvote')
						/**
						 * Emitted whenever a user upvotes.
						 * @event Client#upvote
						 * @param {string} user The user that upvoted
						 * @param {string} bot The bot that was upvoted
						 */
						this.emit('upvote', json.user, json.bot);
					else
						/**
						 * Emitted whenever a user unvotes.
						 * @event Client#unvote
						 * @param {string} user The user that unvoted
						 * @param {string} bot The bot that was unvoted
						 */
						this.emit('unvote', json.user, json.bot);

				end(204);
			} catch (error) {
				end(error instanceof TypeError ? 422 : error.message);
			}
		};
	}
}

module.exports = Client;