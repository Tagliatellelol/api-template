const Canvas = require('canvas');

module.exports = {
    name: "canvas",
    run: async(req, res) => {
        const query = req.query.q;
        if(!query) return res.json({ error: "⚠️ Error: 101 | Can't find Querry" }), console.log("➤ ⚠️ | Someone As make an error (1/1)")
        const avatar = await Canvas.loadImage(query);
        let bg = await Canvas.loadImage('https://github.com/katie07/Imagayes/blob/main/BOS.png?raw=true');

        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext(`2d`);

        ctx.drawImage(avatar, 0, 0, 1000, 1000);
        ctx.drawImage(bg, 0, 0, 1000, 1000);

        // Important for make canvas
        res.set({ "Content-Type": "image/png" })
        res.send(canvas.toBuffer())
    }
}