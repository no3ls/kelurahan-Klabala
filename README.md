# Website Kelurahan Klabala

Website statis (HTML + CSS + JavaScript) untuk Kelurahan Klabala, Kota Sorong.
Tidak butuh server atau proses build, jadi bisa langsung dipasang di GitHub Pages.

## Struktur folder

```
.
├── index.html        Halaman warga (beranda, layanan, pengaduan, berita, dll.)
├── admin.html        Panel admin
├── css/
│   ├── style.css     Gaya umum (dipakai kedua halaman)
│   └── admin.css     Gaya khusus panel admin
├── js/
│   ├── shared.js     Helper bersama (localStorage, escape HTML, konstanta status)
│   ├── app.js        Logika halaman warga
│   └── admin.js      Logika panel admin
└── .nojekyll         Agar GitHub Pages tidak memproses file lewat Jekyll
```

`shared.js` harus dimuat sebelum `app.js` / `admin.js` (sudah diatur di kedua file HTML).

## Pasang di GitHub Pages

1. Buat repository baru, lalu unggah seluruh isi folder ini (`index.html` harus ada di root).
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1-2 menit. Website tersedia di `https://<username>.github.io/<nama-repo>/`
   dan panel admin di `https://<username>.github.io/<nama-repo>/admin.html`.

Untuk mencoba di komputer sendiri, cukup buka `index.html` di browser, atau jalankan
`python3 -m http.server` di folder ini lalu buka `http://localhost:8000`.

## Mengubah isi

| Yang ingin diubah | Lokasi |
| --- | --- |
| Video opening beranda | `HERO_VIDEOS` di `js/app.js` |
| Teks slide beranda | `HERO_SLIDES` di `js/app.js` |
| Daftar layanan & persyaratan | `SERVICES` di `js/app.js` |
| Struktur organisasi | `OFFICIALS` di `js/app.js` |
| Statistik penduduk | `TOTAL_POPULATION`, `GENDER_STATS`, `AGE_STATS`, `JOB_STATS` |
| Data ketua RT/RW | `RT_LIST` dan `RW_LIST` di `js/app.js` |
| Peta | `MAP_EMBED_URL` di `js/app.js` |
| Alamat, jam pelayanan, WhatsApp, sosial media | fungsi `renderChrome` di `js/app.js` |
| Pesan WhatsApp otomatis | `WHATSAPP_MESSAGES` di `js/admin.js` |
| Kata sandi admin | `ADMIN_PASSWORD` di `js/admin.js` |
| Berita & pengumuman | lewat panel admin (`admin.html`) |

## Catatan penting

- **Data tersimpan di localStorage browser**, bukan di server. Pengajuan layanan, pengaduan,
  akun warga, dan berita buatan admin hanya ada di browser yang dipakai. Admin di perangkat A
  tidak akan melihat pengajuan warga dari perangkat B. Untuk pemakaian sungguhan, hubungkan
  ke backend/database (mis. Firebase atau Supabase).
- **Kata sandi admin (`admin123`) hanya contoh** dan terbaca oleh siapa pun lewat View Source.
  Jangan dianggap sebagai pengamanan.
- Panel admin memakai pustaka Excel/PDF dari CDN (cdnjs), jadi tombol unduh butuh internet.
- Berkas unggahan dibatasi 1 MB dan foto dikompres karena kapasitas localStorage terbatas (±5 MB).
