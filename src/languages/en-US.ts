/* eslint-disable @typescript-eslint/no-invalid-this */
import { Language, LanguageKeys, util } from 'klasa';
import { HelpBuilder } from '@utils/HelpBuilder';
import { NAME as botName } from '@root/config';
import { ModerationCase } from '@lib/structures/ModerationCases';
import { oneLine } from 'common-tags';
import { Emojis } from '@lib/types/Enums';
import { toTitleCase } from '@utils/util';

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
	public PERMISSIONS = Perms;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error 2416
	public language: LanguageKeys = {
		/* *****
				KLASA FRAMEWORK WORDS
				***** */
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
		COMMAND_HELP_DATA: {
			TITLE: (description: string) => `${description}`,
			USAGE: (usage: string) => `📝 | ***Command Usage***\n\`${usage}\`\n`,
			EXTENDED: (extendedHelp: string) => `🔍 | ***Extended Help***\n${extendedHelp}`,
			FOOTER: (name: string) => `Command help for ${name}`
		},
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
		/* #####
				GENERAL STUFF
				##### */
		USER_NOT_IN_GUILD: (user: string) => `${user} is not in this server.`,
		ROLES: 'Roles',
		NONE: 'None',
		/* #####
				ARGUMENTS
				##### */
		ARGUMENT_TIMESPAN_INVALID: (arg: string) => `**${arg}** is an invalid timespan.`,
		ARGUMENT_USERNAME_CANNOTFIND: (search: string) => `Could not find a user by searching with **${search}**.`,
		ARGUMENT_USERNAME_MULTIPLE: (users: string) => `Found multiple users: \`${users}\`.`,
		/*
				FUN COMMANDS
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
		COMMAND_CHOOSE_RESPONSE: (choice: string) => `${botName} chooses... \`${choice}\`!`,
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
		COMMAND_AUDINO_DESCRIPTION: 'When the audio cuts out and you must screm',
		COMMAND_AUDINO_EXTENDED: builder.display('audino', {
			extendedHelp: 'This command has a cooldown of 60 seconds per channel. The image this command displays came from a reading livestream [John](https://en.wikipedia.org/wiki/John_Green_(author)) did; it\'s the face he made when his audio cut out *again*.'
		}, true),
		COMMAND_F_DESCRIPTION: 'Press F to pay respects',
		COMMAND_F_EXTENDED: builder.display('f', {
			extendedHelp: 'This command has a cooldown of 60 seconds per channel. [You can find an explanation of the meme here](https://knowyourmeme.com/memes/press-f-to-pay-respects).'
		}),
		COMMAND_8BALL_DESCRIPTION: 'Ask a question and get an answer... a sassy one, of course',
		COMMAND_8BALL_EXTENDED: builder.display('8ball', {
			examples: [
				'will the jonathans ever stop being annoying?'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.'
		}),
		COMMAND_8BALL_RESPONSES: [
			'test1',
			'test2'
		],
		/* #####
				MODERATION SYSTEM
				##### */
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
			reminder: 'You must set up the server\'s Deafened role before you can use this command. The Deafened role should prevent users from seeing most (or all) channels in the server.'
		}, true),
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
			]
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
			]
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
			reminder: 'You must set up the server\'s Deafened role before using this command.'
		}),
		COMMAND_UNDEAFEN_UNABLE: (target: string) => `Unable to undeafen ${target}.`,
		COMMAND_UNDEAFEN_SUCCESS: (target: string, thisCase: ModerationCase) => `Undeafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		COMMAND_PERMISSIONS_DESCRIPTION: 'View the permissions of the specified user.',
		COMMAND_PERMISSIONS_HAS_ALL: (user: string) => `${user} has the Administrator permission; they have all permissions by default.`,
		/* #####
				SNIPPETS
				#### */
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
			]
		}, true),
		COMMAND_SNIPPET_ADD: (name: string) => `Added a snippet with the name: ${name}.`,
		COMMAND_SNIPPET_EDIT: (name: string) => `Edited the ${name} snippet.`,
		COMMAND_SNIPPET_REMOVE: (name: string) => `Removed the ${name} snippet.`,
		COMMAND_SNIPPET_NOPERMISSION: 'You do not have permissions to edit snippets for this server.',
		COMMAND_SNIPPET_ALREADYEXISTS: (name: string) => `There is already a snippet named ${name}.`,
		COMMAND_SNIPPET_INVALID: (name: string) => `There is no snippet with the name: ${name}.`,
		COMMAND_SNIPPET_NOSNIPS: 'This server has no snippets!',
		COMMAND_SNIPPET_RESET: 'This server\'s snippets have been reset.',
		/* #####
				REMINDERS
				#### */
		COMMAND_REMIND_DESCRIPTION: 'Create, view, or cancel reminders',
		COMMAND_REMIND_EXTENDED: builder.display('remind', {
			examples: [
				'put laundry away|1h',
				'view',
				'cancel|1'
			]
		}),
		RESOLVER_REMINDER_LENGTH: 'Reminders have a maximum length of 140 characters.',
		RESOLVER_REMINDER_INVALID: (arg: string | number) => `**${arg}** is not a valid reminder number.`,
		COMMAND_REMIND_CREATED: (duration: string) => `I'll remind you about that in ${duration}.`,
		COMMAND_REMIND_NOREMINDERS: 'You have no reminders currently set.',
		COMMAND_REMINDER_DISPLAY_HIDDEN: 'Private reminder: content hidden',
		/* #####
				SELF-ASSIGN
				#### */
		COMMAND_ASSIGN_DESCRIPTION: `Assign roles to yourself using ${botName}`,
		COMMAND_ASSIGN_EXTENDED: builder.display('assign', {
			examples: [
				'edit|gmt-4',
				'list',
				'gmt-4'
			],
			extendedHelp: oneLine`This command allows server staff to edit the list of roles that can be self-assigned by members;
					and allows members to view the list of self-assignable roles, and add/remove the roles from themselves.`,
			reminder: 'Only roles that have been designated as self-assignable by server staff can be used with this command.'
		}),
		COMMAND_ASSIGN_EDIT_ADD: (roles: string) => `Added to the list of self-assignable roles: \`${roles}\``,
		COMMAND_ASSIGN_EDIT_REMOVE: (roles: string) => `Removed from the list of self-assignable roles: \`${roles}\``,
		COMMAND_ASSIGN_NOTSTAFF: 'Only server staff can edit the list of self-assignable roles!',
		COMMAND_ASSIGN_NOTASSIGNABLE: (role: string) => `${Emojis.REDX} The ${role} role is not self-assignable.`,
		COMMAND_ASSIGN_ROLE_ADD: (roles: string) => `${Emojis.PLUS} Added role(s): \`${roles}\``,
		COMMAND_ASSIGN_ROLE_REMOVE: (roles: string) => `${Emojis.MINUS} Removed role(s): \`${roles}\``,
		/* #####
				MEMBER INFO
				#### */
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
		COMMAND_WHOIS_EMBED_DISPLAYNAME: 'Display Name',
		COMMAND_WHOIS_EMBED_ACCOUNTCREATED: 'Account Created',
		COMMAND_WHOIS_EMBED_JOINEDGUILD: 'Joined Server',
		COMMAND_WHOIS_EMBED_ROLES: 'Roles',
		/* #####
				SERVER INFO
				#### */
		COMMAND_SERVERINFO_DESCRIPTION: 'See useful information about the server',
		COMMAND_SERVERINFO_EXTENDED: builder.display('serverinfo', {
			extendedHelp: oneLine`Displayed stats: Total Members, # of Humans vs # of Bots, # of Text Channels vs # of Voice Channels,
					# of Roles, # of Emojis, and the percentage of members with roles.`
		}),
		COMMAND_SERVERINFO_GUILDCREATION: (date: string, duration: string) => `Created ${date} (${duration} ago)`,
		COMMAND_SERVERINFO_EMBED_TOTALMEMBERS: 'Total Members',
		COMMAND_SERVERINFO_EMBED_HUMANS: 'Humans',
		COMMAND_SERVERINFO_EMBED_BOTS: 'Bots',
		COMMAND_SERVERINFO_EMBED_TEXTCHANNELS: 'Text Channels',
		COMMAND_SERVERINFO_EMBED_VOICECHANNELS: 'Voice Channels',
		COMMAND_SERVERINFO_EMBED_ROLES: 'Roles',
		COMMAND_SERVERINFO_EMBED_EMOJIS: 'Emojis',
		COMMAND_SERVERINFO_EMBED_PERCENTAGE: 'Members with Roles',
		COMMAND_ROLEINFO_DESCRIPTION: 'Display basic information about a role, along with a list of members who have it',
		COMMAND_ROLEINFO_EXTENDED: builder.display('roleinfo', {
			examples: [
				'gmt-4'
			],
			extendedHelp: 'Roles which have been designated as restricted by the server staff cannot be viewed with this command.'
		}),
		COMMAND_ROLEINFO_RESTRICTED: 'This role is restricted; you cannot view information about it.',
		COMMAND_ROLEINFO_NOMEMBERS: 'There are no members in this role.',
		COMMAND_ROLEINFO_TOOMANY: 'There are too many members in this role to display.',
		COMMAND_ROLEINFO_CREATED: (role: string, date: string) => `The ${role} role was created on ${date}.`,
		COMMAND_ROLEINFO_ASSIGNABLE: (assignable: boolean) => `This role is ${assignable ? '' : 'not '}self-assignable.`,
		/* #####
				SYSTEM COMMANDS
				#### */
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
		/* #####
				LOG EVENTS
				#### */
		EVENT_CHANNELCREATE_EMBED: {
			FOOTER: (id: string) => `Channel ID: ${id}`,
			TITLE: (type: string, name: string) => `${toTitleCase(type)} Channel Created | ${name}`
		},
		EVENT_CHANNELDELETE_EMBED: {
			FOOTER: (id: string) => `Channel ID: ${id}`,
			TITLE: (type: string, name: string) => `${toTitleCase(type)} Channel Deleted | ${name}`
		},
		EVENT_EMOJICREATE_EMBED: {
			FOOTER: (id: string) => `Emoji ID: ${id}`,
			TITLE: (name: string) => `Emoji Created | ${name}`
		},
		EVENT_EMOJIDELETE_EMBED: {
			FOOTER: (id: string) => `Emoji ID: ${id}`,
			TITLE: (name: string) => `Emoji Deleted | ${name}`
		},
		EVENT_ROLECREATE_EMBED: {
			FOOTER: (id: string) => `Role ID: ${id}`,
			TITLE: (name: string) => `Role Created | ${name}`
		},
		EVENT_ROLEDELETE_EMBED: {
			FOOTER: (id: string) => `Role ID: ${id}`,
			TITLE: (name: string) => `Role Deleted | ${name}`
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
		EVENT_MESSAGEDELETE_UNABLE_TO_DISPLAY: 'Message is unable to be displayed.',
		EVENT_MESSAGEDELETE_NO_CATEGORY: 'No Category',
		EVENT_MESSAGEDELETE_EMBED: {
			FIELD_TITLES: {
				CHANNEL: (name: string, parent: string) => `Message Deleted in ${name} (${parent})`
			},
			FOOTER: (id: string, time: string) => `Message ID: ${id} | Message sent ${time} ago`
		}
	};


	public async init(): Promise<any> {
		await super.init();
	}

}
