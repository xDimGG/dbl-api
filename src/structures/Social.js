const { social } = require('../Constants');

class Social {
	constructor(data) {
		/**
		 * GitHub username
		 * @type {string?}
		 */
		this.github = data.github || null;

		/**
		 * Reddit username
		 * @type {string?}
		 */
		this.reddit = data.reddit || null;

		/**
		 * Twitter username
		 * @type {string?}
		 */
		this.twitter = data.twitter || null;

		/**
		 * YouTube username
		 * @type {string?}
		 */
		this.youtube = data.youtube || null;

		/**
		 * Instagram username
		 * @type {string?}
		 */
		this.instagram = data.instagram || null;
	}

	/**
	 * GitHub URL
	 * @type {string?}
	 * @readonly
	 */
	get githubURL() {
		return this.github && `${social.github}/${this.github}`;
	}

	/**
	 * Reddit URL
	 * @type {string?}
	 * @readonly
	 */
	get redditURL() {
		return this.reddit && `${social.reddit}/${this.reddit}`;
	}

	/**
	 * Twitter URL
	 * @type {string?}
	 * @readonly
	 */
	get twitterURL() {
		return this.twitter && `${social.twitter}/${this.instagram}`;
	}

	/**
	 * YouTube URL
	 * @type {string?}
	 * @readonly
	 */
	get youtubeURL() {
		return this.youtube && `${social.youtube}/${this.youtube}`;
	}

	/**
	 * Instagram URL
	 * @type {string?}
	 * @readonly
	 */
	get instagramURL() {
		return this.instagram && `${social.instagram}/${this.instagram}`;
	}
}

module.exports = Social;