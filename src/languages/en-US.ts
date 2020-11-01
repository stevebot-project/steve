/* eslint-disable @typescript-eslint/no-invalid-this */
import { Language, LanguageKeys, util } from 'klasa';
import { HelpBuilder } from '@utils/HelpBuilder';
import { NAME as botName } from '@root/config';
import { ModerationCase } from '@lib/structures/ModerationCases';
import { oneLine } from 'common-tags';
import { Emojis } from '@lib/types/Enums';

const builder = new HelpBuilder()
	.setExamples('👀 | **Examples**')
	.setExplainedUsage('🤔 | **Explained Usage**')
	.setReminder('🔥 | **Reminder**');

const caseActions = {
	ban: 'Member Banned',
	deafen: 'Member Deafened',
	kick: 'Member Kicked',
	mute: 'Member Muted',
	unban: 'User Unbanned',
	undeafen: 'Member Undeafened',
	unmute: 'Member Unmuted'
};

const dftba = [
	'Don\'t Forget to be Awesome',
	'Darling, Fetch the Battle Axe',
	'Definitely Fondue this Bot Always',
	'Don\'t Fear the Bachelors of Arts',
	'Democracy Fails Totally Before Apathy',
	'Don\'t Forget To Buy Anoraks',
	'Definitely Feeling The Balmy Avocados',
	'Definitely Forge The Best Artichokes',
	'Demons Feed The Best Anyway',
	'Definitely Forge The Bees Armour',
	'Dave: Forgotten Through Brotherly Adventures',
	'Demons Find Turquoise Bears Attractive',
	'Do Find Tea, Beat Apathy',
	'Don\'t Forget That Brains Attract',
	'Decepticons Fear This Brilliant Autobot',
	'Darkened Forests Take Bravery Away',
	'Drunk Fish Try Breathing Air',
	'Dastardly Farmers Took Bessie Away',
	'Damn Fine To Be Alive',
	'Donate For The Blood Association',
	'Dead Frogs Teach Bored Anatomists',
	'Duel For The Best Acronym',
	'Dandelions Fly Through Blue Air'
];

const Perms = {
	ADMINISTRATOR: 'Administrator',
	CREATE_INSTANT_INVITE: 'Create Instant Invite',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	MANAGE_CHANNELS: 'Manage Channels',
	MANAGE_GUILD: 'Manage Guild',
	ADD_REACTIONS: 'Add Reactions',
	VIEW_AUDIT_LOG: 'View Audit Log',
	VIEW_GUILD_INSIGHTS: 'View Guild Insights',
	PRIORITY_SPEAKER: 'Priority Speaker',
	STREAM: 'Stream',
	VIEW_CHANNEL: 'View Channel',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention Everyone',
	USE_EXTERNAL_EMOJIS: 'Use External Emojis',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use VAD',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	MANAGE_EMOJIS: 'Manage Emojis'
};


export default class extends Language {

	public caseActions = caseActions;
	public dftba = dftba;
	public PERMISSIONS = Perms;

	public get randomDftba(): string {
		return this.dftba[Math.floor(Math.random() * this.dftba.length)];
	}


