✅ Persiapan Awal: Instalasi yang Dibutuhkan
Sebelum menjalankan project ini, pastikan kamu sudah menginstall:

Node.js (minimal versi 20 ke atas) 

NPM (Biasanya menyatu dengan Node.js)

Yarn (opsional, alternatif selain npm) 

Android Studio (untuk emulator Android) 

JDK (Java Development Kit) dan SDK → Biasanya terinstall otomatis lewat Android Studio.

Watchman (khusus pengguna Mac) → brew install watchman

CocoaPods (untuk iOS, hanya di Mac) → sudo gem install cocoapods

Bundler (jika mau pakai iOS) → gem install bundler

Kalau masih bingung install satu-satu, ikuti dulu Panduan Resmi Set Up Environment.

#🚀 Langkah 1: Install semua depedensi kode yang diperlukan
Setelah kode ini di clone atau di download, buka terminal, ketik:

1.npm install (pastikan nodejs dan npm sudah diinstall di perangkat anda) 

#🚀 Langkah 2: Jalankan Metro Server
Metro adalah server yang membantu membangun dan menjalankan aplikasi.

Buka terminal di folder project kamu, lalu jalankan:

Pakai npm
npm start

atau pakai Yarn
yarn start

#🚀 Langkah 3: Jalankan Aplikasi
Setelah Metro berjalan, buka terminal baru, lalu jalankan aplikasi ke perangkat:

Untuk Android
Pakai npm
npm run android

atau pakai Yarn
yarn android
Pastikan emulator Android Studio sudah menyala atau HP sudah terhubung.

Untuk iOS (hanya untuk Mac)
Pertama kali setelah clone project:

bundle install
Lalu setiap kali update library native:

bundle exec pod install
Setelah itu, jalankan aplikasi iOS:


Pakai npm
npm run ios

atau pakai Yarn
yarn ios
Catatan: Pastikan emulator iOS sudah dibuka.

✍️ Langkah 3: Mulai Ubah Aplikasi
Sekarang, buka file App.tsx di editor favorit kamu (seperti VSCode).

Kalau kamu menyimpan perubahan, aplikasi akan otomatis reload berkat fitur Fast Refresh.

Kalau mau paksa reload:

Android: Tekan tombol <kbd>R</kbd> dua kali, atau buka Dev Menu dengan <kbd>Ctrl + M</kbd> (Windows/Linux) atau <kbd>Cmd + M</kbd> (Mac).

iOS: Tekan <kbd>R</kbd> di Simulator.

🎉# Selamat!
Kalau sudah muncul di emulator atau HP, berarti kamu berhasil menjalankan aplikasi React Native ini! 🎉

