const User = require('./User');
const { invite, libraries } = require('../Constants');
const { parse } = require('url');

/** @extends {User} */
class Bot extends User {
	constructor(data) {
		super(data);

		/**
		 * A short description of the bot
		 * @type {string?}
		 */
		this.description = data.shortdesc;

		/**
		 * A long description of the bot
		 * @type {string?}
		 */
		this.longDescription = data.longdesc;

		/**
		 * When the bot was approved
		 * @type {Date}
		 */
		this.approved = new Date(data.date);

		/**
		 * The number of upvotes the bot has
		 * @type {number}
		 */
		this.upvotes = data.points;

		/**
		 * The bots' shards
		 * @type {number[]}
		 */
		this.shards = data.shards;

		/**
		 * The library this bot uses
		 * @type {string}
		 */
		this.library = data.lib;

		/**
		 * The bots' GitHub repository
		 * @type {string?}
		 */
		this.github = data.github || null;

		/**
		 * The bots' vanity URL
		 * @type {string?}
		 */
		this.vanity = data.vanity || null;

		/**
		 * The bots' invite URL
		 * @type {string?}
		 */
		this.invite = data.invite;

		/**
		 * The bots' support server
		 * @type {string?}
		 */
		this.support = data.support || null;

		/**
		 * The bots' prefix
		 * @type {string}
		 */
		this.prefix = data.prefix;

		/**
		 * The bots' tags
		 * @type {string[]}
		 */
		this.tags = data.tags;

		/**
		 * The bots' owners
		 * @type {string[]}
		 */
		this.owners = data.owners;

		/**
		 * Whether or not the bot's certified
		 * @type {boolean}
		 */
		this.certified = data.certifiedBot;

		/**
		 * ???
		 * @type {boolean}
		 */
		this.legacy = data.legacy;
	}

	/**
	 * @typedef {Object} InviteInfo
	 * @prop {string} scope This bots' scopes
	 * @prop {string} client This bots' client ID
	 * @prop {string} permissions This bots' permissions
	 */

	/**
	 * Get info about this bots' invite URL. `null` if it isn't a discordapp.com link
	 * @type {InviteInfo?}
	 * @readonly
	 */
	get inviteInfo() {
		const { host, query } = parse(this.invite, true);

		if (host !== 'discordapp.com') return null;

		return {
			scope: query.scope,
			client: query.client_id,
			permissions: query.permissions,
		};
	}

	/**
	 * A discord.gg link to the support server
	 * @type {string?}
	 * @readonly
	 */
	get supportURL() {
		return this.support && `${invite}/${this.support}`;
	}

	/**
	 * Get a link to the libary's GitHub repository
	 * @type {string?}
	 * @readonly
	 */
	get libraryURL() {
		return libraries[this.library];
	}
}

module.exports = Bot;