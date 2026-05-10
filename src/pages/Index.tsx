import { useEffect, useState } from "react";
import heroImg from "@/assets/ramen-hero.webp";
import interior2Img from "@/assets/ramen-interior-2.webp";
import spreadImg from "@/assets/ramen-spread.webp";
import bentoImg from "@/assets/ramen-bento.webp";
import dessertImg from "@/assets/dessert.webp";
import { MapPin, Clock, Star, Phone, ChevronRight, Mail, Navigation, Languages } from "lucide-react";

type Lang = "en" | "hu";

const t = {
  en: {
    nav: { story: "Story", menu: "Menu", reviews: "Reviews", visit: "Visit", reserve: "Reserve" },
    hero: {
      kicker: "Budapest · Káldy Gyula u. 5",
      title1: "A bowl",
      titleEm: "worth",
      title2: "the journey.",
      sub: "Slow-simmered broths, hand-pulled noodles, and the quiet ritual of Japan — in the heart of Budapest.",
      cta1: "Explore the Menu",
      cta2: "Plan your visit",
      scroll: "Scroll",
    },
    story: {
      kicker: "— Our Story",
      title1: "Twelve hours of broth.",
      titleEm: "A lifetime of intent.",
      p1: "At Yume 7, every bowl begins long before service. Bones simmer overnight, noodles are pulled by hand each morning, and tare is balanced as carefully as a poem.",
      p2: "We are a small Japanese kitchen in the heart of Budapest — spacious, calm, and devoted to the slow craft of ramen. A place to pause, to taste, to dream.",
      stat1: "Google rating",
      stat2: "Reviews",
      stat3: "Mon–Sat · 12:00 – 22:00",
      space: "Of space",
    },
    menu: {
      kicker: "— The Menu",
      title1: "Crafted with care.",
      titleEm: "Every detail considered.",
      jp: "本日のお品書き",
      sections: {
        ramen: "Ramen",
        rice: "Rice Dishes",
        fried: "Fried Dishes",
        cold: "Cold Dishes",
        snow: "Snowice",
        tea: "Milk Tea",
        juice: "Homemeade Fruit Juices",
        cold_drinks: "Cold Beverage",
        hot_tea: "Hot Tea",
        beer: "Beer",
      },
      allergy: "Please inform our staff of any allergies. Dishes may contain traces of allergens.",
      noService: "No service charge",
    },
    reviews: {
      kicker: "— In Their Words",
      title1: "stars.",
      titleEm: "voices.",
    },
    visit: {
      kicker: "— Visit",
      title1: "Find us in the",
      titleEm: "heart of Budapest.",
      address: "Address",
      district: "1066 — Terézváros",
      hours: "Hours",
      hoursVal: "Mon – Sat · 12:00 – 22:00",
      hoursNote: "Closed Sunday",
      contact: "Contact",
      walkin: "Walk-ins welcome",
      groups: "Groups of 6+ — please call ahead",
      directions: "Get Directions",
      call: "Call us",
      mail: "Email",
    },
    days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    open: "Open now",
    closed: "Closed",
  },
  hu: {
    nav: { story: "Rólunk", menu: "Étlap", reviews: "Vélemények", visit: "Látogass el", reserve: "Foglalás" },
    hero: {
      kicker: "Budapest · Káldy Gyula u. 5",
      title1: "Egy tál, amiért",
      titleEm: "érdemes",
      title2: "eljönni.",
      sub: "Lassan főzött alaplevek, kézzel nyújtott tészták, és Japán csendes rituáléja — Budapest szívében.",
      cta1: "Étlap megtekintése",
      cta2: "Tervezd meg a látogatást",
      scroll: "Görgess",
    },
    story: {
      kicker: "— Történetünk",
      title1: "Tizenkét óra alaplé.",
      titleEm: "Egy élet odaadás.",
      p1: "A Yume 7-ben minden tál jóval a felszolgálás előtt kezdődik. A csontok egész éjjel főnek, a tésztát reggelente kézzel nyújtjuk, a tare-t pedig úgy hangoljuk, mint egy verset.",
      p2: "Kis japán konyha vagyunk Budapest szívében — tágas, nyugodt hely, a ramen lassú mesterségének elkötelezve. Egy hely, ahol megállhatsz, ízlelhetsz, álmodhatsz.",
      stat1: "A Google-ön",
      stat2: "Vélemény",
      stat3: "H–Szo · 12:00 – 22:00",
      space: "Tágas tér",
    },
    menu: {
      kicker: "— Az Étlap",
      title1: "Gondossággal készítve.",
      titleEm: "Minden részlet számít.",
      jp: "本日のお品書き",
      sections: {
        ramen: "Ramen",
        rice: "Rice Dishes",
        fried: "Fried Dishes",
        cold: "Cold Dishes",
        snow: "Hópehely Jégdesszert",
        tea: "Tejes Tea",
        juice: "Házi Gyümölcs Tea",
        cold_drinks: "Hideg Italok",
        hot_tea: "Forró Tea",
        beer: "Sörök",
      },
      allergy: "Kérjük, tájékoztassa a személyzetet bármilyen allergiáról. Az ételek tartalmazhatnak allergéneket nyomokban.",
      noService: "Nincs szervizdíj",
    },
    reviews: {
      kicker: "— A Vendégek Szavaival",
      title1: "csillag.",
      titleEm: "vélemény.",
    },
    visit: {
      kicker: "— Látogass el",
      title1: "Megtalálsz minket",
      titleEm: "Budapest szívében.",
      address: "Cím",
      district: "1066 — Terézváros",
      hours: "Nyitvatartás",
      hoursVal: "H – Szo · 12:00 – 22:00",
      hoursNote: "Vasárnap zárva",
      contact: "Kapcsolat",
      walkin: "Bejelentkezés nélkül is várunk",
      groups: "6+ fős csoport esetén kérjük, hívj előre",
      directions: "Útvonalterv",
      call: "Hívj minket",
      mail: "E-mail",
    },
    days: ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"],
    open: "Most nyitva",
    closed: "Zárva",
  },
} as const;

