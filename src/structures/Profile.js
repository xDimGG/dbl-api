const Social = require('./Social');
const User = require('./User');

const { base } = require('../Constants');

/** @extends {User} */
class Profile extends User {
	constructor(data) {
		super(data);

		/**
		 * This user's bio
		 * @type {string?}
		 */
		this.bio = data.bio || null;

		/**
		 * This user's hex color
		 * @type {string?}
		 */
		this.color = data.color || null;

		/**
		 * A link to this user's banner
		 * @type {string?}
		 */
		this.banner = data.banner || null;

		/**
		 * Whether or not this user is an admin
		 * @type {boolean}
		 */
		this.admin = data.admin;

		/**
		 * Whether or not this user is an artist
		 * @type {boolean}
		 */
		this.artist = data.artist;

		/**
		 * Whether or not this user is a moderator
		 * @type {boolean}
		 */
		this.moderator = data.mod;

		/**
		 * Whether or not this user is a web moderator
		 * @type {boolean}
		 */
		this.webModerator = data.webMod;

		/**
		 * Whether or not this user is certified
		 * @type {boolean}
		 */
		this.certified = data.certifiedDev;

		/**
		 * Whether or not this user is a supporter
		 * @type {boolean}
		 */
		this.supporter = data.supporter;

		/**
		 * This users social media information
		 * @type {Social?}
		 */
		this.social = data.social ? new Social(data.social) : null;
	}

	/**
	 * A link to this user's DBL profile
	 * @type {string}
	 * @readonly
	 */
	get url() {
		return `${base}/user/${this.id}`;
	}
}

module.exports = Profile;