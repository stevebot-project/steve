-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guilds" (
    "id" VARCHAR(19) NOT NULL,
    "channels.memberlog" VARCHAR(19),
    "channels.serverlog" VARCHAR(19),
    "deletePinMessages" BOOLEAN NOT NULL DEFAULT false,
    "logEvents.channelCreate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.channelDelete" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.channelUpdate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.emojiCreate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.emojiDelete" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.emojiUpdate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.guildBanAdd" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.guildBanRemove" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.guildMemberAdd" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.guildMemberRemove" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.guildMemberUpdate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.inviteCreate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.inviteDelete" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.messageDelete" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.messageDeleteBulk" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.roleCreate" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.roleDelete" BOOLEAN NOT NULL DEFAULT true,
    "logEvents.roleUpdate" BOOLEAN NOT NULL DEFAULT true,
    "roles.administrator" VARCHAR(19),
    "roles.assignable" VARCHAR(19)[] DEFAULT ARRAY[]::VARCHAR(19)[],
    "roles.moderator" VARCHAR(19),

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "snippets" (
    "content" VARCHAR(1900) NOT NULL,
    "embed" BOOLEAN NOT NULL DEFAULT false,
    "guildId" VARCHAR(19) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "snippets_pkey" PRIMARY KEY ("guildId","name")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(19) NOT NULL,
    "embedColor" VARCHAR(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
