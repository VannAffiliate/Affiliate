const { Telegraf } = require('telegraf');
const fs = require('fs'); // Modul bawaan Node.js untuk membaca file

const bot = new Telegraf(process.env.TOKEN);

// Mengambil ID dari .env, mengubahnya menjadi array of numbers.
// Jika ingin lebih dari satu ID, pisahkan dengan koma di .env (contoh: 2356789543,1234567890)
const ALLOWED_USER_IDS = process.env.ALLOWED_USER_IDS ;

bot.command('promo', async (ctx) => {
    // Cek apakah pengirim ada di dalam daftar user yang diizinkan
    const userId = ctx.from.id;
    if (!ALLOWED_USER_IDS.includes(userId)) {
        return ctx.reply('⚠️ Maaf, Anda tidak memiliki akses untuk menggunakan perintah ini.');
    }
    
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
