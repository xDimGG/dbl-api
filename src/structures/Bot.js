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
		 * The bot's shards
		 * @type {number[]}
		 */
		this.shards = data.shards;

		/**
		 * The library this bot uses
		 * @type {string}
		 */
		this.library = data.lib;

		/**
		 * The bot's GitHub repository
		 * @type {string?}
		 */
		this.github = data.github || null;

		/**
		 * The bot's vanity URL
		 * @type {string?}
		 */
		this.vanity = data.vanity || null;

		/**
		 * The bot's invite URL
		 * @type {string?}
		 */
		this.invite = data.invite;

		/**
		 * The bot's support server
		 * @type {string?}
		 */
		this.support = data.support || null;

		/**
		 * The bot's prefix
		 * @type {string}
		 */
		this.prefix = data.prefix;

		/**
		 * The bot's tags
		 * @type {string[]}
		 */
		this.tags = data.tags;

		/**
		 * The bot's owners
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
	 * @prop {string} scope This bot's scopes
	 * @prop {string} client This bot's client ID
	 * @prop {string} permissions This bot's permissions
	 */

	/**
	 * Get info about this bot's invite URL. `null` if it isn't a discordapp.com link
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