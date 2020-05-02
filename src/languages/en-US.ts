import { Language, LanguageStore, util } from 'klasa';
import { oneLine } from 'common-tags';
import { NAME as botName } from '@root/config';

export default class extends Language {

	constructor(store: LanguageStore, file: string[], directory: string) {
		super(store, file, directory);
		this.language = {
			DEFAULT: (key): string => `${key} has not been localized for en-US yet.`,
			DEFAULT_LANGUAGE: 'Default Language',
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`): string => `The prefix${Array.isArray(prefix)
				? `es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(', ')}`
				: ` in this guild is set to: \`${prefix}\``
			}`,
			SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key): string => `The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key): string => `The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'You must specify the value to add or filter.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key): string => `The key ${key} is not an Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key): string => `The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: 'The type parameter must be either add or remove.',
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value): string => `${piece.key} doesn't accept the value: ${value}`,
			RESOLVER_MULTI_TOO_FEW: (name, min = 1): string => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
			RESOLVER_INVALID_BOOL: (name): string => `${name} must be true or false.`,
			RESOLVER_INVALID_CHANNEL: (name): string => `${name} must be a channel tag or valid channel id.`,
			RESOLVER_INVALID_CUSTOM: (name, type): string => `${name} must be a valid ${type}.`,
			RESOLVER_INVALID_DATE: (name): string => `${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name): string => `${name} must be a valid duration string.`,
			RESOLVER_INVALID_EMOJI: (name): string => `${name} must be a custom emoji tag or valid emoji id.`,
			RESOLVER_INVALID_FLOAT: (name): string => `${name} must be a valid number.`,
			RESOLVER_INVALID_GUILD: (name): string => `${name} must be a valid guild id.`,
			RESOLVER_INVALID_INT: (name): string => `${name} must be an integer.`,
			RESOLVER_INVALID_LITERAL: (name): string => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_MEMBER: (name): string => `${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_MESSAGE: (name): string => `${name} must be a valid message id.`,
			RESOLVER_INVALID_PIECE: (name, piece): string => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern): string => `${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name): string => `${name} must be a role mention or role id.`,
			RESOLVER_INVALID_STRING: (name): string => `${name} must be a valid string.`,
			RESOLVER_INVALID_TIME: (name): string => `${name} must be a valid duration or date string.`,
			RESOLVER_INVALID_URL: (name): string => `${name} must be a valid url.`,
			RESOLVER_INVALID_USER: (name): string => `${name} must be a mention or valid user id.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix): string => `${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix): string => `${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix): string => `${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix): string => `${name} must be less than ${max}${suffix}.`,
			REACTIONHANDLER_PROMPT: 'Which page would you like to jump to?',
			COMMANDMESSAGE_MISSING: 'Missing one or more required arguments after end of input.',
			COMMANDMESSAGE_MISSING_REQUIRED: (name): string => `${name} is a required argument.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles): string => `Missing a required option: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles): string => `Your option didn't match any of the possibilities: (${possibles})`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions): string => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions): string => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Aborted',
			// eslint-disable-next-line max-len
			INHIBITOR_COOLDOWN: (remaining, guildCooldown): string => `${guildCooldown ? 'Someone has' : 'You have'} already used this command. You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
			INHIBITOR_DISABLED_GUILD: 'This command has been disabled by an admin in this guild.',
			INHIBITOR_DISABLED_GLOBAL: 'This command has been globally disabled by the bot owner.',
			INHIBITOR_MISSING_BOT_PERMS: (missing): string => `Insufficient permissions, missing: **${missing}**`,
			INHIBITOR_NSFW: 'You can only use NSFW commands in NSFW channels.',
			INHIBITOR_PERMISSIONS: 'You do not have permission to use this command.',
			INHIBITOR_REQUIRED_SETTINGS: (settings): string => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types): string => `This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name): string => `The ${name} command is not configured to run in any channel.`,
			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved): string => [
				usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type): string => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type): string => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type): string => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type): string => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_UNLOAD: (type, name): string => `✅ Unloaded ${type}: ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Unloads the klasa piece.',
			COMMAND_UNLOAD_WARN: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_TRANSFER_ERROR: '❌ That file has been transfered already or never existed.',
			COMMAND_TRANSFER_SUCCESS: (type, name): string => `✅ Successfully transferred ${type}: ${name}.`,
			COMMAND_TRANSFER_FAILED: (type, name): string => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfers a core piece to its respective folder.',
			COMMAND_RELOAD: (type, name, time): string => `✅ Reloaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_RELOAD_FAILED: (type, name): string => `❌ Failed to reload ${type}: ${name}. Please check your Console.`,
			COMMAND_RELOAD_ALL: (type, time): string => `✅ Reloaded all ${type}. (Took: ${time})`,
			COMMAND_RELOAD_EVERYTHING: (time): string => `✅ Reloaded everything. (Took: ${time})`,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',
			COMMAND_REBOOT: 'Rebooting...',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',
			COMMAND_LOAD: (time, type, name): string => `✅ Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error): string => `❌ Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, ping): string => `Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
			COMMAND_INVITE: (): string[] => [
				`To add ${this.client.user.username} to your discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					'I know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' ')),
				'Please file an issue at <https://github.com/dirigeants/klasa> if you find any bugs.'
			],
			COMMAND_INVITE_DESCRIPTION: 'Displays the invite link of the bot, to invite it to your guild.',
			COMMAND_INFO: [
				'Steve is a bot built on top of the Klasa framework and the Discord.js library.',
				'He was custom-coded and is actively maintained by Jonathan#0412 and BoedJ#5476.',
				'',
				'Some features of Steve include:',
				'• ↩️  Self-assignable roles',
				'• 👀  A word blacklist to catch a limited amount of rule-breaking terms',
				'• 🎵  A music player',
				'• ⏰  Reminders in case — OH MY GOD IT\'S BURNING',
				'• 🔥  And many more! (`s;help` for the full list)',
				'',
				'Let us know if you have any issues! We try to fix bugs as soon as possible and are still adding new features when relevant/we have time.',
				'',
				'If you\'re interested in how Steve works, you can check his code out at <https://github.com/tuataria/steve>.'
			],
			COMMAND_INFO_DESCRIPTION: 'Provides some information about this bot.',
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_DM: '📥 | The list of commands you have access to has been sent to your DMs.',
			COMMAND_HELP_NODM: '❌ | You have DMs disabled, I couldn\'t send you the commands in DMs.',
			COMMAND_HELP_USAGE: (usage): string => `Usage :: ${usage}`,
			COMMAND_HELP_EXTENDED: 'Extended Help ::',
			COMMAND_ENABLE: (type, name): string => `+ Successfully enabled ${type}: ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
			COMMAND_DISABLE: (type, name): string => `+ Successfully disabled ${type}: ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_CONF_NOKEY: 'You must provide a key',
			COMMAND_CONF_NOVALUE: 'You must provide a value',
			COMMAND_CONF_GUARDED: (name): string => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response): string => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key): string => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value): string => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response): string => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key): string => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-guild settings.',
			COMMAND_CONF_SERVER: (key, list): string => `**Guild Settings${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user settings.',
			COMMAND_CONF_USER: (key, list): string => `**User Settings${key}**\n${list}`,
			COMMAND_STATS: (memUsage, uptime, users, guilds, channels, klasaVersion, discordVersion, processVersion): string[] => [
				'= STATISTICS =',
				'',
				`• Mem Usage  :: ${memUsage} MB`,
				`• Uptime     :: ${uptime}`,
				`• Users      :: ${users}`,
				`• Guilds     :: ${guilds}`,
				`• Channels   :: ${channels}`,
				`• Klasa      :: v${klasaVersion}`,
				`• Discord.js :: v${discordVersion}`,
				`• Node.js    :: ${processVersion}`
			],
			COMMAND_STATS_DESCRIPTION: 'Provides some details about the bot and stats.',
			MESSAGE_PROMPT_TIMEOUT: 'The prompt has timed out.',
			TEXT_PROMPT_ABORT_OPTIONS: ['abort', 'stop', 'cancel'],
			/* steve specific stuff starts here */
			COMMAND_MODERATION_TARGET_STEVE: 'hahahahaha... no.',
			COMMAND_MODERATION_TARGET_SELF: `Come on fam, don't do that to yourself.`,
			COMMAND_MODERATION_TARGET_HIGHER_ROLE: (tag): string => `${tag} has a higher role than you.`,
			COMMAND_RPS_DESCRIPTION: `Play rock, paper, scissors against ${botName}.`,
			COMMAND_RPS_MOVES: (playerMove, steveMove): string => `You threw ${playerMove} and ${botName} threw ${steveMove}.`,
			COMMAND_RPS_WINNER_PLAYER: 'You won!',
			COMMAND_RPS_WINNER_NOBODY: 'Nobody won!',
			COMMAND_RPS_WINNER_STEVE: `${botName} won!`,
			COMMAND_8BALL_DESCRIPTION: 'Ask the 8ball a question and you shall get an answer.',
			COMMAND_8BALL_EXTENDEDHELP: 'This command requires you to put a question mark at the end of your question.',
			COMMAND_8BALL_QUESTION_PROMPT: 'The 8ball only responds to questions smh',
			COMMAND_8BALL_RESPONSES: [
				'The eucalyptus says yes.',
				'I guess so...',
				'Not today, satan.',
				'Hahahaha... no.',
				'Lemme finish my eucalyptus, then try asking me again.',
				`Yes? No? Maybe so? I don't care, to be honest.`,
				'Everything is burning lol go do something productive instead of asking me this.'
			],
			COMMAND_CHOOSE_DESCRIPTION: `Have ${botName} make a random choice for you.`,
			COMMAND_CHOOSE_EXTENDEDHELP: 'This command requires at least two choices.',
			COMMAND_CHOOSE_CHOICE: (choice): string => `${botName} chooses... ${choice}!`,
			COMMAND_RATE_DESCRIPTION: `${botName} will rate something of your choosing.`,
			COMMAND_RATE_RATING: (thing: string, rating: number): string => `${botName} gives ${thing} a ${rating}!`,
			COMMAND_ROLL_DESCRIPTION: 'Roll dice!',
			COMMAND_ROLL_PROMPT: 'You can roll up to 10 dice with up to 1,000 sides each.',
			COMMAND_ACTIVITY_DESCRIPTION: `Change ${botName}'s activity on Discord.`,
			COMMAND_ADD_DESCRIPTION: 'Add a song to the queue.',
			COMMAND_ADD_MAXENTRIES: `You've already added the maximum amount of songs!`,
			COMMAND_ADD_MAXLENGTH: 'This song is too long to add to the queue!',
			COMMAND_ASSIGN_DESCRIPTION: 'Assign or unassign roles to yourself!',
			COMMAND_ASSIGN_EXTENDEDHELP: 'You can use "list" as the argument to get a list of all self-assignable roles in the server. Use `|` to (un)assign multiple roles.',
			COMMAND_ASSIGN_INVALID_ROLE: 'You must supply a valid role.',
			COMMAND_ASSIGN_NO_ROLES: `This server does not have any self-assignable roles.`,
			COMMAND_ASSIGN_NOT_SELF_ASSIGNABLE: (name: string): string => `The ${name} role is not self-assignable!`,
			COMMAND_AUDINO_DESCRIPTION: `When your audio just won't work and you must screm!!!`,
			COMMAND_AUDINO_EXTENDEDHELP: `The image this command displays came from a reading livestream John did; it's the face he made when his audio cut out *again*.`,
			COMMAND_BAN_DESCRIPTION: 'Bans a member from the server.',
			COMMAND_CLEAR_DESCRIPTION: 'Clears the queue.',
			COMMAND_DEAFEN_DESCRIPTION: `Adds the server's deafened role to the specified member.`,
			COMMAND_DOC_DESCRIPTION: 'Retrieves the links to certain Google Docs.',
			COMMAND_DOC_EXTENDEDHELP: 'Use "list" as the argument to get a list of all retrievable docs.',
			COMMAND_DOC_INVALIDDOC: (doc: string): string => `**${doc}** is not a valid doc name.`,
			COMMAND_DISCONNECT_DESCRIPTION: `Disconnect ${botName} from the voice channel.`,
			COMMAND_F_DESCRIPTION: 'Press F to pay respects.',
			COMMAND_FEEDBACK_CONFIRMATION: 'Your feedback has been sent, thanks!',
			COMMAND_FEEDBACK_DESCRIPTION: `Send feedback or suggestions to the bot's developers.`,
			COMMAND_GOOGLE_DESCRIPTION: 'Search Google for a phrase.',
			COMMAND_GOOGLE_EXTENDEDHELP: 'The maximum character length for Google searches is 200.',
			COMMAND_GOOGLE_WAITING: 'Using mad Google skillz...',
			COMMAND_JOIN_DESCRIPTION: `Connect ${botName} to a voice channel.`,
			COMMAND_KICK_DESCRIPTION: 'Kicks a member from the server.',
			COMMAND_LOCK_DESCRIPTION: 'Locks a channel from public posting.',
			COMMAND_LYRICS_DESCRIPTION: 'Search Genius for lyrics to a song.',
			COMMAND_LYRICS_EMBED_TITLE: 'Genius Results',
			COMMAND_LYRICS_NOLYRICS: `I couldn't find any lyrics on Genius!`,
			COMMAND_MARKDOWN_DESCRIPTION: 'Gives information on how to use Markdown in Discord.',
			COMMAND_MARKDOWN_EMBED_TITLE: 'Markdown Info',
			COMMAND_MARKDOWN_EMBED_DESCRIPTION: oneLine`Discord uses Markdown, a simple way to format text. This embed explains how to use
			Markdown. You can combine formatting techniques! For example, \`***text***\` will display as ***bold
			italics***. For single-line code blocks, put one backtick around both sides of your text. For a multi-line
			code block, put three backticks around both sides of your text.`,
			COMMAND_MARKDOWN_EXTENDEDHELP: 'Doing this command without providing an argument will return a concise explanation of Markdown',
			COMMAND_MUTE_DESCRIPTION: `Adds the server's muted role to the specified member.`,
			COMMAND_MYREMINDERS_DESCRIPTION: 'View or cancel your pending reminders.',
			COMMAND_MYREMINDERS_EXTENDEDHELP: 'Use "view" to get a list of all of your active reminders. To cancel one or more reminders, use "cancel|rmdr1|rmdr2|...".',
			COMMAND_MYREMINDERS_INVALID_NUMBER: `You must provide a valid number.`,
			COMMAND_MYREMINDERS_INVALID_LENGTH: (length: number): string => `You only have ${length} reminders set!`,
			COMMAND_MYREMINDERS_NO_REMINDERS: `You don't have any pending reminders!`,
			COMMAND_NICK_DESCRIPTION: `Changes a member's nickname.`,
			COMMAND_NICK_EXTENDEDHELP: `Using this command without providing a new nickname will reset the member's nickname to their username.`,
			COMMAND_PAUSE_DESCRIPTION: 'Pause the music playback.',
			COMMAND_PINS_DESCRIPTION: 'Tells how many messages are currently pinned in a channel.',
			COMMAND_PINS_EXTENDEDHELP: 'Do `s;pins unpin` to unpin all messages.',
			COMMAND_PINS_UNPINNED: (num: number, channelName: string): string => `${num} messages unpinned in ${channelName}`,
			COMMAND_PERMISSIONS_ADMIN: 'This member is an administrator; they have all permissions!',
			COMMAND_PERMISSIONS_DESCRIPTION: 'View the permissions of the specified member.',
			COMMAND_PFP_DESCRIPTION: `Change Steve's profile picture.`,
			COMMAND_PLAY_DESCRIPTION: 'Play the next song in the queue.',
			COMMAND_PLAY_EXTENDEDHELP: 'Plays the specified song or, if none specified, the songs in the queue.',
			COMMAND_PLAY_QUEUE_EMPTY: `I can't start the music session with nothing in the queue!`,
			COMMAND_PLAY_ALREADYPLAYING: `I'm already playing!`,
			COMMAND_POMODORO_ALREADY_RUNNING: 'Your pomodoro timer is already running! Get back to work smh',
			COMMAND_POMODORO_DESCRIPTION: 'Be productive with the pomodoro technique!',
			COMMAND_POMODORO_EXTENDEDHELP: oneLine`This command helps faciliate use of the
			[pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). Note that if you change the length of a work cycle
			or break while that cycle is happening, the change will not take effect until the next time that cycle occurs.`,
			COMMAND_POMODORO_NO_TIMER: `You're not currently pomodoroing!`,
			COMMAND_POMODORO_INVALID_SEGMENT: (segment: string): string => `**${segment}** is not a valid segment name.`,
			COMMAND_POMODORO_STARTING_TIMER: 'Starting your pomodoro timer. You got this; get after it!',
			COMMAND_POMODORO_TIMER_ENDED: 'Your pomodoro timer has ended. Great job!',
			COMMAND_PURGE_CONFIRM: (msgs: number): string => `${msgs - 1} messages succesfully deleted.`,
			COMMAND_PURGE_DESCRIPTION: 'Bulk deletes messages from a channel.',
			COMMAND_QUEUE_DESCRIPTION: 'Display the music queue.',
			COMMAND_REMIND_DESCRIPTION: 'Set personal reminders for yourself.',
			COMMAND_REMIND_EXTENDEDHELP: 'If you set a reminder in a DM with Steve, he will remind you in the DM.',
			COMMAND_REMIND_TOO_MANY_REMINDERS: `There's a maximum of 25 reminders... and you've got 25.`,
			COMMAND_REMOVE_DESCRIPTION: 'Remove a song from the queue.',
			COMMAND_REMOVE_EXTENDEDHELP: 'You can remove a song that you added at any time, but in order to remove another person\'s song you must be a DJ.',
			COMMAND_REMOVE_UNABLE: `You can't remove that song without being a DJ!`,
			COMMAND_ROLE_DESCRIPTION: 'Adds or removes a role from a member.',
			COMMAND_ROLE_HIGHER_RANK: (targetRole: string): string => `The ${targetRole} role is a higher rank than you.`,
			COMMAND_ROLEINFO_DESCRIPTION: 'Gives information about a role, including a list of the members who have it.',
			COMMAND_ROLEINFO_EMBED_DESCRIPTION: (name, createDate: string): string => `The ${name} role was created on ${createDate}.`,
			COMMAND_ROLEINFO_EMBED_FOOTER: (selfAssign): string => `This role is ${selfAssign ? '' : 'not'} self-assignable.`,
			COMMAND_ROLEINFO_EXTENDEDHELP: 'You cannot use this command on roles that have been designated as private by a mod or admin.',
			COMMAND_ROLEINFO_NO_MEMBERS: 'No members in this role.',
			COMMAND_ROLEINFO_PRIVATE_ROLE: `This role is private; you do not have permission to see info about it.`,
			COMMAND_ROLEINFO_TOO_MANY: `There's too many members in this role to display.`,
			COMMAND_SERVERINFO_DESCRIPTION: 'Gives useful information about the server.',
			COMMAND_SIDESERVERS_DESCRIPTION: `Get invite links to Tuataria's sideservers.`,
			COMMAND_SIDESERVERS_EMBED_TITLE: 'Official Sideservers',
			COMMAND_SIDESERVERS_EMBED_DESCRIPTION: oneLine`Tuataria has 3 official sideservers: Gamataria (for all your video game discussion needs),
			Hogwartaria (for Harry Potter-related things), and Bibliotaria (our official book club). You can find links to them
			below. Click or tap the emojis!`,
			COMMAND_SLOW_DESCRIPTION: 'Sets the message ratelimit for a channel.',
			COMMAND_SLOW_EXTENDEDHELP: oneLine`This command sets the number of seconds a member must wait in between sending messages. The maximum
			number of seconds is 120. Setting the ratelimit to 0 will turn off slowmode.`,
			COMMAND_SNIPPETS_ACCESS_DENIED: 'You do not have permission to do this!',
			COMMAND_SNIPPETS_ADDED_SNIPPET: (name: string): string => `Added snippet with name: ${name}.`,
			COMMAND_SNIPPETS_ALREADY_EXISTS: (name: string): string => `There is already a snippet with the name ${name}!`,
			COMMAND_SNIPPETS_DESCRIPTION: 'Easily access useful bits of information about the server.',
			COMMAND_SNIPPETS_DOES_NOT_EXIST: (name: string): string => `There is no snippet with the name **${name}**`,
			COMMAND_SNIPPETS_EDIT_SNIPPET: (name: string): string => `The ${name} snippet has been updated.`,
			COMMAND_SNIPPETS_NO_SNIPPETS: 'This server has no snippets to list.',
			COMMAND_SNIPPETS_REMOVE_SNIPPET: (name: string): string => `The ${name} snippet has been removed.`,
			COMMAND_SPACEX_DESCRIPTION: 'Get info on SpaceX launches!',
			COMMAND_SPACEX_INVALID_CORE_SERIAL: `That's not a valid core serial!`,
			COMMAND_SPACEX_INVALID_INT: 'You must provide a valid integer.',
			COMMAND_SPACEX_INVALID_LAUNCH_NUMBER: `That's not a valid launch number!`,
			COMMAND_STATUS_DESCRIPTION: `Change ${botName}'s status on Discord.`,
			COMMAND_WHOIS_DESCRIPTION: `Gives an overview of a member's info.`,
			COMMAND_WHOIS_EXTENDEDHELP: 'Doing this command without providing a member will show info about yourself.',
			COMMAND_WHOIS_INVALIDMEMBER: `You must provide either a valid member's name, their long ID, or tag them.`,
			COMMAND_UNBAN_DESCRIPTION: 'Unbans a user.',
			COMMAND_UNDEAFEN_DESCRIPTION: `Removes the server's deafened role from the specified member.`,
			COMMAND_UNLOCK_DESCRIPTION: 'Unlocks a channel.',
			COMMAND_UNLOCK_UNLOCKED: 'This channel has been unlocked.',
			COMMAND_UNMUTE_DESCRIPTION: `Removes the server's muted role from the specified member.`
		};
	}


	async init(): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
		await super.init();
	}

}
