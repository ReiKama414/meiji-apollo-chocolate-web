import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Instagram, Menu, Sparkles, Star, X } from 'lucide-react';

type CursorZone = 'dark' | 'light' | 'game';

const luckyMessages = [
  '今日的甜，剛剛好。',
  '幸運正在融化中。',
  '你的小宇宙亮起來了。',
  '一顆星，剛剛落在你手上。',
  '今天適合來一點草莓。',
  '甜度滿分，請慢慢享用。',
  '藏在巧克力裡的好運找到了。',
];

const products = [
  { name: 'Original Apollo', detail: '草莓 × 牛奶巧克力', tone: 'rose', number: '01' },
  { name: 'Apollo Petite', detail: '一口尺寸的甜蜜星球', tone: 'cream', number: '02' },
  { name: 'Lucky Star', detail: '尋找藏在其中的幸運', tone: 'tone-chocolate', number: '03' },
  { name: 'White Berry', detail: '白草莓 × 焦糖可可', tone: 'berry', number: '04' },
  { name: 'Apollo Gold', detail: '金色限量巧克力', tone: 'gold', number: '05' },
  { name: 'Heart Box', detail: '心形禮盒裝', tone: 'dark', number: '06' },
];

function Strawberry({ className = '' }: { className?: string }) {
  return <span className={`strawberry ${className}`} aria-hidden="true"><i /><b /><b /><b /><b /></span>;
}

