/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-invalid-this */
import { Language, LanguageKeys, util } from 'klasa';
import { HelpBuilder } from '@utils/HelpBuilder';
import { NAME as botName } from '@root/config';
import { oneLine } from 'common-tags';
import { Emojis } from '@lib/types/Enums';
import { formatDate } from '@utils/util';

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
	'Dragons Fight Ten Bald Assassins',
	'Dynamic Flavors That Bring Amazement'
];

const loading = [
	'Reticulating splines...',
	'Gathering eucalyptus...',
	'Waking up from my nap...',
	'Readying the ban hammer...',
	'Polishing the kick mallet...',
	'Not forgetting to be awesome...',
	'Impatiently waiting for the next Halo...',
	'Working on my book...',
	'Making sure my pants are packed...',
	'Planning my next move...',
	'Attaining world domination...',
	'Making a sea shanty...',
	'Scheming with Carl...'
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
	public loadingMessages = loading;
	public PERMISSIONS = Perms;

	public get randomDftba(): string {
		return this.dftba[Math.floor(Math.random() * this.dftba.length)];
	}

	public get randomLoadingMessage() {
		return this.loadingMessages[Math.floor(Math.random() * this.loadingMessages.length)];
	}


	// @ts-expect-error 2416
	public language: LanguageKeys = {
		/**
		 * ################################
		 * #      FRAMEWORK MESSAGES      #
		 * ################################
		 */
		default: key => `${key} has not been localized for en-US yet. You can let my developers know about this with my feedback command!`,
		defaultLanguage: 'Default Language',
		prefixReminder: (prefix = `@${this.client.user!.tag}`) => `The prefix${Array.isArray(prefix)
			? `es for this server are: ${prefix.map(pre => `\`${pre}\``).join(', ')}`
			: ` in this server is set to: \`${prefix}\``
		}`,
		settingGatewayExpectsGuild: 'The parameter <Guild> expects either a Guild or a Guild Object.',
		settingGatewayValueForKeyNoext: (data, key) => `The value ${data} for the key ${key} does not exist.`,
		settingGatewayValueForKeyAlrext: (data, key) => `The value ${data} for the key ${key} already exists.`,
		settingGatewaySpecifyValue: 'You must specify the value to add or filter.',
		settingGatewayKeyNotArray: key => `The key ${key} is not an Array.`,
		settingGatewayKeyNoext: key => `The key ${key} does not exist in the current data schema.`,
		settingGatewayInvalidType: 'The type parameter must be either add or remove.',
		settingGatewayInvalidFilteredValue: (piece, value) => `${piece.key} doesn't accept the value: ${value}`,
		resolverMultiTooFew: (name, min = 1) => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
		resolverInvalidBool: name => `${name} must be true or false.`,
		resolverInvalidChannel: name => `${name} must be a channel tag or valid channel id.`,
		resolverInvalidCustom: (name, type) => `${name} must be a valid ${type}.`,
		resolverInvalidDate: name => `${name} must be a valid date.`,
		resolverInvalidDuration: name => `${name} must be a valid duration string.`,
		resolverInvalidEmoji: name => `${name} must be a custom emoji tag or valid emoji id.`,
		resolverInvalidFloat: name => `${name} must be a valid number.`,
		resolverInvalidGuild: name => `${name} must be a valid guild id.`,
		resolverInvalidInt: name => `${name} must be an integer.`,
		resolverInvalidLiteral: name => `Your option did not match the only possibility: ${name}`,
		resolverInvalidMember: name => `${name} must be a mention or valid user id.`,
		resolverInvalidMessage: name => `${name} must be a valid message id.`,
		resolverInvalidPiece: (name, piece) => `${name} must be a valid ${piece} name.`,
		resolverInvalidRegexMatch: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
		resolverInvalidRole: name => `${name} must be a role mention or role id.`,
		resolverInvalidString: name => `${name} must be a valid string.`,
		resolverInvalidTime: name => `${name} must be a valid duration or date string.`,
		resolverInvalidUrl: name => `${name} must be a valid url.`,
		resolverInvalidUser: name => `${name} must be a mention or valid user id.`,
		resolverStringSuffix: ' characters',
		resolverMinmaxExactly: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
		resolverMinmaxBoth: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
		resolverMinmaxMin: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
		resolverMinmaxMax: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,
		reactionHandlerPrompt: 'Which page would you like to jump to?',
		commandMessageMissing: 'Missing one or more required arguments after end of input.',
		commandMessageMissingRequired: name => ` The ${name} argument is required.`,
		commandMessageMissingOptionals: possibles => `Missing a required option: (${possibles})`,
		commandMessageNoMatch: possibles => `Your input didn't match any of the possibilities: (${possibles})`,
		// eslint-disable-next-line max-len
		monitorCommandHandlerReprompt: (tag, error, time, abortOptions) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
		// eslint-disable-next-line max-len
		monitorCommandHandlerRepeatingReprompt: (tag, name, time, cancelOptions) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
		monitorCommandHandlerAborted: 'Aborted',
		// eslint-disable-next-line max-len
		inhibitorCooldown: (remaining, guildCooldown) => `${guildCooldown ? 'Someone has' : 'You have'} already used this command. You can use this command again in ${remaining} second${remaining === 1 ? '' : 's'}.`,
		inhibitorDisabledGuild: 'This command has been disabled in this server by an admin/mod.',
		inhibitorDisabledGlobal: 'This command has been globally disabled by my owner(s).',
		inhibitorMissingBotPerms: missing => `I can't do that because I'm missing some permissions: **${missing}**.`,
		inhibitorNsfw: 'You can only use NSFW commands in NSFW channels.',
		inhibitorPermissions: cmdName => `You don't have the right permissions to use the **${cmdName}** command!`,
		inhibitorRequiredSettings: settings => `I can't run that command because this server has not set up the **${settings.join(', ')}** setting${settings.length === 1 ? '' : 's'}.`,
		inhibitorRunIn: types => `This command is only available in ${types} channels.`,
		inhibitorRunInNone: name => `The ${name} command is not configured to run in any channel.`,
		commandBlacklistDescription: 'Add/remove users and/or servers from my blacklist.',
		commandBlacklistSuccess: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
			usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
			usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
			guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
			guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
		].filter(val => val !== '').join('\n'),
		commandEvalDescription: 'Evaluates arbitrary JavaScript. Reserved for my owner(s).',
		commandEvalExtended: [
			'The eval command evaluates code as-in, any error thrown from it will be handled.',
			'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
			'The --silent flag will make it output nothing.',
			"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
			'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
			'The --showHidden flag will enable the showHidden option in util.inspect.',
			'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
		].join('\n'),
		commandEvalError: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
		commandEvalOutput: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
		commandEvalSendFile: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
		commandEvalSendConsole: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
		commandUnload: (type, name) => `✅ Unloaded ${type}: ${name}`,
		commandUnloadDescription: 'Unloads the klasa piece.',
		commandUnloadWarn: 'You probably don\'t want to unload that, since you wouldn\'t be able to run any command to enable it again',
		commandTransferError: '❌ That file has been transfered already or never existed.',
		commandTransferSuccess: (type, name) => `✅ Successfully transferred ${type}: ${name}.`,
		commandTransferFailed: (type, name) => `Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
		commandTransferDescription: 'Transfers a core piece to its respective folder.',
		commandReload: (type, name, time) => `✅ Reloaded ${type}: ${name}. (Took: ${time})`,
		commandReloadFailed: (type, name) => `❌ Failed to reload ${type}: ${name}. Please check your Console.`,
		commandReloadAll: (type, time) => `✅ Reloaded all ${type}. (Took: ${time})`,
		commandReloadEverything: time => `✅ Reloaded everything. (Took: ${time})`,
		commandReloadDescription: 'Reloads a klasa piece, or all pieces of a klasa store.',
		commandReboot: 'Rebooting...',
		commandRebootDescription: 'Reboots the bot.',
		commandLoad: (time, type, name) => `✅ Successfully loaded ${type}: ${name}. (Took: ${time})`,
		commandLoadFail: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
		commandLoadError: (type, name, error) => `❌ Failed to load ${type}: ${name}. Reason:${util.codeBlock('js', error)}`,
		commandLoadDescription: 'Load a piece from your bot.',
		commandPing: 'Ping?',
		commandPingDescription: 'Runs a connection test to Discord.',
		commandPingPong: (diff, ping) => `Pong! Your ping is ${diff}ms, and the heartbeat is ${ping}ms. Can I sleep now?`,
		commandInvite: () => [
			`To add ${botName} to your Discord server:`,
			`<${this.client.invite}>`,
			util.codeBlock('', [
				'The above link is generated requesting the minimum permissions required to use all of my commands.',
				'I know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
				'If you try to use a command that requires more permissions than I am granted, I\'ll let you know!'
			].join(' ')),
			'Please file an issue at <https://github.com/tuataria/steve> if you find any bugs.'
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
			'• 🔥  And many more!',
			'',
			'Let us know if you have any issues! We try to fix bugs as soon as possible and are still adding new features when relevant/we have time.',
			'',
			'If you\'re interested in how Steve works, you can check his code out at <https://github.com/tuataria/steve>.'
		],
		commandInfoDescription: `Provides some information about ${botName}`,
		commandHelpDescription: `Show info about ${botName}'s commands`,
		commandHelpData: {
			title: description => `${description}`,
			usage: usage => `📝 | ***Command Usage***\n\`${usage}\`\n`,
			extended: extendedHelp => `🔍 | ***Extended Help***\n${extendedHelp}`,
			footer: name => `Command help for ${name} | ${this.randomDftba}`
		},
		commandHelpBeginning: prefix => `You can do \`${prefix}help <command>\` (without brackets) to get more information about an individual command!`,
		commandHelpNoExtended: 'No extended help available.',
		commandHelpDm: '📥 | The list of commands you have access to has been sent to your DMs.',
		commandHelpNoDm: '❌ | Oops! I couldn\'t send you the list of commands you have access to, you might have DMs disabled!',
		commandHelpUsage: usage => `Usage :: ${usage}`,
		commandHelpExtended: 'Extended Help ::',
		commandEnable: (type, name) => `+ Successfully enabled ${type}: ${name}`,
		commandEnableDescription: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
		commandDisable: (type, name) => `+ Successfully disabled ${type}: ${name}`,
		commandDisableDescription: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
		commandDisableWarn: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',
		commandConfNoKey: 'You must provide a key',
		commandConfNoValue: 'You must provide a value',
		commandConfGuarded: name => `${util.toTitleCase(name)} may not be disabled.`,
		commandConfUpdated: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
		commandConfKeyNotArray: 'This key is not array type. Use the action \'reset\' instead.',
		commandConfGetNoExt: key => `The key **${key}** does not seem to exist.`,
		commandConfGet: (key, value) => `The value for the key **${key}** is: \`${value}\``,
		commandConfReset: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
		commandConfNoChange: key => `The value for **${key}** was already that value.`,
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
		commandConfServer: (key, list) => `**Guild Settings${key}**\n${list}`,
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
		commandConfUser: (key, list) => `**User Settings${key}**\n${list}`,
		commandStats: (memUsage, uptime, users, guilds, channels, klasaVersion, discordVersion, processVersion) => [
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
		commandDiscordStatusError: 'An error occurred when attempting to fetch Discord\'s status.',
		commandDiscordStatusEmbed: {
			description: incident => `[Discord Status](https://discordstatus.com/)\n**Current Incident:**\n${incident}`,
			noIncidents: 'There is no active incidents.',
			fields: {
				operational: {
					title: 'All components operational',
					value: 'No errors to report'
				},
				maintenance: {
					title: 'Scheduled Maintenance',
					value: (name, impact) => `${name} | Impact: ${impact}`
				}
			},
			footer: time => `Last changed: ${time} | ${this.randomDftba}`
		},
		messagePromptTimeout: 'The prompt has timed out.',
		textPromptAbortOptions: ['abort', 'stop', 'cancel'],
		/**
		 * ################################
		 * #      GENERAL STUFF           #
		 * ################################
		 */
		userNotFound: 'I could not find that user.',
		userNotInGuild: user => `${user} is not in this server.`,
		none: 'None',
		noParentCategory: 'No Category',
		working: 'Working...',
		/**
		 * ################################
		 * #      ARGUMENTS               #
		 * ################################
		 */
		argumentRoleNameCouldNotFind: (name, arg) => `Could not find a role match for **${arg}**; the ${name} argument must be a valid role name, id, or mention.`,
		argumentRoleNameMultipleMatches: (matches, name) => `Found multiple role matches for **${name}**: \`${matches}\``,
		argumentTimespanInvalid: arg => `**${arg}** is an invalid timespan.`,
		argumentUsernameCannotFind: search => `Could not find a user by searching with **${search}**.`,
		argumentUsernameMultiple: users => `Found multiple users: \`${users}\`.`,
		/**
		 * ################################
		 * #      DEVELOPER COMMANDS      #
		 * ################################
		 */
		commandYarnDescription: 'Get information about an yarn/npm package',
		commandYarnExtended: builder.display('yarn', {
			examples: [
				'discord.js'
			]
		}),
		commandYarnPackageNotFound: pkg => `I couldn't find a package by searching with **${pkg}**.`,
		commandYarnEmbed: {
			description: (author, description, license) => `*${description}*\n\n**Author:** ${author ?? 'Unknown Author'}\n**License:** ${license}`,
			footer: (version, date) => `Latest version: ${version} | Last updated: ${date}`
		},
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
		commandSharedDescription: 'Get a list of the servers you share with me',
		commandSharedExtended: builder.display('shared', {
			extendedHelp: 'Sometimes this command will not display some servers that we share; this is due to issues with caching and is not a bug. Give it some time and it should work itself out!'
		}),
		commandShared: sharedGuilds => `We share ${sharedGuilds.size} server${sharedGuilds.size === 1 ? '' : 's'}: **${sharedGuilds.map(guild => guild.name).join(', ')}**.`,
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
		commandChooseResponse: choice => `${botName} chooses... ${choice}!`,
		commandChooseTooFew: 'You must provide at least two choices!',
		commandRateDescription: `Have ${botName} rate an item of your choosing`,
		commandRateExtended: builder.display('rate', {
			examples: [
				'the existence of eucalyptus'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.',
			reminder: 'Things to be rated have a maximum length of 500 characters.'
		}),
		commandRateResponse: (thing, rating) => `${botName} gives \`${thing}\` a ${rating}!`,
		commandCatDescription: 'Get a random cat picture',
		commandCatExtended: builder.display('cat', {
			extendedHelp: 'This command grabs random cat pictures from the cat API at https://cataas.com.'
		}),
		commandDogDescription: 'Get a random dog picture',
		commandDogExtended: builder.display('dog', {
			extendedHelp: 'This command grabs random dog images from the Dog API at https://dog.ceo/dog-api.'
		}),
		commandFoxDescription: 'Get a random fox picture',
		commandFoxExtended: builder.display('fox', {
			extendedHelp: 'This command grabs random fox pictures frm the fox API at https://randomfox.ca.'
		}),
		commandRockPaperScissorsDescription: `Play a game of rock, paper, scissors against ${botName}`,
		commandRockPaperScissorsExtended: builder.display('rps', {
			examples: [
				'rock',
				'paper',
				'scissors'
			],
			extendedHelp: 'This command has a cooldown of 5 seconds per user.'
		}),
		commandRockPaperScissorsWinner: (playerMove, steveMove, winner) => `You threw ${playerMove} and ${botName} threw ${steveMove}. ${winner === 0 ? 'Nobody' : winner === -1 ? botName : 'You'} won!`,
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
		commandRollEmojiResponse: (emoji, message) => `${emoji} You rolled: ${message} ${emoji}`,
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
		moderationHigherRole: user => `${user} has a higher role than you.`,
		moderationCaseDisplayFieldTarget: 'Target',
		moderationCaseDisplayFieldModerator: 'Moderator',
		moderationCaseDisplayFieldDuration: 'Duration',
		moderationCaseDisplayFieldReason: 'Reason',
		moderationCaseDisplayFooter: (caseNumber, targetID) => `Case ${caseNumber} (${targetID})`,
		moderationCaseDisplayTimeRemaining: time => `(${time} left)`,
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
		commandMuteSuccess: (target, thisCase) => `Muted ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandMuteUnable: target => `Unable to mute ${target}.`,
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
		commandDeafenUnable: target => `Unable to deafen ${target}.`,
		commandDeafenSuccess: (target, thisCase) => `Deafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
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
		commandBanUnable: target => `Unable to ban ${target}.`,
		commandBanSuccess: (target, thisCase) => `Banned ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
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
		commandKickUnable: target => `Unable to kick ${target}.`,
		commandKickSuccess: (target, thisCase) => `Kicked ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
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
		commandUnbanUnable: target => `Unable to unban ${target}.`,
		commandUnbanSuccess: (target, thisCase) => `Unbanned ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
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
		commandUnmuteUnable: target => `Unable to unmute ${target}.`,
		commandUnmuteSuccess: (target, thisCase) => `Unmuted ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
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
		commandUndeafenUnable: target => `Unable to undeafen ${target}.`,
		commandUndeafenSuccess: (target, thisCase) => `Undeafened ${target} and created case number ${thisCase.number} with reason: *${thisCase.reason}*.`,
		commandPermissionsDescription: 'View the permissions of the specified user.',
		commandPermissionsHasAll: user => `${user} has the Administrator permission; they have all permissions by default.`,
		commandClearRoleDescription: 'Quickly remove all members from the specified role',
		commandClearRoleExtended: builder.display('clearrole', {
			examples: [
				'gmt-4'
			]
		}),
		commandClearRoleRoleEmpty: role => `There are no members in the ${role} role.`,
		commandClearRole: (size, role) => `${size} members were removed from the ${role} role.`,
		commandMentionableDescription: 'Toggle whether a role is mentionable',
		commandMentionableExtended: builder.display('mentionable', {
			extendedHelp: `This command requires me to have the ${this.PERMISSIONS.MANAGE_ROLES} permission.`
		}),
		commandMentionable: (roleName, makingMentionable) => `The ${roleName} role is ${makingMentionable ? 'now' : 'no longer'} mentionable.`,
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
		commandNicknameSet: user => `${user}'s nickname has been set.`,
		commandNicknameCleared: user => `${user}'s nickname has been cleared.`,
		commandNicknameUnableToSet: (error, userTag) => `Unable to change ${userTag}'s nickname: **${error}**`,
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
		commandRoleRemove: roles => `${Emojis.MINUS} Removed roles: \`${roles}\``,
		commandRoleAdd: roles => `${Emojis.PLUS} Added roles: \`${roles}\``,
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
		commandSlowModeSet: duration => `Slowmode has been set to 1 message per member per ${duration}.`,
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
		commandPurgePurged: size => `${size} messages were deleted.`,
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
		commandRoleAliasAlreadyExists: alias => `The ${alias} role alias already exists.`,
		commandRoleAliasDoesNotExist: alias => `There is no ${alias} role alias.`,
		commandRoleAliasAdd: (alias, role) => `Added the ${alias} alias for the ${role} role.`,
		commandRoleAliasRemove: alias => `The ${alias} role alias has been removed.`,
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
		commandSnippetAdd: name => `Added a snippet with the name: ${name}.`,
		commandSnippetEdit: name => `Edited the ${name} snippet.`,
		commandSnippetRemove: name => `Removed the ${name} snippet.`,
		commandSnippetNoPermission: 'You do not have permissions to edit snippets for this server.',
		commandSnippetAlreadyExists: name => `There is already a snippet named ${name}.`,
		commandSnippetInvalid: name => `There is no snippet with the name: ${name}.`,
		commandSnippetNoSnipsInGuild: 'This server has no snippets!',
		commandSnippetReset: 'This server\'s snippets have been reset.',
		/**
		 * ################################
		 * #      SPACE COMMANDS          #
		 * ################################
		 */
		commandSpacePicDescription: 'Get a space picture!',
		commandSpacePicExtended: builder.display('spacepic', {
			examples: [
				'',
				'2017-01-25',
				'2017/4/1'
			],
			explainedUsage: [
				['date', 'The date must be in YYYY-MM-DD format.']
			],
			extendedHelp: `This command uses NASA\'s Astronomy Picture of the Day API to get the pictures. The earliest date with an avaliable picture is ${formatDate(new Date(1995, 5, 20), 'DD MMMM YYYY')}.`
		}),
		commandSpacePicError: 'I was unable to retrieve a picture!',
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
		resolverReminderInvalid: arg => `**${arg}** is not a valid reminder number.`,
		commandRemindCreated: duration => `I'll remind you about that in ${duration}.`,
		commandRemindCanceled: content => `I cancelled the reminder: **${content}**.`,
		commandRemindNoReminders: 'You have no reminders currently set.',
		commandReminderDisplayHidden: 'Private reminder: content hidden',
		commandRemindViewEmbed: {
			title: 'Pending Reminders'
		},
		commandSnoozeDescription: 'Repeat your last reminder.',
		commandSnoozeExtended: builder.display('snooze', {
			examples: [
				'',
				'5m'
			],
			reminder: 'You can only snooze reminders that happened in the past 5 minutes.',
			extendedHelp: 'You can change your default snooze time with the `setsnooze` command.'
		}),
		commandSnoozeCreated: (content, duration) => `I'll remind you **${content}** in ${duration}.`,
		commandSnoozeNoRemind: 'It looks like you haven\'t had any reminders go off in the past 5 minutes.',
		commandSetSnoozeDescription: 'Set your default snooze duration.',
		commandSetSnoozeSet: duration => `Your default snooze duration is now ${duration}.`,
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
		commandAddAssignableRoleDescription: 'Add a role (or multiple roles) to the list of assignable roles',
		commandAddAssignableRoleExtended: builder.display('addassignablerole', {
			examples: [
				'gmt-4'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			]
		}),
		commandAddAssignableRole: addedRoles => `${Emojis.PLUS} Added roles: ${addedRoles.join(', ')}`,
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
		commandAssignNotAssignable: role => `${Emojis.REDX} The ${role} role is not self-assignable.`,
		commandAssignRoleAdd: roles => `${Emojis.PLUS} Added role(s): \`${roles}\``,
		commandAssignRoleRemove: roles => `${Emojis.MINUS} Removed role(s): \`${roles}\``,
		commandAssignRoleNeedTrusted: role => `You need to have the **${role}** role to do that!`,
		commandRemoveAssignableRoleDescription: 'Remove a role (or multiple roles) from the list of assignable roles',
		commandRemoveAssignableRoleExtended: builder.display('removeassignableroles', {
			examples: [
				'gmt-4'
			],
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			]
		}),
		commandRemoveAssignableRole: removedRoles => `${Emojis.MINUS} Removed roles: ${removedRoles.join(', ')}`,
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
		commandWhoIsDate: (duration, date) => `${duration} ago (${date})`,
		commandWhoIsJoinedGuildHours: (hours, date) => `${hours} hours ago (${date})`,
		commandWhoIsEmbed: {
			fieldTitles: {
				displayName: 'Display Name',
				accountCreated: 'Account Created',
				joinedGuild: 'Joined Server',
				roles: 'Roles'
			},
			footer: id => `Member ID: ${id} | ${this.randomDftba}`
		},
		commandAvatarDescription: 'See a larger version user\'s avatar',
		commandAvatarCannotDisplay: user => `Unable to display avatar for ${user}.`,
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
			footer: (date, duration) => `Created ${date} (${duration} ago) | ${this.randomDftba}`
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
			description: (role, date) => `The ${role} role was created on ${date}.`,
			fieldTitles: {
				aliases: 'Aliases',
				members: num => `${num} Member${num === 1 ? '' : 's'}`
			},
			footer: assignable => `This role is ${assignable ? '' : 'not '}self-assignable.`
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
		commandIgnoreChannelDescription: `Have ${botName} ignore commands that are sent in the specified channel`,
		commandIgnoreChannelExtended: builder.display('ignorechannel', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: 'Server staff will still be allowed to do commands in ignored channels.'
		}),
		commandIgnoreChannelTextChannelRequired: 'I can only ignore text channels!',
		commandIgnoreChannelAlreadyIgnored: channel => `<#${channel}> is already ignored.`,
		commandIgnoreChannel: channel => `<#${channel}> will now be ignored.`,
		commandUnignoreChannelDescription: `Unignore a previously ingored channel`,
		commandUnignoreChannelExtended: builder.display('unignorechannel', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: 'Server staff are still be allowed to do commands in ignored channels.'
		}),
		commandUnignoreChannelNotIgnored: channel => `<#${channel}> is not ignored.`,
		commandUnignoreChannel: channel => `<#${channel}> is now unignored.`,
		commandShowIgnoredChannelsDescription: 'Show the list of ignored channels in a server',
		commandShowIgnoredChannelsNoChannels: 'I\'m not ignoring any channels in this server.',
		commandIgnoreRoleDescription: `Have ${botName} ignore commands from members in a specified role`,
		commandIgnoreRoleExtended: builder.display('ignorerole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: `${botName} will still respond to commands from server staff even if a staff member is in an ignored role.`
		}),
		commandIgnoreRoleAlreadyIgnored: roleName => `The ${roleName} role is already ignored.`,
		commandIgnoreRole: roleName => `The ${roleName} role will now be ignored.`,
		commandUnignoreRoleDescription: 'Unignore a previously ignored role',
		commandUnignoreRoleExtended: builder.display('unignorerole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			extendedHelp: `${botName} will still respond to commands from server staff even if a staff member is in an ignored role.`
		}),
		commandUnignoreRoleNotIgnored: roleName => `The ${roleName} role is not ignored.`,
		commandUnignoreRole: roleName => `The ${roleName} role will no longer be ignored.`,
		commandShowIgnoredRolesDescription: 'Show the list of ignored roles in a server',
		commandShowIgnoredRolesNoRoles: 'I\'m not ignoring any roles in this server.',
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
			],
			reminder: `I need to have the **${this.PERMISSIONS.VIEW_AUDIT_LOG} permission for the memberlog to work properly!`
		}),
		commandSetMemberLogSet: channel => `<#${channel}> will be used as this server's memberlog.`,
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
			],
			reminder: `I need to have the **${this.PERMISSIONS.VIEW_AUDIT_LOG} permission for the serverlog to work properly!`
		}),
		commandServerLogSet: channel => `<#${channel}> will be used as this server's serverlog.`,
		commandSetReminderChannelDescription: `Set what channel ${botName} will use as the reminder channel`,
		commandSetReminderChannelExtended: builder.display('setreminderchannel', {
			explainedUsage: [
				['channel', 'You must tag a text channel for this command to function properly.']
			],
			extendedHelp: 'If a reminder channel is set, all reminder set in the server will go off in the specified channel.'
		}),
		commandSetReminderChannelSet: channel => `<#${channel}> will be used as this server's reminder channel.`,
		commandSetAdministratorRoleDescription: 'Set the server\'s administrator role',
		commandSetAdministratorRoleExtended: builder.display('setadministratorrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role, it just gives this role access to server staff commands.'
		}),
		commandSetAdministratorRoleSet: role => `The ${role} role will be used as this server's administrator role.`,
		commandSetModeratorRoleDescription: 'Set the server\'s moderator role',
		commandSetModeratorRoleExtended: builder.display('setmoderatorrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role, it just gives this role access to server staff commands.'
		}),
		commandSetModeratorRoleSet: role => `The ${role} role will be used as this server's moderator role.`,
		commandSetTrustedRoleDescription: 'Set the server\'s trusted role',
		commandSetTrustedRoleExtended: builder.display('settrustedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add any extra Discord permissions to the role.'
		}),
		commandSetTrustedRoleSet: role => `The ${role} role will be used as this server's trusted role.`,
		commandSetMutedRoleDescription: 'Set the server\'s muted role',
		commandSetMutedRoleExtended: builder.display('setmutedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add or remove any extra Discord permissions to the role.'
		}),
		commandSetMutedRoleSet: role => `The ${role} role will be used as this server's muted role.`,
		commandSetDeafenedRoleDescription: 'Set the server\'s deafened role',
		commandSetDeafenedRoleExtended: builder.display('setdeafenedrole', {
			explainedUsage: [
				['rolename', 'You can use the name of a role, it\'s snowflake (long id), or tag the role (if it is taggable).']
			],
			reminder: 'This command does not add or remove any extra Discord permissions to the role.'
		}),
		commandSetDeafenedRoleSet: role => `The ${role} role will be used as this server's deafened role.`,
		commandSetBanDeleteDaysDescription: 'Set how many days of messages from a banned user will be deleted',
		commandSetBanDeleteDaysExtended: builder.display('setbandeletedays', {
			examples: [
				'7'
			],
			reminder: `This setting will only function properly if a user is banned using ${botName}`
		}),
		commandSetBanDeleteDaysSet: days => `${days} days of messages will be deleted from a banned user.`,
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
		commandManageRestrictedRolesManageRemoved: removedRoles => `${Emojis.MINUS} Removed roles: ${removedRoles}\n`,
		commandManageRestrictedRolesManageAdded: addedRoles => `${Emojis.PLUS} Added roles: ${addedRoles}`,
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
		commandManageAssignableRolesManageRemoved: removedRoles => `${Emojis.MINUS} Removed roles: ${removedRoles}\n`,
		commandManageAssignableRolesManageAdded: addedRoles => `${Emojis.PLUS} Added roles: ${addedRoles}`,
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
		commandManageWordBlacklistUpdate: removing => `Your word has been ${removing ? 'removed from' : 'added to'} the word blacklist.`,
		commandToggleDeletePinMessagesDescription: 'Toggle whether notifications of new pinned messages are deleted',
		commandToggleDeletePinMessagesExtended: builder.display('toggledeletepinmessages', {
			extendedHelp: 'This setting defaults to being off.'
		}),
		commandToggleDeletePinMessages: disabling => `Pinned message notifications will ${disabling ? 'no longer' : 'now'} be deleted.`,
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
		resolverInvalidColor: hex => `**${hex}** is not a valid hex code.`,
		commandSetEmbedColorReset: 'Your embed color has been reset.',
		commandSetEmbedColorShow: hex => `Your embed color is currently set to: **${hex}**.`,
		commandSetEmbedColorShowNone: 'You do not currently have an embed color set.',
		commandSetEmbedColorSet: hex => `Your embed color has been set to **${hex}**.`,
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
		 * #   UNIT CONVERSION COMMANDS   #
		 * ################################
		 */
		invalidUnit: unit => `**${unit}** is not vaild/supported unit.`,
		commandTempConvertDescription: 'Easily convert temperatures',
		commandTempConvertExtended: builder.display('tempconvert', {
			examples: [
				'32|f|c',
				'0|celsius|fahrenheit'
			],
			explainedUsage: [
				['unit', 'Supported units: Celsius (C), Fahrenheit (F), Kelvin (K), Rankine (R)']
			]
		}),
		commandLengthConvertDescription: 'Easily convert lengths',
		commandLengthConvertExtended: builder.display('lengthconvert', {
			examples: [
				'100|cm|m',
				'5|miles|feet'
			],
			explainedUsage: [
				['unit', 'Supported units: millimeters (mm), centimeters (cm), meters (m), kilometers (km), inches (in), International Feet (ft), U.S. Survey Feet (ft-us), miles (mi). Using "feet" as an argument will map to International Feet.']
			],
			reminder: 'There\'s functionally no difference between the two kinds of feet.'
		}),
		commandMassConvertDescription: 'Easily convert masses',
		commandMassConvertExtended: builder.display('massconvert', {
			examples: [
				'1000|g|kg',
				'16|ounces|pounds'
			],
			explainedUsage: [
				['unit', 'Supported units: micrograms (mcg), milligrams (mg), grams (g), kilograms (kg), ounces (oz), pounds (lb), metric tonnes (mt), tons (t).']
			]
		}),
		/**
		 * ################################
		 * #  LOG EVENT  TOGGLE COMMANDS  #
		 * ################################
		 */
		commandToggleChannelCreateDescription: 'Toggle whether channel creations are logged in the serverlog',
		commandToggleChannelCreate: disabled => `Channel creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleChannelDeleteDescription: 'Toggle whether channel deletions are logged in the serverlog',
		commandToggleChannelDelete: disabled => `Channel deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleChannelUpdateDescription: 'Toggle whether channel updates are logged in the serverlog',
		commandToggleChannelUpdateExtended: builder.display('togglechannelupdate', {
			extendedHelp: 'Channel update log embeds include: channel name changes.'
		}),
		commandToggleChannelUpdate: disabled => `Channel update logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleEmojiCreateDescription: 'Toggle whether emoji creations are logged in the serverlog',
		commandToggleEmojiCreate: disabled => `Emoji creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleEmojiDeleteDescription: 'Toggle whether emoji deletions are logged in the serverlog',
		commandToggleEmojiDelete: disabled => `Emoji deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleEmojiUpdateDescription: 'Toggle whether emoji updates are logged in the serverlog',
		commandToggleEmojiUpdateExtended: builder.display('toggleemojiupdate', {
			extendedHelp: 'Emoji update log embeds include: emoji name changes.'
		}),
		commandToggleEmojiUpdate: disabled => `Emoji update logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildBanAddDescription: 'Toggle whether bans are logged in the memberlog',
		commandToggleGuildBanAdd: disabled => `Ban logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildBanRemoveDescription: 'Toggle whether unbans are logged in the memberlog',
		commandToggleGuildBanRemove: disabled => `Unban logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildMemberAddDescription: 'Toggle whether member joins are logged in the memberlog',
		commandToggleGuildMemberAdd: disabled => `Member join logging hsa been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildMemberRemoveDescription: 'Toggle whether member leaves are tracked in the memberlog',
		commandToggleGuildMemberRemove: disabled => `Member leave logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleGuildMemberUpdateDescription: 'Toggle whether member updates are logged in the memberlog',
		commandToggleGuildMemberUpdateExtended: builder.display('toggleguildmemberupdate', {
			extendedHelp: 'Member update log embeds include: display name changes and member role updates.'
		}),
		commandToggleGuildMemberUpdate: disabled => `Member update logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleInviteCreateDescription: 'Toggle whether invite creates are logged in the serverlog',
		commandToggleInviteCreate: disabled => `Invite creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleInviteDeleteDescription: 'Toggle whether invite deletes are logged in the serverlog',
		commandToggleInviteDelete: disabled => `Invite deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleMessageDeleteDescription: 'Toggle whether message deletes are logged in the serverlog',
		commandToggleMessageDelete: disabled => `Message delete logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleMessageDeleteBulkDescription: 'Toggle whether message purges are logged in the serverlog',
		commandToggleMessageDeleteBulk: disabled => `Message purge logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleRoleCreateDescription: 'Toggle whether role creates are logged in the serverlog',
		commandToggleRoleCreate: disabled => `Role creation logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleRoleDeleteDescription: 'Toggle whether role deletes are logged in the serverlog',
		commandToggleRoleDelete: disabled => `Role deletion logging has been turned ${disabled ? 'off' : 'on'}.`,
		commandToggleRoleUpdateDescription: `Toggle whether role updates are logged in the serverlog`,
		commandToggleRoleUpdateExtended: builder.display('toggleroleupdate', {
			extendedHelp: 'Role update log embeds include: role name changes.'
		}),
		commandToggleRoleUpdate: disabled => `Role update logging has been turned ${disabled ? 'off' : 'on'}.`,
		/**
		 * ################################
		 * #      LOG EVENTS              #
		 * ################################
		 */
		eventChannelCreateEmbed: {
			footer: id => `Channel ID: ${id}`,
			title: (type, name) => `${util.toTitleCase(type)} Channel Created | ${name}`
		},
		eventChannelDeleteEmbed: {
			footer: id => `Channel ID: ${id}`,
			title: (type, name) => `${util.toTitleCase(type)} Channel Deleted | ${name}`
		},
		eventChannelUpdateNameChangeEmbed: {
			footer: id => `Channel ID: ${id}`,
			title: (oldName, newName, type) => `${oldName} ${type} channel name changed to ${newName}`
		},
		eventEmojiCreateEmbed: {
			footer: id => `Emoji ID: ${id}`,
			title: name => `Emoji Created | ${name}`
		},
		eventEmojiDeleteEmbed: {
			footer: id => `Emoji ID: ${id}`,
			title: name => `Emoji Deleted | ${name}`
		},
		eventEmojiUpdateNameChangeEmbedx: {
			footer: id => `Emoji ID: ${id}`,
			title: (oldName, newName, animated) => `${oldName} ${animated ? 'animated ' : ''}emoji name changed to ${newName}`
		},
		eventRoleCreateEmbed: {
			footer: id => `Role ID: ${id}`,
			title: name => `Role Created | ${name}`
		},
		eventRoleDeleteEmbed: {
			footer: id => `Role ID: ${id}`,
			title: name => `Role Deleted | ${name}`
		},
		eventRoleUpdateNameChangeEmbed: {
			footer: id => `Role ID: ${id}`,
			title: (oldName, newName) => `${oldName} role name changed to ${newName}`
		},
		eventGuildMemberAddEmbed: {
			fieldTitles: {
				bot: executor => `Bot added by ${executor}`,
				human: 'Member Joined Server'
			},
			fieldValues: {
				accountAge: duration => `Account created ${duration} ago`
			},
			footer: id => `Member ID: ${id}`
		},
		eventGuildMemberRemoveEmbed: {
			fieldTitles: {
				joinDate: bot => `${bot ? 'Bot' : 'Member'} Left Server`,
				roles: 'Roles'
			},
			fieldValues: {
				joinDate: duration => `Joined ${duration} ago`
			},
			footer: id => `Member ID: ${id}`
		},
		eventGuildMemberUpdateRoleUpdateEmbed: {
			footer: id => `Member ID: ${id}`,
			title: (type, role, executor) => `${type} the ${role} role by ${executor}`
		},
		eventGuildMemberUpdateRoleUpdateRemovedFrom: 'Removed from',
		eventGuildMemberUpdateRoleUpdateAddedTo: 'Added to',
		eventGuildMemberUpdateDisplayNameChangeEmbed: {
			fieldTitles: {
				newDisplayName: 'New Display Name'
			},
			footer: id => `Member ID: ${id}`
		},
		eventInviteCreateEmbed: {
			footer: code => `Invite Code: ${code}`,
			title: channel => `Invite created for ${channel}`
		},
		eventInviteDeleteEmbed: {
			footer: code => `Invite Code: ${code}`,
			title: channel => `Invite for ${channel} deleted`
		},
		eventMessageDeleteUnableToDisplay: 'Message is unable to be displayed.',
		eventMessageDeleteEmbed: {
			fieldTitles: {
				channel: (name, parent) => `Message Deleted in ${name} (${parent})`
			},
			footer: (id, time) => `Message ID: ${id} | Message sent ${time} ago`
		},
		eventMessageDeleteBulkEmbed: {
			footer: id => `Channel ID: ${id}`,
			title: (size, name, parent) => `${size} messages purged from ${name} (${parent})`
		},
		eventGuildBanAddEmbed: {
			footer: id => `User ID: ${id}`,
			title: executor => `Banned by ${executor}`
		},
		eventGuildBanRemoveEmbed: {
			footer: id => `User ID: ${id}`,
			title: executor => `Unbanned by ${executor}`
		},
		/**
		 * ################################
		 * #          MONITORS            #
		 * ################################
		 */
		monitorWordBlacklistFiltered: 'Please refrain from using words that are blacklisted!',
		monitorMentionSpamMax: maxMentions => `You tagged more than ${maxMentions} people, chill out please.`,
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
		serializerColorInvalidHex: code => `${code} is not a valid hex.`,
		serializerTrustedRoleSettingInvalidSetting: setting => `${setting} is not a valid setting for giveTrustedRoleOn.`
	};


	public async init(): Promise<any> {
		await super.init();
	}

}
