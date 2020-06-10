import { Language, LanguageStore, util } from 'klasa';
import { HelpBuilder } from '@utils/HelpBuilder';
import { NAME as botName } from '@root/config';

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


export default class extends Language {

	public caseActions = caseActions;

	public constructor(store: LanguageStore, file: string[], directory: string) {
		super(store, file, directory);
		this.language = {
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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore 2322
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
			MODERATION COMMMANDS
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
			MODERATION_CASE_DISPLAY_FOOTER: (caseNumber: string, targetID: string) => `Case ${caseNumber} (${targetID})`,
			MODERATION_CASE_DISPLAY_TIME_REMAINING: (time: string) => `(${time} left)`,
		};
	}


	public async init(): Promise<any> {
		await super.init();
	}

}