function Chocolate({ className = '' }: { className?: string }) {
  return <span className={`chocolate ${className}`} aria-hidden="true"><i /></span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [found, setFound] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [cursorZone, setCursorZone] = useState<CursorZone>('light');
  const [cursorClick, setCursorClick] = useState(false);
  const [luckyText, setLuckyText] = useState(luckyMessages[0]);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      const zone = el?.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorZone | null;
      setCursorZone(zone ?? 'light');
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const down = () => { if (cursorZone === 'game') { setCursorClick(true); setTimeout(() => setCursorClick(false), 500); } };
    window.addEventListener('mousedown', down);
    return () => window.removeEventListener('mousedown', down);
  }, [cursorZone]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const layers = document.querySelectorAll<HTMLElement>('[data-parallax]');
    const onScroll = () => {
      const vh = window.innerHeight;
      layers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = parseFloat(layer.dataset.parallax || '0');
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        layer.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const cursorStyle = { left: `${cursorPos.x}px`, top: `${cursorPos.y}px` } as const;
  const hoverProps = { onMouseEnter: () => setCursorHover(true), onMouseLeave: () => setCursorHover(false) };

  return (
    <main>
      <div className={`star-cursor zone-${cursorZone} ${cursorHover ? 'is-hover' : ''} ${cursorClick ? 'is-click' : ''}`} style={cursorStyle} aria-hidden="true">
        <span className="cursor-inner">
          {cursorZone === 'game' ? <Strawberry className="cursor-berry" /> : <Star size={26} fill="currentColor" />}
        </span>
      </div>

      <header className="site-header" data-cursor="dark">
        <a className="brand-mark" href="#top" onClick={closeMenu} aria-label="Apollo 首頁">
          <span className="brand-orbit"><Star size={15} fill="currentColor" /></span>
          <span>アポロ</span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="主要導覽">
          <a href="#about" onClick={closeMenu}>OUR STORY</a>
          <a href="#collection" onClick={closeMenu}>COLLECTION</a>
          <a href="#lucky" onClick={closeMenu}>LUCKY GAME</a>
        </nav>
        <div className="header-actions">
          <a href="#collection" className="mini-link">DISCOVER <ArrowUpRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? '關閉選單' : '開啟選單'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero section-red" data-cursor="dark">
        <div className="pattern-layer pattern-back" data-parallax="0.04" aria-hidden="true"><Strawberry /><Strawberry /><Strawberry /><Strawberry /></div>
        <div className="pattern-layer pattern-mid" data-parallax="0.08" aria-hidden="true"><Star className="pattern-star-mid" size={28} fill="currentColor" /><Strawberry /><Strawberry /></div>
        <div className="pattern-layer pattern-front" data-parallax="0.14" aria-hidden="true"><Strawberry /><Star className="pattern-star" size={36} fill="currentColor" /><Strawberry /></div>
        <div className="hero-copy">
          <p className="eyebrow reveal reveal-one"><span className="eyebrow-line" /> MEIJI · SINCE 1916 <span className="eyebrow-line" /></p>
          <h1 className="hero-title reveal reveal-two">APOLLO</h1>
          <p className="hero-japanese reveal reveal-three">アポロ</p>
          <p className="hero-subtitle reveal reveal-four">A little star, a lot of strawberry.</p>
          <a href="#collection" className="primary-button reveal reveal-five" {...hoverProps}>DISCOVER APOLLO <ArrowDown size={17} /></a>
        </div>
        <div className="hero-product reveal reveal-four float-slow" aria-label="Apollo 三角巧克力插圖">
          <div className="product-halo" />
          <div className="product-star"><Star size={46} fill="currentColor" /></div>
          <Chocolate />
          <span className="product-caption">STRAWBERRY<br /><strong>CHOCOLATE</strong></span>
        </div>
        <div className="hero-note"><span>01</span><span className="note-line" /><span>THE SWEETEST<br />LITTLE UNIVERSE</span></div>
        <div className="scroll-note"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div>
      </section>

      <section id="about" className="intro section-cream" data-cursor="light">
        <div className="intro-stamp float-slow"><span>MEIJI</span><strong>50</strong><small>YEARS OF<br />LUCKY STARS</small></div>
        <div className="intro-content">
          <p className="section-kicker">THE APOLLO UNIVERSE / 001</p>
          <h2>Small shape.<br /><em>Big feeling.</em></h2>
          <p className="body-copy">一口大小的三角形，裝進草莓的酸甜與巧克力的溫柔。Apollo 自 1969 年起，成為日本孩子記憶裡，那顆最閃亮的小星球。</p>
          <a className="text-link" href="#lucky">ENTER OUR STORY <ArrowUpRight size={16} /></a>
        </div>
        <div className="intro-art" aria-hidden="true"><div className="sun-disc" /><Strawberry className="strawberry-large float-slow" /><Star className="intro-star" size={48} fill="currentColor" /></div>
      </section>

      <section id="collection" className="collection section-pink" data-cursor="light">
        <div className="section-heading"><div><p className="section-kicker">FIND YOUR FAVOURITE / 002</p><h2>Sweet <em>orbit</em></h2></div><p className="heading-aside">Six ways to land<br />on a happier planet.</p></div>
        <div className="product-grid">
          {products.map((product, index) => (
            <button key={product.name} className={`product-card ${product.tone} ${activeProduct === index ? 'is-active' : ''}`} onClick={() => setActiveProduct(index)} {...hoverProps}>
              <span className="card-index">{product.number}</span>
              <span className="card-art"><span className="card-star"><Star size={31} fill="currentColor" /></span><Chocolate /></span>
              <span className="card-info"><span><strong>{product.name}</strong><small>{product.detail}</small></span><span className="card-arrow"><ArrowUpRight size={18} /></span></span>
            </button>
          ))}
        </div>
      </section>

      <section id="lucky" className="lucky-section section-chocolate" data-cursor="game">
        <div className="lucky-copy"><p className="section-kicker light">A TINY SURPRISE / 003</p><h2>Find your<br /><em>lucky star.</em></h2><p>傳說中，每一盒 Apollo 都藏著一顆幸運星。點擊右方的星星，看看今天的好運是否正在等你。</p><button className="outline-button" onClick={() => setFound(!found)} {...hoverProps}>{found ? 'LUCKY APOLLO FOUND' : 'SEARCH FOR LUCK' } <Sparkles size={16} /></button></div>
        <div className={`lucky-board ${found ? 'found' : ''}`}>
          <span className="board-label">LUCKY<br />APOLLO</span>
          <Strawberry className="board-berry-one" /><Strawberry className="board-berry-two" /><Chocolate className="board-choco" />
          <button className="hidden-star" onClick={() => { setLuckyText(luckyMessages[Math.floor(Math.random() * luckyMessages.length)]); setFound(true); }} {...hoverProps} aria-label="尋找幸運星"><Star size={46} fill="currentColor" /></button>
          {found && (
            <div className="lucky-message">
              <span className="lucky-sparkle s1"><Sparkles size={14} /></span>
              <span className="lucky-sparkle s2"><Sparkles size={11} /></span>
              <span className="lucky-sparkle s3"><Sparkles size={13} /></span>
              <span className="lucky-sparkle s4"><Sparkles size={10} /></span>
              <span className="lucky-choco"><Chocolate /></span>
              <span className="lucky-title">LUCKY APOLLO!</span>
              <small>{luckyText}</small>
            </div>
          )}
        </div>
      </section>

      <footer className="site-footer" data-cursor="dark">
        <div className="footer-brand"><span className="brand-orbit"><Star size={15} fill="currentColor" /></span><span>アポロ</span></div><p>Strawberry makes everything sweeter.</p><div className="footer-links"><a href="#top">BACK TO TOP <ArrowUpRight size={14} /></a><a href="#top" aria-label="Instagram"><Instagram size={17} /></a></div>
      </footer>
      <div className="footer-pattern" data-cursor="dark" aria-hidden="true"><Strawberry /><Strawberry /><Star size={27} fill="currentColor" /><Strawberry /><Strawberry /><Star size={27} fill="currentColor" /><Strawberry /></div>
    </main>
  );
}

export default App;
