// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 150);
      const end = start + Math.floor(Math.random() * 150);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}


// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
'Bismillah',
'dear Aziizah Amalia Huda',
'Assalamu\'alaikum Warohmatullohi Wabarokatuh',
'Alhamdulillah, washsholatu wassalamu',
' \'ala rosulillahi, amma ba\'du',
'salam sejahtera untuk kita semua',
'so, jadi gini,,,',
'i want to tell u about something',
'first of all, Aq ingin berterimakasih',
'untuk semuanya yang telah berlalu',
'aq juga mau minta maaf sebesar-besarnya',
'atas kesalahan dan kekhilafan yang diperbuat selama ini',
'dan kalaupun jijah punya salah sama aq',
'(tapi keknya gada si)',
'insya Alloh, udah Aq maapin',
'anyways',
'biar gak kepanjangan',
'semoga kamu selalu baik-baik saja',
'jaga kesehatanmu',
'jangan lupa vaksin',
'gausah takut disuntik :)',
'cuma kek digigit semut doang kok🤏',
'lanjut ah,,',
'semangat menuntut ilmunya',
'baik ilmu syar\'i maupun ilmu umum',
'semangat juga hapalan qur\'an nya',
'baca artinya, pelajari, pahami, dan',
'renungkan isi kandungan nya',
'fokus, jangan hiraukan aq',
'insya Alloh, Aq baik-baik aja disini',
'dan tak lupa,,',
'semangat dalam berbuat kebaikan',
'jangan berputus asa dari Rahmat Alloh',
'inget ni,,',
'ketika kamu sedang menghadapi rintangan yang besar,',
'kamu mempunyai Alloh yang Mahabesar',
'semoga kita selalu dalam hidayah',
'Alloh subhanahu wata\'ala',
'aamiin',
'okeh,,',
'mungkin cukup sekian dlu',
'maaf kalau ada salah dalam penulisan',
'maapin juga kalo kelamaan😅',
'intinya,,,',
'aq mau pamit,,,',
'semoga perjalanannya lancar',
'أستودعكم الله دينكم وأمانتكم',
'مع السلامة',
'sampai nanti,,,',
'ku memilih pergi (eh malah nyanyi :v)',
'canda pergi✌️',
'see you at the top',
'じゃあまたね!',
'언제 한 번 봐요!',
'إلى اللقاء',
'see u later',
'insya Alloh',
'terimakasih sudah membaca sampai sini',
'sekian',
'Wassalamu\'alaikum Warohmatullohi Wabarokatuh',
'dari hapiz,',
'yang cuma teman :)'];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 3000);
  });
  counter = (counter + 1) % phrases.length;
};

next();
