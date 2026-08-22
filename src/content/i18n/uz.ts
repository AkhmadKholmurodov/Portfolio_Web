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
      "Janubiy Koreyada production darajasidagi veb-platformalar quraman, ular ishlaydigan serverlarni o'zim yurituraman va o'z kodimdagi teshikni boshqalardan oldin o'zim topaman. Next.js, React Native, Python, Docker. E-7 vizasi, Seulda ish qidirmoqdaman.",
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
    break: "Sindirish",
    about: "Men haqimda",
    contact: "Bog'lanish",
    resume: "Rezyume",
    work: "Ishlar",
  },

  hero: {
    label: "Full-stack va WebOps muhandisi · Janubiy Koreya",
    line1: "Men mahsulotni quraman.",
    line2: "Serverni o'zim yurituraman.",
    line3: "Ikkalasini birinchi o'zim sindiraman.",
    lead: "Koreyada uch yildan beri production platformalar chiqaraman. Hozir ikkovlon bir kompaniyaning e-commerce stack'ini quramiz va yuritamiz.",
    ctaWork: "Ishlarni ko'rish",
    ctaResume: "Rezyumeni yuklab olish",
    availability: "Seulda ish qidirmoqdaman",
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
    title: "Men ticket emas, butun mahsulot chiqaraman.",
    lead: "Sxemadan deploygacha. Uchtasi hozir haqiqiy foydalanuvchilar oldida ishlayapti.",
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
      stage: "Bosqich",
    },
  },

  run: {
    label: "02 — Yuritish",
    title: "Chiqarish — oson qismi.",
    lead: "Ishlamayotgan platforma — platforma emas. Deploy, to'lov sinxronizatsiyasi va ostidagi Linux serverlar — javobgarligi menda.",
    timeline: "Yo'l",
    present: "Hozir",
  },

  experience: {
    sambu: {
      company: "SAMBU Co., Ltd.",
      role: "Full-Stack va WebOps muhandisi",
      context: "O'z D2C kanalini yurituvchi ishlab chiqarish va savdo kompaniyasi",
      bullets: [
        "lowshop.net'ni loyihaladim, qurdim va yurituraman — frontenddan server operatsiyalarigacha.",
        "Coupang va Naver SmartStore'da kompaniya do'konlarini ishga tushirdim va yurituraman.",
        "To'lov va qoldiq sinxronizatsiyasini qayta qurdim — savdo quvuri endi hech kimning qo'lisiz ishlaydi.",
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
    label: "03 — Sindirish",
    title: "O'zim topganim afzal.",
    lead: "Muharrir yonida hujumchining ro'yxati ochiq turadi. Mashq qiladigan toifalarim — aynan o'z kodimni ko'zdan kechirganda qaraydigan toifalar.",
    items: {
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

  stack: {
    label: "Asboblar",
    title: "Nimalarga qo'l uraman",
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
    label: "04 — Bog'lanish",
    title: "Gaplashaylik.",
    lead: "Seulda full-stack yoki platforma muhandisi ishini qidiryapman. E-7 vizam bor — homiylik shart emas. Koreys, ingliz yoki o'zbek.",
    emailCta: "Xat yozing",
    resumeCta: "Rezyumeni yuklab olish (PDF)",
    responseTime: "Xatlarga bir kun ichida javob beraman.",
  },

  footer: {
    built:
      "Next.js, GSAP va canvas bilan qurilgan. Shriftlar — Inter Tight va Geist Mono.",
    rights: "Barcha huquqlar himoyalangan.",
  },

  about: {
    label: "Men haqimda",
    title: "Qashqadaryodan Gyeongbukgacha — rendering bo'lmagan bitta Flutter kodbazasi orqali.",
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
    awardsTitle: "Klaviaturadan tashqarida",
    awardsNote:
      "Stol tennisini musobaqa darajasida o'ynayman. Qiladigan ishlarim ichida hisobni boshqa odam yuritadigan yagonasi shu.",
    awards: {
      openChampionship1: "Ochiq milliy stol tennisi chempionati — 1-o'rin",
      championsLeague: "Stol tennisi Chempionlar ligasi — 1-o'rin",
      openChampionship2: "Ochiq milliy stol tennisi chempionati — 2-o'rin",
    },
    place: "Janubiy Koreyada yashayman · Seulda ish qidiryapman",
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
        title: "Muammo",
        body: "SAMBU ishlab chiqaradi va sotadi. Koreyada sotish degani — Coupang va Naver SmartStore orqali sotish degani: ikkita admin konsoli, ikkita mahsulot sxemasi va narx nima ekani haqida ikkita tasavvur. Kompaniya bunga qo'shimcha o'z do'konini ham xohladi, ya'ni bitta mahsulotning qoldig'i, narxi va tavsifi uch joyda bir xil turishi kerak. Uch joyni qo'lda bir xil ushlab turadigan odam yo'q edi.",
      },
      decisions: {
        title: "Ahamiyatli qarorlar",
        items: [
          {
            title: "Butun hayotiy sikl ikki odamda",
            body: "Ikkovlon frontendni ham, API'ni ham, serverni ham o'zimiz ushlab turamiz. Ataylab shunday: sekin sahifani tez qilishning eng qisqa yo'li — komponentni ham, uni uzatayotgan mashinani ham jamoa chegarasidan ticket o'tkazmasdan o'zgartira olish.",
          },
          {
            title: "Sinxronizatsiyada odam yo'q",
            body: "To'lov va ma'lumot sinxronizatsiyasi jarayonlari qayta qurildi — endi savdo quvuri hech kim hech narsa bosmasa ham ishlaydi. Savdo quvuridagi qo'lbola qadam — bu jarayon emas, bu bayram kunini kutib turgan uzilish.",
          },
          {
            title: "Funksiyalardan oldin monitoring",
            body: "Sentry, Cafe24 server loglari va Slack ogohlantirishlari erta qo'yildi. Savdo kanali javob bermay qolganini mijozdan eshitadigan bo'lsangiz, sizda platforma emas — sayt va telefon raqami bor, xolos.",
          },
        ],
      },
      outcome: {
        title: "Natija",
        body: "Uch kanal bo'ylab kuniga taxminan 2,500 buyurtma quvurdan o'tadi, 설날 va 추석 sovg'a-to'plam kunlarida esa 5,000–6,000 tagacha ko'tariladi. Sinxronizatsiya qayta qurilganidan buyon o'z do'kon bilan ikki marketplace narx borasida bir marta ham qarama-qarshi kelmadi.",
      },
      next: {
        title: "Keyin nima qilardim",
        items: [
          "Kanal sinxronizatsiyasini dead-letter'li navbatga o'tkazardim — shunda marketplace API'sining uzilishi sinxronizatsiyani yo'qotmay, kechiktiradi.",
          "Har bir kanal uchun solishtiruv hisobotini qo'shardim — nomuvofiqlikni mijoz emas, rejalashtirilgan vazifa topsin.",
        ],
      },
    },

    eyaqin: {
      name: "eYaqin",
      tagline: "Sotuvchining yaqinligi butun mohiyat bo'lgan ikkinchi qo'l bozori.",
      summary:
        "Mahalla birinchi o'rinda turadigan C2C bozor. Yakka qurildi: sxema, API, real vaqtli chat, moderatsiya vositalari va deploy.",
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
        body: "Deploy qilingan va ishlayapti: joylashuvga bog'liq qidiruv, e'lonning to'liq hayotiy sikli, o'qilgan belgisi bilan real vaqtli xaridor–sotuvchi chati, yoqtirish va saqlash, shikoyat va moderatsiya, sessiya va profil boshqaruvi. Next.js va Prisma ustida PostgreSQL bilan yakka qurilgan; har bir branch uchun preview build va muhitlarga ajratilgan ma'lumotlar bazasi branchlari — shunda sxema migratsiyasi productionni o'zi bilan olib keta olmaydi.",
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
        "Do'kon kameralarini real vaqtda kuzatib, egasiga Telegram orqali surat va izoh bilan ogohlantirish yuboradigan AI nazorat platformasi. Ishlab turgan do'konda jonli.",
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
        body: "Do'konda productionda ishlayapti: ko'p oqimli workerlar uzluksiz kamera oqimini qayta ishlaydi va ogohlantirish soniyadan kam vaqtda tayyorlanadi. Har qanday ONVIF yoki RTSP kamera ishlaydi, ya'ni do'kon jihozini almashtirishi shart bo'lmadi. Oldida React 18, ortida Python va FastAPI, hodisalar uchun PostgreSQL, deploy Docker bilan.",
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
        body: "Expo SDK 54 va Expo Router v6 ustida faol ishlanmoqda; ortida Supabase turgan umumiy REST va WebSocket backend, jonli chat hodisalari uchun Socket.io, interaktsiyalar uchun Reanimated. Real vaqtli chat, kameradan yuklash, mahalla postlari, muomala harorati va sharh orqali yopiladigan savdo — hammasi ichida.",
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
