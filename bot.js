const { Telegraf } = require('telegraf');
const fs = require('fs'); // Modul bawaan Node.js untuk membaca file

const bot = new Telegraf(process.env.TOKEN);

// Daftar ID Telegram user yang diizinkan (masukkan ID Anda di sini dalam bentuk angka)
const ALLOWED_USER_IDS = [5595863964]; // Ganti dengan Telegram ID yang valid

bot.command('promo', async (ctx) => {
    // Cek apakah pengirim ada di dalam daftar user yang diizinkan
    const userId = ctx.from.id;
    if (!ALLOWED_USER_IDS.includes(userId)) {
        return ctx.reply('⚠️ Maaf, Anda tidak memiliki akses untuk menggunakan perintah ini.');
    }
    try {
        // Mengirim file gambar langsung dari folder lokal project Anda
        // Pastikan file 'banner.jpg' berada di folder yang sama dengan file bot.js
        await ctx.replyWithMediaGroup([
            { 
                type: 'photo',
                media: { source: fs.readFileSync('./gambar.jpeg') }, 
                caption: '🔥 **PROMO SPESIAL HARI INI!** 🔥\n\nKlik tombol di bawah untuk berbelanja di Shopee.',
                parse_mode: 'Markdown'
            },
            {
                type: 'photo',
                media: { source: fs.readFileSync('./gambar2.jpeg') }
            },
            {
                type: 'photo',
                media: { source: fs.readFileSync('./gambar3.jpeg') }
            });
        
        await ctx.reply('Silakan klik tombol di bawah untuk berbelanja:', {
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
