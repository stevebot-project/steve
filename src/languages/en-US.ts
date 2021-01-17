/* eslint-disable quote-props */
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
	'Dandelions Fly Through Blue Air',
	'Dragons Fight Ten Bald Assassins'
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
		default: (key): string => `${key} has not been localized for en-US yet.`,
		defaultLanguage: 'Default Language',
		prefixReminder: (prefix = `@${this.client.user!.tag}`): string => `The prefix${Array.isArray(prefix)
			? `es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(', ')}`
			: ` in this guild is set to: \`${prefix}\``
		}`,
		settingGatewayExpectsGuild: 'The parameter <Guild> expects either a Guild or a Guild Object.',
		settingGatewayValueForKeyNoext: (data, key): string => `The value ${data} for the key ${key} does not exist.`,
		settingGatewayValueForKeyAlrext: (data, key): string => `The value ${data} for the key ${key} already exists.`,
		settingGatewaySpecifyValue: 'You must specify the value to add or filter.',
		settingGatewayKeyNotArray: (key): string => `The key ${key} is not an Array.`,
		settingGatewayKeyNoext: (key): string => `The key ${key} does not exist in the current data schema.`,
		settingGatewayInvalidType: 'The type parameter must be either add or remove.',
		settingGatewayInvalidFilteredValue: (piece, value): string => `${piece.key} doesn't accept the value: ${value}`,
		resolverMultiTooFew: (name, min = 1): string => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
		resolverInvalidBool: (name): string => `${name} must be true or false.`,
		resolverInvalidChannel: (name): string => `${name} must be a channel tag or valid channel id.`,
		resolverInvalidCustom: (name, type): string => `${name} must be a valid ${type}.`,
		resolverInvalidDate: (name): string => `${name} must be a valid date.`,
		resolverInvalidDuration: (name): string => `${name} must be a valid duration string.`,
		resolverInvalidEmoji: (name): string => `${name} must be a custom emoji tag or valid emoji id.`,
		resolverInvalidFloat: (name): string => `${name} must be a valid number.`,
		resolverInvalidGuild: (name): string => `${name} must be a valid guild id.`,
		resolverInvalidInt: (name): string => `${name} must be an integer.`,
		resolverInvalidLiteral: (name): string => `Your option did not match the only possibility: ${name}`,
		resolverInvalidMember: (name): string => `${name} must be a mention or valid user id.`,
		resolverInvalidMessage: (name): string => `${name} must be a valid message id.`,
		resolverInvalidPiece: (name, piece): string => `${name} must be a valid ${piece} name.`,
		resolverInvalidRegexMatch: (name, pattern): string => `${name} must follow this regex pattern \`${pattern}\`.`,
		resolverInvalidRole: (name): string => `${name} must be a role mention or role id.`,
		resolverInvalidString: (name): string => `${name} must be a valid string.`,
		resolverInvalidTime: (name): string => `${name} must be a valid duration or date string.`,
		resolverInvalidUrl: (name): string => `${name} must be a valid url.`,
		resolverInvalidUser: (name): string => `${name} must be a mention or valid user id.`,
		resolverStringSuffix: ' characters',
		resolverMinmaxExactly: (name, min, suffix): string => `${name} must be exactly ${min}${suffix}.`,
		resolverMinmaxBoth: (name, min, max, suffix): string => `${name} must be between ${min} and ${max}${suffix}.`,
		resolverMinmaxMin: (name, min, suffix): string => `${name} must be greater than ${min}${suffix}.`,
		resolverMinmaxMax: (name, max, suffix): string => `${name} must be less than ${max}${suffix}.`,
		reactionHandlerPrompt: 'Which page would you like to jump to?',
		commandMessageMissing: 'Missing one or more required arguments after end of input.',
		commandMessageMissingRequired: (name): string => `${name} is a required argument.`,
		commandMessageMissingOptionals: (possibles): string => `Missing a required option: (${possibles})`,
		commandMessageNoMatch: (possibles): string => `Your option didn't match any of the possibilities: (${possibles})`,
		// eslint-disable-next-line max-len
		monitorCommandHandlerReprompt: (tag, error, time, abortOptions): string => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
		// eslint-disable-next-line max-len
		monitorCommandHandlerRepeatingReprompt: (tag, name, time, cancelOptions): string => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
		monitorCommandHandlerAborted: 'Aborted',
		// eslint-disable-next-line max-len
		inhibitorCooldown: (remaining, guildCooldown): string => `${guildCooldown ? 'Someone has' : 'You have'} already used this command. You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
		inhibitorDisabledGuild: 'This command has been disabled by an admin in this guild.',
		inhibitorDisabledGlobal: 'This command has been globally disabled by the bot owner.',
		inhibitorMissingBotPerms: (missing): string => `Insufficient permissions, missing: **${missing}**`,
		inhibitorNsfw: 'You can only use NSFW commands in NSFW channels.',
		inhibitorPermissions: cmdName => `You don't have the right permissions to use the **${cmdName}** command!`,
		inhibitorRequiredSettings: (settings): string => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length === 1 ? '' : 's'} and thus the command cannot run.`,
		inhibitorRunIn: (types): string => `This command is only available in ${types} channels.`,
		inhibitorRunInNone: (name): string => `The ${name} command is not configured to run in any channel.`,
		commandBlacklistDescription: 'Blacklists or un-blacklists users and guilds from the bot.',
		commandBlacklistSuccess: (usersAdded, usersRemoved, guildsAdded, guildsRemoved): string => [
			usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
			usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
			guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
			guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
		].filter(val => val !== '').join('\n'),
		commandEvalDescription: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
		commandEvalExtended: [
			'The eval command evaluates code as-in, any error thrown from it will be handled.',
			'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
			'The --silent flag will make it output nothing.',
			"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
			'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
			'The --showHidden flag will enable the showHidden option in util.inspect.',
			'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
		].join('\n'),
		commandEvalError: (time, output, type): string => `**Error**:${output}\n**Type**:${type}\n${time}`,
		commandEvalOutput: (time, output, type): string => `**Output**:${output}\n**Type**:${type}\n${time}`,
		commandEvalSendFile: (time, type): string => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
		commandEvalSendConsole: (time, type): string => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
		commandUnload: (type, name): string => `✅ Unloaded ${type}: ${name}`,
		commandUnloadDescription: 'Unloads the klasa piece.',
		commandUnloadWarn: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again',
		commandTransferError: '❌ That file has been transfered already or never existed.',
		commandTransferSuccess: (type, name): string => `✅ Successfully transferred ${type}: ${name}.`,
		commandTransferFailed: (type, name): string => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
		commandTransferDescription: 'Transfers a core piece to its respective folder.',
		commandReload: (type, name, time): string => `✅ Reloaded ${type}: ${name}. (Took: ${time})`,
		commandReloadFailed: (type, name): string => `❌ Failed to reload ${type}: ${name}. Please check your Console.`,
		commandReloadAll: (type, time): string => `✅ Reloaded all ${type}. (Took: ${time})`,
		commandReloadEverything: (time): string => `✅ Reloaded everything. (Took: ${time})`,
		commandReloadDescription: 'Reloads a klasa piece, or all pieces of a klasa store.',
		commandReboot: 'Rebooting...',
		commandRebootDescription: 'Reboots the bot.',
		commandLoad: (time, type, name): string => `✅ Successfully loaded ${type}: ${name}. (Took: ${time})`,
		commandLoadFail: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
		commandLoadError: (type, name, error): string => `❌ Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
		commandLoadDescription: 'Load a piece from your bot.',
		commandPing: 'Ping?',
		commandPingDescription: 'Runs a connection test to Discord.',
		commandPingPong: (diff, ping): string => `Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
		commandInvite: (): string[] => [
			`To add ${this.client.user!.username} to your discord guild:`,
			`<${this.client.invite}>`,
			util.codeBlock('', [
				'The above link is generated requesting the minimum permissions required to use every command currently.',
				'I know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
				'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
			].join(' ')),
			'Please file an issue at <https://github.com/dirigeants/klasa> if you find any bugs.'
		],
		commandInviteDescription: 'Displays the invite link of the bot, to invite it to your guild.',
		commandInfo: [
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
		commandInfoDescription: 'Provides some information about this bot.',
		commandHelpDescription: `Show info about ${botName}'s commands`,
		commandHelpData: {
			title: (description: string) => `${description}`,
			usage: (usage: string) => `📝 | ***Command Usage***\n\`${usage}\`\n`,
			extended: (extendedHelp: string) => `🔍 | ***Extended Help***\n${extendedHelp}`,
			footer: (name: string) => `Command help for ${name} | ${this.randomDftba}`
		},
		commandHelpBeginning: (prefix: string) => `You can do \`${prefix}help <command>\` (without brackets) to get more information about an individual command!`,
		commandHelpNoExtended: 'No extended help available.',
		commandHelpDm: '📥 | The list of commands you have access to has been sent to your DMs.',
		commandHelpNoDm: '❌ | You have DMs disabled, I couldn\'t send you the commands in DMs.',
		commandHelpUsage: (usage): string => `Usage :: ${usage}`,
		commandHelpExtended: 'Extended Help ::',
		commandEnable: (type, name): string => `+ Successfully enabled ${type}: ${name}`,
		commandEnableDescription: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
		commandDisable: (type, name): string => `+ Successfully disabled ${type}: ${name}`,
		commandDisableDescription: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
		commandDisableWarn: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',
		commandConfNoKey: 'You must provide a key',
		commandConfNoValue: 'You must provide a value',
		commandConfGuarded: (name): string => `${util.toTitleCase(name)} may not be disabled.`,
		commandConfUpdated: (key, response): string => `Successfully updated the key **${key}**: \`${response}\``,
		commandConfKeyNotArray: 'This key is not array type. Use the action \'reset\' instead.',
		commandConfGetNoExt: (key): string => `The key **${key}** does not seem to exist.`,
		commandConfGet: (key, value): string => `The value for the key **${key}** is: \`${value}\``,
		commandConfReset: (key, response): string => `The key **${key}** has been reset to: \`${response}\``,
		commandConfNoChange: (key): string => `The value for **${key}** was already that value.`,
		commandConfServerDescription: 'Define per-server settings.',
		commandConfServerExtended: builder.display('conf', {
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
		commandConfServer: (key, list): string => `**Guild Settings${key}**\n${list}`,
		commandConfUserDescription: 'Define per-user settings.',
		commandConfUserExtended: builder.display('userconf', {
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
		commandConfUser: (key, list): string => `**User Settings${key}**\n${list}`,
		commandStats: (memUsage, uptime, users, guilds, channels, klasaVersion, discordVersion, processVersion): string[] => [
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
		commandStatsDescription: 'Provides some details about the bot and stats.',
		commandStatsExtended: builder.display('stats', {
			extendedHelp: `This command displays statistics about the currently running instance of ${botName}. The statistics displayed are: Memory Usage, Uptime, Users, Guilds, Channels, Klasa version, Discords.js version, and Node.js version.`
		}),
		commandStatsEmbed: {
			fieldTitles: {
				memoryUsage: 'Memory Usage',
				uptime: 'Uptime',
				users: 'Users',
				guilds: 'Guilds',
				channels: 'Channels',
				klasa: 'Klasa Version',
				discordjs: 'Discord.js Version',
				node: 'Node.js Version'
			},
			footer: this.randomDftba,
			title: 'Statistics'
		},
		commandDiscordStatusDescription: 'See the current status of Discord.',
		commandDiscordStatusError: 'An error occured when attempting to fetch Discord\'s status.',
		commandDiscordStautsEmbed: {
			decription: (incident): string => `[Discord Status](https://discordstatus.com/)\n**Current Incident:**\n${incident}`,
			footer: (time): string => `Last changed: ${time} | ${this.randomDftba}`
		},
		messagePromptTimeout: 'The prompt has timed out.',
		textPromptAbortOptions: ['abort', 'stop', 'cancel'],
		/**
		 * ################################
		 * #      GENERAL STUFF           #
		 * ################################
		 */
		userNotFound: 'I could not find that user.',
		userNotInGuild: (user: string) => `${user} is not in this server.`,
		none: 'None',
		noParentCategory: 'No Category',
		working: 'Working...',
		/**
		 * ################################
		 * #      ARGUMENTS               #
		 * ################################
		 */
		argumentRoleNameCouldNotFind: (name: string, arg: string) => `Could not find a role match for **${arg}**; the ${name} argument must be a valid role name, id, or mention.`,
		argumentRoleNameMultipleMatches: (matches: string, name: string) => `Found multiple role matches for **${name}**: \`${matches}\``,
		argumentTimespanInvalid: (arg: string) => `**${arg}** is an invalid timespan.`,
		argumentUsernameCannotFind: (search: string) => `Could not find a user by searching with **${search}**.`,
		argumentUsernameMultiple: (users: string) => `Found multiple users: \`${users}\`.`,
		/**
		 * ################################
		 * #      MISCELLANEOUS COMMANDS  #
		 * ################################
		 */
		commandLyricsDescription: 'Search Genius for lyrics to a song',
		commandLyricsExtended: builder.display('lyrics', {
			examples: [
				'accio deathly hallows'
			],
			extendedHelp: 'This command returns a list of Genius links, not the lyrics themselves.'
		}),
		commandLyricsEmbed: {
			title: 'Genius Results'
		},
		commandLyricsNoLyrics: `I couldn't find any lyrics on Genius!`,
		/**
		 * ################################
		 * #      FUN COMMANDS            #
		 * ################################
		 */
		commandChooseDescription: `Have ${botName} make a choice for you`,
		commandChooseExtended: builder.display('choose', {
			examples: [
				'real jonathan|fake jonathan'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.',
			explainedUsage: [
				['choice', 'You need to specify at least two choices for this command to work. Please don\'t make me sass you.']
			],
			reminder: 'Choices have a maximum length of 500 characters.'
		}),
		commandChooseResponse: (choice: string) => `${botName} chooses... ${choice}!`,
		commandChooseTooFew: 'You must provide at least two choices!',
		commandRateDescription: `Have ${botName} rate an item of your choosing`,
		commandRateExtended: builder.display('rate', {
			examples: [
				'the existence of eucalyptus'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.',
			reminder: 'Things to be rated have a maximum length of 500 characters.'
		}),
		commandRateResponse: (thing: string, rating: number) => `${botName} gives \`${thing}\` a ${rating}!`,
		commandRockPaperScissorsDescription: `Play a game of rock, paper, scissors against ${botName}`,
		commandRockPaperScissorsExtended: builder.display('rps', {
			examples: [
				'rock',
				'paper',
				'scissors'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.'
		}),
		commandRockPaperScissorsWinner: (playerMove: string, steveMove: string, winner: number) => `You threw ${playerMove} and ${botName} threw ${steveMove}. ${winner === 0 ? 'Nobody' : winner === -1 ? botName : 'You'} won!`,
		commandRollDescription: 'Roll dice!',
		commandRollExtended: builder.display('roll', {
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
		commandRollResponse: `You rolled:`,
		commandRollEmojiResponse: (emoji: string, message: string) => `${emoji} You rolled: ${message} ${emoji}`,
		commandAudinoDescription: 'When the audio cuts out and you must screm',
		commandAudinoExtended: builder.display('audino', {
			extendedHelp: 'This command has a cooldown of 60 seconds per channel. The image this command displays came from a reading livestream [John](https://en.wikipedia.org/wiki/John_Green_(author)) did; it\'s the face he made when his audio cut out *again*.'
		}, true),
		commandAudinoId: '[Image Description: An image of John Green in front of a bookshelf, raising his hands to his head and making a face of fury because his audio just. Won\'t. Work.]',
		commandFDescription: 'Press F to pay respects',
		commandFExtended: builder.display('f', {
			extendedHelp: 'This command has a cooldown of 60 seconds per channel. [You can find an explanation of the meme here](https://knowyourmeme.com/memes/press-f-to-pay-respects).'
		}),
		commandFId: '[Image Description: A screenshot of a cutscene from Call of Duty: Advanced Warfare, showing a US Marine\'s funeral. A quick-time-event prompt is showing, saying "Press F to pay respects."]',
		command_8BallDescription: 'Ask a question and get an answer... a sassy one, of course',
		command_8BallExtended: builder.display('8ball', {
			examples: [
				'will the jonathans ever stop being annoying?'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.'
		}),
		command_8BallResponses: [
			'The eucalyptus says yes.',
			'Hahahaha... no.',
			'I guess so...',
			'Everything is burning lol go do something productive instead of asking me this.',
			'Not today, satan.',
			'Yes? No? Maybe so? I don\'t care, to be honest.',
			'Lemme finish my eucalyptus, then try asking me again.'
		],
		commandDftbaDescription: 'Don\'t Forget to be Awesome!',
		commandDftbaExtended: builder.display('dftba', {
			extendedHelp: 'Darling, Fetch the Battle Axe!',
			reminder: 'Decepticons Fear This Brilliant Autobot'
		}),
		commandXkcdDescription: 'Get an XKCD comic',
		commandXkcdExtended: builder.display('xkcd', {
			examples: [
				'',
				'50'
			],
			extendedHelp: 'The ability to search for a relevant XKCD is coming soon!'
		}),
		commandXkcdInvalid: 'I was unable to find that XKCD.',
		/**
		 * ################################
		 * #      MODERATION SYSTEM       #
		 * ################################
		 */
		moderationNoDuration: 'No duration provided.',
		moderationNoReason: 'No reason provided.',
		moderationNoSteve: 'hahahahaha... no.',
		moderationNoSelf: 'Come on fam, don\'t do that to yourself.',
		moderationHigherRole: (user: string) => `${user} has a higher role than you.`,
		moderationCaseDisplayFieldTarget: 'Target',
		moderationCaseDisplayFieldModerator: 'Moderator',
		moderationCaseDisplayFieldDuration: 'Duration',
		moderationCaseDisplayFieldReason: 'Reason',
		moderationCaseDisplayFooter: (caseNumber: number, targetID: string) => `Case ${caseNumber} (${targetID})`,
		moderationCaseDisplayTimeRemaining: (time: string) => `(${time} left)`,
		commandMuteDescription: 'Add the server\'s Muted role to the specified user',
		commandMuteExtended: builder.display('mute', {
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
		commandMuteSuccess: (target: string, thisCase: ModerationCase) => `Muted ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandMuteUnable: (target: string) => `Unable to mute ${target}.`,
		commandDeafenDescription: 'Add the server\'s Deafened role to the specified user',
		commandDeafenExtended: builder.display('deafen', {
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
		commandDeafenUnable: (target: string) => `Unable to deafen ${target}.`,
		commandDeafenSuccess: (target: string, thisCase: ModerationCase) => `Deafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandBanDescription: 'Ban a user from the server',
		commandBanExtended: builder.display('ban', {
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
		commandBanUnable: (target: string) => `Unable to ban ${target}.`,
		commandBanSuccess: (target: string, thisCase: ModerationCase) => `Banned ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandKickDescription: 'Kick a user from the server',
		commandKickExtended: builder.display('kick', {
			examples: [
				'jonathan|paying too much attention to spacex launches'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.'],
				['reason', 'You can specify a reason for this action, to be used in the server\'s audit log and in my case log.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.KICK_MEMBERS}** permission.`
		}),
		commandKickUnable: (target: string) => `Unable to kick ${target}.`,
		commandKickSuccess: (target: string, thisCase: ModerationCase) => `Kicked ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandUnbanDescription: 'Unban a user from the server',
		commandUnbanExtended: builder.display('unban', {
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
		commandUnbanUnable: (target: string) => `Unable to unban ${target}.`,
		commandUnbanSuccess: (target: string, thisCase: ModerationCase) => `Unbanned ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandUnmuteDescription: 'Remove a member from the server\'s Muted role',
		commandUnmuteExtended: builder.display('unmute', {
			examples: [
				'enchtest|2 more strikes and you\'re out'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'You must set up the server\'s Muted role before using this command.'
		}),
		commandUnmuteUnable: (target: string) => `Unable to unmute ${target}.`,
		commandUnmuteSuccess: (target: string, thisCase: ModerationCase) => `Unmuted ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandUndeafenDescription: 'Remove a member from the server\'s Deafened role',
		commandUndeafenExtended: builder.display('undeafen', {
			examples: [
				'enchtest|come back to the world of the living'
			],
			explainedUsage: [
				['username', 'This argument is required. You can use a member\'s username or snowflake (long ID number) with this command. You can also tag them.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'You must set up the server\'s Deafened role before using this command.'
		}),
		commandUndeafenUnable: (target: string) => `Unable to undeafen ${target}.`,
		commandUndeafenSuccess: (target: string, thisCase: ModerationCase) => `Undeafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandPermissionsDescription: 'View the permissions of the specified user.',
		commandPermissionsHasAll: (user: string) => `${user} has the Administrator permission; they have all permissions by default.`,
		commandClearRoleDescription: 'Quickly remove all members from the specified role',
		commandClearRoleExtended: builder.display('clearrole', {
			examples: [
				'gmt-4'
			]
		}),
		commandClearRoleRoleEmpty: (role: string) => `There are no members in the ${role} role.`,
		commandClearRole: (size: number, role: string) => `${size} members were removed from the ${role} role.`,
		commandNicknameDescription: 'Set or clear a member\'s nickname',
		commandNicknameExtended: builder.display('nickname', {
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
		commandNicknameSet: (user: string) => `${user}'s nickname has been set.`,
		commandNicknameCleared: (user: string) => `${user}'s nickname has been cleared.`,
		commandRoleDescription: 'Add or remove a role from a member',
		commandRoleExtended: builder.display('role', {
			examples: [
				'jonathan|gmt-4'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_ROLES}** permission.`,
			reminder: 'This command works on a toggle; there is no need to specify if you want to add or remove the command.'
		}),
		commandRoleRemove: (roles: string) => `${Emojis.MINUS} Removed roles: \`${roles}\``,
		commandRoleAdd: (roles: string) => `${Emojis.PLUS} Added roles: \`${roles}\``,
		commandLockDescription: 'Lock a channel from public posting',
		commandLockExtended: builder.display('lock', {
			extendedHelp: `This command takes away the **${this.PERMISSIONS.SEND_MESSAGES}** permission from the everyone role in the channel. I need the **${this.PERMISSIONS.MANAGE_CHANNELS}** permission to run it.`
		}),
		commandLockLocked: 'This channel has been locked.',
		commandUnlockDescription: 'Opens a channel to public posting',
		commandUnlockExtended: builder.display('unlock', {
			extendedHelp: `This command gives the ${this.PERMISSIONS.SEND_MESSAGES} permission to the everyone role in the channel. I need the **${this.PERMISSIONS.MANAGE_CHANNELS}** permission to run it.`
		}),
		commandUnlockUnlocked: 'This channel has been unlocked.',
		commandSlowModeDescription: 'Set the message ratelimit in a channel',
		commandSlowModeExtended: builder.display('slowmode', {
			examples: [
				'1 minute',
				'reset'
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_CHANNELS}** permission.`,
			reminder: 'Using "reset" as the argument will turn slowmode off.'
		}),
		commandSlowModeReset: 'Slowmode has been turned off.',
		commandSlowModeSet: (duration: string) => `Slowmode has been set to 1 message per member per ${duration}.`,
		commandPurgeDescription: 'Quickly delete a specified number of messages',
		commandPurgeExtended: builder.display('purge', {
			examples: [
				'10'
			],
			explainedUsage: [
				['number', 'The maximum number of messages that can be purged at once is 99.']
			],
			extendedHelp: `This command requires me to have the **${this.PERMISSIONS.MANAGE_MESSAGES}** permission to run it.`,
			reminder: 'The command message is automatically counted towards the number of messages deleted, so there is no need to account for it when specifying a number.'
		}),
		commandPurgePurged: (size: number) => `${size} messages were deleted.`,
		/**
		 * ################################
		 * #         ROLE ALIASES         #
		 * ################################
		 */
		commandRoleAliasDescription: 'Add an alias to a role to make self-assigning easier',
		commandRoleAliasExtended: builder.display('rolealias', {
			examples: [
				'add|notifsquad|notification squad',
				'remove|notifsquad'
			]
			// TODO: add better help for role alias command
		}),
		commandRoleAliasAlreadyExists: (alias: string) => `The ${alias} role alias already exists.`,
		commandRoleAliasDoesNotExist: (alias: string) => `There is no ${alias} role alias.`,
		commandRoleAliasAdd: (alias: string, role: string) => `Added the ${alias} alias for the ${role} role.`,
		commandRoleAliasRemove: (alias: string) => `The ${alias} role alias has been removed.`,
		/**
		 * ################################
		 * #      SNIPPETS                #
		 * ################################
		 */
		commandSnippetDescription: 'Create/edit/remove/view snippets of information about the server',
		commandSnippetExtended: builder.display('snippet', {
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
		commandSnippetAdd: (name: string) => `Added a snippet with the name: ${name}.`,
		commandSnippetEdit: (name: string) => `Edited the ${name} snippet.`,
		commandSnippetRemove: (name: string) => `Removed the ${name} snippet.`,
		commandSnippetNoPermission: 'You do not have permissions to edit snippets for this server.',
		commandSnippetAlreadyExists: (name: string) => `There is already a snippet named ${name}.`,
		commandSnippetInvalid: (name: string) => `There is no snippet with the name: ${name}.`,
		commandSnippetNoSnipsInGuild: 'This server has no snippets!',
		commandSnippetReset: 'This server\'s snippets have been reset.',
		/**
		 * ################################
		 * #      REMINDERS               #
		 * ################################
		 */
		commandRemindDescription: 'Create, view, or cancel reminders',
		commandRemindExtended: builder.display('remind', {
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
		resolverReminderLength: 'Reminders have a maximum length of 140 characters.',
		resolverReminderInvalid: (arg: string | number) => `**${arg}** is not a valid reminder number.`,
		commandRemindCreated: (duration: string) => `I'll remind you about that in ${duration}.`,
		commandRemindCanceled: (content: string) => `I cancelled the reminder: **${content}**.`,
		commandRemindNoReminders: 'You have no reminders currently set.',
		commandReminderDisplayHidden: 'Private reminder: content hidden',
		commandRemindViewEmbed: {
			title: 'Pending Reminders'
		},
		/**
		 * ################################
		 * #      POMODORO                #
		 * ################################
		 */
		commandPomodoroDescription: 'Be productive using the Pomodoro technique!',
		commandPomodoroExtended: builder.display('pomodoro', {
			extendedHelp: 'This command helps facilitate use of the Pomodoro technique; it is currently under reconstruction and thus its functions are not available. Check back soon!'
		}),
		commandPomodoroUnderConstruction: 'This command is under reconstruction and is not currently available. Check back soon!',
		/**
		 * ################################
		 * #      SELF-ASSIGN             #
		 * ################################
		 */
		commandAssignDescription: `Assign roles to yourself using ${botName}`,
		commandAssignExtended: builder.display('assign', {
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
		commandAssignNoRoleProvided: 'You must provide a role name, id, or mention.',
		commandAssignNotAssignable: (role: string) => `${Emojis.REDX} The ${role} role is not self-assignable.`,
		commandAssignRoleAdd: (roles: string) => `${Emojis.PLUS} Added role(s): \`${roles}\``,
		commandAssignRoleRemove: (roles: string) => `${Emojis.MINUS} Removed role(s): \`${roles}\``,
		commandAssignRoleNeedTrusted: (role: string) => `You need to have the **${role}** role to do that!`,
		/**
		 * ################################
		 * #      MEMBER INFO             #
		 * ################################
		 */
		commandWhoIsDescription: 'Get basic information about a member of the server',
		commandWhoIsExtended: builder.display('whois', {
			examples: [
				'boedj'
			],
			extendedHelp: `Displayed information: Display Name, Account Age, Server Join Date, List of Roles`,
			reminder: 'Not providing a username for this command will display information about yourself.'
		}),
		commandWhoIsDate: (duration: string, date: string) => `${duration} ago (${date})`,
		commandWhoIsJoinedGuildHours: (hours: number, date: string) => `${hours} hours ago (${date})`,
		commandWhoIsEmbed: {
			fieldTitles: {
				displayName: 'Display Name',
				accountCreated: 'Account Created',
				joinedGuild: 'Joined Server',
				roles: 'Roles'
			},
			footer: (id: string) => `Member ID: ${id} | ${this.randomDftba}`
		},
		commandAvatarDescription: 'See a larger version user\'s avatar',
		commandAvatarCannotDisplay: (user: string) => `Unable to display avatar for ${user}.`,
		/**
		 * ################################
		 * #      SERVER INFO             #
		 * ################################
		 */
		commandServerInfoDescription: 'See useful information about the server',
		commandServerInfoExtended: builder.display('serverinfo', {
			extendedHelp: oneLine`Displayed stats: Total Members, # of Humans vs # of Bots, # of Text Channels vs # of Voice Channels,
					# of Roles, # of Emojis, and the percentage of members with roles.`
		}),
		commandServerInfoEmbed: {
			fieldTitles: {
				totalMembers: 'Total Members',
				bots: 'Bots',
				textChannels: 'Text Channels',
				voiceChannels: 'Voice Channels',
				roles: 'Roles',
				emojis: 'Emojis'
			},
			footer: (date: string, duration: string) => `Created ${date} (${duration} ago) | ${this.randomDftba}`
		},
		commandRoleInfoDescription: 'Display basic information about a role, along with a list of members who have it',
		commandRoleInfoExtended: builder.display('roleinfo', {
			examples: [
				'gmt-4'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: 'Roles which have been designated as restricted by the server staff cannot be viewed with this command.'
		}),
		commandRoleInfoRestricted: 'This role is restricted; you cannot view information about it.',
		commandRoleInfoNoMembers: 'There are no members in this role.',
		commandRoleInfoTooMany: 'There are too many members in this role to display.',
		commandRoleInfoEmbed: {
			description: (role: string, date: string) => `The ${role} role was created on ${date}.`,
			fieldTitles: {
				aliases: 'Aliases',
				members: (num: number) => `${num} Member${num === 1 ? '' : 's'}`
			},
			footer: (assignable: boolean) => `This role is ${assignable ? '' : 'not '}self-assignable.`
		},
		/**
		 * ################################
		 * #   SERVER SETTINGS COMMANDS   #
		 * ################################
		 */
		commandManageDisabledCommandsDescription: 'Manage which commands are disabled in a server',
		commandManageDisabledCommandsExtended: builder.display('managedisabledcommands', {
			examples: [
				'xkcd'
			]
		}),
		commandManageDisabledCommandsNoCommandsDisabled: 'This server has no disabled commands.',
		commandManageDisabledCommands: (cmdName, enabling) => `The ${cmdName} command has been ${enabling ? 'enabled' : 'disabled'} in this server.`,
		commandSetMemberLogDescription: `Set what channel ${botName} will use as the memberlog`,
		commandSetMemberLogExtended: builder.display('setmemberlog', {
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
		commandSetMemberLogSet: (channel: string) => `<#${channel}> will be used as this server's memberlog.`,
		commandServerLogDescription: `Set what channel ${botName} will use as the serverlog`,
		commandServerLogExtended: builder.display('setserverlog', {
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
		commandServerLogSet: (channel: string) => `<#${channel}> will be used as this server's serverlog.`,
		commandSetReminderChannelDescription: `Set what channel ${botName} will use as the reminder channel`,
		commandSetReminderChannelExtended: builder.display('setreminderchannel', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: 'If a reminder channel is set, all reminder set in the server will go off in the specified channel.'
		}),
		commandSetReminderChannelSet: (channel: string) => `<#${channel}> will be used as this server's reminder channel.`,
		commandSetAdministratorRoleDescription: 'Set the server\'s administrator role',
		commandSetAdministratorRoleExtended: builder.display('setadministratorrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role, it just gives this role access to server staff commands.'
		}),
		commandSetAdministratorRoleSet: (role: string) => `The ${role} role will be used as this server's administrator role.`,
		commandSetModeratorRoleDescription: 'Set the server\'s moderator role',
		commandSetModeratorRoleExtended: builder.display('setmoderatorrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role, it just gives this role access to server staff commands.'
		}),
		commandSetModeratorRoleSet: (role: string) => `The ${role} role will be used as this server's moderator role.`,
		commandSetTrustedRoleDescription: 'Set the server\'s trusted role',
		commandSetTrustedRoleExtended: builder.display('settrustedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role.'
		}),
		commandSetTrustedRoleSet: (role: string) => `The ${role} role will be used as this server's trusted role.`,
		commandSetMutedRoleDescription: 'Set the server\'s muted role',
		commandSetMutedRoleExtended: builder.display('setmutedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add or remove any extra Discord permissions to the role.'
		}),
		commandSetMutedRoleSet: (role: string) => `The ${role} role will be used as this server's muted role.`,
		commandSetDeafenedRoleDescription: 'Set the server\'s deafened role',
		commandSetDeafenedRoleExtended: builder.display('setdeafenedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add or remove any extra Discord permissions to the role.'
		}),
		commandSetDeafenedRoleSet: (role: string) => `The ${role} role will be used as this server's deafened role.`,
		commandSetBanDeleteDaysDescription: 'Set how many days of messages from a banned user will be deleted',
		commandSetBanDeleteDaysExtended: builder.display('setbandeletedays', {
			examples: [
				'7'
			],
			reminder: `This setting will only function properly if a user is banned using ${botName}`
		}),
		commandSetBanDeleteDaysSet: (days: number) => `${days} days of messages will be deleted from a banned user.`,
		commandManageRestrictedRolesDescription: 'Manage the list of restricted roles for this server',
		commandManageRestrictedRolesExtended: builder.display('managerestrictedroles', {
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
		commandManageRestrictedRolesManageRemoved: (removedRoles: string) => `${Emojis.MINUS} Removed roles: ${removedRoles}\n`,
		commandManageRestrictedRolesManageAdded: (addedRoles: string) => `${Emojis.PLUS} Added roles: ${addedRoles}`,
		commandManageRestrictedRolesReset: 'The list of restricted roles has been cleared.',
		commandManageRestrictedrolesShowNoRoles: 'There are no restricted roles in this server.',
		commandManageRestrictedrolesShowRoleNotFound: 'Role not found',
		commandManageAssignableRolesDescription: 'Manage the list of assignable roles for this server',
		commandManageAssignableRolesExtended: builder.display('manageassignableroles', {
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
		commandManageAssignableRolesManageRemoved: (removedRoles: string) => `${Emojis.MINUS} Removed roles: ${removedRoles}\n`,
		commandManageAssignableRolesManageAdded: (addedRoles: string) => `${Emojis.PLUS} Added roles: ${addedRoles}`,
		commandManageAssignableRolesReset: 'The list of assignable roles has been cleared.',
		commandManageAssignableRolesShowNoRoles: 'There are no assignable roles in this server.',
		commandManageAssignableRolesShowRoleNotFound: 'Role not found',
		commandManageWordBlacklistDescription: 'Manage the list of banned words for this server',
		commandManageWordBlacklistExtended: builder.display('managewordblacklist', {
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
		commandManageWordBlacklistEnabled: 'The word blacklist feature has been enabled in this server.',
		commandManageWordBlacklistDisabled: 'The word blacklist feature has been disabled in this server.',
		commandManageWordBlacklistReset: 'The list of blacklisted words has been reset/cleared.',
		commandManageWordBlacklistUpdate: (removing: boolean) => `Your word has been ${removing ? 'removed from' : 'added to'} the word blacklist.`,
		commandToggleTrustedRoleRequirementDescription: 'Choose whether the server\'s trusted role is required to self-assign roles',
		commandToggleTrustedRoleRequirementExtended: builder.display('toggletrustedrolerequirement', {
			extendedHelp: 'The server must have a trusted role set before this command can be used.'
		}),
		commandToggleTrustedRoleRequirementDisable: 'The trusted role is no longer required to self-assign roles.',
		commandToggleTrustedRoleRequirementEnable: 'The trusted role is now required to self-assign roles.',
		/**
		 * ################################
		 * #   USER SETTINGS COMMANDS     #
		 * ################################
		 */
		commandSetEmbedColorDescription: 'Set the color of your personal embeds',
		commandSetEmbedColorExtended: builder.display('setembecolor', {
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
		resolverInvalidColor: (hex: string) => `**${hex}** is not a valid hex code.`,
		commandSetEmbedColorReset: 'Your embed color has been reset.',
		commandSetEmbedColorShow: (hex: string) => `Your embed color is currently set to: **${hex}**.`,
		commandSetEmbedColorShowNone: 'You do not currently have an embed color set.',
		commandSetEmbedColorSet: (hex: string) => `Your embed color has been set to **${hex}**.`,
		/**
		 * ################################
		 * #      SYSTEM COMMANDS         #
		 * ################################
		 */
		commandFeedbackDescription: 'Send feedback or suggestions to the bot\'s developers.',
		commandFeedbackExtended: builder.display('feedback', {
			examples: [
				'GIB MORE NEW FEATURES'
			],
			extendedHelp: 'This command has a cooldown of 60 seconds per user.'
		}),
		commandFeedbackNoGuild: 'The specified feedback server for this bot does not exist; contact a bot owner.',
		commandFeedbackNoChannel: 'The specified feedback channel for this bot does not exist; contact a bot owner.',
		commandFeedbackSent: 'Your feedback has been sent, thanks!',
		commandSupportDescription: `Get a link to ${botName}'s support server.`,
		/**
		 * ################################
		 * #  LOG EVENT  TOGGLE COMMANDS  #
		 * ################################
		 */
		commandToggleChannelCreateDescription: 'Toggle whether channel creations are logged in the serverlog',
		commandToggleChannelCreate: (disabled: boolean) => `Channel creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleChannelDeleteDescription: 'Toggle whether channel deletions are logged in the serverlog',
		commandToggleChannelDelete: (disabled: boolean) => `Channel deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleChannelUpdateDescription: 'Toggle whether channel updates are logged in the serverlog',
		commandToggleChannelUpdateExtended: builder.display('togglechannelupdate', {
			extendedHelp: 'Channel update log embeds include: channel name changes.'
		}),
		commandToggleChannelUpdate: (disabled: boolean) => `Channel update logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleEmojiCreateDescription: 'Toggle whether emoji creations are logged in the serverlog',
		commandToggleEmojiCreate: (disabled: boolean) => `Emoji creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleEmojiDeleteDescription: 'Toggle whether emoji deletions are logged in the serverlog',
		commandToggleEmojiDelete: (disabled: boolean) => `Emoji deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleEmojiUpdateDescription: 'Toggle whether emoji updates are logged in the serverlog',
		commandToggleEmojiUpdateExtended: builder.display('toggleemojiupdate', {
			extendedHelp: 'Emoji update log embeds include: emoji name changes.'
		}),
		commandToggleEmojiUpdate: (disabled: boolean) => `Emoji update logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildBanAddDescription: 'Toggle whether bans are logged in the memberlog',
		commandToggleGuildBanAdd: (disabled: boolean) => `Ban logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildBanRemoveDescription: 'Toggle whether unbans are logged in the memberlog',
		commandToggleGuildBanRemove: (disabled: boolean) => `Unban logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildMemberAddDescription: 'Toggle whether member joins are logged in the memberlog',
		commandToggleGuildMemberAdd: (disabled: boolean) => `Member join logging hsa been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildMemberRemoveDescription: 'Toggle whether member leaves are tracked in the memberlog',
		commandToggleGuildMemberRemove: (disabled: boolean) => `Member leave logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildMemberUpdateDescription: 'Toggle whether member updates are logged in the memberlog',
		commandToggleGuildMemberUpdateExtended: builder.display('toggleguildmemberupdate', {
			extendedHelp: 'Member update log embeds include: display name changes and member role updates.'
		}),
		commandToggleGuildMemberUpdate: (disabled: boolean) => `Member update logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleInviteCreateDescription: 'Toggle whether invite creates are logged in the serverlog',
		commandToggleInviteCreate: (disabled: boolean) => `Invite creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleInviteDeleteDescription: 'Toggle whether invite deletes are logged in the serverlog',
		commandToggleInviteDelete: (disabled: boolean) => `Invite deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleMessageDeleteDescription: 'Toggle whether message deletes are logged in the serverlog',
		commandToggleMessageDelete: (disabled: boolean) => `Message delete logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleMessageDeleteBulkDescription: 'Toggle whether message purges are logged in the serverlog',
		commandToggleMessageDeleteBulk: (disabled: boolean) => `Message purge logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleRoleCreateDescription: 'Toggle whether role creates are logged in the serverlog',
		commandToggleRoleCreate: (disabled: boolean) => `Role creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleRoleDeleteDescription: 'Toggle whether role deletes are logged in the serverlog',
		commandToggleRoleDelete: (disabled: boolean) => `Role deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleRoleUpdateDescription: `Toggle whether role updates are logged in the serverlog`,
		commandToggleRoleUpdateExtended: builder.display('toggleroleupdate', {
			extendedHelp: 'Role update log embeds include: role name changes.'
		}),
		commandToggleRoleUpdate: (disabled: boolean) => `Role update logging has been turned ${disabled ? 'off' : 'on'}.`,
		/**
		 * ################################
		 * #      LOG EVENTS              #
		 * ################################
		 */
		eventChannelCreateEmbed: {
			footer: (id: string) => `Channel ID: ${id}`,
			title: (type: string, name: string) => `${util.toTitleCase(type)} Channel Created | ${name}`
		},
		eventChannelDeleteEmbed: {
			footer: (id: string) => `Channel ID: ${id}`,
			title: (type: string, name: string) => `${util.toTitleCase(type)} Channel Deleted | ${name}`
		},
		eventChannelUpdateNameChangeEmbed: {
			footer: (id: string) => `Channel ID: ${id}`,
			title: (oldName: string, newName: string, type: string) => `${oldName} ${type} channel name changed to ${newName}`
		},
		eventEmojiCreateEmbed: {
			footer: (id: string) => `Emoji ID: ${id}`,
			title: (name: string) => `Emoji Created | ${name}`
		},
		eventEmojiDeleteEmbed: {
			footer: (id: string) => `Emoji ID: ${id}`,
			title: (name: string) => `Emoji Deleted | ${name}`
		},
		eventEmojiUpdateNameChangeEmbedx: {
			footer: (id: string) => `Emoji ID: ${id}`,
			title: (oldName: string, newName: string, animated: boolean) => `${oldName} ${animated ? 'animated ' : ''}emoji name changed to ${newName}`
		},
		eventRoleCreateEmbed: {
			footer: (id: string) => `Role ID: ${id}`,
			title: (name: string) => `Role Created | ${name}`
		},
		eventRoleDeleteEmbed: {
			footer: (id: string) => `Role ID: ${id}`,
			title: (name: string) => `Role Deleted | ${name}`
		},
		eventRoleUpdateNameChangeEmbed: {
			footer: (id: string) => `Role ID: ${id}`,
			title: (oldName: string, newName: string) => `${oldName} role name changed to ${newName}`
		},
		eventGuildMemberAddEmbed: {
			fieldTitles: {
				bot: (executor: string) => `Bot added by ${executor}`,
				human: 'Member Joined Server'
			},
			fieldValues: {
				accountAge: (duration: string) => `Account created ${duration} ago`
			},
			footer: (id: string) => `Member ID: ${id}`
		},
		eventGuildMemberRemoveEmbed: {
			fieldTitles: {
				joinDate: (bot: boolean) => `${bot ? 'Bot' : 'Member'} Left Server`,
				roles: 'Roles'
			},
			fieldValues: {
				joinDate: (duration: string) => `Joined ${duration} ago`
			},
			footer: (id: string) => `Member ID: ${id}`
		},
		eventGuildMemberUpdateRoleUpdateEmbed: {
			footer: (id: string) => `Member ID: ${id}`,
			title: (type: string, role: string, executor: string) => `${type} the ${role} role by ${executor}`
		},
		eventGuildMemberUpdateRoleUpdateRemovedFrom: 'Removed from',
		eventGuildMemberUpdateRoleUpdateAddedTo: 'Added to',
		eventGuildMemberUpdateDisplayNameChangeEmbed: {
			fieldTitles: {
				newDisplayName: 'New Display Name'
			},
			footer: (id: string) => `Member ID: ${id}`
		},
		eventInviteCreateEmbed: {
			footer: (code: string) => `Invite Code: ${code}`,
			title: (channel: string) => `Invite created for ${channel}`
		},
		eventInviteDeleteEmbed: {
			footer: (code: string) => `Invite Code: ${code}`,
			title: (channel: string) => `Invite for ${channel} deleted`
		},
		eventMessageDeleteUnableToDisplay: 'Message is unable to be displayed.',
		eventMessageDeleteEmbed: {
			fieldTitles: {
				channel: (name: string, parent: string) => `Message Deleted in ${name} (${parent})`
			},
			footer: (id: string, time: string) => `Message ID: ${id} | Message sent ${time} ago`
		},
		eventMessageDeleteBulkEmbed: {
			footer: (id: string) => `Channel ID: ${id}`,
			title: (size: number, name: string, parent: string) => `${size} messages purged from ${name} (${parent})`
		},
		eventGuildBanAddEmbed: {
			footer: (id: string) => `User ID: ${id}`,
			title: (executor: string) => `Banned by ${executor}`
		},
		eventGuildBanRemoveEmbed: {
			footer: (id: string) => `User ID: ${id}`,
			title: (executor: string) => `Unbanned by ${executor}`
		},
		/**
		 * ################################
		 * #          MONITORS            #
		 * ################################
		 */
		monitorWordBlacklistFiltered: 'Please refrain from using words that are blacklisted!',
		monitorMentionSpamMax: (maxMentions: number) => `You tagged more than ${maxMentions} people, chill out please.`,
		/**
		 * ################################
		 * #         INHIBITORS           #
		 * ################################
		 */
		inhibitorPingProtectionEveryone: 'It looks like you are trying to inject a role ping. I\'m not going to let you do that!',
		inhibitorPingprotectionEveryone: 'It looks like you are trying to ping everyone. I\'m not going to let you do that!',
		/**
		 * ################################
		 * #         SERIALIZERS           #
		 * ################################
		 */
		serializerColorInvalidHex: (code: string) => `${code} is not a valid hex.`,
		serializerTrustedRoleSettingInvalidSetting: (setting: string) => `${setting} is not a valid setting for giveTrustedRoleOn.`
	};


	public async init(): Promise<any> {
		await super.init();
	}

}
