const axios = require("axios");

let videoIndex = 0;

module.exports = {
  config: {
    name: "adminmention",
    version: "21.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fast caption + video reply",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    // 🔒 Author lock
    if (this.config.author !== "Farhan-Khan") return;

    const admins = [
      { uid: "61573366160918", names: ["RAKIB"] },
      { uid: "61584866024929", names: ["ヽ｟ᏟᎬϴ｠▁▁ዐዐዐ 🙁😚☺️👿"] }
    ];

    const senderID = String(event.senderID);
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );

    if (!isMentioning) return;

    // 🎬 Video list
    const videos = [
      "https://i.imgur.com/WWVtoo4.mp4",
"https://i.imgur.com/f0My6BX.mp4",
"https://i.imgur.com/Qe286eM.mp4"
    ];

    const videoUrl = videos[videoIndex];
    videoIndex = (videoIndex + 1) % videos.length;

    // ✍️ captions
    const captions = [
      "Mantion_দিস না _RAKIB বস এর মন ভালো নেই আজকে 💔🥀",
      "আমার বস RAKIB এখন বিজি আছে 😒",
      "বস ফ্রি হলে রিপ্লাই দিবে 🧡😁",
      "বস কে এত মেনশন না দিয়ে ইনবক্স আসো 😏",
      "RĀKÍB বস এখন বিজি, যা বলার আমাকে বলো 😼",
      "মেনশন না দিয়ে বস কে একটা জি এফ দে 😑"
    ];

    const mentionNames = mentionedIDs.map(id => `@${id}`).join(", ");

    const caption = `
✿•≫───────────────≪•✿
『 ${captions[Math.floor(Math.random() * captions.length)]} 』
✿•≫───────────────≪•✿
`;

    try {
      // ⚡ Fast Video Fetch
      const videoStream = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "stream",
        timeout: 10000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      await message.reply({
        body: caption,
        attachment: videoStream.data
      });

    } catch (err) {
      console.log("❌ Video error:", err.message);
      await message.reply("😢 ভিডিও দিতে পারলাম না");
    }
  }
};
