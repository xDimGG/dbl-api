const { cdn, defaultAvatars } = require('../Constants');

class User {
	constructor(data) {
		/**
		 * This profiles' ID
		 * @type {string}
		 */
		this.id = data.id;

		/**
		 * This profiles' username
		 * @type {string}
		 */
		this.username = data.username;

		/**
		 * This profiles' discriminator
		 * @type {string}
		 */
		this.discriminator = data.discriminator;

		/**
		 * This profiles' avatar hash
		 * @type {string?}
		 */
		this.avatar = data.avatar || null;

		/**
		 * This profiles' default avatar hash
		 * @type {string}
		 */
		this.defaultAvatar = data.defAvatar || defaultAvatars[this.discriminator % 5];
	}

	/**
	 * This profiles' Discord tag
	 * @type {string}
	 * @readonly
	 */
	get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	/**
	 * This profiles' avatar URL
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