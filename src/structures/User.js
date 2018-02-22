const { cdn, defaultAvatars } = require('../Constants');

class User {
	constructor(data) {
		/**
		 * This profile's ID
		 * @type {string}
		 */
		this.id = data.id;

		/**
		 * This profile's username
		 * @type {string}
		 */
		this.username = data.username;

		/**
		 * This profile's discriminator
		 * @type {string}
		 */
		this.discriminator = data.discriminator;

		/**
		 * This profile's avatar hash
		 * @type {string?}
		 */
		this.avatar = data.avatar || null;

		/**
		 * This profile's default avatar hash
		 * @type {string}
		 */
		this.defaultAvatar = data.defAvatar || defaultAvatars[this.discriminator % 5];
	}

	/**
	 * This profile's Discord tag
	 * @type {string}
	 * @readonly
	 */
	get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	/**
	 * This profile's avatar URL
	 * @type {string}
	 * @readonly
	 */
	get avatarURL() {
		return `${cdn}${
			this.avatar
				? `/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : 'png'}`
				: `/assets/${this.defaultAvatar}.png`
		}`;
	}
}

module.exports = User;