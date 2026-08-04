import type { Dict } from "./en";

export const uz: Dict = {
  meta: {
    title: "Akhmad Kholmurodov — Full-Stack va WebOps muhandisi",
    description:
      "Janubiy Koreyada faoliyat yurituvchi Full-Stack va WebOps muhandisi. Next.js, React Native va Python bilan ishlab chiqarishdagi veb-platformalarni quraman va ularni ishlab turishini ta'minlayman.",
  },

  nav: {
    home: "Bosh sahifa",
    about: "Men haqimda",
    stack: "Texnologiyalar",
    work: "Tajriba",
    projects: "Loyihalar",
    security: "Xavfsizlik",
    contact: "Aloqa",
    resume: "Rezyume",
  },

  hero: {
    available: "Yangi imkoniyatlarga ochiqman",
    role: "Full-Stack va WebOps muhandisi",
    tagline: "Veb-mahsulotlarni boshidan oxirigacha quraman — va ularni ishlab turishini ta'minlayman.",
    intro:
      "Janubiy Koreyada uch yillik ishlab chiqarish platformalari tajribasi. Oldinda Next.js, ortida Node va Python, tagida Linux va Docker — va bularning barchasi ustidan hujumchi nigohi.",
    ctaWork: "Ishlarni ko'rish",
    ctaContact: "Bog'lanish",
    scroll: "Pastga",
    stats: [
      { value: "3+", label: "Yil ishlab chiqarishda" },
      { value: "99.9%", label: "lowshop.net uptime" },
      { value: "100×", label: "Vision API xarajati kamaydi" },
      { value: "3", label: "Til" },
    ],
  },

  about: {
    eyebrow: "01 · Tanishuv",
    title: "Men haqimda",
    lead: "Veb-mahsulotlarni boshidan oxirigacha quraman va yuritaman.",
    body: [
      "Dasturlashga yo'lim universitetning Cloud Computing laboratoriyasidan boshlangan. U yerda avtonom transport boshqaruvi prototipini Flutter'dan React + TypeScript'ga qayta qurdim — bu menga qulay emas, to'g'ri arxitekturani tanlashni o'rgatgan birinchi saboq bo'ldi.",
      "Bugun SAMBU'da kompaniyaning e-commerce platformasini birinchi komponentdan server uptime'igacha o'zim boshqaraman, yon tomondan esa o'z mahsulotlarimni chiqaraman. Dasturlash bilan bir qatorda ilova xavfsizligi bilan shug'ullanaman — OWASP Top 10, penetration testing va bug bounty — chunki o'z kodimdagi teshikni birinchi bo'lib o'zim topganim ma'qul.",
      "Koreys, ingliz va o'zbek tillarida ishlayman. Toza interfeys bilan uzluksiz ishlashi shart bo'lgan tizim orasidagi masalalarni yaxshi ko'raman.",
    ],
    facts: [
      { label: "Manzil", value: "Daegu · Gyeongsan, Janubiy Koreya" },
      { label: "Tajriba", value: "3+ yil, ishlab chiqarish veb-platformalari" },
      { label: "Yo'nalish", value: "Next.js · Node · TypeScript · WebOps" },
      { label: "Yana", value: "Ilova xavfsizligi va bug bounty" },
      { label: "Ta'lim", value: "Daegu universiteti — Dasturiy injiniring" },
      { label: "Maqom", value: "E-7 vizasi" },
    ],
    photoCaption: "Daegu, Janubiy Koreya",
  },

  stack: {
    eyebrow: "02 · Imkoniyatlar",
    title: "Texnologiyalar",
    lead: "Tizimning qaysi qatlamida turishiga qarab guruhlangan, men amalda ishlatadigan vositalar.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Ma'lumotlar bazasi",
      devops: "DevOps",
      security: "Xavfsizlik",
      practice: "Ish uslubi",
    },
  },

  experience: {
    eyebrow: "03 · Yo'l",
    title: "Ish tajribasi",
    lead: "Boshqalar tayanadigan haqiqiy tizimlarni o'z zimmamga olgan ikki joy.",
    present: "Hozirgacha",
    roles: {
      sambu: {
        company: "SAMBU Co., Ltd.",
        role: "Full-Stack va WebOps muhandisi",
        location: "Gyeongsan, Janubiy Koreya",
        context: "O'z D2C kanalini yurituvchi ishlab chiqarish va savdo kompaniyasi",
        bullets: [
          "Kompaniyaning rasmiy e-commerce platformasi lowshop.net'ni loyihalab, qurib, yuritaman — frontend implementatsiyasidan server operatsiyalarigacha to'liq siklni o'zim boshqaraman.",
          "Koreyaning yirik savdo kanallarida — Coupang, Naver SmartStore va Toss — do'konni ishga tushirdim va yuritaman: biznes profilini sozlash, do'konni qurish va savdo tizimini boshqarish.",
          "99.9% uptime'ni saqladim va sahifa yuklanish vaqtini 60% ga qisqartirdim; barcha savdo kanallarida jiddiy uzilish bo'lmadi.",
          "To'lov va ma'lumot sinxronizatsiyasi jarayonlarini optimallashtirib, onlayn savdo quvurini qo'l aralashuvisiz ishlaydigan qildim.",
        ],
      },
      ccl: {
        company: "Cloud Computing Lab, Daegu universiteti",
        role: "Frontend / Full-Stack dasturchi",
        location: "Daegu, Janubiy Koreya",
        context: "Universitet ilmiy laboratoriyasi",
        bullets: [
          "Avtonom transport vositalarini masofadan boshqarish va telemetriyani kuzatish uchun veb/mobil prototip ishlab chiqdim.",
          "Mavjud Flutter kod bazasidan ReactJS + TypeScript'ga to'liq migratsiyani taklif qildim va boshqardim; prototipni to'sib turgan mobil rendering va moslik muammolarini hal qildim.",
          "Node.js backend dasturchisi bilan birga migratsiyani muddatdan oldin yakunladim; responsive UI va REST ma'lumot sinxronizatsiyasi mening zimmamda edi.",
          "Jamoa jarayonida GitLab va GitHub'da versiya nazorati va code review bilan shug'ullandim.",
        ],
      },
    },
  },

  projects: {
    eyebrow: "04 · Tanlangan ishlar",
    title: "Loyihalar",
    lead: "Bo'sh repozitoriydan boshlab odamlar foydalanadigan darajaga yetkazgan uchta ish.",
    viewLive: "Saytga o'tish",
    privateRepo: "Yopiq repozitoriy",
    caseStudy: "Batafsil",
    featuresTitle: "Asosiy imkoniyatlar",
    shotsTitle: "Ishlab turgan mahsulot",
    close: "Yopish",
    journey: {
      hint: "Pastga aylantiring",
      beats: {
        eyaqin: [
          "Mahalla lentasi",
          "Xaritada radius bo'yicha qidiruv",
          "Sotuvchi bilan suhbat",
          "E'lon holatini o'zgartiradi",
        ],
        smartguard: [
          "Do'kon, yopilgandan keyin",
          "Kamera nishonni ushlaydi",
          "Kun bitta varaqqa aylanadi",
          "Odam ko'rib chiqib tasdiqlaydi",
        ],
        eyaqinMobile: [
          "O'sha lenta — endi qo'lda",
          "Pinlar va tortib chiqadigan panel",
          "Push bo'lib keladigan xabar",
          "To'qqiz palitra, biri sizniki",
        ],
      },
    },
    items: {
      eyaqin: {
        name: "eYaqin",
        subtitle: "Joylashuvga asoslangan C2C bozor",
        status: "Ishlamoqda",
        summary:
          "Mahallani birinchi o'ringa qo'yadigan ikkilamchi bozor. Butun mamlakat bo'ylab lenta o'rniga e'lonlarni haqiqatda sizga qanchalik yaqinligiga qarab — tuman va radius bo'yicha — saralaydi va filtrlaydi, shunda savdo piyoda yetib boradigan masofada qoladi.",
        role: "Yakka o'zim qilgan full-stack ish: sxema dizayni, API tuzilishi, real-time chat, moderatsiya vositalari va deploy.",
        highlights: [
          { value: "Yakka", label: "Full-stack ishlanma" },
          { value: "5 holat", label: "E'lon hayot sikli" },
          { value: "Real-time", label: "Xaridor–sotuvchi chati" },
        ],
        features: [
          { title: "Joylashuvga asoslangan qidiruv", body: "Tuman va radius bo'yicha qidirish va filtrlash." },
          { title: "E'lon hayot sikli", body: "Faoldan sotilganigacha aniq holatlar." },
          { title: "Real-time chat", body: "O'qilgan belgisi bilan xaridor–sotuvchi yozishmasi." },
          { title: "Ishonch va xavfsizlik", body: "Shikoyat va moderatsiya jarayoni." },
          { title: "Faollik", body: "Yoqtirishlar, saqlangan e'lonlar, yaqin-atrof lentasi." },
          { title: "Autentifikatsiya", body: "Sessiya boshqaruvi va profil sozlamalari." },
        ],
        deepDive: {
          title: "E'lon hayot siklining dizayni",
          body: "Har bir e'lon aniq holatlar orqali o'tadi — shu sababli ikkala tomon ham savdo qayerda turganini biladi, moderatsiya esa aralashish uchun yagona nuqtaga ega bo'ladi.",
          states: {
            active: "E'lon qilingan va mahalliy qidiruvda ko'rinadi",
            reserved: "Xaridor rozi, mahsulot band qilingan",
            escrow_verification: "To'lov ushlab turilgan va tekshirilmoqda",
            sold: "Savdo yakunlandi",
            hidden: "Qaytarib olingan yoki moderatsiya qilingan",
          },
          whyTitle: "Nega boolean emas, holatlar",
          why: [
            "is_sold degan boolean band qilingan mahsulotni, nizoli to'lovni yoki o'chirilgan e'lonni ifodalay olmaydi.",
            "O'tishlar server tomonda tekshiriladi, shuning uchun UI mumkin bo'lmagan holatni o'ylab topa olmaydi.",
          ],
        },
        architecture: [
          {
            title: "Frontend",
            body: "React 19 va TypeScript bilan Next.js App Router. Klient holati uchun Zustand, uslub uchun Tailwind, e'lon sahifalari uchun server komponentlari.",
          },
          {
            title: "Backend va ma'lumot",
            body: "Prisma orqali PostgreSQL bilan ishlaydigan route handler'lar; baza sig'im muddati kelganda Neon'dan Supabase'ga ko'chirildi. API yo'nalishlar bo'yicha ajratilgan: auth, e'lonlar, faollik, yaqin-atrof qidiruvi.",
          },
          {
            title: "Deploy",
            body: "Har bir branch uchun preview build bilan Vercel'da. Sxema migratsiyasi xavfsiz bo'lishi uchun muhitlar bo'yicha ajratilgan DB branch'lari.",
          },
        ],
        nextTitle: "Keyingi qadam",
        next: [
          "Rasm saqlashni imzolangan URL'li object storage'ga ko'chirish.",
          "Radius so'rovlari kattalashganda ham tez qolishi uchun qidiruv indeksini qo'shish.",
        ],
      },

      smartguard: {
        name: "SmartGuard",
        subtitle: "AI asosidagi CCTV nazorati · SuniyKoz",
        status: "Do'konda sinovda ishlamoqda",
        summary:
          "Kichik do'konlar o'g'irlik tufayli mol yo'qotadi va CCTV yozuvlarini ko'rishga soatlab vaqt sarflaydi. SmartGuard IP kameralarni Claude Vision'ga ulab, shubhali harakatni avtomatik aniqlaydi va Telegram orqali suratli xabar yuboradi.",
        role: "Platformani boshidan oxirigacha o'zim qurdim: ko'p oqimli kamera quvurlari, AI yo'naltirish mantiqi va veb-interfeys.",
        highlights: [
          { value: "100×", label: "VLM API xarajati kamaydi" },
          { value: "1 soniyadan kam", label: "Xabar yaratish" },
          { value: "24/7", label: "Ko'p oqimli ishchi jarayonlar" },
        ],
        shots: [
          {
            alt: "SmartGuard bosh sahifasi: kechasi 3D do'kon, KAM-03 kamerasi orqali, yo'lakdagi odamni kuzatayotgan aniqlash ramkasi bilan",
            caption: "Bosh sahifa sizni kamera ortiga o'tkazadi — scroll qilgan sari kezib chiqiladigan real vaqtdagi 3D do'kon, detektor esa nishonni ushlaydi.",
          },
          {
            alt: "SmartGuard imkoniyatlar bo'limi sovuq qog'oz yuzada, 8:00 dan 23:00 gacha bo'lgan chizg'ichda ikkita hodisa belgilangan",
            caption: "Pastda — butun mahsulot tayanadigan dizayn tizimi: qog'oz yuza, bitta marker rangi va bitta chiziqqa siqilgan kun.",
          },
        ],
        features: [
          { title: "Edge/cloud gibrid quvur", body: "Mahalliy OpenCV harakat aniqlagichi oddiy kadrlarni bulutgacha filtrlaydi." },
          { title: "Tanlab VLM'ga yuborish", body: "Claude Vision'ga faqat muhim kadrlar yetadi — 100× tejashning manbai." },
          { title: "Zudlik bilan Telegram xabari", body: "Egasi ko'rib chiqiladigan yozuv emas, surat va tavsif oladi." },
          { title: "Ko'p kamerali ishchilar", body: "Har bir kameraga alohida oqim; bitta oqim yiqilsa tizim ishlashda davom etadi." },
          { title: "Hodisalar tarixi", body: "Keyin ko'rib chiqish uchun PostgreSQL'da saqlanadigan aniqlashlar jurnali." },
          { title: "Konteynerli deploy", body: "Joyida Docker orqali — do'kon DevOps jamoasisiz ishlata oladi." },
        ],
        deepDive: {
          title: "Ikki bosqichli vision quvuri",
          body: "AI nazorat tizimidagi eng qimmat qism — model chaqiruvi. Shuning uchun model faqat arzon mahalliy filtrdan o'tgan kadrlarni ko'radi.",
          steps: [
            { label: "IP kamera", body: "Har bir do'kon kamerasidan uzluksiz RTSP oqimi." },
            { label: "OpenCV filtri", body: "Mahalliy harakat aniqlash oddiy kadrlarni tashlab yuboradi." },
            { label: "Kadr yo'naltiruvchi", body: "Faqat nomzod muhim kadrlar yuqoriga uzatiladi." },
            { label: "Claude Vision", body: "Sahnani tavsiflaydi va shubhalilikni tasniflaydi." },
            { label: "Telegram xabari", body: "Surat va tavsif egasining telefoniga." },
          ],
          whyTitle: "Nima uchun bu muhim",
          why: [
            "Har bir kadrni VLM'ga yuborish kichik do'kon uchun moliyaviy jihatdan imkonsiz.",
            "Mahalliy filtrlash API xarajatini 100 barobardan ko'proq kamaytirdi, xabar esa 1 soniyadan kamda yetib boradi.",
          ],
        },
        architecture: [
          {
            title: "Edge",
            body: "OpenCV bilan Python ishchilari, har kameraga bitta oqim; RTSP dekodlash va harakat filtri do'konning o'z uskunasida bajariladi.",
          },
          {
            title: "Bulut",
            body: "FastAPI xizmati nomzod kadrlarni Claude Vision'ga yo'naltiradi, aniqlashlarni PostgreSQL'ga yozadi va Telegram xabarlarini jo'natadi.",
          },
          {
            title: "Interfeys",
            body: "Kamera holati, aniqlashlar tarixi va xabar sozlamalari uchun React 18 dashboard. Butun stek Docker konteynerlarida yetkaziladi.",
          },
        ],
        nextTitle: "Keyingi qadam",
        next: [
          "Tarmoqqa chiqishdan oldin birlamchi tasnif qiladigan qurilma ichidagi model.",
          "Do'kon tuzilishi va odam oqimiga moslashuvchi sezuvchanlik sozlamasi.",
        ],
      },

      eyaqinMobile: {
        name: "eYaqin Mobile",
        subtitle: "Kross-platforma mobil ilova · React Native",
        status: "Faol ishlanmoqda",
        summary:
          "eYaqin'ning mobil ilovasi. Ikkilamchi savdo telefonda va notanish odamlar o'rtasida sodir bo'ladi — shuning uchun yuklash tezligi ham, ishonch ham aynan shu yerda bo'lishi kerak edi.",
        role: "Expo ustida React Native bilan qurilgan; veb bilan yagona REST/WebSocket backend va bitta Prisma sxemasini bo'lishadi.",
        highlights: [
          { value: "Expo 54", label: "SDK / Router v6" },
          { value: "Umumiy", label: "Tiplangan API qatlami" },
          { value: "Nativ", label: "Kamera, push, geolokatsiya" },
        ],
        features: [
          { title: "Kamera va galereyadan yuklash", body: "Mahsulotni to'g'ridan-to'g'ri kamera yoki galereyadan e'lon qilish." },
          { title: "E'lonni ulashish", body: "Har qanday e'lonni ilovadan tashqaridagi odamlarga yuborish." },
          { title: "Real-time chat", body: "Savdo kelishilayotgan paytda xaridor–sotuvchi yozishmasi." },
          { title: "Mahalla hamjamiyati", body: "Aholi mahalliy so'rovlar joylaydi va yaqin atrofdan ish topadi." },
          { title: "Muomala harorati", body: "Savdo tarixini ko'rinadigan qiladigan reputatsiya bahosi." },
          { title: "Sharh orqali yakunlash", body: "Savdo faqat sharh yozilgandan keyin tasdiqlanadi." },
        ],
        deepDive: {
          title: "Ko'rinadigan qilingan ishonch",
          body: "Yuzma-yuz savdo qiladigan notanish odamlarga bir-biriga ishonish uchun asos kerak. Bu yukni ikki mexanizm ko'taradi.",
          steps: [
            { label: "Muomala harorati", body: "Har bir profilga biriktirilgan, to'planib boradigan reputatsiya bahosi." },
            { label: "Sharh to'sig'i", body: "Qarshi tomon sharh yozmaguncha savdo yopilmaydi." },
            { label: "Shikoyat", body: "Istalgan e'lon yoki foydalanuvchini moderatsiyaga uzatish mumkin." },
            { label: "Fikr kanali", body: "Ilova ichidagi tartibli takliflar — to'g'ridan-to'g'ri mahsulot tadqiqoti." },
          ],
          whyTitle: "Nega yakunlash sharhga bog'langan",
          why: [
            "Sharh ixtiyoriy bo'lsa, uni faqat jahli chiqqanlar yozadi va baho ma'nosini yo'qotadi.",
            "Yakunlashni sharhga bog'lash reputatsiya signalini zich va halol saqlaydi.",
          ],
        },
        architecture: [
          {
            title: "Ilova",
            body: "Expo SDK 54 va Expo Router v6 bilan React Native. Silliq animatsiyalar uchun Reanimated va Moti, kamera, bildirishnoma, joylashuv va ulashish uchun nativ modullar.",
          },
          {
            title: "Ma'lumot",
            body: "Tiplangan REST endpoint'lar ustida TanStack Query, jonli chat hodisalari uchun Socket.io, veb bilan bo'lishiladigan markazlashgan Prisma sxemasi ostidagi Supabase (PostgreSQL).",
          },
          {
            title: "Yetkazish",
            body: "OTA yangilanishlari bilan Expo build quvuri — tuzatishlar app store navbatini kutmasdan foydalanuvchiga yetadi.",
          },
        ],
        nextTitle: "Keyingi qadam",
        next: [
          "Aloqa yomon bo'lganda yuklash yo'qolmasligi uchun oflayn e'lon qoralamalari.",
          "Mobil trafikni tejash uchun yuklashdan oldin fon rejimida rasm siqish.",
        ],
      },
    },
  },

  security: {
    eyebrow: "05 · Stekdan tashqarida",
    title: "Xavfsizlik amaliyoti",
    lead: "Men hujumchining ro'yxatini yodda tutib dasturlayman — mashq platformalarida ishlaydigan OWASP toifalarim aynan o'z kodimni tekshirish mezonim.",
    cards: [
      {
        tag: "HackerOne",
        title: "Tasdiqlangan zaiflik hisoboti",
        body: "Ishlab turgan veb-ilovaga qarshi haqiqiy zaiflik hisobotini yubordim. Vendor xavfsizlik jamoasi texnik jihatdan tasdiqladi va triaj qildi — dublikat sifatida yopildi, biroq haqiqiyligi rasman tasdiqlandi.",
      },
      {
        tag: "HTB va TryHackMe",
        title: "Uzluksiz amaliyot",
        body: "Veb-ilovalar zaifliklarini tahlil qilish, infratuzilma penetration testing va OWASP Top 10 mashqlari bilan muntazam shug'ullanaman.",
      },
      {
        tag: "Sertifikat",
        title: "Tarmoq va simsiz aloqa xavfsizligi",
        body: "Secure Wireless LAN 7.6 Administrator — Fortinet Training Institute va ISC2 (2026), CISSP'ning Communication and Network Security yo'nalishi.",
      },
    ],
    certsTitle: "Sertifikatlar",
    languagesTitle: "Tillar",
    languageNames: { ko: "Koreys", en: "Ingliz", uz: "O'zbek" },
    languageLevels: { ko: "KIIP 5-daraja", en: "Yuqori", uz: "Ona tili" },
    awardsTitle: "Terminaldan tashqarida",
    awards: [
      "Stol tennisi bo'yicha ochiq milliy chempionat — 1-o'rin (2026)",
      "Stol tennisi bo'yicha ochiq milliy chempionat — 2-o'rin (2024)",
      "Table Tennis Champions League — 1-o'rin (2024)",
    ],
  },

  contact: {
    eyebrow: "06 · Aloqa",
    title: "Keling, gaplashamiz",
    lead: "Jamoangizga qanday hissa qo'sha olishim haqida suhbatlashishdan mamnun bo'laman.",
    emailCta: "Xat yozish",
    copied: "Nusxalandi",
    copy: "Emailni nusxalash",
    availability: "Hozirda Janubiy Koreyada va masofadan full-stack, frontend hamda WebOps yo'nalishlariga ochiqman.",
  },

  footer: {
    built: "Next.js, React Three Fiber va Motion yordamida qurilgan.",
    rights: "Barcha huquqlar himoyalangan.",
    backToTop: "Yuqoriga",
  },

  a11y: {
    languageSwitcher: "Tilni o'zgartirish",
    menu: "Menyu",
    closeMenu: "Menyuni yopish",
  },
};
