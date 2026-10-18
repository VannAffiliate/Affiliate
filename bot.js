require('dotenv').config(); // Memuat konfigurasi dari file .env
const { Telegraf } = require('telegraf');
const fs = require('fs'); // Modul bawaan Node.js untuk membaca file

const bot = new Telegraf(process.env.TOKEN);

// Mengambil daftar ID dari .env, memecahnya berdasarkan koma, lalu ubah jadi angka (Number)
const ALLOWED_USER_IDS = process.env.ALLOWED_USERS 
    ? process.env.ALLOWED_USERS.split(',').map(id => Number(id.trim())) 
    : [];

bot.command('promo', async (ctx) => {
    // Cek apakah pengirim ada di dalam daftar user yang diizinkan
    const userId = ctx.from.id;
    console.log('User ID yang mencoba akses:', userId); // Cek terminal/console Anda
    console.log('Daftar ID yang diizinkan:', ALLOWED_USER_IDS);
    
    if (!ALLOWED_USER_IDS.includes(userId)) {
        return ctx.reply('⚠️ Maaf, Anda tidak memiliki akses untuk menggunakan perintah ini.');
    }
    try {
        // Mengirim file gambar langsung dari folder lokal project Anda
        // Pastikan file 'banner.jpg' berada di folder yang sama dengan file bot.js
        await ctx.replyWithPhoto(
            { source: fs.readFileSync('./gambar.jpeg') }, 
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
