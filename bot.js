const { Telegraf } = require('telegraf');
const fs = require('fs'); // Modul bawaan Node.js untuk membaca file

const bot = new Telegraf(process.env.TOKEN);

bot.command('promo', async (ctx) => {
    try {
        // Mengirim file gambar langsung dari folder lokal project Anda
        // Pastikan file 'banner.jpg' berada di folder yang sama dengan file bot.js
        await ctx.replyWithPhoto(
            { source: fs.readFileSync('./gambar2.jpeg') }, 
            {
                caption: '🔥 **PROMO SPESIAL HARI INI!** 🔥\n\nKlik tombol di bawah untuk berbelanja di Shopee.',
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '🛒 BELI SEKARANG DI SHOPEE', url: 'https://s.shopee.co.id/8KqJZRrU0Y' }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        console.error('Gagal mengirim gambar:', error);
        ctx.reply('Maaf, file gambar tidak ditemukan di folder lokal.');
    }
});

bot.launch();
console.log('🤖 Bot berjalan dengan gambar lokal!');