	// @ts-expect-error 2416
	public language: LanguageKeys = {
		/**
		 * ################################
		 * #      FRAMEWORK MESSAGES      #
		 * ################################
		 */
		DEFAULT: (key): string => `${key} has not been localized for en-US yet.`,
		DEFAULT_LANGUAGE: 'Default Language',
		PREFIX_REMINDER: (prefix = `@${this.client.user!.tag}`): string => `The prefix${Array.isArray(prefix)
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
		INHIBITOR_REQUIRED_SETTINGS: (settings): string => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length === 1 ? '' : 's'} and thus the command cannot run.`,
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
			`To add ${this.client.user!.username} to your discord guild:`,
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
			'• ⏰  Reminders in case — OH MY GOD IT\'S BURNING',
			'• 🔩  Custom commands',
			'• 🔥  And many more! (`s;help` for the full list)',
			'',
			'Let us know if you have any issues! We try to fix bugs as soon as possible and are still adding new features when relevant/we have time.',
			'',
			'If you\'re interested in how Steve works, you can check his code out at <https://github.com/tuataria/steve>.'
		],
		COMMAND_INFO_DESCRIPTION: 'Provides some information about this bot.',
		COMMAND_HELP_DESCRIPTION: `Show info about ${botName}'s commands`,
		COMMAND_HELP_DATA: {
			TITLE: (description: string) => `${description}`,
			USAGE: (usage: string) => `📝 | ***Command Usage***\n\`${usage}\`\n`,
			EXTENDED: (extendedHelp: string) => `🔍 | ***Extended Help***\n${extendedHelp}`,
			FOOTER: (name: string) => `Command help for ${name} | ${this.randomDftba}`
		},
		COMMAND_HELP_BEGINNING: (prefix: string) => `You can do \`${prefix}help <command>\` (without brackets) to get more information about an individual command!`,
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
		COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-server settings.',
		COMMAND_CONF_SERVER_EXTENDED: builder.display('conf', {
			examples: [
				'set|roles.administrator|289120123628027904',
				'remove|roles.restricted|512623553775009792',
				'reset|roles.assignable',
				'show|roles.administrator',
				'show|roles',
				'show'
			],
			explainedUsage: [
				['key', 'The name of the setting that you would like to view or edit.']
			],
			extendedHelp: 'This command can control and show all server settings.',
			reminder: 'It\'s probably easier to use the individual server settings commands rather than this one, unless you know what you\'re doing.'
		}),
		COMMAND_CONF_SERVER: (key, list): string => `**Guild Settings${key}**\n${list}`,
		COMMAND_CONF_USER_DESCRIPTION: 'Define per-user settings.',
		COMMAND_CONF_USER_EXTENDED: builder.display('userconf', {
			examples: [
				'set|embedColor|#004953',
				'reset|embedColor',
				'show|embedColor'
			],
			explainedUsage: [
				['key', 'The name of the setting you would like to change or show.']
			],
			extendedHelp: 'This command can control and show all user settings (currently there is only one user setting).',
			reminder: 'It\'s probably easier to use the individual user settings commands than this one, unless you know what you\'re doing.'
		}),
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
		COMMAND_STATS_EXTENDED: builder.display('stats', {
			extendedHelp: `This command displays statistics about the currently running instance of ${botName}. The statistics displayed are: Memory Usage, Uptime, Users, Guilds, Channels, Klasa version, Discords.js version, and Node.js version.`
		}),
		COMMAND_STATS_EMBED: {
			FIELD_TITLES: {
				MEMORY_USAGE: 'Memory Usage',
				UPTIME: 'Uptime',
				USERS: 'Users',
				GUILDS: 'Guilds',
				CHANNELS: 'Channels',
				KLASA: 'Klasa Version',
				DISCORDJS: 'Discord.js Version',
				NODE: 'Node.js Version'
			},
			FOOTER: this.randomDftba,
			TITLE: 'Statistics'
		},
		COMMAND_DISCORD_STAUTS_DECRIPTION: 'See the current status of Discord.',
		COMMAND_DISCORD_STAUTS_EMBED: {
			DECRIPTION: (incident): string => `[Discord Status](https://discordstatus.com/)\n**Current Incident:**\n${incident}`,
			FOOTER: (time): string => `Last changed: ${time} | ${this.randomDftba}`	
		},
		MESSAGE_PROMPT_TIMEOUT: 'The prompt has timed out.',
		TEXT_PROMPT_ABORT_OPTIONS: ['abort', 'stop', 'cancel'],
		/**
		 * ################################
		 * #      GENERAL STUFF           #
		 * ################################
		 */
		USER_NOT_IN_GUILD: (user: string) => `${user} is not in this server.`,
		NONE: 'None',
		NO_PARENT_CATEGORY: 'No Category',
		/**
		 * ################################
		 * #      ARGUMENTS               #
		 * ################################
		 */
		ARGUMENT_ROLENAME_COULDNOTFIND: (name: string, arg: string) => `Could not find a role match for **${arg}**; the ${name} argument must be a valid role name, id, or mention.`,
		ARGUMENT_ROLENAME_MULTIPLEMATCHES: (matches: string, name: string) => `Found multiple role matches for **${name}**: \`${matches}\``,
		ARGUMENT_TIMESPAN_INVALID: (arg: string) => `**${arg}** is an invalid timespan.`,
		ARGUMENT_USERNAME_CANNOTFIND: (search: string) => `Could not find a user by searching with **${search}**.`,
		ARGUMENT_USERNAME_MULTIPLE: (users: string) => `Found multiple users: \`${users}\`.`,
		/**
		 * ################################
		 * #      MISCELLANEOUS COMMANDS  #
		 * ################################
		 */
		COMMAND_LYRICS_DESCRIPTION: 'Search Genius for lyrics to a song',
		COMMAND_LYRICS_EXTENDED: builder.display('lyrics', {
			examples: [
				'accio deathly hallows'
			],
			extendedHelp: 'This command returns a list of Genius links, not the lyrics themselves.'
		}),
		COMMAND_LYRICS_EMBED: {
			TITLE: 'Genius Results'
		},
		COMMAND_LYRICS_NOLYRICS: `I couldn't find any lyrics on Genius!`,
		/**
		 * ################################
		 * #      FUN COMMANDS            #
		 * ################################
		 */
		COMMAND_CHOOSE_DESCRIPTION: `Have ${botName} make a choice for you`,
		COMMAND_CHOOSE_EXTENDED: builder.display('choose', {
			examples: [
				'real jonathan|fake jonathan'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.',
			explainedUsage: [
				['choice', 'You need to specify at least two choices for this command to work. Please don\'t make me sass you.']
			],
			reminder: 'Choices have a maximum length of 500 characters.'
		}),
		COMMAND_CHOOSE_RESPONSE: (choice: string) => `${botName} chooses... ${choice}!`,
		COMMAND_CHOOSE_TOOFEW: 'You must provide at least two choices!',
		COMMAND_RATE_DESCRIPTION: `Have ${botName} rate an item of your choosing`,
		COMMAND_RATE_EXTENDED: builder.display('rate', {
			examples: [
				'the existence of eucalyptus'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.',
			reminder: 'Things to be rated have a maximum length of 500 characters.'
		}),
		COMMAND_RATE_RESPONSE: (thing: string, rating: number) => `${botName} gives \`${thing}\` a ${rating}!`,
		COMMAND_ROCKPAPERSCISSORS_DESCRIPTION: `Play a game of rock, paper, scissors against ${botName}`,
		COMMAND_ROCKPAPERSCISSORS_EXTENDED: builder.display('rps', {
			examples: [
				'rock',
				'paper',
				'scissors'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.'
		}),
		COMMAND_ROCKPAPERSCISSORS_WINNER: (playerMove: string, steveMove: string, winner: number) => `You threw ${playerMove} and ${botName} threw ${steveMove}. ${winner === 0 ? 'Nobody' : winner === -1 ? botName : 'You'} won!`,
		COMMAND_ROLL_DESCRIPTION: 'Roll dice!',
		COMMAND_ROLL_EXTENDED: builder.display('roll', {
			examples: [
				'1d6',
				'd20',
				'4d6-5',
				'5d10!',
				'1d8|4d6',
				'6d12k1',
				'6d12kl2'
			],
			extendedHelp: 'Using standard dice notation: You can roll up to 10 dice with up to 1,000 sides each. Add a \`!\` at the end of your roll to use exploding dice. To keep the highest n, add `k<n>`; to keep the lowest n, add `kl<n>` (with n < amount of dice). You can add a static positive or negative modifier to the sum of the roll using \`+<n>\` or \`-<n>\`. You can do multiple rolls at once, separated by `|`.'
		}),
		COMMAND_ROLL_RESPONSE: `You rolled:`,
		COMMAND_ROLL_EMOJI_RESPONSE: (emoji: string, message: string) => `${emoji} You rolled: ${message} ${emoji}`,
		COMMAND_AUDINO_DESCRIPTION: 'When the audio cuts out and you must screm',
		COMMAND_AUDINO_EXTENDED: builder.display('audino', {
			extendedHelp: 'This command has a cooldown of 60 seconds per channel. The image this command displays came from a reading livestream [John](https://en.wikipedia.org/wiki/John_Green_(author)) did; it\'s the face he made when his audio cut out *again*.'
		}, true),
		COMMAND_AUDINO_ID: '[Image Description: An image of John Green in front of a bookshelf, raising his hands to his head and making a face of fury because his audio just. Won\'t. Work.]',
		COMMAND_F_DESCRIPTION: 'Press F to pay respects',
		COMMAND_F_EXTENDED: builder.display('f', {
			extendedHelp: 'This command has a cooldown of 60 seconds per channel. [You can find an explanation of the meme here](https://knowyourmeme.com/memes/press-f-to-pay-respects).'
		}),
		COMMAND_F_ID: '[Image Description: A screenshot of a cutscene from Call of Duty: Advanced Warfare, showing a US Marine\'s funeral. A quick-time-event prompt is showing, saying "Press F to pay respects."]',
		COMMAND_8BALL_DESCRIPTION: 'Ask a question and get an answer... a sassy one, of course',
		COMMAND_8BALL_EXTENDED: builder.display('8ball', {
			examples: [
				'will the jonathans ever stop being annoying?'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.'
		}),
		COMMAND_8BALL_RESPONSES: [
			'The eucalyptus says yes.',
			'Hahahaha... no.',
			'I guess so...',
			'Everything is burning lol go do something productive instead of asking me this.',
			'Not today, satan.',
			'Yes? No? Maybe so? I don\'t care, to be honest.',
			'Lemme finish my eucalyptus, then try asking me again.'
		],
		COMMAND_DFTBA_DESCRIPTION: 'Don\'t Forget to be Awesome!',
		COMMAND_DFTBA_EXTENDED: builder.display('dftba', {
			extendedHelp: 'Darling, Fetch the Battle Axe!',
			reminder: 'Decepticons Fear This Brilliant Autobot'
		}),
		/**
		 * ################################
		 * #      MODERATION SYSTEM       #
		 * ################################
		 */
		MODERATION_NODURATION: 'No duration provided.',
		MODERATION_NOREASON: 'No reason provided.',
		MODERATION_NOSTEVE: 'hahahahaha... no.',
		MODERATION_NOSELF: 'Come on fam, don\'t do that to yourself.',
		MODERATION_HIGHERROLE: (user: string) => `${user} has a higher role than you.`,
		MODERATION_CASE_DISPLAY_FIELD_TARGET: 'Target',
		MODERATION_CASE_DISPLAY_FIELD_MODERATOR: 'Moderator',
		MODERATION_CASE_DISPLAY_FIELD_DURATION: 'Duration',
		MODERATION_CASE_DISPLAY_FIELD_REASON: 'Reason',
		MODERATION_CASE_DISPLAY_FOOTER: (caseNumber: number, targetID: string) => `Case ${caseNumber} (${targetID})`,
		MODERATION_CASE_DISPLAY_TIME_REMAINING: (time: string) => `(${time} left)`,
		COMMAND_MUTE_DESCRIPTION: 'Add the server\'s Muted role to the specified user',
		COMMAND_MUTE_EXTENDED: builder.display('mute', {
			examples: [
				'jonathan|being insensitive',
				'enchtest|being annoying|5m'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.'],
				['reason', 'You can specify a reason for this action, to be used in the server\'s audit log and in my case log.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'You must set up the server\'s Muted role before this command can be used.'
		}),
		COMMAND_MUTE_SUCCESS: (target: string, thisCase: ModerationCase) => `Muted ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_MUTE_UNABLE: (target: string) => `Unable to mute ${target}.`,
		COMMAND_DEAFEN_DESCRIPTION: 'Add the server\'s Deafened role to the specified user',
		COMMAND_DEAFEN_EXTENDED: builder.display('deafen', {
			examples: [
				'enchtest|harassment',
				'jonathan|general assholery|10m'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.'],
				['reason', 'You can specify a reason for this action, to be used in the server\'s audit log and in my case log.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'You must set up the server\'s Deafened role before you can use this command. The Deafened role should prevent users from seeing most (or all) channels in the server.'
		}),
		COMMAND_DEAFEN_UNABLE: (target: string) => `Unable to deafen ${target}.`,
		COMMAND_DEAFEN_SUCCESS: (target: string, thisCase: ModerationCase) => `Deafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_BAN_DESCRIPTION: 'Ban a user from the server',
		COMMAND_BAN_EXTENDED: builder.display('ban', {
			examples: [
				'enchtest|being a tool|3d',
				'jonathan|testing my patience'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.'],
				['reason', 'You can specify a reason for this action, to be used in the server\'s audit log and in my case log.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.BAN_MEMBERS}** permission.`,
			reminder: 'You can change the `moderation.banDeleteDays` setting to control how many days worth of messages from the banned user are deleted.'
		}),
		COMMAND_BAN_UNABLE: (target: string) => `Unable to ban ${target}.`,
		COMMAND_BAN_SUCCESS: (target: string, thisCase: ModerationCase) => `Banned ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_KICK_DESCRIPTION: 'Kick a user from the server',
		COMMAND_KICK_EXTENDED: builder.display('kick', {
			examples: [
				'jonathan|paying too much attention to spacex launches'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.'],
				['reason', 'You can specify a reason for this action, to be used in the server\'s audit log and in my case log.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.KICK_MEMBERS}** permission.`
		}),
		COMMAND_KICK_UNABLE: (target: string) => `Unable to kick ${target}.`,
		COMMAND_KICK_SUCCESS: (target: string, thisCase: ModerationCase) => `Kicked ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_UNBAN_DESCRIPTION: 'Unban a user from the server',
		COMMAND_UNBAN_EXTENDED: builder.display('unban', {
			examples: [
				'273707798670344192',
				'273707798670344192|he\'s learned his lesson'
			],
			explainedUsage: [
				['user', 'This argument is required. For this command, you must use the user\'s snowflake (long ID number).'],
				['reason', 'You can specify a reason for this action, to be used in the server\'s audit log and in my case log.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.BAN_MEMBERS}** permission.`
		}),
		COMMAND_UNBAN_UNABLE: (target: string) => `Unable to unban ${target}.`,
		COMMAND_UNBAN_SUCCESS: (target: string, thisCase: ModerationCase) => `Unbanned ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_UNMUTE_DESCRIPTION: 'Remove a member from the server\'s Muted role',
		COMMAND_UNMUTE_EXTENDED: builder.display('unmute', {
			examples: [
				'enchtest|2 more strikes and you\'re out'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'You must set up the server\'s Muted role before using this command.'
		}),
		COMMAND_UNMUTE_UNABLE: (target: string) => `Unable to unmute ${target}.`,
		COMMAND_UNMUTE_SUCCESS: (target: string, thisCase: ModerationCase) => `Unmuted ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_UNDEAFEN_DESCRIPTION: 'Remove a member from the server\'s Deafened role',
		COMMAND_UNDEAFEN_EXTENDED: builder.display('undeafen', {
			examples: [
				'enchtest|come back to the world of the living'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'You must set up the server\'s Deafened role before using this command.'
		}),
		COMMAND_UNDEAFEN_UNABLE: (target: string) => `Unable to undeafen ${target}.`,
		COMMAND_UNDEAFEN_SUCCESS: (target: string, thisCase: ModerationCase) => `Undeafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_PERMISSIONS_DESCRIPTION: 'View the permissions of the specified user.',
		COMMAND_PERMISSIONS_HAS_ALL: (user: string) => `${user} has the Administrator permission; they have all permissions by default.`,
		COMMAND_NICKNAME_DESCRIPTION: 'Set or clear a member\'s nickname',
		COMMAND_NICKNAME_EXTENDED: builder.display('nickname', {
			examples: [
				'jonathan|vaguely evil chaos demon',
				'jonathan'
			],
			explainedUsage: [
				['string', 'Nicknames have a maximum length of 32 characters.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_NICKNAMES}** permisson.`,
			reminder: 'Not specifying a nickname for this command will clear the member\'s nickname.'
		}),
		COMMAND_NICKNAME_SET: (user: string) => `${user}'s nickname has been set.`,
		COMMAND_NICKNAME_CLEARED: (user: string) => `${user}'s nickname has been cleared.`,
		COMMAND_ROLE_DESCRIPTION: 'Add or remove a role from a member',
		COMMAND_ROLE_EXTENDED: builder.display('role', {
			examples: [
				'jonathan|gmt-4'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'This command works on a toggle; there is no need to specify if you want to add or remove the command.'
		}),
		COMMAND_ROLE_REMOVE: (roles: string) => `${Emojis.MINUS} Removed roles: \`${roles}\``,
		COMMAND_ROLE_ADD: (roles: string) => `${Emojis.PLUS} Added roles: \`${roles}\``,
		COMMAND_LOCK_DESCRIPTION: 'Lock a channel from public posting',
		COMMAND_LOCK_EXTENDED: builder.display('lock', {
			extendedHelp: `This command takes away the **${this.PERMISSIONS.SEND_MESSAGES}** permission from the everyone role in the channel. I need the **${this.PERMISSIONS.MANAGE_CHANNELS}** permission to run it.`
		}),
		COMMAND_LOCK_LOCKED: 'This channel has been locked.',
		COMMAND_UNLOCK_DESCRIPTION: 'Opens a channel to public posting',
		COMMAND_UNLOCK_EXTENDED: builder.display('unlock', {
			extendedHelp: `This command gives the ${this.PERMISSIONS.SEND_MESSAGES} permission to the everyone role in the channel. I need the **${this.PERMISSIONS.MANAGE_CHANNELS}** permission to run it.`
		}),
		COMMAND_UNLOCK_UNLOCKED: 'This channel has been unlocked.',
		COMMAND_SLOWMODE_DESCRIPTION: 'Set the message ratelimit in a channel',
		COMMAND_SLOWMODE_EXTENDED: builder.display('slowmode', {
			examples: [
				'1 minute',
				'reset'
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_CHANNELS}** permission.`,
			reminder: 'Using "reset" as the argument will turn slowmode off.'
		}),
		COMMAND_SLOWMODE_RESET: 'Slowmode has been turned off.',
		COMMAND_SLOWMODE_SET: (duration: string) => `Slowmode has been set to 1 message per member per ${duration}.`,
		COMMAND_PURGE_DESCRIPTION: 'Quickly delete a specified number of messages',
		COMMAND_PURGE_EXTENDED: builder.display('purge', {
			examples: [
				'10'
			],
			explainedUsage: [
				['number', 'The maximum number of messages that can be purged at once is 99.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_MESSAGES}** permission to run it.`,
			reminder: 'The command message is automatically counted towards the number of messages deleted, so there is no need to account for it when specifying a number.'
		}),
		COMMAND_PURGE_PURGED: (size: number) => `${size} messages were deleted.`,
		/**
		 * ################################
		 * #      SNIPPETS                #
		 * ################################
		 */
		COMMAND_SNIPPET_DESCRIPTION: 'Create/edit/remove/view snippets of information about the server',
		COMMAND_SNIPPET_EXTENDED: builder.display('snippet', {
			examples: [
				'add|jonathans|jonathans have the best name',
				'edit|jonathans|jonathans have the BEST name --embed',
				'remove|jonathans',
				'jonathans',
				'source|jonathans',
				'reset',
				'list'
			],
			extendedHelp: oneLine`This command allows users to easily access bits of information about the server. Adding, editing, and
					removing snippets is restricted to server staff, but any member can view the list of snippets, or view individual snips.
					When creating/editing a snip, staff can use the \`--embed\` flag to display the content of the snip in an embed. The content
					will be displayed in the embed description, which means that Markdown will display properly (including masked links).`,
			explainedUsage: [
				['name', 'The name of a snip has a maximum length of 100 characters.'],
				['content', 'The content of a snip has a maximum length of 1900 characters.']
			],
			reminder: 'NOTE: If a snippet shares a name with an assignable role, the snippet will be inaccessible using custom command syntax.'
		}, true),
		COMMAND_SNIPPET_ADD: (name: string) => `Added a snippet with the name: ${name}.`,
		COMMAND_SNIPPET_EDIT: (name: string) => `Edited the ${name} snippet.`,
		COMMAND_SNIPPET_REMOVE: (name: string) => `Removed the ${name} snippet.`,
		COMMAND_SNIPPET_NOPERMISSION: 'You do not have permissions to edit snippets for this server.',
		COMMAND_SNIPPET_ALREADYEXISTS: (name: string) => `There is already a snippet named ${name}.`,
		COMMAND_SNIPPET_INVALID: (name: string) => `There is no snippet with the name: ${name}.`,
		COMMAND_SNIPPET_NOSNIPS: 'This server has no snippets!',
		COMMAND_SNIPPET_RESET: 'This server\'s snippets have been reset.',
		/**
		 * ################################
		 * #      REMINDERS               #
		 * ################################
		 */
		COMMAND_REMIND_DESCRIPTION: 'Create, view, or cancel reminders',
		COMMAND_REMIND_EXTENDED: builder.display('remind', {
			examples: [
				'put laundry away|1h',
				'view',
				'cancel|1'
			],
			explainedUsage: [
				['reminder', 'Reminders have a maxmum length of 140 characters.']
			],
			reminder: 'Unfortunately, only one reminder can be deleted per command.'
		}),
		RESOLVER_REMINDER_LENGTH: 'Reminders have a maximum length of 140 characters.',
		RESOLVER_REMINDER_INVALID: (arg: string | number) => `**${arg}** is not a valid reminder number.`,
		COMMAND_REMIND_CREATED: (duration: string) => `I'll remind you about that in ${duration}.`,
		COMMAND_REMIND_CANCELED: (content: string) => `I cancelled the reminder: **${content}**.`,
		COMMAND_REMIND_NOREMINDERS: 'You have no reminders currently set.',
		COMMAND_REMINDER_DISPLAY_HIDDEN: 'Private reminder: content hidden',
		COMMAND_REMIND_VIEW_EMBED: {
			TITLE: 'Pending Reminders'
		},
		/**
		 * ################################
		 * #      POMODORO                #
		 * ################################
		 */
		COMMAND_POMODORO_DESCRIPTION: 'Be productive using the Pomodoro technique!',
		COMMAND_POMODORO_EXTENDED: builder.display('pomodoro', {
			extendedHelp: 'This command helps facilitate use of the Pomodoro technique; it is currently under reconstruction and thus its functions are not available. Check back soon!'
		}),
		COMMAND_POMODORO_UNDERCONSTRUCTION: 'This command is under reconstruction and is not currently available. Check back soon!',
		/**
		 * ################################
		 * #      SELF-ASSIGN             #
		 * ################################
		 */
		COMMAND_ASSIGN_DESCRIPTION: `Assign roles to yourself using ${botName}`,
		COMMAND_ASSIGN_EXTENDED: builder.display('assign', {
			examples: [
				'gmt-4',
				'--list'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: `This command allows members to view the list of self-assignable roles, and add/remove the roles from themselves. I need to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission to use this command.`,
			reminder: 'Only roles that have been designated as self-assignable by server staff can be used with this command.'
		}),
		COMMAND_ASSIGN_NOROLEPROVIDED: 'You must provide a role name, id, or mention.',
		COMMAND_ASSIGN_NOTASSIGNABLE: (role: string) => `${Emojis.REDX} The ${role} role is not self-assignable.`,
		COMMAND_ASSIGN_ROLE_ADD: (roles: string) => `${Emojis.PLUS} Added role(s): \`${roles}\``,
		COMMAND_ASSIGN_ROLE_REMOVE: (roles: string) => `${Emojis.MINUS} Removed role(s): \`${roles}\``,
		COMMAND_ASSIGN_ROLE_NEEDTRUSTED: (role: string) => `You need to have the **${role}** role to do that!`,
		/**
		 * ################################
		 * #      MEMBER INFO             #
		 * ################################
		 */
		COMMAND_WHOIS_DESCRIPTION: 'Get basic information about a member of the server',
		COMMAND_WHOIS_EXTENDED: builder.display('whois', {
			examples: [
				'boedj'
			],
			extendedHelp: `Displayed information: Display Name, Account Age, Server Join Date, List of Roles`,
			reminder: 'Not providing a username for this command will display information about yourself.'
		}),
		COMMAND_WHOIS_DATE: (duration: string, date: string) => `${duration} ago (${date})`,
		COMMAND_WHOIS_JOINEDGUILD_HOURS: (hours: number, date: string) => `${hours} hours ago (${date})`,
		COMMAND_WHOIS_EMBED: {
			FIELD_TITLES: {
				DISPLAY_NAME: 'Display Name',
				ACCOUNT_CREATED: 'Account Created',
				JOINED_GUILD: 'Joined Server',
				ROLES: 'Roles'
			},
			FOOTER: (id: string) => `Member ID: ${id} | ${this.randomDftba}`
		},
		COMMAND_AVATAR_DESCRIPTION: 'See a larger version user\'s avatar',
		COMMAND_AVATAR_CANNOTDISPLAY: (user: string) => `Unable to display avatar for ${user}.`,
		/**
		 * ################################
		 * #      SERVER INFO             #
		 * ################################
		 */
		COMMAND_SERVERINFO_DESCRIPTION: 'See useful information about the server',
		COMMAND_SERVERINFO_EXTENDED: builder.display('serverinfo', {
			extendedHelp: oneLine`Displayed stats: Total Members, # of Humans vs # of Bots, # of Text Channels vs # of Voice Channels,
					# of Roles, # of Emojis, and the percentage of members with roles.`
		}),
		COMMAND_SERVERINFO_EMBED: {
			FIELD_TITLES: {
				TOTAL_MEMBERS: 'Total Members',
				BOTS: 'Bots',
				TEXT_CHANNELS: 'Text Channels',
				VOICE_CHANNELS: 'Voice Channels',
				ROLES: 'Roles',
				EMOJIS: 'Emojis'
			},
			FOOTER: (date: string, duration: string) => `Created ${date} (${duration} ago) | ${this.randomDftba}`
		},
		COMMAND_ROLEINFO_DESCRIPTION: 'Display basic information about a role, along with a list of members who have it',
		COMMAND_ROLEINFO_EXTENDED: builder.display('roleinfo', {
			examples: [
				'gmt-4'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: 'Roles which have been designated as restricted by the server staff cannot be viewed with this command.'
		}),
		COMMAND_ROLEINFO_RESTRICTED: 'This role is restricted; you cannot view information about it.',
		COMMAND_ROLEINFO_NOMEMBERS: 'There are no members in this role.',
		COMMAND_ROLEINFO_TOOMANY: 'There are too many members in this role to display.',
		COMMAND_ROLEINFO_EMBED: {
			DESCRIPTION: (role: string, date: string) => `The ${role} role was created on ${date}.`,
			FOOTER: (assignable: boolean) => `This role is ${assignable ? '' : 'not '}self-assignable.`
		},
		/**
		 * ################################
		 * #   SERVER SETTINGS COMMANDS   #
		 * ################################
		 */
		COMMAND_SETMEMBERLOG_DESCRIPTION: `Set what channel ${botName} will use as the memberlog`,
		COMMAND_SETMEMBERLOG_EXTENDED: builder.display('setmemberlog', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: [
				'The memberlog will keep track of the following events:',
				'- Member joins',
				'- Member leaves',
				'- Member role updates',
				'- Display name changes',
				'- Bans',
				'- Unbans'
			]
		}),
		COMMAND_SETMEMBERLOG_SET: (channel: string) => `<#${channel}> will be used as this server's memberlog.`,
		COMMAND_SETSERVERLOG_DESCRIPTION: `Set what channel ${botName} will use as the serverlog`,
		COMMAND_SETSERVERLOG_EXTENDED: builder.display('setserverlog', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: [
				'The serverlog will keep track of the following events:',
				'- Message deletes',
				'- Message bulk deletes',
				'- Channel creates, deletes, and name updates',
				'- Emoji creates, deletes, and name updates',
				'- Role creates, deletes, and name updates'
			]
		}),
		COMMAND_SETSERVERLOG_SET: (channel: string) => `<#${channel}> will be used as this server's serverlog.`,
		COMMAND_SETREMINDERCHANNEL_DESCRIPTION: `Set what channel ${botName} will use as the reminder channel`,
		COMMAND_SETREMINDERCHANNEL_EXTENDED: builder.display('setreminderchannel', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: 'If a reminder channel is set, all reminder set in the server will go off in the specified channel.'
		}),
		COMMAND_SETREMINDERCHANNEL_SET: (channel: string) => `<#${channel}> will be used as this server's reminder channel.`,
		COMMAND_SETADMINISTRATORROLE_DESCRIPTION: 'Set the server\'s administrator role',
		COMMAND_SETADMINISTRATORROLE_EXTENDED: builder.display('setadministratorrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role, it just gives this role access to server staff commands.'
		}),
		COMMAND_SETADMINISTRATORROLE_SET: (role: string) => `The ${role} role will be used as this server's administrator role.`,
		COMMAND_SETMODERATORROLE_DESCRIPTION: 'Set the server\'s moderator role',
		COMMAND_SETMODERATORROLE_EXTENDED: builder.display('setmoderatorrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role, it just gives this role access to server staff commands.'
		}),
		COMMAND_SETMODERATORROLE_SET: (role: string) => `The ${role} role will be used as this server's moderator role.`,
		COMMAND_SETTRUSTEDROLE_DESCRIPTION: 'Set the server\'s trusted role',
		COMMAND_SETTRUSTEDROLE_EXTENDED: builder.display('settrustedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role.'
		}),
		COMMAND_SETTRUSTEDROLE_SET: (role: string) => `The ${role} role will be used as this server's trusted role.`,
		COMMAND_SETMUTEDROLE_DESCRIPTION: 'Set the server\'s muted role',
		COMMAND_SETMUTEDROLE_EXTENDED: builder.display('setmutedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add or remove any extra Discord permissions to the role.'
		}),
		COMMAND_SETMUTEDROLE_SET: (role: string) => `The ${role} role will be used as this server's muted role.`,
		COMMAND_SETDEAFENEDROLE_DESCRIPTION: 'Set the server\'s deafened role',
		COMMAND_SETDEAFENEDROLE_EXTENDED: builder.display('setdeafenedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add or remove any extra Discord permissions to the role.'
		}),
		COMMAND_SETDEAFENEDROLE_SET: (role: string) => `The ${role} role will be used as this server's deafened role.`,
		COMMAND_SETBANDELETEDAYS_DESCRIPTION: 'Set how many days of messages from a banned user will be deleted',
		COMMAND_SETBANDELETEDAYS_EXTENDED: builder.display('setbandeletedays', {
			examples: [
				'7'
			],
			reminder: `This setting will only function properly if a user is banned using ${botName}`
		}),
		COMMAND_SETBANDELETEDAYS_SET: (days: number) => `${days} days of messages will be deleted from a banned user.`,
		COMMAND_MANAGERESTRICTEDROLES_DESCRIPTION: 'Manage the list of restricted roles for this server',
		COMMAND_MANAGERESTRICTEDROLES_EXTENDED: builder.display('managerestrictedroles', {
			examples: [
				'muted|deafened',
				'reset',
				'show'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).'],
				['reset', 'Clears the list of restricted roles.'],
				['show', 'Displays the list of restricted roles.']
			],
			extendedHelp: 'Restricted roles cannot be viewed with the `roleinfo` command, except for when a server staff member is the person using the command. Members who receive a restricted role as their first role will not be given the server\'s trusted role if one has been set.'
		}),
		COMMAND_MANAGERESTRICTEDROLES_MANAGE_REMOVED: (removedRoles: string) => `${Emojis.MINUS} Removed roles: ${removedRoles}\n`,
		COMMAND_MANAGERESTRICTEDROLES_MANAGE_ADDED: (addedRoles: string) => `${Emojis.PLUS} Added roles: ${addedRoles}`,
		COMMAND_MANAGERESTRICTEDROLES_RESET: 'The list of restricted roles has been cleared.',
		COMMAND_MANAGERESTRICTEDROLES_SHOW_NOROLES: 'There are no restricted roles in this server.',
		COMMAND_MANAGERESTRICTEDROLES_SHOW_ROLENOTFOUND: 'Role not found',
		COMMAND_MANAGEASSIGNABLEROLES_DESCRIPTION: 'Manage the list of assignable roles for this server',
		COMMAND_MANAGEASSIGNABLEROLES_EXTENDED: builder.display('manageassignableroles', {
			examples: [
				'gmt-4|notification squad',
				'reset',
				'show'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).'],
				['reset', 'Clears the list of assignable roles.'],
				['show', 'Displays the list of assignable roles.']
			],
			extendedHelp: 'Adding a role to the list of assignable roles allows members to assign that role to themselves without staff intervention.',
			reminder: 'NOTE: If an assignable role shares a name with a snippet, the snippet will be inaccessible using custom command syntax.'
		}),
		COMMAND_MANAGEASSIGNABLEROLES_MANAGE_REMOVED: (removedRoles: string) => `${Emojis.MINUS} Removed roles: ${removedRoles}\n`,
		COMMAND_MANAGEASSIGNABLEROLES_MANAGE_ADDED: (addedRoles: string) => `${Emojis.PLUS} Added roles: ${addedRoles}`,
		COMMAND_MANAGEASSIGNABLEROLES_RESET: 'The list of assignable roles has been cleared.',
		COMMAND_MANAGEASSIGNABLEROLES_SHOW_NOROLES: 'There are no assignable roles in this server.',
		COMMAND_MANAGEASSIGNABLEROLES_SHOW_ROLENOTFOUND: 'Role not found',
		COMMAND_MANAGEWORDBLACKLIST_DESCRIPTION: 'Manage the list of banned words for this server',
		COMMAND_MANAGEWORDBLACKLIST_EXTENDED: builder.display('managewordblacklist', {
			examples: [
				'enable',
				'disable',
				'reset',
				'fuckballs'
			],
			explainedUsage: [
				['enable', 'Turns on the word blacklist feature in this server.'],
				['disable', 'Turns off the word blacklist feature in this server.'],
				['reset', 'Removes all words from this server\'s word blacklist.']
			]
		}),
		COMMAND_MANAGEWORDBLACKLIST_ENABLED: 'The word blacklist feature has been enabled in this server.',
		COMMAND_MANAGEWORDBLACKLIST_DISABLED: 'The word blacklist feature has been disabled in this server.',
		COMMAND_MANAGEWORDBLACKLIST_RESET: 'The list of blacklisted words has been reset/cleared.',
		COMMAND_MANAGEWORDBLACKLIST_UPDATE: (removing: boolean) => `Your word has been ${removing ? 'removed from' : 'added to'} the word blacklist.`,
		COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_DESCRIPTION: 'Choose whether the server\'s trusted role is required to self-assign roles',
		COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_EXTENDED: builder.display('toggletrustedrolerequirement', {
			extendedHelp: 'The server must have a trusted role set before this command can be used.'
		}),
		COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_DISABLE: 'The trusted role is no longer required to self-assign roles.',
		COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_ENABLE: 'The trusted role is now required to self-assign roles.',
		/**
		 * ################################
		 * #   USER SETTINGS COMMANDS     #
		 * ################################
		 */
		COMMAND_SETEMBEDCOLOR_DESCRIPTION: 'Set the color of your personal embeds',
		COMMAND_SETEMBEDCOLOR_EXTENDED: builder.display('setembecolor', {
			examples: [
				'#004953',
				'#4cbb17',
				'reset',
				'show'
			],
			explainedUsage: [
				['color', 'Use the hex code of the color you want to set.'],
				['reset', 'Use this argument to reset your embed color.'],
				['show', 'Use this argument to show your currently set embed color.']
			],
			extendedHelp: 'This command will set the color of the embeds for your list of pending reminders and the `whois` command.'
		}),
		RESOLVER_INVALID_COLOR: (hex: string) => `**${hex}** is not a valid hex code.`,
		COMMAND_SETEMBEDCOLOR_RESET: 'Your embed color has been reset.',
		COMMAND_SETEMBEDCOLOR_SHOW: (hex: string) => `Your embed color is currently set to: **${hex}**.`,
		COMMAND_SETEMBEDCOLOR_SHOW_NONE: 'You do not currently have an embed color set.',
		COMMAND_SETEMBEDCOLOR_SET: (hex: string) => `Your embed color has been set to **${hex}**.`,
		/**
		 * ################################
		 * #      SYSTEM COMMANDS         #
		 * ################################
		 */
		COMMAND_FEEDBACK_DESCRIPTION: 'Send feedback or suggestions to the bot\'s developers.',
		COMMAND_FEEDBACK_EXTENDED: builder.display('feedback', {
			examples: [
				'GIB MORE NEW FEATURES'
			],
			extendedHelp: 'This command has a cooldown of 60 seconds per user.'
		}),
		COMMAND_FEEDBACK_NO_GUILD: 'The specified feedback server for this bot does not exist; contact a bot owner.',
		COMMAND_FEEDBACK_NO_CHANNEL: 'The specified feedback channel for this bot does not exist; contact a bot owner.',
		COMMAND_FEEDBACK_SENT: 'Your feedback has been sent, thanks!',
		/**
		 * ################################
		 * #  LOG EVENT  TOGGLE COMMANDS  #
		 * ################################
		 */
		COMMAND_TOGGLECHANNELCREATE_DESCRIPTION: 'Toggle whether channel creations are logged in the serverlog',
		COMMAND_TOGGLECHANNELCREATE: (disabled: boolean) => `Channel creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLECHANNELDELETE_DESCRIPTION: 'Toggle whether channel deletions are logged in the serverlog',
		COMMAND_TOGGLECHANNELDELETE: (disabled: boolean) => `Channel deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLECHANNELUPDATE_DESCRIPTION: 'Toggle whether channel updates are logged in the serverlog',
		COMMAND_TOGGLECHANNELUPDATE_EXTENDED: builder.display('togglechannelupdate', {
			extendedHelp: 'Channel update log embeds include: channel name changes.'
		}),
		COMMAND_TOGGLECHANNELUPDATE: (disabled: boolean) => `Channel update logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEEMOJICREATE_DESCRIPTION: 'Toggle whether emoji creations are logged in the serverlog',
		COMMAND_TOGGLEEMOJICREATE: (disabled: boolean) => `Emoji creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEEMOJIDELETE_DESCRIPTION: 'Toggle whether emoji deletions are logged in the serverlog',
		COMMAND_TOGGLEEMOJIDELETE: (disabled: boolean) => `Emoji deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEEMOJIUPDATE_DESCRIPTION: 'Toggle whether emoji updates are logged in the serverlog',
		COMMAND_TOGGLEEMOJIUPDATE_EXTENDED: builder.display('toggleemojiupdate', {
			extendedHelp: 'Emoji update log embeds include: emoji name changes.'
		}),
		COMMAND_TOGGLEEMOJIUPDATE: (disabled: boolean) => `Emoji update logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEGUILDBANADD_DESCRIPTION: 'Toggle whether bans are logged in the memberlog',
		COMMAND_TOGGLEGUILDBANADD: (disabled: boolean) => `Ban logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEGUILDBANREMOVE_DESCRIPTION: 'Toggle whether unbans are logged in the memberlog',
		COMMAND_TOGGLEGUILDBANREMOVE: (disabled: boolean) => `Unban logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEGUILDMEMBERADD_DESCRIPTION: 'Toggle whether member joins are logged in the memberlog',
		COMMAND_TOGGLEGUILDMEMBERADD: (disabled: boolean) => `Member join logging hsa been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEGUILDMEMBERREMOVE_DESCRIPTION: 'Toggle whether member leaves are tracked in the memberlog',
		COMMAND_TOGGLEGUILDMEMBERREMOVE: (disabled: boolean) => `Member leave logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEGUILDMEMBERUPDATE_DESCRIPTION: 'Toggle whether member updates are logged in the memberlog',
		COMMAND_TOGGLEGUILDMEMBERUPDATE_EXTENDED: builder.display('toggleguildmemberupdate', {
			extendedHelp: 'Member update log embeds include: display name changes and member role updates.'
		}),
		COMMAND_TOGGLEGUILDMEMBERUPDATE: (disabled: boolean) => `Member update logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEINVITECREATE_DESCRIPTION: 'Toggle whether invite creates are logged in the serverlog',
		COMMAND_TOGGLEINVITECREATE: (disabled: boolean) => `Invite creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEINVITEDELETE_DESCRIPTION: 'Toggle whether invite deletes are logged in the serverlog',
		COMMAND_TOGGLEINVITEDELETE: (disabled: boolean) => `Invite deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEMESSAGEDELETE_DESCRIPTION: 'Toggle whether message deletes are logged in the serverlog',
		COMMAND_TOGGLEMESSAGEDELETE: (disabled: boolean) => `Message delete logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEMESSAGEDELETEBULK_DESCRIPTION: 'Toggle whether message purges are logged in the serverlog',
		COMMAND_TOGGLEMESSAGEDELETEBULK: (disabled: boolean) => `Message purge logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEROLECREATE_DESCRIPTION: 'Toggle whether role creates are logged in the serverlog',
		COMMAND_TOGGLEROLECREATE: (disabled: boolean) => `Role creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEROLEDELETE_DESCRIPTION: 'Toggle whether role deletes are logged in the serverlog',
		COMMAND_TOGGLEROLEDELETE: (disabled: boolean) => `Role deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		COMMAND_TOGGLEROLEUPDATE_DESCRIPTION: `Toggle whether role updates are logged in the serverlog`,
		COMMAND_TOGGLEROLEUPDATE_EXTENDED: builder.display('toggleroleupdate', {
			extendedHelp: 'Role update log embeds include: role name changes.'
		}),
		COMMAND_TOGGLEROLEUPDATE: (disabled: boolean) => `Role update logging has been turned ${disabled ? 'off' : 'on'}.`,
		/**
		 * ################################
		 * #      LOG EVENTS              #
		 * ################################
		 */
		EVENT_CHANNELCREATE_EMBED: {
			FOOTER: (id: string) => `Channel ID: ${id}`,
			TITLE: (type: string, name: string) => `${util.toTitleCase(type)} Channel Created | ${name}`
		},
		EVENT_CHANNELDELETE_EMBED: {
			FOOTER: (id: string) => `Channel ID: ${id}`,
			TITLE: (type: string, name: string) => `${util.toTitleCase(type)} Channel Deleted | ${name}`
		},
		EVENT_CHANNELUPDATE_NAMECHANGE_EMBED: {
			FOOTER: (id: string) => `Channel ID: ${id}`,
			TITLE: (oldName: string, newName: string, type: string) => `${oldName} ${type} channel name changed to ${newName}`
		},
		EVENT_EMOJICREATE_EMBED: {
			FOOTER: (id: string) => `Emoji ID: ${id}`,
			TITLE: (name: string) => `Emoji Created | ${name}`
		},
		EVENT_EMOJIDELETE_EMBED: {
			FOOTER: (id: string) => `Emoji ID: ${id}`,
			TITLE: (name: string) => `Emoji Deleted | ${name}`
		},
		EVENT_EMOJIUPDATE_NAMECHANGE_EMBED: {
			FOOTER: (id: string) => `Emoji ID: ${id}`,
			TITLE: (oldName: string, newName: string, animated: boolean) => `${oldName} ${animated ? 'animated ' : ''}emoji name changed to ${newName}`
		},
		EVENT_ROLECREATE_EMBED: {
			FOOTER: (id: string) => `Role ID: ${id}`,
			TITLE: (name: string) => `Role Created | ${name}`
		},
		EVENT_ROLEDELETE_EMBED: {
			FOOTER: (id: string) => `Role ID: ${id}`,
			TITLE: (name: string) => `Role Deleted | ${name}`
		},
		EVENT_ROLEUPDATE_NAMECHANGE_EMBED: {
			FOOTER: (id: string) => `Role ID: ${id}`,
			TITLE: (oldName: string, newName: string) => `${oldName} role name changed to ${newName}`
		},
		EVENT_GUILDMEMBERADD_EMBED: {
			FIELD_TITLES: {
				BOT: (executor: string) => `Bot added by ${executor}`,
				HUMAN: 'Member Joined Server'
			},
			FIELD_VALUES: {
				ACCOUNT_AGE: (duration: string) => `Account created ${duration} ago`
			},
			FOOTER: (id: string) => `Member ID: ${id}`
		},
		EVENT_GUILDMEMBERREMOVE_EMBED: {
			FIELD_TITLES: {
				JOIN_DATE: (bot: boolean) => `${bot ? 'Bot' : 'Member'} Left Server`,
				ROLES: 'Roles'
			},
			FIELD_VALUES: {
				JOIN_DATE: (duration: string) => `Joined ${duration} ago`
			},
			FOOTER: (id: string) => `Member ID: ${id}`
		},
		EVENT_GUILDMEMBERUPDATE_ROLEUPDATE_EMBED: {
			FOOTER: (id: string) => `Member ID: ${id}`,
			TITLE: (type: string, role: string, executor: string) => `${type} the ${role} role by ${executor}`
		},
		EVENT_GUILDMEMBERUPDATE_ROLEUPDATE_REMOVEDFROM: 'Removed from',
		EVENT_GUILDMEMBERUPDATE_ROLEUPDATE_ADDEDTO: 'Added to',
		EVENT_GUILDMEMBERUPDATE_DISPLAYNAMECHANGE_EMBED: {
			FIELD_TITLES: {
				NEW_DISPLAY_NAME: 'New Display Name'
			},
			FOOTER: (id: string) => `Member ID: ${id}`
		},
		EVENT_INVITECREATE_EMBED: {
			FOOTER: (code: string) => `Invite Code: ${code}`,
			TITLE: (channel: string) => `Invite created for ${channel}`
		},
		EVENT_INVITEDELETE_EMBED: {
			FOOTER: (code: string) => `Invite Code: ${code}`,
			TITLE: (channel: string) => `Invite for ${channel} deleted`
		},
		EVENT_MESSAGEDELETE_UNABLE_TO_DISPLAY: 'Message is unable to be displayed.',
		EVENT_MESSAGEDELETE_EMBED: {
			FIELD_TITLES: {
				CHANNEL: (name: string, parent: string) => `Message Deleted in ${name} (${parent})`
			},
			FOOTER: (id: string, time: string) => `Message ID: ${id} | Message sent ${time} ago`
		},
		EVENT_MESSAGEDELETEBULK_EMBED: {
			FOOTER: (id: string) => `Channel ID: ${id}`,
			TITLE: (size: number, name: string, parent: string) => `${size} messages purged from ${name} (${parent})`
		},
		EVENT_GUILDBANADD_EMBED: {
			FOOTER: (id: string) => `User ID: ${id}`,
			TITLE: (executor: string) => `Banned by ${executor}`
		},
		EVENT_GUILDBANREMOVE_EMBED: {
			FOOTER: (id: string) => `User ID: ${id}`,
			TITLE: (executor: string) => `Unbanned by ${executor}`
		},
		/**
		 * ################################
		 * #          MONITORS            #
		 * ################################
		 */
		MONITOR_WORDBLACKLIST_FILTERED: 'Please refrain from using words that are blacklisted!',
		MONITOR_MENTIONSPAM_MAX: (maxMentions: number) => `You tagged more than ${maxMentions} people, chill out please.`,
		/**
		 * ################################
		 * #         INHIBITORS           #
		 * ################################
		 */
		INHIBITOR_PINGPROTECTION_ROLEPING: 'It looks like you are trying to inject a role ping. I\'m not going to let you do that!',
		INHIBITOR_PINGPROTECTION_EVERYONE: 'It looks like you are trying to ping everyone. I\'m not going to let you do that!'

	};


	public async init(): Promise<any> {
		await super.init();
	}

}
