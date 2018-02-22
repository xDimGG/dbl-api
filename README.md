## DBL-API
<div align="center">
	<p>
		<a href="https://www.npmjs.com/package/dbl-api"><img src="https://nodei.co/npm/dbl-api.png?compact=true" alt="" /></a>
	</p>
	<p>
		<a href="https://www.npmjs.com/package/dbl-api"><img src="https://img.shields.io/npm/v/dbl-api.svg?maxAge=3600" alt="NPM" /></a>
		<a href="https://dim.codes/discord"><img src="https://img.shields.io/discord/204352669731520512.svg?maxAge=3600" alt="Discord" /></a>
	</p>
</div>

## Setup

### Installation

```bash
npm i dbl-api
```

### Getting an API Token

Once signed into DBL, head over to https://discordbots.org/api/docs#mybots and get your API key for your bot.

### Accepting WebHook Requests

The main purpose for this library is to support DBL's new webhook feature.

To activate the webhook, navigate to the edit section of your bot and set the webhook URL to something that points to your bot's server. This could even be the bot's IP.

First, you obviously need to instantiate the API client with the `port` option. By default, the path is `/`, but you should make this some random string so that users will not be able to post random data if they happen to find the bot's port. Obviously, you'd need to match the path with whatever is on your bot. Make sure that the port is port forwarded (it usually is on most hosts).

```js
const DiscordBotListAPI = require('dbl-api');
const api = new DiscordBotListAPI({ port: 8080, path: '/some_insanely_secret_path' });
```

The server will now listen on port 8080 and accept POST requests on `/some_insanely_secret_path`. The API uses the EventEmitter so now you can do

```js
api.on('upvote', (user, bot) => console.log(`Upvote by ${user} for bot ${bot}`));
api.on('unvote', (user, bot) => console.log(`Unvote by ${user} for bot ${bot}`));
```

If you're already using express, you can do the following:

```js
const express = require('express');
const app = express();

const DiscordBotListAPI = require('dbl-api');
const api = new DiscordBotListAPI();

app.post('/some_insanely_secret_path', api.handler);

app.listen(8080);
```

And then use the same listeners

```js
api.on('upvote', (user, bot) => console.log(`Upvote by ${user} for bot ${bot}`));
api.on('unvote', (user, bot) => console.log(`Unvote by ${user} for bot ${bot}`));
```

If you're stuck, feel free to ask for help on my [Discord Server](https://dim.codes/discord).
