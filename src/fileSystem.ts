import { createReadStream } from "fs";
import { writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { join } from 'path';

const pathToFile = join(__dirname, 'store.json');

export const read = async(): Promise<string> => {
    try {
        const data = createReadStream(pathToFile);
        let result = '';
        for await(let chunk of data) {
            result += chunk.toString();
        }
        return result;
    } catch(e) {
        throw e;
    }
}

export const write = async(data: any) => {
    try {
        const store = await read();
        const usersToJSON = JSON.parse(store);
        data.id = randomUUID();
        usersToJSON.push(data);
        await writeFile(pathToFile, JSON.stringify(usersToJSON));
    } catch(e) {
        throw e;
    }
}