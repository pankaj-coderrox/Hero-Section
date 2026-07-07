"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Search, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { products } from "@/data/products";

const navItems = ["Home", "Shop", "Rewards", "About", "Contact"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function BrandBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center rounded-full border-[5px] border-white bg-emeraldDeep text-white shadow-[0_12px_28px_rgba(0,52,31,0.2)] ${className}`}
    >
      <span className="grid size-[76%] place-items-center rounded-full border-2 border-white/90">
        <span className="text-center font-black leading-none tracking-normal">
          EL
          <span className="block text-[0.32em] font-extrabold tracking-[0.08em]">COFFEE</span>
        </span>
      </span>
    </span>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [quantity, setQuantity] = useState(2);
  const [scrolled, setScrolled] = useState(false);
  const [cupPopping, setCupPopping] = useState(false);
  const cupPopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = products[activeIndex];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (cupPopTimer.current) {
        clearTimeout(cupPopTimer.current);
      }
    };
  }, []);

  const triggerCupPop = () => {
    setCupPopping(false);
    if (cupPopTimer.current) {
      clearTimeout(cupPopTimer.current);
    }
    requestAnimationFrame(() => {
      setCupPopping(true);
      cupPopTimer.current = setTimeout(() => setCupPopping(false), 920);
    });
  };

  const handleCupKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerCupPop();
    }
  };

  const beans = useMemo(
    () => [
      { position: "left-[14%] top-[282px] lg:left-[12%] lg:top-[42%]", rotate: -24, size: "h-16 w-14 lg:h-24 lg:w-20" },
      { position: "right-[14%] top-[282px] lg:right-[8%] lg:top-[31%]", rotate: 18, size: "h-[74px] w-16 lg:h-28 lg:w-24" },
      { position: "left-[12%] top-[426px] lg:left-[7%] lg:top-auto lg:bottom-[23%]", rotate: 32, size: "h-[74px] w-16 lg:h-28 lg:w-24" },
      { position: "right-[13%] top-[436px] lg:right-[8%] lg:top-auto lg:bottom-[28%]", rotate: -16, size: "h-16 w-14 lg:h-24 lg:w-20" },
      { position: "left-[43%] top-[486px] lg:left-[24%] lg:top-auto lg:bottom-[8%]", rotate: -20, size: "h-16 w-14 lg:h-24 lg:w-20" }
    ],
    []
  );

  return (
    <main
      className="relative min-h-screen overflow-x-hidden overflow-y-visible rounded-[0_0_42px_42px] bg-cream px-5 text-ink sm:px-8 lg:h-screen lg:min-h-[640px] lg:px-12 xl:px-16 2xl:px-20"
      style={{ "--active": active.accent } as React.CSSProperties}
    >
      <motion.header
        className={`absolute left-0 right-0 top-0 z-50 mx-auto flex w-full items-center justify-between px-6 py-5 transition-all duration-300 sm:px-8 lg:px-12 lg:py-10 xl:px-16 xl:py-11 2xl:px-20 ${
          scrolled ? "bg-cream/72 shadow-[0_14px_42px_rgba(16,45,31,0.08)]" : "bg-transparent"
        }`}
      >
        <a href="#" className="group flex items-center gap-3" aria-label="Everleaf home">
          <BrandBadge className="size-12 text-lg ring-4 ring-white/55 transition-transform duration-300 group-hover:scale-105 lg:size-[72px] lg:text-2xl lg:ring-[7px] xl:size-20 xl:text-3xl xl:ring-8" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden translate-x-4 items-center gap-10 rounded-full bg-white px-12 py-5 text-[20px] font-extrabold shadow-[0_30px_72px_rgba(31,34,28,0.10)] md:flex xl:translate-x-6 xl:gap-16 xl:px-20 xl:py-6 xl:text-[21px]"
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`relative transition-colors hover:text-forest ${
                index === 0 ? "text-[var(--active)]" : "text-ink"
              }`}
            >
              {item}
              {index === 0 ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-5 left-0 h-1.5 w-full rounded-full bg-[var(--active)]"
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 lg:gap-9">
          <button
            aria-label="Search"
            className="grid size-12 place-items-center rounded-full bg-transparent text-ink/75 transition hover:-translate-y-0.5 hover:text-ink lg:size-14 xl:size-16"
          >
            <Search className="size-7 lg:size-9 xl:size-10" strokeWidth={3.05} />
          </button>
          <button
            aria-label="Shopping bag with 2 items"
            className="relative grid size-12 place-items-center rounded-full bg-transparent text-ink/75 transition hover:-translate-y-0.5 hover:text-ink lg:size-14 xl:size-16"
          >
            <ShoppingBag className="size-7 lg:size-9 xl:size-10" strokeWidth={3.05} />
            <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-red-500 text-sm font-black text-white lg:size-8 lg:text-base xl:size-9 xl:text-lg">
              2
            </span>
          </button>
        </div>
      </motion.header>

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1880px] grid-cols-1 items-start gap-0 pb-9 pt-20 md:pt-28 lg:grid-cols-[46%_54%] lg:items-center lg:gap-8 lg:pb-0 lg:pt-24">
        <div className="relative z-20 order-2 mt-2 max-w-[760px] sm:mt-0 lg:order-1 lg:mt-0 lg:-translate-y-16 xl:-translate-y-28 xl:pl-2">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:space-y-6 xl:space-y-8"
          >
            <motion.h1
              variants={fadeUp}
              className="max-w-[760px] text-[clamp(2.05rem,9vw,3.4rem)] font-medium leading-[1.14] tracking-normal sm:text-[clamp(2.45rem,7.4vw,5.15rem)] lg:max-w-[780px] lg:text-[clamp(3.65rem,4.7vw,5.05rem)] lg:leading-[1.12]"
            >
              <span className="block sm:whitespace-nowrap">
                Find <strong className="font-black">perfect</strong> drink
              </span>
              <span className="block sm:whitespace-nowrap">
                crafted just for <strong className="font-black">you.</strong>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[clamp(2.85rem,6vw,4.75rem)] font-black leading-none text-[var(--active)] lg:text-[clamp(3.65rem,4.6vw,4.75rem)]">
              {active.price}
            </motion.p>
            <motion.p variants={fadeUp} className="relative z-30 max-w-[92vw] text-[15px] font-normal leading-relaxed text-neutral-500 sm:max-w-[680px] sm:text-lg lg:max-w-[560px] lg:text-lg xl:max-w-[600px] xl:text-xl">
              <span className="lg:hidden">{active.description}</span>
              <span className="hidden whitespace-nowrap lg:block">{active.descriptionLines[0]}</span>
              <span className="hidden whitespace-nowrap lg:block">{active.descriptionLines[1]}</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-5 lg:mt-9 lg:gap-7 xl:mt-11"
          >
            <div className="flex h-11 w-[124px] items-center justify-between rounded-[15px] border-2 border-[var(--active)] bg-white/35 px-3 shadow-sm sm:h-12 sm:w-[136px] lg:h-[56px] lg:w-[188px] lg:rounded-[18px] lg:border-[3px] lg:px-4 xl:h-[62px] xl:w-[220px] xl:rounded-[20px] xl:px-5">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="grid size-7 place-items-center rounded-full bg-white text-ink shadow-[0_10px_24px_rgba(21,46,33,0.08)] transition hover:-translate-y-0.5 lg:size-8 xl:size-9"
              >
                <Minus className="size-4" strokeWidth={3} />
              </button>
              <span className="min-w-7 text-center text-sm font-black tabular-nums lg:min-w-8 lg:text-lg xl:min-w-9 xl:text-xl">
                {String(quantity).padStart(2, "0")}
              </span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => Math.min(9, value + 1))}
                className="grid size-7 place-items-center rounded-full bg-white text-ink shadow-[0_10px_24px_rgba(21,46,33,0.08)] transition hover:-translate-y-0.5 lg:size-8 xl:size-9"
              >
                <Plus className="size-4" strokeWidth={3} />
              </button>
            </div>
            <button className="group flex h-11 items-center gap-2.5 whitespace-nowrap rounded-[15px] bg-[var(--active)] px-5 text-sm font-black text-white shadow-[0_18px_34px_color-mix(in_srgb,var(--active)_30%,transparent)] transition hover:-translate-y-1 sm:h-12 sm:gap-3 lg:h-[56px] lg:gap-3 lg:rounded-[18px] lg:px-8 lg:text-base xl:h-[62px] xl:gap-4 xl:rounded-[20px] xl:px-9 xl:text-lg">
              Order Now
              <ArrowRight className="size-5 transition group-hover:translate-x-1 lg:size-6" strokeWidth={3} />
            </button>
          </motion.div>
        </div>

        <div className="relative z-10 order-1 min-h-[570px] sm:min-h-[640px] lg:order-2 lg:min-h-screen">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[120px] h-[92vw] min-h-[430px] w-[92vw] min-w-[430px] -translate-x-1/2 sm:top-[110px] sm:h-[620px] sm:w-[620px] lg:left-auto lg:right-[-9vw] lg:top-[7%] lg:h-[62vw] lg:max-h-[920px] lg:min-h-[660px] lg:w-[62vw] lg:max-w-[920px] lg:min-w-[660px] lg:translate-x-0 xl:right-[-6vw] xl:top-[5%] xl:h-[58vw] xl:w-[58vw] xl:max-h-[1120px] xl:max-w-[1120px] 2xl:right-[-5vw]"
          >
            <motion.div
              className="h-full w-full rounded-full bg-[radial-gradient(circle_at_31%_25%,color-mix(in_srgb,var(--active)_68%,white)_0%,color-mix(in_srgb,var(--active)_88%,white)_42%,var(--active)_100%)] shadow-[inset_0_44px_88px_rgba(255,255,255,0.16),0_40px_90px_rgba(80,40,52,0.18)]"
              initial={{ scale: 0.84, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            <div
              key={active.image}
              className="absolute left-1/2 top-[117px] z-20 h-[430px] w-[82vw] max-w-[420px] -translate-x-1/2 sm:top-[103px] lg:bottom-[-2%] lg:left-auto lg:right-[-3%] lg:top-auto lg:h-[90vh] lg:min-h-[660px] lg:w-[52vw] lg:min-w-[590px] lg:max-w-[880px] lg:translate-x-0 xl:bottom-[-4%] xl:right-[1%] xl:min-h-[720px] xl:max-w-[960px]"
            >
              <motion.div
                role="button"
                tabIndex={0}
                aria-label={`Pop ${active.name} product image`}
                className="relative h-full w-full cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-white/70"
                onClick={triggerCupPop}
                onPointerDown={triggerCupPop}
                onKeyDown={handleCupKeyDown}
                animate={
                  cupPopping
                    ? {
                        y: [0, -245, -168, 0],
                        scale: [1, 1.42, 1.26, 1],
                        rotate: [0, -4, 2, 0],
                        filter: [
                          "drop-shadow(0 46px 48px rgba(0,61,38,0.34))",
                          "drop-shadow(0 96px 90px rgba(0,61,38,0.46))",
                          "drop-shadow(0 76px 66px rgba(0,61,38,0.42))",
                          "drop-shadow(0 46px 48px rgba(0,61,38,0.34))"
                        ]
                      }
                    : { y: 0, scale: 1, rotate: 0 }
                }
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 1.22, y: -150 }}
                transition={{ duration: 0.92, ease: [0.2, 0.9, 0.22, 1] }}
              >
                <AnimatePresence>
                  {cupPopping ? (
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 z-0 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/70 bg-white/20"
                      initial={{ opacity: 0.55, scale: 0.45 }}
                      animate={{ opacity: 0, scale: 1.35 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.62, ease: "easeOut" }}
                    />
                  ) : null}
                </AnimatePresence>
                <motion.div
                  className="relative z-10 h-full w-full"
                  initial={{ opacity: 0, y: 80, rotate: -3, scale: 0.9 }}
                  animate={{ opacity: 1, y: [0, -16, 0], rotate: [0, 1.2, -0.9, 0.6, 0], x: [0, 3, -2, 2, 0], scale: 1 }}
                  exit={{ opacity: 0, y: 42, scale: 0.92, transition: { duration: 0.25 } }}
                  transition={{
                    opacity: { duration: 0.45 },
                    y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.7 }
                  }}
                >
                  <Image
                    src={active.image}
                    alt={`${active.name} product image`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 48vw, 84vw"
                    className="object-contain drop-shadow-[0_46px_48px_rgba(0,61,38,0.34)]"
                  />
                  <BrandBadge className="absolute left-1/2 top-[58%] grid size-16 -translate-x-1/2 text-xl sm:size-20 sm:text-2xl lg:top-[57%] lg:size-24 lg:text-3xl xl:size-28 xl:text-4xl" />
                </motion.div>
              </motion.div>
            </div>
          </AnimatePresence>

          {beans.map((bean, index) => (
            <motion.span
              key={bean.position}
              aria-hidden="true"
              className={`absolute z-30 block cursor-pointer ${bean.size} ${bean.position}`}
              initial={{ opacity: 0, scale: 0.3, rotate: bean.rotate }}
              animate={{ opacity: 1, scale: 1, y: [0, -18, 0], rotate: bean.rotate }}
              whileHover={{
                scale: 1.22,
                rotate: bean.rotate + (index % 2 === 0 ? -10 : 10),
                y: -24,
                transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }}
              transition={{
                opacity: { delay: 0.6 + index * 0.08, duration: 0.35 },
                scale: { delay: 0.6 + index * 0.08, duration: 0.35 },
                y: { delay: index * 0.2, duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Image
                src="/decor/coffee-bean.png"
                alt=""
                fill
                sizes="80px"
                className="object-contain drop-shadow-[0_18px_22px_rgba(54,26,13,0.28)]"
              />
            </motion.span>
          ))}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.6 }}
        className="relative z-30 mx-auto mt-20 grid w-full max-w-[500px] grid-cols-3 gap-3 pb-10 sm:mt-10 sm:gap-4 md:absolute md:bottom-[-96px] md:left-14 md:mt-0 md:max-w-[480px] md:pb-0 lg:bottom-[-120px] lg:left-[5.6%] lg:max-w-[470px] lg:gap-5 xl:bottom-[-100px] xl:max-w-[560px]"
      >
        {products.map((product, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className={`group relative h-24 overflow-visible rounded-[20px_20px_0_0] bg-gradient-to-br ${product.tileClass} shadow-soft outline-none transition duration-500 ease-out hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-[var(--active)]/60 sm:h-28 md:h-32 lg:h-[132px] xl:h-[148px] ${
                isActive ? "shadow-[0_30px_58px_rgba(31,36,30,0.24)] md:scale-[1.02] lg:scale-100" : ""
              }`}
              style={{
                boxShadow: isActive
                  ? `0 30px 58px color-mix(in srgb, ${product.accent} 34%, transparent), inset 0 0 0 1px color-mix(in srgb, ${product.accent} 28%, white)`
                  : undefined
              }}
            >
              {isActive ? (
                <motion.span
                  layoutId="active-card-glow"
                  aria-hidden="true"
                  className="absolute inset-x-5 bottom-0 h-10 rounded-full bg-white/35 blur-2xl"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <Image
                src={product.image}
                alt=""
                width={230}
                height={270}
                className={`absolute left-1/2 w-auto -translate-x-1/2 object-contain drop-shadow-[0_18px_16px_rgba(0,45,28,0.24)] transition duration-500 ease-out group-hover:scale-105 ${
                  isActive
                    ? "bottom-5 h-[132%] sm:bottom-8 sm:h-[150%] md:bottom-9 lg:bottom-8 lg:h-[180%] xl:bottom-9 xl:h-[178%]"
                    : "bottom-4 h-[112%] sm:bottom-6 sm:h-[126%] md:bottom-7 lg:bottom-7 lg:h-[150%] xl:bottom-8 xl:h-[148%]"
                }`}
              />
              <BrandBadge className="absolute left-1/2 top-[47%] size-5 -translate-x-1/2 text-[6px] sm:top-[49%] sm:size-6 sm:text-[7px] md:top-[50%] md:size-7 lg:top-[49%] lg:size-7 lg:text-[7px] xl:top-[50%] xl:size-8 xl:text-[8px]" />
              <span className="absolute bottom-1.5 left-1 right-1 z-10 text-center text-[9px] font-black leading-tight text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)] sm:bottom-2 sm:left-2 sm:right-2 sm:text-[11px] md:text-xs lg:bottom-2 lg:text-sm xl:bottom-3 xl:text-base">
                {product.name}
              </span>
              <span className="sr-only">Select {product.name}</span>
            </button>
          );
        })}
      </motion.div>
    </main>
  );
}
