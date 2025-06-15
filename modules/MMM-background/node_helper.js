const NodeHelper = require("node_helper");
const fs = require("fs").promises;
const path = require('path')
const sharp = require('sharp')

async function readbgs() {
    const dir = path.join(__dirname, "assets");
    return await fs.readdir(dir)
}

async function dimbg(bg){
    const dir = path.join(__dirname,bg)
    const ext = dir.split('.')[1]
    const img = sharp(dir)

    const buffer = await img
        .modulate({brightness:.5})
        .toFormat(ext)
        .toBuffer()

    const base64 = buffer.toString('base64');
    const mimetype = `image/${ext}`;
    const dataurl = `data:${mimetype};base64,${base64}`;
    return dataurl
}


module.exports = NodeHelper.create({
    start() {
    console.log("Node helper for MMM-background started");
  },
    async socketNotificationReceived(notification,payload){
        if (notification == 'newbg'){
            try {
                const bgs = await readbgs()
                const randbackground = 'assets/' + bgs[Math.floor(Math.random()*bgs.length)]
                const dimmedbackground = await dimbg(randbackground)
                this.sendSocketNotification('bg',dimmedbackground)
            }catch (err){
                console.error(err)
            }
        }
    }
})