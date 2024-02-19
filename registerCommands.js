/* eslint-disable no-undef */
import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { clientId } from "./config.js";
import { config } from 'dotenv';
config({ path: '../.env' });

const { TOKEN } = process.env;
export const register = async () => {
    let commands = [];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const commandsPath = join(__dirname, "commands");
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        try {
            const { default: command } = await import(`./commands/${file}`)
            console.log(command)
            if (command.data) {
                commands.push(command.data);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        } catch (error) {
            console.error(`Error loading command at ${filePath}:`, error);
        }
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    (async () => {
        try {
            console.log(`Started refreshing x application (/) commands.`);
            commands = JSON.stringify(commands);
            commands = JSON.parse(commands)

            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length || "0"} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
}
register()