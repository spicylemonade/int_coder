import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

export class DiscordHelper {
  private client: Client | null = null;
  private channelId: string;
  private isReady: boolean = false;

  constructor(token: string, channelId: string) {
    this.channelId = channelId;
    this.initializeBot(token);
  }

  private async initializeBot(token: string) {
    try {
      console.log('🤖 Initializing Discord bot...');
      
      this.client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
        ],
      });

      this.client.once('ready', () => {
        console.log(`✅ Discord bot logged in as ${this.client?.user?.tag}`);
        console.log(`📋 Bot will send messages to channel: ${this.channelId}`);
        this.isReady = true;
      });

      this.client.on('error', (error) => {
        console.error('❌ Discord client error:', error);
      });

      console.log('🔑 Attempting to login to Discord...');
      await this.client.login(token);
      console.log('🔌 Discord login request sent');
    } catch (error) {
      console.error('❌ Failed to initialize Discord bot:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    }
  }

  async sendProblemExtracted(data: {
    problem_statement?: string;
    quick_plan?: string;
    constraints?: string;
    example_input?: string;
    example_output?: string;
  }) {
    if (!this.isReady || !this.client) {
      console.error('Discord bot not ready');
      return;
    }

    try {
      const channel = await this.client.channels.fetch(this.channelId) as TextChannel;
      
      let message = '📋 **Problem Extracted**\n\n';
      
      if (data.problem_statement) {
        message += `**Problem Statement:**\n\`\`\`\n${data.problem_statement}\n\`\`\`\n\n`;
      }
      
      if (data.constraints) {
        message += `**Constraints:**\n\`\`\`\n${data.constraints}\n\`\`\`\n\n`;
      }
      
      if (data.example_input) {
        message += `**Example Input:**\n\`\`\`\n${data.example_input}\n\`\`\`\n\n`;
      }
      
      if (data.example_output) {
        message += `**Example Output:**\n\`\`\`\n${data.example_output}\n\`\`\`\n\n`;
      }
      
      if (data.quick_plan) {
        message += `**Quick Plan:**\n\`\`\`\n${data.quick_plan}\n\`\`\``;
      }

      // Discord has a 2000 character limit per message
      if (message.length > 2000) {
        const chunks = this.splitMessage(message, 2000);
        for (const chunk of chunks) {
          await channel.send(chunk);
        }
      } else {
        await channel.send(message);
      }
    } catch (error) {
      console.error('Failed to send problem to Discord:', error);
    }
  }

  async sendFlashSolution(code: string, language: string = 'python') {
    if (!this.isReady || !this.client) {
      console.error('Discord bot not ready');
      return;
    }

    try {
      const channel = await this.client.channels.fetch(this.channelId) as TextChannel;
      
      const message = `⚡ **Quick Solution (Gemini 2.5 Flash)**\n\n\`\`\`${language}\n${code}\n\`\`\``;

      // Discord has a 2000 character limit per message
      if (message.length > 2000) {
        // Send in chunks
        await channel.send(`⚡ **Quick Solution (Gemini 2.5 Flash)**`);
        const codeChunks = this.splitCode(code, 1900, language);
        for (const chunk of codeChunks) {
          await channel.send(`\`\`\`${language}\n${chunk}\n\`\`\``);
        }
      } else {
        await channel.send(message);
      }
    } catch (error) {
      console.error('Failed to send Flash solution to Discord:', error);
    }
  }

  async sendProSolution(data: {
    code: string;
    thoughts?: string[];
    time_complexity?: string;
    space_complexity?: string;
    language?: string;
  }) {
    if (!this.isReady || !this.client) {
      console.error('Discord bot not ready');
      return;
    }

    try {
      const channel = await this.client.channels.fetch(this.channelId) as TextChannel;
      const language = data.language || 'python';
      
      // Send thoughts first
      if (data.thoughts && data.thoughts.length > 0) {
        let thoughtsMessage = '💭 **My Thoughts**\n\n';
        data.thoughts.forEach((thought, index) => {
          thoughtsMessage += `${index + 1}. ${thought}\n`;
        });
        
        if (thoughtsMessage.length > 2000) {
          const chunks = this.splitMessage(thoughtsMessage, 2000);
          for (const chunk of chunks) {
            await channel.send(chunk);
          }
        } else {
          await channel.send(thoughtsMessage);
        }
      }

      // Send the Pro solution code
      const codeMessage = `🎯 **Final Solution (Gemini 3.0 Pro)**\n\n\`\`\`${language}\n${data.code}\n\`\`\``;
      
      if (codeMessage.length > 2000) {
        await channel.send(`🎯 **Final Solution (Gemini 3.0 Pro)**`);
        const codeChunks = this.splitCode(data.code, 1900, language);
        for (const chunk of codeChunks) {
          await channel.send(`\`\`\`${language}\n${chunk}\n\`\`\``);
        }
      } else {
        await channel.send(codeMessage);
      }

      // Send complexity analysis
      if (data.time_complexity || data.space_complexity) {
        let complexityMessage = '📊 **Complexity Analysis**\n\n';
        if (data.time_complexity) {
          complexityMessage += `**Time Complexity:** ${data.time_complexity}\n`;
        }
        if (data.space_complexity) {
          complexityMessage += `**Space Complexity:** ${data.space_complexity}`;
        }
        await channel.send(complexityMessage);
      }
    } catch (error) {
      console.error('Failed to send Pro solution to Discord:', error);
    }
  }

  private splitMessage(message: string, maxLength: number): string[] {
    const chunks: string[] = [];
    let currentChunk = '';

    const lines = message.split('\n');
    for (const line of lines) {
      if ((currentChunk + line + '\n').length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk);
          currentChunk = '';
        }
        // If a single line is too long, split it
        if (line.length > maxLength) {
          for (let i = 0; i < line.length; i += maxLength) {
            chunks.push(line.slice(i, i + maxLength));
          }
        } else {
          currentChunk = line + '\n';
        }
      } else {
        currentChunk += line + '\n';
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  private splitCode(code: string, maxLength: number, language: string): string[] {
    const chunks: string[] = [];
    const lines = code.split('\n');
    let currentChunk = '';

    for (const line of lines) {
      if ((currentChunk + line + '\n').length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk);
          currentChunk = '';
        }
        currentChunk = line + '\n';
      } else {
        currentChunk += line + '\n';
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  async destroy() {
    if (this.client) {
      await this.client.destroy();
      this.isReady = false;
      console.log('Discord bot disconnected');
    }
  }
}

