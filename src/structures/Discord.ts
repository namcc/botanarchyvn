import { config } from "dotenv";
import { Client } from "discord.js";
import { readdirSync } from "fs";
import { Logger } from "./";
import { DefaultOptions } from "../types";
config();

export class Discord extends Client {
	public logger: Logger = new Logger();

	public dev = process.env.NODE_ENV == "development";
	public config: DefaultOptions = {
		prefix: "!",
		developers: [
			"1038669069601214554"
		],
		dev: this.dev,
		guildId: "1038669069601214554",
		emojis: { tick: ":white_check_mark:" },
	};

	public async start(): Promise<string> {
		this.loadEvents();

		this.rest.on("rateLimited", (info) => {
			this.logger.warn(info);
		});

		process.on("uncaughtException", (error) => {
			this.logger.error(error);
		});

		return await this.login(process.env.TOKEN);
	}

	public loadEvents(): void {
		readdirSync((this.dev ? "./src" : "./dist") + "/events/client").forEach(async event => {
			const eventName = event.split(".")[0];
			const data = await import(`../events/client/${eventName}`);
			this.on(eventName, (...p) => data.execute(this, ...p));
		});
	}
}
