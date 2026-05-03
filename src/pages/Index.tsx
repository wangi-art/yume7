import { useEffect, useState } from "react";
import heroImg from "@/assets/ramen-hero.webp";
import interiorImg from "@/assets/ramen-interior.webp";
import interior2Img from "@/assets/ramen-interior-2.webp";
import spreadImg from "@/assets/ramen-spread.webp";
import bentoImg from "@/assets/ramen-bento.webp";
import dessertImg from "@/assets/dessert.webp";
import { MapPin, Clock, Star, Phone, ChevronRight } from "lucide-react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-display text-3xl tracking-tight text-foreground">Yume</span>
          <span className="text-primary font-display text-3xl">7</span>
          <span className="font-jp text-xs text-muted-foreground ml-1 hidden sm:inline">夢七</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase text-foreground/80">
          <li><a href="#story" className="hover:text-primary transition">Story</a></li>
          <li><a href="#menu" className="hover:text-primary transition">Menu</a></li>
          <li><a href="#reviews" className="hover:text-primary transition">Reviews</a></li>
          <li><a href="#visit" className="hover:text-primary transition">Visit</a></li>
        </ul>
        <a
          href="#visit"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Reserve
        </a>
      </nav>
    </header>
  );
};

const Hero = () => (
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
        Budapest · Káldy Gyula u. 5
      </p>
      <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-foreground max-w-5xl text-balance animate-fade-up" style={{ animationDelay: "0.15s" }}>
        A bowl <em className="italic text-primary/90">worth</em> the journey.
      </h1>
      <p className="mt-8 max-w-xl text-foreground/70 text-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
        Slow-simmered broths, hand-pulled noodles, and the quiet ritual of
        Japan — served in the heart of the sixth district.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
        <a href="#menu" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary/90 transition">
          Explore the Menu <ChevronRight className="w-4 h-4" />
        </a>
        <a href="#visit" className="inline-flex items-center gap-3 px-7 py-4 text-sm tracking-[0.25em] uppercase text-foreground border border-foreground/30 hover:border-foreground transition">
          Plan your visit
        </a>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-foreground/40">
      Scroll
    </div>
  </section>
);

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

