import { Language, LanguageStore, util } from 'klasa';
import { oneLine } from 'common-tags';
import { HelpBuilder } from '@lib/util/HelpBuilder';

const builder = new HelpBuilder()
	.setExamples('👀 | **Examples**')
	.setExplainedUsage('🤔 | **Explained Usage**')
	.setReminder('🔥 | **Reminder**');

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
			COMMAND_HELP_DATA: {
				// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
				// @ts-ignore 2322
				TITLE: (description: string): string => `${description}`,
				USAGE: (usage: string): string => `📝 | ***Command Usage***\n\`${usage}\`\n`,
				EXTENDED: (extendedHelp: string): string => `🔍 | ***Extended Help***\n${extendedHelp}`,
				FOOTER: (name: string): string => `Command help for ${name}`
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
			COMMAND_SNIPPET_ADD: (name: string): string => `Added a snippet with the name: ${name}.`,
			COMMAND_SNIPPET_EDIT: (name: string): string => `Edited the ${name} snippet.`,
			COMMAND_SNIPPET_REMOVE: (name: string): string => `Removed the ${name} snippet.`,
			COMMAND_SNIPPET_NOPERMISSION: 'You do not have permissions to edit snippets for this server.',
			COMMAND_SNIPPET_ALREADYEXISTS: (name: string): string => `There is already a snippet named ${name}.`,
			COMMAND_SNIPPET_INVALID: (name: string): string => `There is no snippet with the name: ${name}.`,
			COMMAND_SNIPPET_NOSNIPS: 'This server has no snippets!',
			COMMAND_SNIPPET_RESET: 'This server\'s snippets have been reset.'
		};
	}


	async init(): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
		await super.init();
	}

}
