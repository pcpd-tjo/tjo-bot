/* eslint-disable no-undef */
import { config } from 'dotenv';
import { REST, Routes } from 'discord.js';
import { clientId } from '../config.js';


// allows process.env to be used during runtime
config({ path: '../.env' });

const { TOKEN } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);
const commands  = (await rest.get(
    Routes.applicationCommands(clientId)
)) 
console.log(commands.find(element => element.name == "view-titles") )