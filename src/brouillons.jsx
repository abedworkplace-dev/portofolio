import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import './responsive.css'
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaLock, FaLink, FaReact, FaNodeJs, FaDatabase, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaLocationDot, FaPhoneVolume, FaLinkedin } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import mixitup from "mixitup";
import { SiGmail } from "react-icons/si";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2';
import { GoArrowRight } from "react-icons/go";
import { MdLocationPin } from "react-icons/md";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { IoStar } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { LuPalette } from "react-icons/lu";
import { AiOutlineDatabase } from "react-icons/ai";

// ===== COMPOSANT TECHSTACKVESSELS INTÉGRÉ =====
/**
 * TechStackVessels
 * Traduction 1:1 en React du composant HTML/CSS/JS "vessels" fourni,
 * avec toutes les couleurs écrites en dur (plus de var(--...)).
 *
 * Usage :
 * <TechStackVessels />
 * ou
 * <TechStackVessels items={monTableauPerso} />
 */

const ICONS = {
  atom: '<circle cx="12" cy="12" r="2.4"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(0 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
  hexagon: '<path d="M12 2 20 7 20 17 12 22 4 17 4 7 Z"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="2.6"/><path d="M5 5v14c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V5"/><path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>',
  cube: '<path d="M12 2 21 7v10l-9 5-9-5V7Z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v9"/>',
  cloud: '<path d="M7 18h11a4 4 0 0 0 .4-8 6 6 0 0 0-11.6-1.8A4.5 4.5 0 0 0 7 18Z"/>',
  layers: '<path d="M12 2 3 7l9 5 9-5Z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
};

const DEFAULT_ITEMS = [
  { label: "React", role: "Interface", icon: "atom", side: "right" },
  { label: "Node.js", role: "Runtime serveur", icon: "hexagon", side: "right" },
  { label: "PostgreSQL", role: "Base de données", icon: "database", side: "right" },
  { label: "Docker", role: "Conteneurisation", icon: "cube", side: "left" },
  { label: "AWS", role: "Infrastructure", icon: "cloud", side: "left" },
];

const NS = "http://www.w3.org/2000/svg";
const VB_W = 1000;
const VB_H = 500;
const HUB = { x: 500, y: 250, r: 46 };
const NODE_OFFSET_X = 300;

// Couleurs en dur (équivalent des anciennes variables CSS)
const COLORS = {
  bg: "#0a0b0f",
  surface: "rgba(255,255,255,0.035)",
  surfaceHover: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.16)",
  text: "#f2f0ea",
  textMuted: "#8b8d97",
  vesselA: "#ff6b4a",
  vesselB: "#c8362a",
};

