# SteveBot ![version](https://img.shields.io/badge/version-3.1.0-004953)
Steve is an all-purpose Discord bot originally developed for [Tuataria] and its sideservers. Developed and maintained by Jonathan#0412 and BoedJ#5476.

## Features
- Moderation commands
- Music functionality
- Memberlog and serverlog
- Per-server settings
- Public and semi-private reminders
- Allows members to self-assign roles
- Much, much more!

### Development Requirements
- [`Node.js`]: Required to run the project. Must be version 12.
- [`MongoDB Atlas`]: Required to store persistent data.
- [`Lavalink`]: Required to enable music functions.

#### To Run Steve Locally:
- Make sure you have Node.js v12 installed (you can check your version by doing `node -v` in your terminal).
- Clone this repo to your local machine, make a new file called `config.ts` and copy the contents of `config.example.ts` into it. Put your bot's client ID and token into your new `config.ts` file where specified.
- Download Lavalink from the link above, and put the host/port/password for your Lavalink server into the config file. (You can run Lavalink on your localhost.)
- Make sure you have a MongoDB Atlas server set up (it's free). Put the connection string into the config file.
- Once all that's done, you should be good to go!

##### Notes
- Having the EditorConfig extension installed in whatever editor you use is recommended (we recommend using Visual Studio Code).
- If you don't want to go through the trouble of setting up Lavalink, you can just set `ENABLE_LAVALINK` to `false` in your `config.ts` file.
- If you don't want have a Genius API key, the `lyrics` command will be disabled automatically if you leave the `TOKENS.GENIUS` field blank in your `config.ts` file.

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