const useNow = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const isOpenNow = (d: Date) => {
  // Mon-Sat 12-22, Sunday closed. JS getDay: 0 Sun..6 Sat
  const day = d.getDay();
  const h = d.getHours();
  if (day === 0) return false;
  return h >= 12 && h < 22;
};

const Nav = ({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const L = t[lang];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-display text-3xl tracking-tight text-foreground">Yume</span>
          <span className="text-primary font-display text-3xl">7</span>
          <span className="font-jp text-xs text-muted-foreground ml-1 hidden sm:inline">夢七</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase text-foreground/80">
          <li><a href="#story" className="hover:text-primary transition">{L.nav.story}</a></li>
          <li><a href="#menu" className="hover:text-primary transition">{L.nav.menu}</a></li>
          <li><a href="#reviews" className="hover:text-primary transition">{L.nav.reviews}</a></li>
          <li><a href="#visit" className="hover:text-primary transition">{L.nav.visit}</a></li>
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "hu" : "en")}
            className="inline-flex items-center gap-2 px-3 py-2 border border-border text-foreground/80 text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === "en" ? "HU" : "EN"}
          </button>
          <a
            href="#visit"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {L.nav.reserve}
          </a>
        </div>
      </nav>
    </header>
  );
};

const Hero = ({ lang }: { lang: Lang }) => {
  const L = t[lang].hero;
  return (
  <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Steaming bowl of authentic tonkotsu ramen at Yume 7"
        width={1920}
        height={1080}
        className="w-full h-full object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-warm)" }} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-lantern)" }} />
    </div>

    {/* Steam */}
    <div className="absolute left-1/2 top-1/3 -translate-x-1/2 pointer-events-none">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute block w-2 h-2 rounded-full bg-cream/40 blur-md animate-steam"
          style={{ left: `${i * 14 - 20}px`, animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </div>

    <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-24">
      <div className="hidden md:flex absolute right-10 top-32 vertical-jp font-jp text-sm tracking-[0.5em] text-cream/40">
        本格的な日本のラーメン
      </div>
      <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6 animate-fade-up">
        {L.kicker}
      </p>
      <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-foreground max-w-5xl text-balance animate-fade-up" style={{ animationDelay: "0.15s" }}>
        {L.title1} <em className="italic text-primary/90">{L.titleEm}</em> {L.title2}
      </h1>
      <p className="mt-8 max-w-xl text-foreground/70 text-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
        {L.sub}
      </p>
      <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
        <a href="#menu" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-primary transition">
          {L.cta1} <ChevronRight className="w-4 h-4" />
        </a>
        <a href="#visit" className="inline-flex items-center gap-3 px-7 py-4 text-sm tracking-[0.25em] uppercase text-foreground border border-foreground/30 hover:border-foreground transition">
          {L.cta2}
        </a>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-foreground/40">
      {L.scroll}
    </div>
  </section>
);
};