const Story = () => (
  <section id="story" className="relative py-32 lg:py-44 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <div className="lg:col-span-5 relative">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={interiorImg}
            alt="Yume 7 dining room with paper lanterns"
            loading="lazy"
            width={1536}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-background border border-border px-6 py-5 shadow-[var(--shadow-deep)]">
          <div className="font-display text-5xl text-primary leading-none">200<span className="text-2xl">㎡</span></div>
          <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-2">Of quiet space</div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">— Our Story</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          Twelve hours of broth.<br />
          <em className="italic text-muted-foreground">A lifetime of intent.</em>
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-10 text-foreground/75 leading-relaxed">
          <p>
            At Yume 7, every bowl begins long before service. Bones simmer
            overnight, noodles are pulled by hand each morning, and tare is
            balanced as carefully as a poem.
          </p>
          <p>
            We are a small Japanese kitchen in Budapest's sixth district —
            spacious, calm, and devoted to the slow craft of ramen. A place to
            pause, to taste, to dream.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          {[
            ["4.9", "Google rating"],
            ["4 956", "Guests served"],
            ["Mon–Sat", "12:00 – 22:00"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-foreground">{n}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

type Dish = { name: string; jp: string; desc: string; price: string; tag?: string };
const dishes: Dish[] = [
  { name: "Tonkotsu", jp: "豚骨", desc: "Twelve-hour pork bone broth, chashu, ajitama, scallion, nori.", price: "4 800 Ft", tag: "Signature" },
  { name: "Shoyu", jp: "醤油", desc: "Clear soy-based broth, slow-braised pork belly, bamboo, nori.", price: "4 400 Ft" },
  { name: "Miso", jp: "味噌", desc: "Aged red miso, ground pork, corn, butter, white pepper.", price: "4 600 Ft" },
  { name: "Spicy Tan-Tan", jp: "担々麺", desc: "Sesame, chili oil, minced pork, bok choy, soft egg.", price: "4 900 Ft", tag: "Hot" },
  { name: "Vegan Shio", jp: "塩", desc: "Kombu-shiitake dashi, charred scallion, tofu, seasonal greens.", price: "4 200 Ft" },
  { name: "Matcha Tiramisu", jp: "抹茶", desc: "Layered uji matcha, mascarpone, savoiardi, kuromitsu.", price: "1 900 Ft", tag: "Loved" },
];

const Menu = () => (
  <section id="menu" className="relative py-32 lg:py-44 bg-card border-y border-border">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
        <div>
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">— The Menu</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Six bowls.<br /><em className="italic text-muted-foreground">Every detail considered.</em>
          </h2>
        </div>
        <p className="font-jp text-muted-foreground text-sm tracking-widest">本日のお品書き</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
        {dishes.map((d, i) => (
          <article
            key={d.name}
            className="group flex items-baseline gap-6 py-7 border-b border-border/60 hover:border-primary/40 transition"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-display text-3xl text-foreground group-hover:text-primary transition">{d.name}</h3>
                <span className="font-jp text-sm text-muted-foreground">{d.jp}</span>
                {d.tag && (
                  <span className="text-[10px] tracking-[0.25em] uppercase text-primary border border-primary/40 px-2 py-0.5">
                    {d.tag}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-md">{d.desc}</p>
            </div>
            <div className="font-display text-2xl text-foreground tabular-nums">{d.price}</div>
          </article>
        ))}
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] overflow-hidden grain">
          <img src={spreadImg} alt="A full ramen and side-dish spread at Yume 7" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden grain">
          <img src={bentoImg} alt="Tempura, spring rolls and boiled peanuts bento appetiser" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
        </div>
      </div>
    </div>
  </section>
);

const reviews = [
  { name: "Xinyi Zhang", text: "Döbbenetesen jó a desszertjük! A matcha és a taro is fantasztikus volt — a kedvencem messze a matcha tiramisu.", rating: 5 },
  { name: "11 Kitto", text: "Örülök, hogy rátaláltunk a férjemmel erre az étteremre. Nagyon hangulatos a hely, kedves személyzet, kifogástalan ételek.", rating: 5 },
  { name: "Nyár", text: "Az egyik legjobb ramen, amit valaha ettem. A pincérnő különösen barátságos és figyelmes volt — őszintén ajánlom mindenkinek.", rating: 5 },
];

const Reviews = () => (
  <section id="reviews" className="py-32 lg:py-44">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">— In Their Words</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          <span className="text-primary">4.9</span> stars.<br />
          <em className="italic text-muted-foreground">4 956 voices.</em>
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
);

const Visit = () => (
  <section id="visit" className="relative py-32 lg:py-44 bg-card border-t border-border overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      <div>
        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">— Visit</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
          Find us in the<br /><em className="italic text-primary">sixth district.</em>
        </h2>

        <dl className="mt-14 space-y-10">
          <div className="flex gap-6">
            <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Address</dt>
              <dd className="font-display text-2xl">Budapest, Káldy Gyula u. 5</dd>
              <dd className="text-muted-foreground text-sm mt-1">1066 — Terézváros</dd>
            </div>
          </div>

          <div className="flex gap-6">
            <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Hours</dt>
              <dd className="font-display text-2xl">Mon – Sat · 12:00 – 22:00</dd>
              <dd className="text-muted-foreground text-sm mt-1">Closed Sunday</dd>
            </div>
          </div>

          <div className="flex gap-6">
            <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Reservations</dt>
              <dd className="font-display text-2xl">Walk-ins welcome</dd>
              <dd className="text-muted-foreground text-sm mt-1">Groups of 6+ — please call ahead</dd>
            </div>
          </div>
        </dl>

        <a
          href="https://maps.google.com/?q=Budapest+Káldy+Gyula+u.+5"
          target="_blank"
          rel="noreferrer"
          className="mt-14 inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary/90 transition"
        >
          Get Directions <ChevronRight className="w-4 h-4" />
        </a>
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
);

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

const Index = () => (
  <main className="bg-background text-foreground overflow-x-hidden">
    <Nav />
    <Hero />
    <Marquee />
    <Story />
    <Menu />
    <Reviews />
    <Visit />
    <Footer />
  </main>
);

export default Index;