function svgEl(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

function TechStackVessels({ items = DEFAULT_ITEMS }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    container.innerHTML = "";
    container.style.position = "relative";

    const svg = svgEl("svg", {
      class: "tsv-svg",
      viewBox: `0 0 ${VB_W} ${VB_H}`,
      preserveAspectRatio: "none",
    });

    const defs = svgEl("defs", {});
    defs.innerHTML = `
      <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${COLORS.vesselB}"/>
        <stop offset="100%" stop-color="${COLORS.vesselA}"/>
      </linearGradient>
      <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${COLORS.vesselA}"/>
        <stop offset="100%" stop-color="${COLORS.vesselB}"/>
      </radialGradient>
      <filter id="glowSoft" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.2" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glowStrong" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    `;
    svg.appendChild(defs);

    const right = items.filter((i) => i.side !== "left");
    const left = items.filter((i) => i.side === "left");

    function spread(count) {
      if (count <= 1) return [HUB.y];
      const top = 60;
      const bottom = VB_H - 60;
      const step = (bottom - top) / (count - 1);
      return Array.from({ length: count }, (_, i) => top + i * step);
    }

    const rightYs = spread(right.length);
    const leftYs = spread(left.length);

    function addBranch(targetX, targetY, delay) {
      const startX = HUB.x + (targetX > HUB.x ? HUB.r : -HUB.r);
      const midX = HUB.x + (targetX - HUB.x) * 0.45;
      const nearX = targetX + (targetX > HUB.x ? -55 : 55);
      const d = `M ${startX} ${HUB.y} C ${midX} ${HUB.y}, ${nearX} ${targetY}, ${targetX} ${targetY}`;

      const pathId = `tsv-path-${Math.random().toString(36).slice(2, 9)}`;
      const bg = svgEl("path", {
        class: "tsv-vessel-bg",
        d,
        stroke: "rgba(255,255,255,0.06)",
        "stroke-width": "1.4",
        fill: "none",
      });
      const line = svgEl("path", {
        class: "tsv-vessel",
        d,
        id: pathId,
        stroke: "url(#vesselGrad)",
        "stroke-width": "2.2",
        "stroke-linecap": "round",
        fill: "none",
        filter: "url(#glowSoft)",
        style: `transition-delay:${delay}s`,
      });
      svg.appendChild(bg);
      svg.appendChild(line);

      for (let p = 0; p < 3; p++) {
        const particle = svgEl("circle", {
          class: "tsv-particle",
          r: "3.2",
          fill: COLORS.vesselA,
          filter: "url(#glowStrong)",
        });
        const animMotion = svgEl("animateMotion", {
          dur: `${2.6 + Math.random() * 0.8}s`,
          begin: `${delay + 1.6 + p * 0.9}s`,
          repeatCount: "indefinite",
        });
        const mpath = svgEl("mpath", { href: `#${pathId}` });
        mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${pathId}`);
        animMotion.appendChild(mpath);
        particle.appendChild(animMotion);
        svg.appendChild(particle);
      }
    }

    right.forEach((item, i) => addBranch(HUB.x + NODE_OFFSET_X, rightYs[i], i * 0.12));
    left.forEach((item, i) => addBranch(HUB.x - NODE_OFFSET_X, leftYs[i], i * 0.12));

    // Hub (icône stack centrale)
    const hubGroup = svgEl("g", { class: "tsv-hub-group" });
    hubGroup.innerHTML = `
      <circle class="tsv-hub-ring" cx="${HUB.x}" cy="${HUB.y}" r="${HUB.r}" fill="none" stroke="${COLORS.vesselA}" stroke-width="2"/>
      <circle class="tsv-hub-core" cx="${HUB.x}" cy="${HUB.y}" r="${HUB.r}" fill="url(#hubGrad)" opacity="0.16"/>
      <circle cx="${HUB.x}" cy="${HUB.y}" r="${HUB.r}" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      <g stroke="${COLORS.vesselA}" stroke-width="1.6" fill="none" stroke-linecap="round">
        <rect x="${HUB.x - 20}" y="${HUB.y - 16}" width="40" height="9" rx="2.5" opacity="0.5"/>
        <rect x="${HUB.x - 16}" y="${HUB.y - 3}"  width="32" height="9" rx="2.5" opacity="0.75"/>
        <rect x="${HUB.x - 12}" y="${HUB.y + 10}" width="24" height="9" rx="2.5" opacity="1"/>
      </g>
    `;
    svg.appendChild(hubGroup);

    container.appendChild(svg);

    function addNodeCards(list, ys, side) {
      list.forEach((item, i) => {
        const x = side === "right" ? HUB.x + NODE_OFFSET_X : HUB.x - NODE_OFFSET_X;
        const leftPct = (x / VB_W) * 100;
        const topPct = (ys[i] / VB_H) * 100;

        const node = document.createElement("div");
        node.className = "tsv-node" + (side === "left" ? " tsv-node--left" : "");
        node.style.left = `${leftPct}%`;
        node.style.top = `${topPct}%`;
        node.style.transitionDelay = `${0.6 + i * 0.12}s`;

        node.innerHTML = `
          <div class="tsv-node-icon">
            <div class="tsv-node-pulse"></div>
            <svg viewBox="0 0 24 24">${ICONS[item.icon] || ICONS.hexagon}</svg>
          </div>
          <div class="tsv-node-label">
            <span class="tsv-node-name">${item.label}</span>
            <span class="tsv-node-role">${item.role || ""}</span>
          </div>
        `;
        container.appendChild(node);
      });
    }

    addNodeCards(right, rightYs, "right");
    addNodeCards(left, leftYs, "left");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(container);

    return () => {
      io.disconnect();
      container.innerHTML = "";
    };
  }, [items]);

  return (
    <div
      style={{
        margin: 0,
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        borderRadius: "24px",
        width: "100%",
      }}
    >
      <style>{`
        .tsv-wrap{ width:100%; max-width:1100px; }
        .tsv-header{ text-align:center; margin-bottom:8px; }
        .tsv-eyebrow{
          font-family:'Inter', sans-serif;
          font-size:12px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:${COLORS.vesselA};
          font-weight:600;
          margin:0 0 10px;
        }
        .tsv-title{
          font-family:'Sora', sans-serif;
          font-size:clamp(24px,3.4vw,36px);
          font-weight:700;
          margin:0 0 40px;
          letter-spacing:-0.01em;
          color:${COLORS.text};
        }
        .tsv-container{ position:relative; width:100%; height:520px; }
        .tsv-svg{ position:absolute; inset:0; width:100%; height:100%; overflow:visible; }

        .tsv-vessel{
          stroke-dasharray:1000;
          stroke-dashoffset:1000;
          transition:stroke-dashoffset 1.6s cubic-bezier(.22,.9,.28,1);
        }
        .is-visible .tsv-vessel{ stroke-dashoffset:0; }

        @keyframes tsv-heartbeat{
          0%, 100%{ transform:scale(1); }
          18%{ transform:scale(1.09); }
          32%{ transform:scale(0.98); }
          46%{ transform:scale(1.05); }
          60%{ transform:scale(1); }
        }
        .tsv-hub-group{ transform-origin:center; transform-box:fill-box; }
        .is-visible .tsv-hub-group{
          animation:tsv-heartbeat 2.4s ease-in-out infinite;
          animation-delay:1.4s;
        }

        @keyframes tsv-ring{
          0%{ opacity:0.55; transform:scale(1); }
          100%{ opacity:0; transform:scale(2.6); }
        }
        .tsv-hub-ring{ transform-origin:center; transform-box:fill-box; opacity:0; }
        .is-visible .tsv-hub-ring{
          animation:tsv-ring 2.4s ease-out infinite;
          animation-delay:1.4s;
        }

        .tsv-node{
          position:absolute;
          display:flex;
          align-items:center;
          gap:14px;
          transform:translate(0,-50%);
          opacity:0;
          transition:opacity .7s ease, transform .7s cubic-bezier(.22,.9,.28,1);
        }
        .is-visible .tsv-node{ opacity:1; }

        .tsv-node-icon{
          position:relative;
          width:58px;
          height:58px;
          min-width:58px;
          border-radius:16px;
          background:${COLORS.surface};
          border:1px solid ${COLORS.border};
          backdrop-filter:blur(6px);
          display:flex;
          align-items:center;
          justify-content:center;
          transition:border-color .3s ease, background .3s ease, transform .3s ease, box-shadow .3s ease;
        }
        .tsv-node-icon svg{
          width:24px;
          height:24px;
          stroke:${COLORS.textMuted};
          stroke-width:1.6;
          fill:none;
          transition:stroke .3s ease;
        }
        .tsv-node:hover .tsv-node-icon{
          border-color:${COLORS.borderStrong};
          background:${COLORS.surfaceHover};
          transform:translateY(-3px);
          box-shadow:0 12px 30px -10px rgba(255,107,74,0.25);
        }
        .tsv-node:hover .tsv-node-icon svg{ stroke:${COLORS.vesselA}; }

        .tsv-node-pulse{
          position:absolute;
          inset:-1px;
          border-radius:16px;
          border:1px solid ${COLORS.vesselA};
          opacity:0;
        }
        .is-visible .tsv-node-pulse{ animation:tsv-node-flash 3s ease-in-out infinite; }

        @keyframes tsv-node-flash{
          0%, 82%{ opacity:0; transform:scale(1); }
          88%{ opacity:0.9; transform:scale(1); }
          100%{ opacity:0; transform:scale(1.18); }
        }

        .tsv-node-label{ display:flex; flex-direction:column; gap:2px; }
        .tsv-node-name{
          font-family:'Sora', sans-serif;
          font-size:15px;
          font-weight:600;
          color:${COLORS.text};
        }
        .tsv-node-role{ font-size:12px; color:${COLORS.textMuted}; }

        .tsv-node.tsv-node--left{
          flex-direction:row-reverse;
          transform:translate(-100%,-50%);
        }
        .tsv-node.tsv-node--left .tsv-node-label{
          align-items:flex-end;
          text-align:right;
        }

        @media (max-width: 720px){
          .tsv-container{ height:640px; }
          .tsv-node-role{ display:none; }
        }
      `}</style>

      <div className="tsv-wrap">
        <div className="tsv-header">
          <p className="tsv-eyebrow">Architecture</p>
          <h2 className="tsv-title">Notre stack technique</h2>
        </div>
        <div className="tsv-container" ref={rootRef}></div>
      </div>
    </div>
  );
}
// ===== FIN COMPOSANT TECHSTACKVESSELS =====

function App() {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const link1 = useRef(null)
  const link2 = useRef(null)
  const link3 = useRef(null)
  const link4 = useRef(null)
  const link5 = useRef(null)

  const [hasStarted, setHasStarted] = useState(false);

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");

  if (inView && !hasStarted) {
    setHasStarted(true);
  }

  const containerRef = useRef(null);

  const controls = document.querySelectorAll('.btns button');

  controls.forEach(button => {
    button.addEventListener('click', () => {

      controls.forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');
    });
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleMenuClick = (e, ref) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  function sendmail(e) {
    e.preventDefault()

    emailjs.send(
      "service_i8v436d",
      "template_b9m2cap",
      {
        name: name,
        email: email,
        tel: tel,
        objet: objet,
        message: message
      },
      "HwMvvr7DT-GbrxbVP"
    )
      .then((res) => {
        Swal.fire({
          title: 'MESSAGE ENVOYÉ',
          text: 'Merci ! Nous avons bien reçu votre message, nous vous répondrons dans un bref délai.',
          icon: 'success',
          confirmButtonText: 'OK',
          background: "rgb(253, 245, 236)",
          color: "#101010",
          buttonsStyling: false,
          customClass: {
            confirmButton: 'my-custom-btn'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
            window.scrollTo(0, 0);
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'ERREUR',
          text: "Une erreur s'est produite. Merci de réessayer !",
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-custom-btn'
          }
        });
      });
  }

  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <div className="logo">
              <h1><span>A</span>bed</h1>
            </div>

            <div className="links">
              <ul>
                <li><a href="" onClick={(e) => { e.preventDefault(); link1.current.scrollIntoView({ behavior: "smooth" }) }}>Services</a></li>
                <li><a href="" onClick={(e) => { e.preventDefault(); link2.current.scrollIntoView({ behavior: "smooth" }) }}>A propos</a></li>
                <li><a href="" onClick={(e) => { e.preventDefault(); link3.current.scrollIntoView({ behavior: "smooth" }) }}>Portofolio</a></li>
                <li><a href="" onClick={(e) => { e.preventDefault(); link4.current.scrollIntoView({ behavior: "smooth" }) }}>Témoignages</a></li>
                <li><a href="" onClick={(e) => { e.preventDefault(); link5.current.scrollIntoView({ behavior: "smooth" }) }}>Contact</a></li>
              </ul>
            </div>

            <div className="btn-menu"><a href="pdf/cv.pdf" className='btn' download>Voir mon CV <GoArrowRight className='btn-arrow' /></a><HiMiniBars3BottomRight
              className='i'
              onClick={() => setMenuOpen(!menuOpen)}
            /></div>
          </nav>
          {/* Menu mobile dropdown */}
          <div className={`mobile-dropdown-menu ${menuOpen ? 'active' : ''}`}>
            <div className="mobile-dropdown-content">
              <ul>
                <li><a href="" onClick={(e) => handleMenuClick(e, link1)}>Services</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link2)}>A propos</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link3)}>Portofolio</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link4)}>Témoignages</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link5)}>Contact</a></li>
              </ul>
              <div className="mobile-dropdown-footer">
                <a href="pdf/cv.pdf" className='btn-mobile' download>Voir mon CV</a>
                <div className="mobile-social">
                  <a href=""><FaLinkedin /></a>
                  <a href=""><FaFacebookF /></a>
                  <a href=""><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="hero">
        <div className="container">
          <div className="content">
            <div className="txt">
              <h2>👋 Hello , Je suis Abed-Négo Kodjaou</h2>
              <h3>
                <span className='creux'>Développeur</span> <br />
                <span className='color'>Web</span><span className='creux'> & </span><span className='color' >Mobile</span>
              </h3>
            </div>
            <div className="img">
              <img src="/images/abed.png" alt="" />
            </div>
          </div>
        </div>
        <svg class="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,0 C240,100 480,100 720,40 C960,-20 1200,80 1440,0 L1440,120 L0,120 Z" fill="#fafaf8"></path>
        </svg>
      </div>

      <div className='resume' ref={ref}>
        <div className="container">
          <div className="content">
            <div className='ctn'>
              <h6>
                {hasStarted ? <CountUp start={0} end={6} duration={2} /> : '0'}
                <span className='sign'> +</span>
              </h6>
              <p>Projets</p>
            </div>

            <div className='ctn'>
              <h6>
                {hasStarted ? <CountUp start={0} end={1} duration={2} /> : '0'}
                <span className='sign'> +</span>
              </h6>
              <p>Années d'expérience</p>
            </div>

            <div className='ctn'>
              <h6>
                {hasStarted ? <CountUp start={0} end={2} duration={2} /> : '0'}
                <span className='sign'> +</span>
              </h6>
              <p>Clients satisfaits</p>
            </div>

            <div className='ctn'>
              <h6>
                {hasStarted ? <CountUp start={0} end={100} duration={5} /> : '0'}
                <span className='sign'> %</span>
              </h6>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="services" ref={link1}>
        <div className="container">
          <h6 className="title-small"><span></span>Mes services</h6>
          <h3 className='title'>Ce que je propose</h3>

          <div className="cards">
            <div className="card active left">
              <div className='txt'>
                <h4>Développement <span>Web</span></h4>
                <p>
                  Je conçois des sites web modernes, rapides et optimisés pour le référencement naturel (SEO). J’utilise React JS, CSS et les bonnes pratiques UI/UX pour créer des interfaces fluides et intuitives. Chaque projet est pensé pour être responsive, performant et offrir une navigation claire et efficace.
                </p>
              </div>
              <div className="img">
                <img src="/images/web.png" alt="" />
              </div>
            </div>

            <div className="card active right">
              <div className='txt'>
                <h4>Développement <span>Mobile</span></h4>
                <p>
                  Je développe des applications mobiles performantes et agréables à utiliser sur Android et iOS. Avec React Native et Expo, je crée des interfaces fluides, rapides et adaptées aux besoins des utilisateurs. Mes applications sont optimisées pour offrir une expérience stable, moderne et accessible.
                </p>
              </div>
              <div className="img">
                <img src="/images/mobile1.png" alt="" />
              </div>
            </div>

            <div className="card active left">
              <div className='txt'>
                <h4>Api &<span> Backend</span></h4>
                <p>
                  Je conçois des API REST sécurisées et des systèmes backend robustes et évolutifs. J’utilise Node.js et MySQL pour structurer et gérer efficacement les données. Mes solutions garantissent performance, fiabilité et une communication fluide avec les applications frontend.
                </p>
              </div>
              <div className="img">
                <img src="/images/api.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="portofolio" ref={link3}>
        <div className="container">
          <h6 className="title-small"><span></span>Mon portfolio</h6>
          <h3 className='title'>Mon expertise à travers mes projets</h3>

          <div className="contents">
            <div className="btns">
              <button data-filter="all" className='active'>Tout</button>
              <button data-filter=".web">Développement Web <CiGlobe /></button>
              <button data-filter=".mobile">Développement Mobile <IoPhonePortraitOutline /></button>
            </div>

            <div className="content" ref={containerRef}>
              <div className="mix web icc">
                <div className="url">
                  <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                  </div>
                  <div className="bars">
                    <FaLock className='i' />
                    <p>iccoccitanie.com</p>
                  </div>
                </div>
                <div className="img">
                  <div className="overlay">
                    <a href="https://iccoccitanie.com/" target="_blank">
                      <FaLink className="i" />
                    </a>
                  </div>
                </div>
                <div className="info">
                  <span className='type'><CiGlobe /></span>
                  <h4>Site web de l'Eglise <span>ICC Occitanie</span></h4>
                  <div className="stacks"><span className='type'>Html</span><span className='type'>css</span><span className='type'>Js</span><span className='type'>Php</span></div>
                  <a href="https://iccoccitanie.com/" target="_blank" >Voir le projet <IoIosArrowRoundForward className='i' /></a>
                </div>
              </div>
              <div className="mix web ufem">
                <div className="url">
                  <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                  </div>
                  <div className="bars">
                    <FaLock className='i' />
                    <p>ufem-association.com</p>
                  </div>
                </div>
                <div className="img">
                  <div className="overlay">
                    <a href="https://ufem-association.com" target="_blank">
                      <FaLink className="i" />
                    </a>
                  </div>
                </div>
                <div className="info">
                  <span className='type'><CiGlobe /></span>
                  <h4>Site web de L'<span>UFEM</span></h4>
                  <div className="stacks"><span className='type'>Html</span><span className='type'>css</span><span className='type'>Js</span><span className='type'>Php</span></div>
                  <a href="https://ufem-association.com" target="_blank" >Voir le projet <IoIosArrowRoundForward className='i' /></a>
                </div>
              </div>
              <div className="mix web yadah">
                <div className="url">
                  <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                  </div>
                  <div className="bars">
                    <FaLock className='i' />
                    <p>Yadahrecords.com</p>
                  </div>
                </div>
                <div className="img">
                  <div className="overlay">
                    <a href="https://forestgreen-dog-894166.hostingersite.com/index.html" target="_blank">
                      <FaLink className="i" />
                    </a>
                  </div>
                </div>
                <div className="info">
                  <span className='type'><CiGlobe /></span>
                  <h4>Site web du label <span>Yadah Records</span></h4>
                  <div className="stacks"><span className='type'>Html</span><span className='type'>css</span><span className='type'>Js</span><span className='type'>Php</span></div>
                  <a href="https://forestgreen-dog-894166.hostingersite.com/index.html" target="_blank" >Voir le projet <IoIosArrowRoundForward className='i' /></a>
                </div>
              </div>
              <div className="mix web one-piece">
                <div className="url">
                  <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                  </div>
                  <div className="bars">
                    <FaLock className='i' />
                    <p>onepieceinvest.com</p>
                  </div>
                </div>
                <div className="img">
                  <div className="overlay">
                    <a href="https://onepieceinvest.com/" target="_blank">
                      <FaLink className="i" />
                    </a>
                  </div>
                </div>
                <div className="info">
                  <span className='type'><CiGlobe /></span>
                  <h4>Site web de <span>One Piece</span></h4>
                  <div className="stacks"><span className='type'>Html</span><span className='type'>css</span><span className='type'>Js</span><span className='type'>Php</span></div>
                  <a href="https://onepieceinvest.com/" target="_blank" >Voir le projet <IoIosArrowRoundForward className='i' /></a>
                </div>
              </div>
              <div className="mix web kafi">
                <div className="url">
                  <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                  </div>
                  <div className="bars">
                    <FaLock className='i' />
                    <p>kafiexpress.com</p>
                  </div>
                </div>
                <div className="img">
                  <div className="overlay">
                    <a href="https://violet-ibex-368210.hostingersite.com/" target="_blank">
                      <FaLink className="i" />
                    </a>
                  </div>
                </div>
                <div className="info">
                  <span className='type'><CiGlobe /></span>
                  <h4>Site web de <span>Kafi Express</span></h4>
                  <div className="stacks"><span className='type'>Html</span><span className='type'>css</span><span className='type'>Js</span><span className='type'>Php</span></div>
                  <a href="https://violet-ibex-368210.hostingersite.com/" target="_blank" >Voir le projet <IoIosArrowRoundForward className='i' /></a>
                </div>
              </div>
              <div className="mix web mediatique">
                <div className="url">
                  <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                  </div>
                  <div className="bars">
                    <FaLock className='i' />
                    <p>mediatiqueinternational.com</p>
                  </div>
                </div>
                <div className="img">
                  <div className="overlay">
                    <a href="https://limegreen-tapir-822899.hostingersite.com/" target="_blank">
                      <FaLink className="i" />
                    </a>
                  </div>
                </div>
                <div className="info">
                  <span className='type'><CiGlobe /></span>
                  <h4>Site web de <span>Médiatique International</span></h4>
                  <div className="stacks"><span className='type'>Html</span><span className='type'>css</span><span className='type'>Js</span><span className='type'>Php</span></div>
                  <a href="https://limegreen-tapir-822899.hostingersite.com/" target="_blank" >Voir le projet <IoIosArrowRoundForward className='i' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stacks">
        <div className="container">
          <h6 className="title-small"><span></span>Stack technique</h6>
          <h3 className='title'>Mes outils de développement</h3>

          <div className="stacks-icons-grid">
            <div className="tech-card">
              <div className="tech-icon">
                <FaReact />
              </div>
              <h4>React.js</h4>
              <p>Frontend</p>
            </div>

            <div className="tech-card">
              <div className="tech-icon">
                <FaNodeJs />
              </div>
              <h4>Node.js</h4>
              <p>Backend</p>
            </div>

            <div className="tech-card">
              <div className="tech-icon">
                <TbBrandReactNative />
              </div>
              <h4>React Native</h4>
              <p>Mobile</p>
            </div>

            <div className="tech-card">
              <div className="tech-icon">
                <FaDatabase />
              </div>
              <h4>Mysql</h4>
              <p>Base de données</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta">
        <h2>Alors avez vous un super projet <br />
          en tête ? <span>Discutons-en.</span></h2>
        <div className="btn-cta">
          <a href="https://wa.me/+2290168364255">Ecrivez-moi sur WhatsApp</a>
          <a href="mailto:abnegko@gmail.com" className='a-black'>Laissez moi un mail</a>
        </div>
      </div>

      <div className="contact" ref={link5}>
        <div className="container">
          <h6 className="title-small"><span></span>Contact</h6>
          <h3 className='title'>Discutons de votre projet</h3>

          <div className="contents">
            <form action="" onSubmit={sendmail}>
              <div className="inputs">
                <input type="text" placeholder='Entrer votre nom et prénoms' onChange={(e) => { setName(e.target.value) }} required />
                <input type="email" placeholder='Entrer votre addresse mail' onChange={(e) => { setEmail(e.target.value) }} required />
              </div>
              <div className="inputs">
                <input type="tel" placeholder='Entrer votre numéro de téléphone' onChange={(e) => { setTel(e.target.value) }} required />
                <input type="text" placeholder='Objet de votre message' onChange={(e) => { setObjet(e.target.value) }} required />
              </div>
              <div className="inputs"><textarea name="" id="" placeholder='Ecrivez votre message ici...' onChange={(e) => { setMessage(e.target.value) }} required></textarea></div>
              <div className="inputs"><button type='submit'>Envoyer</button></div>
            </form>
            <div className="info-reseau">
              <div className="d-flex">
                <div className="icon"><FaLocationDot className='i' /></div>
                <div className="info">
                  <h2>Adresse</h2>
                  <p>Bénin , calavi</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="icon"><FaPhoneVolume className='i' /></div>
                <div className="info">
                  <h2>Téléphone</h2>
                  <p>+2290168364255</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="icon"><SiGmail className='i' /></div>
                <div className="info">
                  <h2>Email</h2>
                  <p>abnegko@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NOUVELLE SECTION STACK AVEC TECHSTACKVESSELS ===== */}
      <section className='stack-section'>
        <div className="container">
          <div className="title-content center">
            <span className="title-badge"><BsStars /> Stack technique</span>
            <h2 className='title'>Un <span>stack moderne</span> pour des solutions performantes</h2>
          </div>
          <TechStackVessels />
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="contents">
            <div className="logo">
              <h1><span>A</span>bed</h1>
            </div>
            <div className="reseaux">
              <a href=""><FaLinkedin /></a>
              <a href=""><FaFacebookF /></a>
              <a href=""><FaInstagram /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App