const Marquee = () => (
  <div className="border-y border-border bg-card overflow-hidden">
    <div className="flex gap-16 py-6 whitespace-nowrap animate-[marquee_40s_linear_infinite] font-display text-2xl text-muted-foreground italic">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="flex items-center gap-16">
          Tonkotsu <span className="text-primary">✦</span> Shoyu <span className="text-primary">✦</span> Miso <span className="text-primary">✦</span> Spicy Tan-Tan <span className="text-primary">✦</span> Matcha <span className="text-primary">✦</span>
        </span>
      ))}
    </div>
    <style>{`@keyframes marquee { from { transform: translateX(0)} to { transform: translateX(-50%) } }`}</style>
  </div>
);

const Story = ({ lang }: { lang: Lang }) => { const L = t[lang].story; return (
  <section id="story" className="relative py-32 lg:py-44 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={interior2Img}
            alt="Yume 7 dining room with paper lanterns"
            loading="lazy"
            width={1536}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-background border border-border px-6 py-5 shadow-[var(--shadow-deep)]">
          <div className="font-display text-5xl text-primary leading-none">200<span className="text-2xl">㎡</span></div>
          <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-2">{L.space}</div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">{L.kicker}</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          {L.title1}<br />
          <em className="italic text-muted-foreground">{L.titleEm}</em>
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-10 text-foreground/75 leading-relaxed">
          <p>{L.p1}</p>
          <p>{L.p2}</p>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          {([
            ["4.9", L.stat1],
            ["56", L.stat2],
            [lang === "hu" ? "H–Szo" : "Mon–Sat", "12:00 – 22:00"],
          ] as const).map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-foreground inline-flex items-center gap-2 whitespace-nowrap">{n} {n=="4.9" && <Star className="w-6 h-6 fill-current shrink-0" />}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
); };

type Dish = { name: { en: string; hu: string }; jp?: string; desc?: { en: string; hu: string }; price: string; tag?: { en: string; hu: string } };
type MenuSection = { key: keyof typeof t.en.menu.sections; items: Dish[] };

const menuData: MenuSection[] = [
  {
    key: "ramen",
    items: [
      { name: { en: "Tonkotsu Black Garlic", hu: "Tonkotsu Black Garlic" }, jp: "豚骨黒マー油", desc: { en: "Rich Tonkotsu broth with chashu, egg, bamboo, narutomaki, nori, scallions & black garlic oil.", hu: "Gazdag tonkotsu alaplé chashuval, tojással, narutomakival, bambusszal, újhagymával és fekete fokhagymaolajjal." }, price: "4 490" },
      { name: { en: "Jiro-Style Tonkotsu Garlic Ramen", hu: "Jiro-Style Tonkotsu Garlic Ramen" }, jp: "豚骨ベースの二郎系", desc: { en: "Rich Tonkotsu broth, chashu, egg, cabbage, kakuni, bean sprouts, crispy fried onions, nori, scallions & garlic.", hu: "Gazdag tonkotsu alaplé chashuval, tojással, káposztával, babcsírával, kakunival, ropogós sült hagymával, norival, újhagymával és fokhagymával." }, price: "5 490", tag: { en: "Signature", hu: "Specialitás" } },
      { name: { en: "Paitan Chicken Wanton", hu: "Paitan Chicken Wanton" }, jp: "鶏白湯ワンタン", desc: { en: "Paitan broth with chicken wantons, egg, corn, shiitake, cherry tomatoes, nori, scallions & aroma oil.", hu: "Paitan alaplé csirke wontonnal, tojással, kukoricával, shiitakével, koktélparadicsommal, norival, újhagymával és aromás olajjal." }, price: "4 990" },
      { name: { en: "Buttercorn Creamy Miso", hu: "Buttercorn Creamy Miso" }, jp: "バターコーン味噌", desc: { en: "Rich Tonkotsu miso broth with pork mince, egg, edamame, corn, scallions, nori & butter.", hu: "Gazdag tonkotsu miso alaplé darált sertéshússal, tojással, edamaméval, kukoricával, újhagymával, norival és vajjal." }, price: "4 490" },
      { name: { en: "Tonkotsu Sesame Miso", hu: "Tonkotsu Sesame Miso" }, jp: "豚骨胡麻味噌", desc: { en: "Rich sesame Tonkotsu miso broth with chashu, egg, kimchi, bamboo, nori, scallions & rayu (chili oil).", hu: "Gazdag szezámos tonkotsu miso alaplé chashuval, tojással, kimchivel, bambusszal, norival, újhagymával és rayuval (csiliolaj)." }, price: "4 490", tag: { en: "Spicy", hu: "Csípős" } },
      { name: { en: "Sesame Spicy Dan Dan", hu: "Sesame Spicy Dan Dan" }, jp: "黒ごま辛味担々麺", desc: { en: "Soy milk broth with spicy beef, edamame, shiitake, cherry tomatoes, peanuts, black sesame, nori, scallions & rayu.", hu: "Szójatejes alaplé csípős marhahússal, edamaméval, shiitakével, koktélparadicsommal, mogyoróval, fekete szezámmal, norival, újhagymával és rayuval." }, price: "4 490", tag: { en: "Extra Spicy", hu: "Extra Csípős" } },
      { name: { en: "Yume Red Rāmen / Tossed", hu: "Yume Red Rāmen / Tossed" }, jp: "夢の辛味赤ラーメン / まぜそば", desc: { en: "Shoyu broth with kakuni (braised pork), cabbage, shiitake, bean sprouts, nori, garlic, scallions & rayu.", hu: "Shoyu alaplé kakunival (párolt sertés), káposztával, shiitakével, babcsírával, norival, fokhagymával, újhagymával és rayuval." }, price: "4 490", tag: { en: "Ultra Spicy", hu: "Ultra Csípős" } },
      { name: { en: "Vegetable Soymilk Miso", hu: "Vegetable Soymilk Miso" }, jp: "野菜豆乳味噌", desc: { en: "Soy milk broth with tofu, shiitake, corn, edamame, lotus root, nori, scallions, fried garlic & sesame oil.", hu: "Szójatejes alaplé tofuval, shiitakével, kukoricával, edamaméval, lótuszgyökérrel, norival, újhagymával, sült fokhagymával és szezámolajjal." }, price: "4 990", tag: { en: "Vegan", hu: "Vegán" } },
    ],
  },
  {
    key: "rice",
    items: [
      { name: { en: "Tonkatsu Set", hu: "Tonkatsu Set" }, jp: "とんかつ定食", desc: { en: "Tonkatsu, mixed greens with sesame dressing, tomato, lemon, rice & miso soup.", hu: "Tonkatsu, vegyes zöldsaláta szezámos öntettel, paradicsom, citrom, rizs és miso leves." }, price: "4 490" },
      { name: { en: "Tonkatsu Curry", hu: "Tonkatsu Curry" }, jp: "カツカレー", desc: { en: "Tonkatsu dressing lemon tartar sauce, curry with potatoes, carrots, rice & miso soup.", hu: "Tonkatsu citromos tartármártással, curry burgonyával, sárgarépával, rizzsel és miso levessel." }, price: "4 990" },
      { name: { en: "Braised Pork Rice Set", hu: "Braised Pork Rice Set" }, jp: "ルーローファン定食", desc: { en: "Braised pork with egg, edamame, nori, katsuobushi, rice & miso soup.", hu: "Párolt sertés tojással, edamaméval, norival, katsuobushival, rizzsel és miso levessel." }, price: "4 490" },
    ],
  },
  {
    key: "fried",
    items: [
      { name: { en: "Gyoza (6 pcs)", hu: "Gyoza (6 db)" }, jp: "鶏 / 野菜餃子", desc: { en: "Chicken / Vegan", hu: "Csirkés / Vegán" }, price: "1 990" },
      { name: { en: "Tempura Shrimp (6 pcs)", hu: "Tempura Shrimp (6 db)" }, jp: "えび天ぷら", desc: { en: "", hu: "Tempura Garnéla" }, price: "1 990" },
      { name: { en: "Spring Rolls Shrimp (4 pcs)", hu: "Spring Rolls Shrimp (4 db)" }, jp: "えびの春巻き", desc: { en: "", hu: "Tavaszi Tekercs Garnélával" }, price: "1 990" },
      { name: { en: "Lobster Wanton Shrimp (4 pcs)", hu: "Lobster Wanton Shrimp (4 db)" }, jp: "えびワンタン",  desc: { en: "", hu: "Rántott Wonton Garnélával" },price: "1 990" },
      { name: { en: "Meatball Skewer Pork (4 pcs)", hu: "Meatball Skewer Pork (4 db)" }, jp: "豚団子串", desc: { en: "", hu: "Rántott Sertéshúsgolyó" }, price: "1 990" },
    ],
  },
  {
    key: "cold",
    items: [
      { name: { en: "Potato Bacon Salad", hu: "Potato Bacon Salad" }, jp: "ポテトベーコンサラダ", desc: { en: "Potato salad with carrots, gherkins, onion, black olives, bacon & creamy mayonnaise.", hu: "Burgonyasaláta sárgarépával, csemegeuborkával, hagymával, fekete olívával, baconnel és krémes majonézzel." }, price: "1 590" },
      { name: { en: "Kimchi", hu: "Kimchi" }, jp: "キムチ", desc: { en: "Spicy fermented cabbage.", hu: "Csípős erjesztett káposzta." }, price: "1 590" },
      { name: { en: "Wakame (Seaweed Salad)", hu: "Wakame" }, jp: "ワカメ", desc: { en: "", hu: "Japán Algasaláta" }, price: "1 290" },
      { name: { en: "Edamame", hu: "Edamame" }, jp: "枝豆", desc: { en: "Soybeans.", hu: "Szójabab." }, price: "1 290" },
    ],
  },
  {
    key: "snow",
    items: [
      { name: { en: "Mango", hu: "Mangó" }, jp: "マンゴー", price: "3 190" },
      { name: { en: "Matcha", hu: "Matcha" }, jp: "抹茶", price: "3 190", tag: { en: "Loved", hu: "Kedvenc" } },
      { name: { en: "Taro", hu: "Taro" }, jp: "タロイモ", price: "3 190" },
      { name: { en: "Brown Sugar", hu: "Barna Cukros" }, jp: "黒糖", price: "3 190" },
    ],
  },
  {
    key: "tea",
    items: [
      { name: { en: "Classic Boba", hu: "Klasszikus boba" }, price: "1 690" },
      { name: { en: "Taro Boba", hu: "Taro boba" }, price: "1 690" },
      { name: { en: "Brown Sugar", hu: "Barna cukros boba" }, price: "1 690" },
    ],
  },
  {
    key: "juice",
    items: [
      { name: { en: "Yume 7 (Salted Sparkling Lime)", hu: "Yume 7 (Sós szénsavas lime)" }, price: "1 490" },
      { name: { en: "Passion Fruit", hu: "Maracuja" }, price: "1 490" },
      { name: { en: "Mango", hu: "Mangó" }, price: "1 490" },
      { name: { en: "Litchi", hu: "Licsi" }, price: "1 490" },
      { name: { en: "Pomegranate", hu: "Gránátalma" }, price: "1 490" },
      { name: { en: "Grape", hu: "Szőlő" }, price: "1 490" },
    ],
  },
  {
    key: "cold_drinks",
    items: [
      { name: { en: "Mineral Water 500ml", hu: "Ásványvíz 500ml" }, desc: { en: "Still / Sparkling", hu: "Szénsavmentes / Szénsavas" }, price: "690" },
      { name: { en: "Cola", hu: "Cola" }, price: "890" },
      { name: { en: "Cola Zero", hu: "Cola Zero" }, price: "890" },
      { name: { en: "Fanta", hu: "Fanta" }, price: "890" },
      { name: { en: "Ginger Ale", hu: "Gyömbér" }, price: "890" },
      { name: { en: "Cappy", hu: "Cappy" }, price: "890" },
      { name: { en: "Milkis 250ml", hu: "Milkis 250ml" }, desc: { en: "Yogurt / Melon", hu: "Joghurt / Dinnye" }, price: "990" },
      { name: { en: "Rico Bubble Milk Tea ", hu: "Rico Buborékos Tej Tea" }, desc: { en: "Original / Thai / Brown Sugar / Honeydew", hu: "Eredeti / Thai / Barnacukor / Mézdinnye" }, price: "990" },
      { name: { en: "Chi Sparkling Water", hu: "Chi Szénsavas Víz" }, desc: { en: "Peach / Grape / Lychee", hu: "Őszibarack / Szőlő / Licsi" }, price: "990" },
      { name: { en: "OKF Sparkling Water", hu: "OKF Szénsavas Víz" }, desc: { en: "Grapefruit / Pineapple / Lime / Strawberry / Aloe / Grapes", hu: "Grapefruit / Ananász / Lime / Eper / Aloe / Szőlő" }, price: "990" },
    ],
  },
  {
    key: "hot_tea",
    items: [
      { name: { en: "Ginger Lemon", hu: "Gyömbér citrom" }, price: "690" },
      { name: { en: "Yuzu", hu: "Yuzu" }, price: "690" },
    ],
  },
  {
    key: "beer",
    items: [
      { name: { en: "Delirium Tremens 8.5%", hu: "Delirium Tremens 8.5%" }, price: "1 990" },
      { name: { en: "Delirium Red 8%", hu: "Delirium Red 8%" }, price: "2 490" },
      { name: { en: "Asahi 5%", hu: "Asahi 5%" }, price: "990" },
      { name: { en: "Somersby 4.5%", hu: "Somersby 4.5%" }, desc: { en: "Apple / Blueberry", hu: "Alma / Áfonya" }, price: "990" },
    ],
  },
];

const Menu = ({ lang }: { lang: Lang }) => { const L = t[lang].menu; return (
  <section id="menu" className="relative py-32 lg:py-44 bg-card border-y border-border">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
        <div>
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">{L.kicker}</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            {L.title1}<br /><em className="italic text-muted-foreground">{L.titleEm}</em>
          </h2>
        </div>
        <p className="font-jp text-muted-foreground text-sm tracking-widest">{L.jp}</p>
      </div>

      <div className="space-y-20">
        {menuData.map((section) => (
          <div key={section.key}>
            <div className="flex items-baseline gap-4 mb-8 border-b border-primary/30 pb-4">
              <h3 className="font-display text-3xl md:text-4xl text-primary">{L.sections[section.key]}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
              {section.items.map((d, i) => (
                <article
                  key={section.key + i}
                  className="group flex items-baseline gap-6 py-5 border-b border-border/60 hover:border-primary/40 transition"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h4 className="font-display text-2xl text-foreground group-hover:text-primary transition">{d.name[lang]}</h4>
                      {d.jp && <span className="font-jp text-sm text-muted-foreground">{d.jp}</span>}
                      {d.tag && (
                        <span className="text-[10px] tracking-[0.25em] uppercase text-primary border border-primary/40 px-2 py-0.5">
                          {d.tag[lang]}
                        </span>
                      )}
                    </div>
                    {d.desc && <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-md">{d.desc[lang]}</p>}
                  </div>
                  <div className="font-display text-xl text-foreground tabular-nums whitespace-nowrap">{d.price} Ft</div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-16 text-center text-muted-foreground text-sm max-w-2xl mx-auto italic">
        {L.allergy}
      </p>
      {/* <p className="mt-4 text-center text-primary text-xs tracking-[0.3em] uppercase">{L.noService}</p> */}

      <div className="mt-20 grid md:grid-cols-3 gap-6">
        <div className="relative aspect-[4/3] overflow-hidden grain">
          <img src={spreadImg} alt="A full ramen and side-dish spread at Yume 7" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden grain">
          <img src={bentoImg} alt="Tempura, spring rolls and boiled peanuts bento appetiser" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden grain">
          <img src={dessertImg} alt="Signature shaved-ice dessert with chocolate, red bean and ice cream" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
      </div>
    </div>
  </section>
); };

const reviews = [
  { name: "Xinyi Zhang", text: "Döbbenetesen jó a desszertjük! A matcha és a taro is fantasztikus volt — a kedvencem messze a matcha tiramisu.", rating: 5 },
  { name: "11 Kitto", text: "Örülök, hogy rátaláltunk a férjemmel erre az étteremre. Nagyon hangulatos a hely, kedves személyzet, kifogástalan ételek.", rating: 5 },
  { name: "Nyár", text: "Az egyik legjobb ramen, amit valaha ettem. A pincérnő különösen barátságos és figyelmes volt — őszintén ajánlom mindenkinek.", rating: 5 },
];

const Reviews = ({ lang }: { lang: Lang }) => { const L = t[lang].reviews; return (
  <section id="reviews" className="py-32 lg:py-44">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">{L.kicker}</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          <span className="text-primary">4.9</span> {L.title1}<br />
          <em className="italic text-muted-foreground">56 {L.titleEm}</em>
        </h2>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="relative bg-card border border-border p-10 hover:border-primary/40 transition group"
          >
            <span className="absolute -top-6 left-8 font-display text-7xl text-primary leading-none">"</span>
            <blockquote className="text-foreground/85 leading-relaxed text-[15px] mt-4">
              {r.text}
            </blockquote>
            <figcaption className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <span className="text-sm tracking-wide">{r.name}</span>
              <span className="flex gap-0.5 text-primary">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
); };

const Visit = ({ lang }: { lang: Lang }) => { const L = t[lang].visit; const now = useNow(); const open = isOpenNow(now); const today = (now.getDay() + 6) % 7; const days = t[lang].days; const hours = ["12:00 – 22:00","12:00 – 22:00","12:00 – 22:00","12:00 – 22:00","12:00 – 22:00","12:00 – 22:00", t[lang].closed]; return (
  <section id="visit" className="relative py-32 lg:py-44 bg-card border-t border-border overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      <div>
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">{L.kicker}</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          {L.title1}<br /><em className="italic text-primary">{L.titleEm}</em>
        </h2>

        <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 border border-border bg-background/50">
          <span className={`w-2 h-2 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-primary"}`} />
          <span className="text-xs uppercase tracking-[0.25em]">{open ? t[lang].open : t[lang].closed}</span>
        </div>

        <dl className="mt-10 space-y-10">
          <div className="flex gap-6">
            <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{L.address}</dt>
              <dd className="font-display text-2xl">Budapest, Káldy Gyula u. 5</dd>
              <dd className="text-muted-foreground text-sm mt-1">{L.district}</dd>
            </div>
          </div>

          <div className="flex gap-6">
            <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div className="flex-1">
              <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">{L.hours}</dt>
              <ul className="space-y-1.5 text-sm">
                {days.map((d, i) => (
                  <li key={d} className={`flex justify-between gap-6 ${i === today ? "text-primary font-medium" : "text-foreground/80"}`}>
                    <span>{d}</span>
                    <span className="tabular-nums">{hours[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-6">
            <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{L.contact}</dt>
              <dd className="font-display text-2xl">{L.walkin}</dd>
              <dd className="text-muted-foreground text-sm mt-1">{L.groups}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="https://maps.google.com/?q=Budapest+Káldy+Gyula+u.+5"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 text-xs tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-primary transition"
          >
            <Navigation className="w-4 h-4" /> {L.directions}
          </a>
          <a
            href="tel:+3617000000"
            className="inline-flex items-center gap-3 border border-foreground/30 text-foreground px-6 py-4 text-xs tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition"
          >
            <Phone className="w-4 h-4" /> {L.call}
          </a>
          <a
            href="mailto:hello@yume7.hu"
            className="inline-flex items-center gap-3 border border-foreground/30 text-foreground px-6 py-4 text-xs tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition"
          >
            <Mail className="w-4 h-4" /> {L.mail}
          </a>
        </div>
      </div>

      <div className="relative aspect-square w-full overflow-hidden border border-border">
        <iframe
          title="Yume 7 location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=19.058%2C47.498%2C19.066%2C47.504&layer=mapnik&marker=47.5012%2C19.0620"
          className="w-full h-full grayscale contrast-110 brightness-75"
          loading="lazy"
        />
        <div className="absolute top-6 left-6 bg-background/90 backdrop-blur px-5 py-4 border border-border">
          <div className="font-display text-xl">Yume 7</div>
          <div className="text-xs text-muted-foreground tracking-wider">Káldy Gyula u. 5</div>
        </div>
      </div>
    </div>
  </section>
); };

const Footer = () => (
  <footer className="border-t border-border py-14">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap justify-between items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl text-foreground">Yume 7</span>
        <span className="font-jp text-xs">夢七</span>
      </div>
      <p className="text-xs tracking-[0.25em] uppercase">© {new Date().getFullYear()} — Made with care in Budapest</p>
    </div>
  </footer>
);

const Index = () => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("yume7-lang") as Lang) || (navigator.language?.startsWith("hu") ? "hu" : "en");
  });
  useEffect(() => {
    localStorage.setItem("yume7-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Marquee />
      <Story lang={lang} />
      <Menu lang={lang} />
      <Reviews lang={lang} />
      <Visit lang={lang} />
      <Footer />
    </main>
  );
};

export default Index;
