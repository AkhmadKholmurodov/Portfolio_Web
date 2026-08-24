import type { Dict } from "./en";

/**
 * Uzbek — his own language, and the one eYaqin is actually built for. Kept as
 * plain, direct Uzbek rather than a calque of the English: the technical nouns
 * stay in English where that is what people actually say ("full-stack",
 * "deploy", "backend"), and the sentences around them are written as they
 * would be spoken.
 */
export const uz: Dict = {
  meta: {
    title: "Akhmad Kholmurodov — Full-Stack va WebOps muhandisi",
    description:
      "Janubiy Koreyada production darajasidagi veb-platformalar quraman, ular ishlaydigan serverlarni o'zim yurituraman va o'z kodimdagi teshikni boshqalardan oldin o'zim topaman. Next.js, React Native, Python, Docker. E-7 vizasi, Seul va Koreyaning istalgan joyida ishlashga tayyorman.",
  },

  ui: {
    menu: "Menyu",
    close: "Yopish",
    language: "Til",
    scroll: "Pastga",
    back: "Orqaga",
    backHome: "Bosh sahifaga",
    allWork: "Barcha ishlar",
    next: "Keyingi loyiha",
    external: "Yangi oynada ochiladi",
    skip: "Asosiy qismga o'tish",
    notFound: "Bunday sahifa yo'q.",
  },

  nav: {
    build: "Qurish",
    run: "Yuritish",
    break: "Xavfsizlik",
    ai: "AI",
    about: "Men haqimda",
    contact: "Bog'lanish",
    resume: "Rezyume",
    work: "Ishlar",
  },

  hero: {
    label: "Veb-platformalar · Server operatsiyalari · Xavfsizlik",
    role: "Full-Stack muhandis",
    lead: "Koreyada uch yildan beri veb-platformalar quraman. Hozir bir kompaniyaning e-commerce tizimini yana bitta muhandis bilan birga quramiz va yuritamiz.",
    ctaWork: "Ishlarni ko'rish",
    ctaResume: "Rezyumeni yuklab olish",
    availability: "Seul, yoki Koreyaning istalgan joyi",
    visa: "E-7 vizasi · homiylik shart emas",
    languages: "Koreys · Ingliz · O'zbek",
  },

  metrics: {
    orders: { label: "Kunlik buyurtma", source: "uchta savdo kanali bo'ylab" },
    peakDay: { label: "Eng yuqori kun", source: "설날 va 추석 sovg'a-to'plam mavsumi" },
    visionCost: { label: "Arzonroq vision", source: "SmartGuard edge marshrutlash" },
    live: { label: "Ishlab turgan mahsulot", source: "Haqiqiy foydalanuvchilar oldida" },
  },

  build: {
    label: "01 — Qurish",
    title: "Mahsulotni butunligicha quraman.",
    lead: "Ma'lumotlar bazasi sxemasidan deploygacha. Uchtasi hozir ishlab turibdi.",
  },

  work: {
    caseStudy: "Case study'ni o'qish",
    visit: "Saytga o'tish",
    role: "Rol",
    year: "Yil",
    stack: "Texnologiyalar",
    payments: "To'lov usullari",
    status: { live: "Ishlayapti", building: "Ishlanmoqda" },
    problem: "Muammo",
    decisions: "Ahamiyatli qarorlar",
    outcome: "Natija",
    nextUp: "Keyin nima qilardim",
    stats: {
      orders: "Kunlik buyurtma",
      channels: "Savdo kanallari",
      districts: "Sxemadagi tumanlar",
      states: "E'lon holatlari",
      cost: "Oddiy yechimga nisbatan",
      cameras: "Ishlab turgan kamera",
      sites: "Ishlab turgan obyekt",
      platforms: "Platformalar",
      testers: "Yopiq test foydalanuvchilari",
    },
  },

  run: {
    label: "02 — Yuritish",
    title: "Qurgan narsamni o'zim yurituraman.",
    lead: "Ishga tushirish — oson qismi. Deploy ham, to'lov sinxronizatsiyasi ham, ostidagi Linux serverlar ham mening javobgarligimda.",
    timeline: "Yo'l",
    present: "Hozir",
  },

  experience: {
    sambu: {
      company: "SAMBU Co., Ltd.",
      role: "Full-Stack muhandis (veb operatsiyalari)",
      context:
        "O'z do'koni, Coupang va Naver SmartStore orqali sotadigan D2C e-commerce platformasi · ikki kishilik muhandislar jamoasi",
      bullets: [
        "Ikki muhandisdan biri sifatida platformani boshdan oxir quraman va yurituraman — Next.js do'koni, NestJS API, to'lovlar, deploy va Cafe24 ustidagi server operatsiyalari.",
        "Buyurtma va qoldiq quvurini asinxron NestJS + BullMQ/Redis xizmati sifatida loyihaladim: o'z do'kon buyurtmalari yozilishi bilan navbatga tushadi, besh daqiqalik cron poller Coupang va Naver SmartStore API'laridan buyurtmalarni tortadi, workerlar esa SELECT FOR UPDATE ostida qoldiqni ayirib, yangi miqdorni barcha kanallarga tarqatadi.",
        "Bayram sovg'a-to'plami aksiyasi paytidagi ortiqcha sotuvni jonli trafikning 30 daqiqasi ichida to'xtatdim — race condition'ni aniqladim, Redis Redlock va pessimistik qator qulflari bilan qoldiq ayirishni navbat va ma'lumotlar bazasi darajasida atomar qildim, so'ng bu regressiya qaytmasligi uchun parallel integratsion testlar yozdim.",
        "To'lov holatini tiklanadigan qildim: har bir so'rov idempotentlik kaliti va PENDING yozuvi bilan keladi, fon vazifasi esa har 10–15 daqiqada PG provayder bilan solishtiradi va uzilib qolgan callback tufayli nomuvofiq qolgan buyurtmalarni avtomatik bekor qiladi yoki tiklaydi.",
        "Kunlik hisob-kitob solishtirish quvurini Python/pandas'da qurdim — provayderning hisob-kitob faylini oladi, to'lovlar jadvali bilan taqqoslaydi, tafovutlarni audit jadvaliga yozadi va jamoani Slack'da ogohlantiradi.",
        "Koreys to'lov relslarini boshdan oxir uladim — karta PG (Toss Payments, KG Inicis), Toss Pay, Naver Pay, Kakao Pay — to'liq va qisman qaytarishlar idempotentlik kalitlari va qator darajasidagi qulflar bilan xavfsiz.",
        "Productionni Sentry, Cafe24 server loglari va Slack ogohlantirishlari bilan kuzataman.",
      ],
    },
    ccl: {
      company: "Bulutli hisoblash laboratoriyasi, Daegu universiteti",
      role: "Frontend / Full-Stack dasturchi",
      context: "Universitet ilmiy laboratoriyasi",
      bullets: [
        "Avtonom transportni masofadan boshqarish va telemetriya uchun veb va mobil prototip.",
        "Flutter'dan React va TypeScript'ga to'liq o'tishni taklif qildim va boshqardim — prototipni to'xtatib turgan rendering va moslik muammolari shunda hal bo'ldi.",
        "Muddatdan oldin topshirdik — qulay emas, to'g'ri arxitekturani tanlashni shu yerda o'rgandim.",
      ],
    },
    daegu: {
      company: "Daegu universiteti",
      role: "Dasturiy injiniring bakalavri",
      context: "Daegu, Janubiy Koreya",
      bullets: [],
    },
  },

  break: {
    label: "03 — Xavfsizlik",
    title: "Zaiflikni boshqalardan oldin o'zim topaman.",
    lead: "Yonimda hujumchining ro'yxati ochiq turadi. Buzishni mashq qilgan narsam — aynan o'z kodimda tekshiradigan narsam.",
    certsTitle: "Sertifikatlar",
    read: "O'qish",
    items: {
      cve: {
        title: "CVE-2025-55182 — React2Shell",
        body: "React Server Components'ning Flight protokolidagi xavfli deserializatsiya RCE'sini izolyatsiyalangan labda haqiqiy kod bajarilishigacha qayta tikladim va proof-of-concept'ni e'lon qildim — ommaviy PoC'larning aksariyati asosiy kamchilikni umuman ishga tushira olmayotgan paytda. Oshkora qilish oynasi ichida nazoratimdagi har bir Next.js ilovasini tekshirdim va yamadim. Sinov boshdan oxir faqat lab nishonlari bilan cheklandi.",
      },
      writing: {
        title: "Texnik maqolalar",
        body: "Hack The Box va TryHackMe mashinalari — Kobold, Smol, Chill Hack, Basic Pentesting — bo'yicha ekspluatatsiya yo'riqnomalarini yozaman: enumeratsiya, veb-ekspluatatsiya va imtiyozlarni oshirish. O'zbek tilida — xavfsizlik bo'yicha material deyarli yo'q tilda.",
      },
      google: {
        title: "Google Cybersecurity Certificate",
        body: "Google, 2026.",
      },
      platforms: {
        title: "Hack The Box · TryHackMe",
        body: "Veb-ilovalar zaifligini tahlil qilish, infratuzilmaga sinov hujumlari, OWASP Top 10.",
      },
      fortinet: {
        title: "Secure Wireless LAN 7.6 Administrator",
        body: "Fortinet Training Institute, 2026. Simsiz LAN xavfsizligini boshqarish.",
      },
      freecodecamp: {
        title: "Front End Development Libraries",
        body: "freeCodeCamp sertifikati.",
      },
    },
  },

  ai: {
    label: "04 — AI",
    title: "AI yozgan kodni ham xuddi shunday tekshiraman.",
    // TODO(model-name): aniq model nomini Akhmad bergach qo'yiladi.
    lead: "Claude bilan birga, o'z ish jarayonimga moslab sozlagan self-hosted open-weight modeldan foydalanaman.",
    body: "Muhimi kod yozdirish emas — uni ko'zdan kechirish: tuzilishi, sifati, xavfsizligi va keyin qo'llab-quvvatlanishi, branchga tegishidan oldin. Model chiqargan narsa taklif bo'lib keladi, taklif esa istalgan pull request kabi o'qiladi: merge qilishdan oldin har bir qatorini tushuntira olishim kerak, tushuntira olmagan qatorlarim merge bo'lmaydi.",
  },

  stack: {
    label: "Asboblar",
    title: "Nimalar bilan ishlayman",
    groups: {
      languages: "Tillar",
      frontend: "Frontend",
      backend: "Backend",
      data: "Ma'lumot",
      ops: "Operatsiyalar",
      security: "Xavfsizlik",
    },
  },

  contact: {
    label: "05 — Bog'lanish",
    title: "Gaplashaylik.",
    lead: "Full-stack yoki platforma muhandisi ishini qidiryapman — Seul, yoki Koreyaning istalgan joyi. E-7 vizam bor — homiylik shart emas. Koreys, ingliz yoki o'zbek.",
    emailCta: "Xat yozing",
    resumeCta: "Rezyumeni yuklab olish (PDF)",
    responseTime: "Xatlarga bir kun ichida javob beraman.",
  },

  footer: {
    built:
      "Next.js, GSAP va canvas bilan qurilgan. Shriftlar — Archivo, Pretendard va Geist Mono.",
    rights: "Barcha huquqlar himoyalangan.",
  },

  about: {
    label: "Men haqimda",
    title: "Koreyaga nega keldim va nega qoldim.",
    intro: [
      "Koreyaga dasturiy injiniring bo'yicha o'qishga keldim va ish qiziq bo'lib ketgani uchun qoldim. Boshlanish nuqtasi universitetning Bulutli hisoblash laboratoriyasi bo'lgan: Flutter'da yozilgan avtonom transport prototipi mobil qurilmada rendering bo'lmasdi. Bir necha hafta atrofidan yamoq qo'yganimdan keyin frontendni React va TypeScript'da qaytadan qurishni taklif qildim. Shu ishni menga ishonishdi va muddatdan oldin topshirdik.",
      "Hozir ham shunday ishlayman. Bugungi tushdan keyinni yengillashtiradigan chetlab o'tish yo'liga bir kun sarflagandan ko'ra, keyingi olti oyni zerikarli qiladigan arxitekturaga bir hafta sarflaganim afzal.",
      "Bugun SAMBU'da ikki muhandisdan biri sifatida kompaniyaning e-commerce platformasini quraman va yurituraman, yonida o'z mahsulotlarimni ham quraman. eYaqin shundan boshlandi: uyda arzimagan buyum uchun butun shaharni kesib o'tish kerak edi. SmartGuard esa bir do'kon egasi kameralari yozuvi juda ko'payib ketgani uchun ularni endi umuman ko'rmasligini aytgani uchun. Dasturlash bilan birga ilova xavfsizligini mashq qilaman — bu o'sha arxitektura haqidagi bahs bilan bir xil turtki. O'z kodimdagi teshikni birinchi o'zim topganim afzal.",
    ],
    photos: {
      graduation: "Bitiruv, Daegu universiteti — dasturiy injiniring bakalavri, 2025-yil fevral.",
      cafe: "Daegudagi kafe, qish.",
      studio: "Studiya surati.",
      portrait: "Portret.",
    },
    languagesTitle: "Tillar",
    languagesNote:
      "Uchalasini ham har kuni ishlataman — SAMBU'da koreyscha, hujjatlar va mijozlar bilan inglizcha, eYaqin kimlar uchun qurilgan bo'lsa, ular bilan o'zbekcha.",
    languageLevels: { ko: "Yuqori", en: "Yuqori", uz: "Ona tili" },
    recognitionTitle: "E'tirof",
    recognitionNote: "Ishning o'ziga berilgan e'tirof.",
    recognition: {
      presidentTech: "O'zbekiston Prezidenti Tech mukofoti — eYaqin, jamoa rahbari",
    },
    awardsTitle: "Klaviaturadan tashqarida",
    awardsNote: "Stol tennisini musobaqa darajasida o'ynayman.",
    awards: {
      samsunghyeonTeam:
        "Samsunghyeon ochiq milliy stol tennisi turniri, Janubiy Koreya — jamoaviy 1-o'rin",
      samsunghyeonSingles:
        "Samsunghyeon ochiq milliy stol tennisi turniri, Janubiy Koreya — yakka 2-o'rin",
      championsLeague: "Stol tennisi Chempionlar ligasi — 1-o'rin",
      openChampionship2: "Ochiq milliy stol tennisi chempionati — 2-o'rin",
    },
    place: "Janubiy Koreyada yashayman · Seul yoki Koreyaning istalgan joyi",
  },

  shots: {
    eyaqinHero: "eYaqin bosh sahifasi. Mahsulot o'zi haqida birinchi aytadigan narsa — joylashuv.",
    eyaqinFeed: "Qidiruv lentasi: mahalla, tuman yoki radius bo'yicha chegaralanadi.",
    eyaqinListing:
      "E'lon sahifasi. Sotuvchining muomala harorati profil ichida emas, ismi yonida turadi.",
    eyaqinProfile:
      "Sotuvchining o'z ekrani: har bir e'lon aniq holati va biriktirilgan xaridori bilan.",
    eyaqinSchema:
      "Prisma Studio'dagi sxema. District va Region — e'longa yoziladigan erkin matn emas, 179 va 14 qatorli jadvallar.",
    sgHero: "SmartGuard bosh sahifasi. Sahna — yopilgandan keyingi do'kon.",
    sgConsole:
      "Operator konsoli. Har bir ogohlantirish modelning izohi va aniq ikkita tugma bilan keladi: haqiqiy hodisa yoki yolg'on signal.",
    sgHow: "Qanday ishlaydi — muhandis uchun emas, do'kon egasi uchun yozilgan.",
    sgCta: "Futer chegarani ochiq aytadi: tizim xulosasi yuridik dalil emas.",
    mbFeed: "Native lenta. Joylashuv va turkum filtrlari barmoq ostida.",
    mbChat: "Xaridor va sotuvchi narxni kelishmoqda — bu holatda koreys tilida.",
    mbReview:
      "Sharh orqali yopiladigan savdo. Sharh yozilmaguncha sotuv tasdiqlanmaydi, sharh esa sotuvchining haroratini qimirlatadi.",
  },

  projects: {
    lowshop: {
      name: "lowshop.net",
      tagline: "Kompaniyaning o'z do'koni, yonidagi ikki marketplace va uchalasida qoldiqni rost saqlab turadigan quvur.",
      summary:
        "SAMBU'ning rasmiy D2C e-commerce platformasi. Ikki muhandisdan biri sifatida quraman va yurituraman; u javob bermay qolganda qo'ng'iroq keladigan ikki odamdan biri — men.",
      role: "Full-Stack muhandis (veb operatsiyalari) · ikki kishilik jamoa",
      problem: {
        title: "Tizim",
        body: "Uchta savdo kanali — kompaniyaning o'z do'koni, Coupang va Naver SmartStore — va uchalasining ortida bitta qoldiq jadvali. Kuniga taxminan 2,500 buyurtma shu jadvaldan o'tadi, 설날 va 추석 sovg'a-to'plam kunlarida esa 5,000–6,000 tagacha ko'tariladi. O'z do'kon buyurtmalari yozilishi bilan navbatga tushadi; besh daqiqalik cron poller Coupang va Naver SmartStore API'laridan buyurtmalarni tortadi. Ularning har biri o'sha bir qatorlarda tugaydi va har biri o'sha qatorlarni rost holda qoldirib ketishi shart.",
      },
      decisions: {
        title: "Ortiqcha sotuv hodisasi",
        items: [
          {
            title: "Nima buzildi",
            body: "Sovg'a-to'plam aksiyasi paytida uchala kanaldan bir vaqtda kelgan buyurtma yozuvlari bir xil qoldiq qatorlarida to'qnashdi va platforma ortiqcha sotdi. Qoldiq jadvalining klassik nosozlik shakli shu: har bir yozuv miqdorni o'qiydi, yetarli deb hisoblaydi va ayirilgan qiymatni qaytarib yozadi — o'sha o'qish bilan yozish orasida esa boshqa kanal aynan shu qatorda aynan shuni qilib ulguradi. Oddiy trafikda bu oyna juda tor. Aksiya esa aynan uni kengaytiradigan shart.",
          },
          {
            title: "30 daqiqadagi yechim",
            body: "Atomarlik ikkala qatlamda ham, chunki bittasining o'zi baribir tirqish qoldiradi. Navbat qatlamida Redis Redlock — ikki worker bir xil qoldiq elementini bir vaqtda ushlab tura olmasin. Ma'lumotlar bazasi qatlamida SELECT FOR UPDATE — agar negadir shunday bo'lib qolsa ham, ikkinchisi allaqachon sarflangan miqdorni o'qish o'rniga birinchisining commit'ini kutsin. Birinchi ortiqcha buyurtmadan to jonli aksiya trafigi ostida ayirish atomar bo'lgunga qadar o'ttiz daqiqa.",
          },
          {
            title: "Nega u qaytib kela olmaydi",
            body: "Unit test race condition'ni ushlay olmaydi. Funksiyani bir marta chaqiradi, to'g'ri javob oladi va o'tadi — aksiyadan oldingi kod aynan shunday qilgan edi. Shu sababli regressiya testi — parallel integratsion test: bir xil qoldiq qatorlariga bir vaqtda buyurtmalar otadi va keyin jadval nima ushlab turganini tekshiradi. Qulflash olib tashlansa yoki bo'shashtirilsa, test 설날 kuni emas, CI'da yiqiladi.",
          },
        ],
      },
      outcome: {
        title: "Quvur yana nima qiladi",
        body: "To'lov holati shunchaki logga yozilmaydi — u tiklanadi: har bir so'rov idempotentlik kaliti va PENDING yozuvi bilan keladi, fon vazifasi esa har 10–15 daqiqada PG provayder bilan solishtiradi va uzilib qolgan callback tufayli nomuvofiq qolgan buyurtmalarni avtomatik bekor qiladi yoki tiklaydi. Python va pandas'dagi kunlik hisob-kitob solishtirish quvuri provayderning hisob-kitob faylini oladi, to'lovlar jadvali bilan taqqoslaydi, tafovutlarni audit jadvaliga yozadi va jamoani Slack'da ogohlantiradi. Koreys to'lov relslari boshdan oxir ulangan — Toss Payments va KG Inicis orqali karta PG, hamda Toss Pay, Naver Pay va Kakao Pay — to'liq va qisman qaytarishlar o'sha idempotentlik kalitlari va qator darajasidagi qulflar bilan xavfsiz. Production Sentry, Cafe24 server loglari va Slack ogohlantirishlari bilan kuzatiladi.",
      },
      next: {
        title: "Keyin nima qilardim",
        // Emptied deliberately: both previous items describe work that has
        // since been done. TODO — Akhmad to supply two forward-looking items.
        items: [] as string[],
      },
    },

    eyaqin: {
      name: "eYaqin",
      tagline: "Sotuvchining yaqinligi butun mohiyat bo'lgan ikkinchi qo'l bozori.",
      summary:
        "Mahalla birinchi o'rinda turadigan C2C bozor. Veb, iOS va Android uchun uch oyda yakka qurildi: sxema, API, real vaqtli chat, moderatsiya vositalari va deploy.",
      role: "Full-stack · yakka",
      problem: {
        title: "Muammo",
        body: "Ikkinchi qo'l narsa olish degani — butun mamlakat bo'ylab lentani aylantirib, keyin deyarli hech narsa turmaydigan buyum uchun shaharni kesib o'tish degani edi. Masofa ko'rsatilmasdi, saralanmasdi, lekin savdo arziydimi-yo'qmi — buni hal qiladigan yagona fakt aynan shu edi. Joylashuvni «qo'llasa bo'ladigan filtr» deb qaraydigan bozor, uni «saralash tartibi» deb qaraydigan bozordan butunlay boshqa muammoni yechayotgan bo'ladi.",
      },
      decisions: {
        title: "Ahamiyatli qarorlar",
        items: [
          {
            title: "Joylashuv — matn emas, jadval",
            body: "Viloyatlar va tumanlar — 14 va 179 ta seed qatori, o'zaro haqiqiy bog'lanishlari bilan. E'longa yoziladigan erkin matn emas. Aynan shu bitta tanlov «mening mahallam», «mening tumanim» va «N kilometr ichida» degan uchta narsani uchta alohida funksiya emas, bitta so'rovning uchta chegarasiga aylantiradi — va lentani shunchaki filtrlash o'rniga yaqinlik bo'yicha saralash mumkin bo'ladi.",
          },
          {
            title: "Boolean emas, beshta holat",
            body: "E'lon active → reserved → escrow_verification → sold → hidden bo'ylab harakatlanadi. is_sold booleani xaridor uchun ushlab turilgan buyumni ham, nizoli to'lovni ham, moderatsiya olib qo'ygan e'lonni ham ifodalay olmaydi — natijada interfeys javobni o'zi to'qib chiqarishga majbur bo'ladi. O'tishlar server tomonida tekshiriladi, ya'ni klient e'lonni biznesda mavjud bo'lmagan holatga qo'ya olmaydi.",
          },
          {
            title: "Obro' — ikkala tomon ko'radigan raqam",
            body: "Har bir savdogarning muomala harorati bor; u yakunlangan savdolar va sharhlar bilan qimirlaydi va hech kim ochmaydigan profil ichida emas, e'londa ism yonida turadi. Sotuv faqat sharh yozilgandan keyin tasdiqlanadi, ya'ni ko'p savdo qilib, hech qachon baholanmay raqamni shishirib bo'lmaydi.",
          },
          {
            title: "Moderatsiya aralashadigan bitta joy",
            body: "Shikoyatlar, moderatsiya belgilari va rate-limit hodisalari — administratorning pochtasi emas, to'laqonli jadvallar. C2C platformada ishonch va xavfsizlik — suiiste'mol paydo bo'lgandan keyin qo'shiladigan funksiya emas; bu sxemada yo bor, yo yo'q bo'lgan shakl.",
          },
        ],
      },
      outcome: {
        title: "Natija",
        body: "Deploy qilingan va ishlayapti: joylashuvga bog'liq qidiruv, e'lonning to'liq hayotiy sikli, o'qilgan belgisi bilan real vaqtli xaridor–sotuvchi chati, yoqtirish va saqlash, shikoyat va moderatsiya, sessiya va profil boshqaruvi. Veb, iOS va Android uchun uch oyda yakka, Next.js va Prisma ustida PostgreSQL bilan qurilgan; har bir branch uchun preview build va muhitlarga ajratilgan ma'lumotlar bazasi branchlari — shunda sxema migratsiyasi productionni o'zi bilan olib keta olmaydi. Keyinchalik production ma'lumotlar bazasi sig'im muddati ostida Neon'dan Supabase'ga ko'chirildi — bironta ham yozuv yo'qolmadi.",
      },
      next: {
        title: "Keyin nima qilardim",
        items: [
          "Rasmlarni ilova orqali uzatish o'rniga, imzolangan URL'lar bilan object storage'ga ko'chirardim.",
          "Qidiruv indeksini qo'shardim — e'lonlar soni ketma-ket skanni o'sib o'tganda radius so'rovlari tez qolsin.",
        ],
      },
    },

    smartguard: {
      name: "SmartGuard",
      tagline: "Yozuvni ko'rishni tashlagan do'konlar uchun o'zini o'zi o'qiydigan CCTV.",
      summary:
        "Kameralarni real vaqtda kuzatib, egasiga Telegram orqali surat va izoh bilan ogohlantirish yuboradigan AI nazorat platformasi. Ishlab turgan ikki obyektda sakkizta kamera jonli.",
      role: "Full-stack va vision quvuri · yakka",
      problem: {
        title: "Muammo",
        body: "Kichik do'kon mol yo'qotadi va buni isbotlash uchun o'n to'rt soatlik yozuvi qoladi. O'n to'rt soatni ko'radigan odam yo'q. Kameralar allaqachon o'rnatilgan va allaqachon yozayotgan edi — yetishmayotgani ko'proq video emas, uni ko'rib beradigan odam edi, va bitta do'kon bunday odamni yollay olmaydi.",
      },
      decisions: {
        title: "Ahamiyatli qarorlar",
        items: [
          {
            title: "Videoni modelga yubormaslik",
            body: "Eng ko'rinib turgan yechim — kadrlarni vision modelga uzatish; natijada hech bir mahalla do'koni to'lay olmaydigan hisob keladi. Buning o'rniga quvur ikki qavatli: OpenCV harakat va odam aniqlash har bir kadrni joyida qayta ishlaydi va faqat nomzod kalit kadrlarnigina Claude Vision'ga uzatadi. Butun gap shunda — inference narxi 100 barobardan ko'proq tushdi, va demo bilan do'kon haqiqatan yurita oladigan narsa orasidagi farq aynan shu.",
          },
          {
            title: "Do'kon egasi tekshira oladigan qoidalar",
            body: "Ega zonalarni belgilaydi — kassa, javon, chiqish. Aniqlashlar esa ular orasidagi yo'llar haqida: kassadan o'tmasdan chiqish zonasiga yetdi, ish vaqtidan tashqari harakat, bir joyda ikki daqiqa turib qolish. Har biri — ega o'qib, e'tiroz bildira oladigan gap. Bu do'konda hech kim eshitmagan benchmarkdagi ko'rsatkichdan ancha muhimroq.",
          },
          {
            title: "Chiqish — lenta emas, qaror",
            body: "Ogohlantirish Telegram'ga surat va egasining o'z tilida ikki-to'rt gaplik izoh bilan keladi, konsol esa aniq ikkita tugma beradi: haqiqiy hodisa yoki yolg'on signal. Tizimni aynan o'sha do'konga moslab yaxshilaydigan yagona narsa — shu qaytar aloqa.",
          },
          {
            title: "Chegarani mahsulotning o'zida aytish",
            body: "Futer oddiy til bilan aytadi: tizim xulosasi yuridik dalil emas, yakuniy qaror doim insonda. Buni aytmaydigan nazorat mahsuloti — bajara olmaydigan va'da berayotgan bo'ladi.",
          },
        ],
      },
      outcome: {
        title: "Natija",
        body: "Ikki obyektda — bitta do'kon va bitta avtoservis markazida — sakkizta kamera olti hafta davomida qarovsiz ishladi va egalariga Telegram orqali oltita haqiqiy hodisani yetkazdi. Ko'p oqimli workerlar uzluksiz oqimni qayta ishlaydi va ogohlantirish soniyadan kam vaqtda tayyorlanadi; har qanday ONVIF yoki RTSP kamera ishlaydi, ya'ni ikkala obyekt ham jihozini almashtirishi shart bo'lmadi. Oldida React 18, ortida Python va FastAPI, hodisalar uchun PostgreSQL, deploy Docker bilan.",
      },
      next: {
        title: "Keyin nima qilardim",
        items: [
          "Operatorning haqiqiy/yolg'on belgilaridan foydalanib, har bir do'kon uchun chegaralarni qo'lda emas, avtomatik sozlardim.",
          "Kalit kadrlar to'plamini navbat ortiga o'tkazardim — tarmoq uzilganda ogohlantirish yo'qolmay, kechiksin.",
        ],
      },
    },

    "eyaqin-mobile": {
      name: "eYaqin Mobile",
      tagline: "O'sha bozor, lekin savdo haqiqatan sodir bo'ladigan joyda.",
      summary:
        "eYaqin'ning React Native'dagi native klienti. Ikkinchi qo'l savdo telefonda, notanish odamlar orasida bo'ladi — shuning uchun yuklash tezligi ham, ishonch ham o'sha yerda bo'lishi kerak edi.",
      role: "Mobil · yakka",
      problem: {
        title: "Muammo",
        body: "Veb ilova g'oyani isbotladi, lekin bozor ishlaydimi-yo'qmi degan savolni hal qiladigan ikkala lahza ham telefon lahzasi: buyumni sotiladigan darajada yaxshi suratga olish va notanish odam bilan uchrashishga qaror qilish. Responsive sayt birinchisini yomon bajaradi, ikkinchisini esa deyarli umuman bajara olmaydi — arziydigan kamera ham, push ham, uni ikkinchi marta ochish uchun sabab ham yo'q.",
      },
      decisions: {
        title: "Ahamiyatli qarorlar",
        items: [
          {
            title: "Native — faqat o'zini oqlagan joyda",
            body: "Kamera va galereyadan yuklash, push bildirishnomalar, geolokatsiya va native ulashish — bu narsaning xatcho'p emas, ilova bo'lish sababi. Qolgani — lenta, filtrlar, e'lon sahifalari — veb bilan bir xil mahsulot; TanStack Query orqali tipli endpointlar birga ishlatiladi, shunda ikki klient bir-biridan uzoqlashib keta olmaydi.",
          },
          {
            title: "Ishonch yakunlash oqimining ichida",
            body: "Sharh yozilmaguncha savdo yakunlangan deb belgilanmaydi, va o'sha sharh sotuvchining muomala haroratini qimirlatadi. Bu obro' tizimini yon tomonga emas, kritik yo'lning ustiga qo'yadi — C2C ilovada baholash tizimi umuman ishlatilishining yagona yo'li shu.",
          },
          {
            title: "Mahalla — mahsulotning bir qismi",
            body: "Aholi mahalliy so'rovlar joylaydi va yaqin atrofdan ish topadi, e'lonlar bilan bitta ilovada. Mahalla bozorini ishlatadigan narsa mol miqdori emas — undagi odamlarning bir-biri bilan gaplashishga allaqachon sabablari borligi.",
          },
          {
            title: "Qaytar aloqa kanali — bu mahsulot tadqiqoti",
            body: "Tuzilgan takliflar kanali ilovaning ichiga qurilgan. Bu yakka dasturchi uchun eng arzon tadqiqot asbobi, va rejalar ro'yxati taxmin bo'lishdan shu tufayli to'xtadi.",
          },
        ],
      },
      outcome: {
        title: "Natija",
        body: "15 foydalanuvchi bilan yopiq testda; Expo SDK 54 va Expo Router v6 ustida, ortida Supabase turgan umumiy REST va WebSocket backend, jonli chat hodisalari uchun Socket.io, interaktsiyalar uchun Reanimated. Real vaqtli chat, kameradan yuklash, mahalla postlari, muomala harorati va sharh orqali yopiladigan savdo — hammasi ichida.",
      },
      next: {
        title: "Keyin nima qilardim",
        items: [
          "Offline-first e'lon qoralamalari — aloqasiz joyda olingan surat yo'qolgan surat bo'lib qolmasin.",
          "Push bildirishnomalarni suhbat bo'yicha guruhlash — bildirishnoma paneli ilovani o'chirish sababiga aylanmasidan oldin.",
        ],
      },
    },
  },
};
