import { ActivityType, GatewayIntentBits, Partials } from "discord.js";
import { Discord, Express, Minecraft } from "./structures";
import { ServerIp } from "./types";
import { Bot } from 'mineflayer';


const client = new Discord({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		
	],
	presence: {
		status: "online",
		activities: [{ type: ActivityType.Custom, name: "HomelessLive" }],
	},
	partials: [Partials.Message, Partials.Message, Partials.GuildMember, Partials.User],
});

new Express();

client.on("ready", () => {
	// new Minecraft(client, {
	// 	ip: ServerIp.twoYtwoC,
	// 	version: '1.20.1',
	// 	livechat: client.dev ? "987204059838709780" : "986599157068361734",
	// });

	new Minecraft(client, {
		ip: ServerIp.anarchyVN,
		
		version: "1.19.4",
		livechat: client.dev ? "1179412545661042688" : "1179412059432169472",
	});

	// new Minecraft(client, {
	// 	ip: ServerIp.viAnarchy,
	// 	version: "1.20.1",
	// 	auth: "offline",
	// 	livechat: client.dev ? "987204059838709780" : "1146392891552432158",
	// });
});

client.start();