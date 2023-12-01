import { config } from "dotenv";
config();
import * as mineflayer_tps from 'mineflayer-tps';
import { Bot, BotOptions, createBot } from "mineflayer";
const botOptions: BotOptions = {
	username: process.env.EMAIL ,
	password: process.env.PASSWORD ,
	
	// Các cấu hình khác nếu cần thiết
  };
  
  const bot: Bot = createBot(botOptions);
  
 

// Create the TPS plugin instance


// Load the plugin

// Example how to use
bot.on('chat', (username, message) => {
	if (username === bot.username) return; // Không xử lý tin nhắn từ bot itself
  
	// Nếu tin nhắn là "?tps", bot sẽ trả lời lại với thông tin TPS
	if (message === '?tps') {
	  const tps = getServerTps(bot);
	  bot.chat('tps server: ' + tps);
	}
  });
  
  async function getServerTps(bot: Bot): Promise<number> {
	return new Promise((resolve, reject) => {
	  const tpsPlugin = mineflayer_tps(bot);
  
	  tpsPlugin.getTps().then((serverTps) => {
		resolve(serverTps);
	  }).catch((error) => {
		reject(error);
	  });
	});
  }
  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // Đảm bảo bot không tự trả lời chính mình

    if (message.includes('homeless')) {
        bot.chat('Homeless là người đẹp trai nhất server | Homeless Handsome');
        // Hoặc thực hiện hành động khác tùy thuộc vào logic của bạn
    }
});

// Create a bot instance