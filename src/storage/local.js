import FS from '@isomorphic-git/lightning-fs';

const fs = new FS("systemconcepts-fs");

async function listing(path) {
    let listing = [];
    const stat = await fs.promises.stat(path);
    if (stat.isDirectory) {
        const names = await fs.readdir(path);
        for (const name of names) {
            const item = {};
            const filePath = [path, name].filter(Boolean).join("/");
            try {
                const fileStat = await fs.stat(filePath);
                Object.assign(item, fileStat);
                item.filePath = filePath;
                item.name = name;
                item.folder = path;
                listing.push(item);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    return listing;
}

async function createFolder(path) {
    await fs.promises.mkdir(path);
}

export default {
    listing,
    createFolder
};