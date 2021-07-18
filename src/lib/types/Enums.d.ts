export const enum ApplicationCommands {
	Animal = 'animal',
	Assign = 'assign',
	Avatar = 'avatar',
	Convert = 'convert',
	Dftba = 'dftba',
	Rate = 'rate',
	RoleInfo = 'roleinfo',
	Rps = 'rps',
	ServerInfo = 'serverinfo',
	Whois = 'whois'
}

export const enum CustomEvents {
	InteractionCreate = 'interactionCreate'
}

export const enum Emojis {
	LOADING = '<a:loading_spinner:817151391377653770>',
	MINUS = '<:minus:693881833007611996>',
	PLUS = '<:plus:693881818675675136>',
	REDX = '<:red_x:688365693485187072>'
}

export const enum ImageAssets {
	AlarmClock = 'https://stevebot.xyz/steveassets/alarmclock.png',
	Cat = 'https://stevebot.xyz/steveassets/animals/cat.png',
	DiscordLogo = 'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png',
	Dog = 'https://stevebot.xyz/steveassets/animals/dog.png',
	Fox = 'https://stevebot.xyz/steveassets/animals/fox.png',
	NodeJs = 'https://stevebot.xyz/steveassets/nodejs.png'
}

export const enum LogColors {
	BLUE = 0x3a34eb,
	PINK = 0xfc0ce8,
	PURPLE = 0xb942f4,
	RED = 0xe83535,
	REDORANGE = 0xf49e42,
	TURQUOISE = 0x61e3f9,
	YELLOW = 0xffd944
}

export const enum PermissionsLevels {
	EVERYONE = 0,
	TRUSTED = 1,
	MODERATOR = 7,
	ADMINISTRATOR = 8,
	OWNER = 10
}

export const enum Time {
	MILLISECOND = 1,
	SECOND = 1 * 1000,
	MINUTE = 1 * 1000 * 60,
	HOUR = 1 * 1000 * 60 * 60,
	DAY = 1 * 1000 * 60 * 60 * 24
}
