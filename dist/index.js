"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const client = new Discord.Client();
let commands = [];
require('dotenv').config();
loadCommands(`${__dirname}/commands`);
client.on("ready", () => {
    console.log("Ready to go!");
    client.user.setActivity("Anime OP/ED", { type: "LISTENING" });
});
client.on("guildMemberAdd", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "🍌💦i-like-katkit🍌💦");
    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail("https://cdn.discordapp.com/attachments/340683078899073034/606110685885235201/0oYW3Ta.jpg")
        .addField(':bust_in_silhouette: | Private Server by : ', `${welcomeChannel.guild.owner}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${welcomeChannel.guild.name}`)
        .addField(':id: | User :', "**[" + `${welcomeChannel.guild.id}` + "]**")
        .addField(':family_mwgb: | You are member number', `${welcomeChannel.guild.memberCount}`)
        .addField("Name", `<@` + `${welcomeChannel.id}` + `>`, true)
        .addField('Server', `${welcomeChannel.guild.name}`, true)
        .setFooter(`**${welcomeChannel.guild.name}**`)
        .setTimestamp();
    welcomeChannel.send(embed)
        .catch(console.error);
});
client.on("guildMemberAdd", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "🍌💦i-like-katkit🍌💦");
    welcomeChannel.send(`Welcome ${member.displayName}! This stupid command took 2 days to make!`);
    let memberRole = member.guild.roles.find(role => role.id == "578838550045523998");
    member.addRole(memberRole);
});
client.on("guildMemberRemove", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "🍌💦i-like-katkit🍌💦");
    welcomeChannel.send(`Wow, ${member.displayName}! Why you left...`);
});
client.on("message", msg => {
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == "dm") {
        return;
    }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    handleCommand(msg);
});
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
        let args = msg.content.split(" ").slice(1);
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisCommand(command)) {
                    continue;
                }
                yield commandClass.runCommand(args, msg, client);
            }
            catch (exception) {
                console.log(exception);
            }
        }
    });
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
    }
}
client.login(process.env.CLIENT_TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0Qyx1Q0FBdUM7QUFFdkMsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXBELElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7QUFFakMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLFlBQVksQ0FBQyxHQUFHLFNBQVMsV0FBVyxDQUFDLENBQUE7QUFFckMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBR3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFHNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFO0lBRWpDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUJBQXVCLENBQXdCLENBQUM7SUFDNUgsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1NBQ2xCLFFBQVEsQ0FBQyxRQUFRLENBQUM7U0FDbEIsWUFBWSxDQUFDLDBGQUEwRixDQUFDO1NBQ3hHLFFBQVEsQ0FBQyw2Q0FBNkMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEYsUUFBUSxDQUFDLDBCQUEwQixFQUFFLDBCQUEwQixjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxD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