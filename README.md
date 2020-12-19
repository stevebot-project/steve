# SteveBot ![GitHub package.json version](https://img.shields.io/github/package-json/v/tuataria/steve?color=004953)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
Steve is an all-purpose Discord bot originally developed for [Tuataria] and its sideservers (although now usable anywhere). Developed and maintained by Jonathan#0412 and BoedJ#5476.

## Features
- Moderation commands
- Memberlog and serverlog
- Per-server settings
- Public and private reminders
- Allows members to self-assign roles
- Slash commands
- Much, much more!

### Development Requirements
- [`Node.js`]: Required to run the project. Must be at least version 12.
- [`MongoDB Atlas`]: Required to store persistent data.
- [`Lavalink`]: Required to enable music functions.

#### To Run Steve Locally:
- Make sure you have Node.js installed (must be at least v12; you can check your version by doing `node -v` in your terminal).
- Clone this repo to your local machine, make a new file called `config.ts` in the root and copy the contents of `config.example.ts` into it. Put your bot's client ID and token into your new `config.ts` file where specified.
- Download Lavalink from the link above, and put the host/port/password for your Lavalink server into the config file. (You can run Lavalink on your localhost.)
- Make sure you have a MongoDB Atlas server set up (it's free). Put the connection string into the config file.
- Once all that's done, you should be good to go!
- If you've not run a Discord bot before that means:
    1. `npm install`
    2. `npm run build`
    3. `npm start`

##### Notes
- Having the EditorConfig extension installed in whatever editor you use is recommended (we recommend using Visual Studio Code).
- If you don't want to go through the trouble of setting up Lavalink, you can just set `ENABLE_LAVALINK` to `false` in your `config.ts` file.
- If you don't have a Genius API key, the `lyrics` command will be disabled automatically if you leave the `TOKENS.GENIUS` field blank in your `config.ts` file.

### Story
Steve is the resident koala of Tuataria; he's named after one of the koalas featured on [Koalas to the Max dot Com]. Don't come between him and his eucalyptus or he'll end you.

Steve has a [Twitter] and a [blog] so that you can keep up with his latest exploits! ~~"Latest" is used very loosely in that sentence.~~ His wonderful array of profile pictures was designed by [Alys].


<!----------------- LINKS --------------->

[Tuataria]:                  http://www.tuataria.com
[`Node.js`]:                 https://nodejs.org/en/download/current/
[`MongoDB Atlas`]:           https://www.mongodb.com/cloud/atlas
[`Lavalink`]:                https://github.com/Frederikam/Lavalink
[Twitter]:                   https://twitter.com/StevetheBot
[blog]:                      http://www.tuataria.com/blog/steve/
[Alys]:                      https://twitter.com/alysjones96
[Koalas to the Max dot Com]: http://koalastothemax.com/

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://linkedin.com/in/jwford65"><img src="https://avatars1.githubusercontent.com/u/13416547?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan Ford</b></sub></a><br /><a href="https://github.com/tuataria/steve/commits?author=jwford" title="Code">💻</a> <a href="#financial-jwford" title="Financial">💵</a> <a href="#ideas-jwford" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-jwford" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-jwford" title="Maintenance">🚧</a> <a href="#projectManagement-jwford" title="Project Management">📆</a> <a href="https://github.com/tuataria/steve/pulls?q=is%3Apr+reviewed-by%3Ajwford" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/BoedJ"><img src="https://avatars0.githubusercontent.com/u/8688189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>boedj</b></sub></a><br /><a href="https://github.com/tuataria/steve/commits?author=BoedJ" title="Code">💻</a> <a href="#financial-BoedJ" title="Financial">💵</a> <a href="#ideas-BoedJ" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-BoedJ" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-BoedJ" title="Maintenance">🚧</a> <a href="#projectManagement-BoedJ" title="Project Management">📆</a> <a href="https://github.com/tuataria/steve/pulls?q=is%3Apr+reviewed-by%3ABoedJ" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/devoeas"><img src="https://avatars0.githubusercontent.com/u/27713388?v=4?s=100" width="100px;" alt=""/><br /><sub><b>devoeas</b></sub></a><br /><a href="https://github.com/tuataria/steve/issues?q=author%3Adevoeas" title="Bug reports">🐛</a> <a href="#userTesting-devoeas" title="User Testing">📓</a> <a href="#ideas-devoeas" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!