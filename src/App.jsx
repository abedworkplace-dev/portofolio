import { useState, useRef, useEffect } from 'react'
import './App.css'
import './responsive.css'
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaLock, FaLink, FaReact, FaNodeJs, FaDatabase, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiMiniBars3BottomRight, HiXMark } from "react-icons/hi2";
import { FaLocationDot, FaPhoneVolume, FaLinkedin } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import mixitup from "mixitup";
import { SiGit, SiGmail } from "react-icons/si";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2';
import { GoArrowRight } from "react-icons/go";
import { MdLocationPin } from "react-icons/md";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { IoStar } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import axios from "axios";
import {
  FiSmartphone,
  FiArrowRight,
  FiArrowUpRight,
  FiGrid,
  FiDownload,
  FiAward
} from "react-icons/fi";
import {
  FaEnvelope,
  FaPaperPlane,
  FaWhatsapp
} from "react-icons/fa6";
import {
  FaCircleCheck
} from "react-icons/fa6";
import {
  LuPalette,
  LuMapPin,
  LuGraduationCap,
  LuBriefcase,
  LuTarget,
  LuUserCheck,
  LuLanguages
} from "react-icons/lu";
import { AiOutlineDatabase } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import {
  SiWordpress,
  SiReact,
  SiVite,
  SiVercel,
  SiGithub,
  SiPhp,
  SiExpress,
  SiNodedotjs,
  SiMysql,
  SiTailwindcss
} from "react-icons/si";

function App() {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [activeStack, setActiveStack] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const link1 = useRef(null)
  const link2 = useRef(null)
  const link3 = useRef(null)
  const link4 = useRef(null)
  const link5 = useRef(null)

  const [hasStarted, setHasStarted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);


  // Gestion du Preloader
  useEffect(() => {
    let pageLoaded = document.readyState === "complete";
    let t1, t2;

    const onLoad = () => {
      pageLoaded = true;
    };

    if (!pageLoaded) {
      window.addEventListener("load", onLoad);
    }

    const startTime = Date.now();
    const minDuration = 1400; // Durée minimale fluide (1.4s)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);

      if (pageLoaded && timeRatio >= 1) {
        setProgress(100);
        clearInterval(interval);
        t1 = setTimeout(() => setIsFadingOut(true), 200);
        t2 = setTimeout(() => setIsLoading(false), 800);
      } else {
        const target = Math.min(Math.floor(timeRatio * 92), 92);
        setProgress((prev) => (target > prev ? target : prev));
      }
    }, 30);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // Bloque le scroll pendant le chargement ou quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen || isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen, isLoading]);

  if (inView && !hasStarted) {
    setHasStarted(true);
  }

  // x / y en % — color = couleur officielle de la marque
  const STACKS_DATA = [
    { id: 1, name: "React.js", role: "Frontend", x: 32, y: 14, color: "#149ECA", icon: <SiReact /> },
    { id: 2, name: "Node.js", role: "Backend", x: 68, y: 14, color: "#5FA04E", icon: <SiNodedotjs /> },
    { id: 3, name: "React Native", role: "Mobile", x: 14, y: 36, color: "#149ECA", icon: <TbBrandReactNative /> },
    { id: 4, name: "MySQL", role: "Database", x: 86, y: 36, color: "#00758F", icon: <SiMysql /> },
    { id: 5, name: "PHP", role: "Backend", x: 14, y: 64, color: "#777BB3", icon: <SiPhp /> },
    { id: 6, name: "Express", role: "API / Framework", x: 86, y: 64, color: "#111111", icon: <SiExpress /> },
    { id: 7, name: "Tailwind CSS", role: "Styling / UI", x: 32, y: 86, color: "#06B6D4", icon: <SiTailwindcss /> },
    { id: 8, name: "Git", role: "Version Control", x: 68, y: 86, color: "#ce3c13", icon: <SiGit /> },
  ];

  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) =>
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      })
    );
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const cx = size.w / 2;
  const cy = size.h / 2;

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

  // État pour le filtre portfolio
  const [filter, setFilter] = useState("all");

  const projectsData = [
    {
      id: 1,
      title: "ICC Occitanie",
      category: "web",
      categoryLabel: "Plateforme Événementielle",
      role: "Développement web & Intégration UI",
      year: "2025",
      status: "En production",
      description: "Plateforme web complète avec agenda dynamique des rassemblements, streaming des cultes et système de réservation en ligne.",
      stacks: ["HTML5", "CSS3", "JavaScript", "PHP"],
      image: "/images/icc.png",
      link: "https://iccoccitanie.com/"
    },
    /*{
      id: 2,
      title: "Kafi Express",
      category: "web",
      categoryLabel: "Fintech & Inclusion",
      role: "Développement Frontend & API",
      year: "2024",
      status: "En production",
      description: "Solution digitale de financement alternatif et d'inclusion bancaire pensée pour propulser les bâtisseurs et micro-entrepreneurs.",
      stacks: ["React.js", "Tailwind CSS", "Express", "REST API"],
      image: "/images/kafi.png",
      link: "https://violet-ibex-368210.hostingersite.com/"
    }*/,
    /*{
      id: 3,
      title: "Yadah Records",
      category: "web",
      categoryLabel: "Culture & Musique",
      role: "Expérience Utilisateur & Intégration",
      year: "2024",
      status: "En ligne",
      description: "Vitrine interactive pour un label de musique moderne intégrant le catalogue des artistes, discographies et écoute audio fluide.",
      stacks: ["JavaScript", "HTML5", "CSS3", "PHP"],
      image: "/images/yadah.png",
      link: "https://forestgreen-dog-894166.hostingersite.com/index.html"
    }*/,
    {
      id: 4,
      title: "One Piece Invest",
      category: "web",
      categoryLabel: "Corporate & Négoce",
      role: "Développement web & Intégration UI",
      year: "2025",
      status: "En production",
      description: "Portail institutionnel sécurisé pour un bureau d’achat et d’exportation de métaux précieux mettant en avant l'éthique et la traçabilité.",
      stacks: ["HTML5", "CSS3", "JavaScript", "PHP"],
      image: "/images/onepiece.png",
      link: "https://onepieceinvest.com/"
    },
    /*{
      id: 5,
      title: "UFEM Association",
      category: "web",
      categoryLabel: "Organisation & ONG",
      role: "Développement Fullstack",
      year: "2024",
      status: "En production",
      description: "Portail associatif officiel destiné à fédérer les églises partenaires en France avec gestion centralisée des adhésions et documents.",
      stacks: ["PHP", "MySQL", "JavaScript", "CSS3"],
      image: "/images/ufem.png",
      link: "https://ufem-association.com"
    }*/,
    {
      id: 6,
      title: "Médiatique International",
      category: "web",
      categoryLabel: "Cabinet Stratégique",
      role: "Développement web",
      year: "2025",
      status: "En ligne",
      description: "Site de référence pour un cabinet de conseil en influence et leadership stratégique auprès de décideurs internationaux.",
      stacks: ["HTML5", "CSS3", "JavaScript", "PHP"],
      image: "/images/mediatique.png",
      link: "https://limegreen-tapir-822899.hostingersite.com/"
    }, {
      id: 7,
      title: "Central Luxe",
      category: "web",
      categoryLabel: "Boutique en ligne",
      role: "Développement Full Stack",
      year: "2026",
      status: "En ligne",
      description: "Développement Full Stack d'une boutique de montres avec une interface moderne, un back-office d'administration et une API REST connectée à une base de données MySQL pour la gestion des produits et des commandes.",
      stacks: ["React.js", "Redux", "CSS", "Axios", "Node.js", "Express.js", "MySQL"],
      image: "/images/central-luxe.png",
      link: "https://centrale-luxe.vercel.app/"
    }, {
      id: 8,
      title: "Hadithi Publishers",
      category: "web",
      categoryLabel: "Édition & Publication",
      role: "Développement Full Stack",
      year: "2026",
      status: "En ligne",
      description: "Développement Full Stack d'une plateforme d'édition et de publication de livres avec un back-office d'administration, un CRM et une API REST connectée à une base de données MySQL pour la gestion des auteurs, manuscrits et publications.",
      stacks: ["React.js", "Redux", "Tailwind CSS", "Axios", "Node.js", "Express.js", "MySQL"],
      image: "/images/hadithi.png",
      link: "https://linen-cassowary-757431.hostingersite.com/"
    }
  ];

  const countAll = projectsData.length;
  const countWeb = projectsData.filter((p) => p.category === "web").length;
  const countMobile = projectsData.filter((p) => p.category === "mobile").length;

  const filteredProjects = filter === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === filter);


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await axios.post(`${API_URL}/api/contact`, {
        name,
        email,
        service,
        message,
      });

      if (response.data.success) {
        Swal.fire({
          title: "MESSAGE ENVOYÉ",
          text: "Merci ! Votre message a bien été envoyé, je vous répondrai dans les plus brefs délais.",
          icon: "success",
          confirmButtonText: "OK",
          background: "rgb(253, 245, 236)",
          color: "#101010",
          buttonsStyling: false,
          customClass: {
            confirmButton: "my-custom-btn",
          },
        });

        // Réinitialiser le formulaire
        setName("");
        setEmail("");
        setService("");
        setMessage("");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "Impossible d'envoyer le message pour le moment. Merci de réessayer !";

      Swal.fire({
        title: "ERREUR",
        text: errMsg,
        icon: "error",
        confirmButtonText: "OK",
        background: "rgb(253, 245, 236)",
        color: "#101010",
        buttonsStyling: false,
        customClass: {
          confirmButton: "my-custom-btn",
        },
      });
    } finally {
      setIsSending(false);
    }
  };



  return (
    <div>
      {isLoading && (
        <div className={`preloader ${isFadingOut ? "fade-out" : ""}`} aria-hidden="true">
          <div className="preloader-glow"></div>

          <div className="preloader-content">
            <div className="preloader-logo">
              <span>A</span>bed<span className="preloader-dot">.</span>
            </div>

            <p className="preloader-subtitle">Développeur Web & Mobile</p>

            <div className="preloader-bar-wrap">
              <div
                className="preloader-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <span className="preloader-percent">{progress}%</span>
          </div>
        </div>
      )}

      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            {/* Logo Abed épuré */}
            <div className="logo">
              <h1><span>A</span>bed</h1>
            </div>

            {/* Liens de navigation avec correction et ajout de la Stack */}
            <div className="links">
              <ul>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); link1.current?.scrollIntoView({ behavior: "smooth" }) }}>Services</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); link2.current?.scrollIntoView({ behavior: "smooth" }) }}>À propos</a></li>
                <li><a href="#stacks" onClick={(e) => { e.preventDefault(); document.getElementById('stacks')?.scrollIntoView({ behavior: "smooth" }) }}>Stack</a></li>
                <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); link3.current?.scrollIntoView({ behavior: "smooth" }) }}>Portfolio</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); link5.current?.scrollIntoView({ behavior: "smooth" }) }}>Contact</a></li>
              </ul>
            </div>

            {/* Bouton CV et bouton burger / croix */}
            <div className="btn-menu">

              <a href="pdf/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn download" download>
                Mon CV
                <span><FiDownload /></span>
              </a>

              {/* Alterne entre burger et croix selon si menuOpen est vrai ou faux */}
              <button
                className="btn-burger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <FaTimes className="i" /> : <HiMiniBars3BottomRight className="i" />}
              </button>
            </div>
          </nav>

          {/* Menu mobile dropdown */}
          <div className={`mobile-dropdown-menu ${menuOpen ? 'active' : ''}`}>
            <div className="mobile-dropdown-content">
              <ul>
                <li><a href="" onClick={(e) => handleMenuClick(e, link1)}>Services</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link2)}>A propos</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link3)}>Portofolio</a></li>
                <li><a href="" onClick={(e) => handleMenuClick(e, link5)}>Contact</a></li>
              </ul>
              <div className="mobile-dropdown-footer">
                <a href="pdf/cv.pdf" className='btn-mobile' download>Télécharger mon CV</a>
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

      {/* HERO SECTION */}
      <div className="hero">
        {/* 1. Couche décorative de fond (coins du hero) */}
        <div className="hero-patterns" aria-hidden="true">
          <span className="pattern-dots"></span>
          <span className="pattern-tr-glow"></span>
          <span className="pattern-bl-blob"></span>
          <span className="pattern-br-arc"></span>
        </div>
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
              <div className="content-left">
                <p> <span>Ma mission :</span> J'aide les entreprises à gagner en efficacité grâce à des applications web et mobiles conçues pour leurs besoins.</p>
                <div className="avatar-group">
                  <div className="avatars">
                    <img className="avatar" style={{ zIndex: 4 }} src="https://randomuser.me/api/portraits/women/1.jpg" alt="Client 1" />
                    <img className="avatar" style={{ zIndex: 3 }} src="https://randomuser.me/api/portraits/men/2.jpg" alt="Client 2" />
                    <img className="avatar" style={{ zIndex: 2 }} src="https://randomuser.me/api/portraits/women/3.jpg" alt="Client 3" />
                    <img className="avatar" style={{ zIndex: 1 }} src="https://randomuser.me/api/portraits/men/4.jpg" alt="Client 4" />
                  </div>
                  <span className="avatar-count">+10 clients</span>
                </div>

                <a href="https://wa.me/+2290168364255" target="_blank" rel="noopener noreferrer" className="btn">
                  Discutons de votre projet
                  <span><FiArrowRight /></span>
                </a>
              </div>
              {/* 2. Cercle pêche + étincelles ancrés au portrait */}
              <span className="hero-portrait-circle" aria-hidden="true"></span>
              <svg
                className="hero-portrait-sparks"
                aria-hidden="true"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path d="M12 24L4 16" stroke="#CE3C13" strokeWidth="3" strokeLinecap="round" />
                <path d="M21 17L17 5" stroke="#CE3C13" strokeWidth="3" strokeLinecap="round" />
                <path d="M10 31L2 30" stroke="#CE3C13" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <img src="/images/abed.png" alt="Kodjaou Abed-Négo" className='me' />
              <div className="content-right">
                <div className="figma-cursor" id="cursor">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5056 10.7754C21.1225 10.5355 21.431 10.4155 21.5176 10.2459C21.5926 10.099 21.5903 9.92446 21.5115 9.77954C21.4205 9.61226 21.109 9.50044 20.486 9.2768L4.59629 3.5728C4.0866 3.38983 3.83175 3.29835 3.66514 3.35605C3.52029 3.40621 3.40645 3.52004 3.35629 3.6649C3.29859 3.8315 3.39008 4.08635 3.57304 4.59605L9.277 20.4858C9.50064 21.1088 9.61246 21.4203 9.77973 21.5113C9.92465 21.5901 10.0991 21.5924 10.2461 21.5174C10.4157 21.4308 10.5356 21.1223 10.7756 20.5054L13.3724 13.8278C13.4194 13.707 13.4429 13.6466 13.4792 13.5957C13.5114 13.5506 13.5508 13.5112 13.5959 13.479C13.6468 13.4427 13.7072 13.4192 13.828 13.3722L20.5056 10.7754Z"
                      fill="#CE3C13"
                    />
                  </svg>
                  <div className="label">design premium</div>
                </div>

                <div className="status-badge">
                  <span className="status-dot"></span>
                  Toujours actif
                </div>


                <div className="location-badge">
                  <span className="location-icon">
                    <LuMapPin />
                  </span>
                  Basé au Bénin • Cotonou
                </div>

                <div className="social-medias">
                  <a href=""><FaInstagram /></a>
                  <a href="" className='linkedin'><FaLinkedin /></a>
                  <a href=""><FaFacebookF /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg className="hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,0 C240,100 480,100 720,40 C960,-20 1200,80 1440,0 L1440,120 L0,120 Z" fill="#fff"></path>
        </svg>
      </div>

      {/* SERVICES */}
      <section className='services' ref={link1}>
        {/* Pointillés carrés en arrière-plan */}
        <div className="services-patterns" aria-hidden="true">
          <span className="srv-pattern-dots srv-dots-tr"></span>
        </div>

        <div className="container">
          <div className="title-content center">
            <span className="title-badge"><BsStars /> Mes services</span>
            <h2 className='title'>Des <span>solutions digitales</span> pensées pour vos projets</h2>
          </div>

          <div className="content">
            <div className="img">
              {/* Étincelles orientées en haut à droite de l'image */}
              <svg
                className="services-img-sparks"
                aria-hidden="true"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path d="M10 20L13 4" stroke="#CE3C13" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M16 24L29 11" stroke="#CE3C13" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M20 31L36 28" stroke="#CE3C13" strokeWidth="3.2" strokeLinecap="round" />
              </svg>

              <img src="/images/undraw_morning-work_v5jo.png" alt="Illustration services" />
              <a href="https://wa.me/+2290168364255" target="_blank" rel="noopener noreferrer" className="btn d-none">
                Demander une prestation
                <span><FiArrowRight /></span>
              </a>
            </div>

            <div className="cards">
              <div className="card active">
                <div className="card-icon"><CiGlobe className='i' /></div>
                <h5>Development web</h5>
                <p>Conception et développement d'applications web complètes, modernes et performantes, du frontend au backend, avec des solutions adaptées aux besoins de chaque projet.</p>
                <span>01</span>
              </div>

              <div className="card">
                <div className="card-icon">
                  <FiSmartphone className='i' />
                </div>
                <h5>Development Mobile</h5>
                <p>
                  Création d'applications mobiles intuitives et performantes,
                  offrant une expérience fluide sur Android et iOS grâce à des technologies modernes.
                </p>
                <span className="card-number">02</span>
              </div>

              <div className="card">
                <div className="card-icon"><LuPalette className='i' /></div>
                <h5>UI/UX Integration</h5>
                <p>Transformation de maquettes en interfaces modernes, responsives et fidèles aux designs, avec une attention particulière portée à l'expérience utilisateur.</p>
                <span>03</span>
              </div>

              <div className="card">
                <div className="card-icon"><AiOutlineDatabase className='i' /></div>
                <h5>API & Intégration</h5>
                <p>Conception et intégration d'API robustes pour connecter les applications, gérer les données et assurer une communication efficace entre les différents services.</p>
                <span>04</span>
              </div>
            </div>
          </div>
          <a href="https://wa.me/+2290168364255" target="_blank" rel="noopener noreferrer" className="btn d-block">
            Demander une prestation
            <span><FiArrowRight /></span>
          </a>
        </div>
      </section>

      {/* =========================================
          NOUVELLE SECTION À PROPOS (STICKY SPOTLIGHT)
      ========================================= */}
      <section className="about-showcase-section" id="about" ref={link2}>
        <div className="container">

          <div className="title-content about-section-title">
            <span className="title-badge"><BsStars /> À propos de moi</span>
            <h2 className='title'>Bâtisseur de <span>solutions digitales</span></h2>
          </div>

          <div className="about-layout">

            {/* Colonne Gauche : Grande photo & carte identitaire fixée au scroll */}
            <div className="about-sticky-side">
              <div className="about-photo-card">
                <div className="about-arch-backdrop">
                  <img
                    src="/images/about.png"
                    alt="Kodjaou Abed-Négo"
                    className="about-portrait-img"
                  />
                </div>

                <div className="about-photo-content">

                  <h3 className="about-person-name">Kodjaou Abed-Négo</h3>
                  <p className="about-person-location">
                    <LuMapPin /> Bénin • Abomey-Calavi / Cotonou
                  </p>




                  <a href="pdf/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn download" download>
                    Télécharger mon CV
                    <span><FiDownload /></span>
                  </a>

                </div>
              </div>
            </div>

            {/* Colonne Droite : Contenu riche et stylisé qui scroll proprement */}
            <div className="about-scroll-side">

              {/* 1. Bio & Définition */}
              <div className="about-card-block">
                <div className="card-header-icon">
                  <LuUserCheck className="block-icon" />
                  <h4>Qui suis-je ?</h4>
                </div>
                <p className="about-intro-txt">
                  Je suis <strong>Kodjaou Abed-Négo</strong>, développeur web et mobile fullstack passionné par la conception de produits numériques à forte valeur ajoutée.
                </p>
                <p className="about-desc-txt">
                  Spécialisé dans l’écosystème <strong>JavaScript moderne (React, React Native, Node.js)</strong> ainsi que <strong>PHP et MySQL</strong>, je transforme des problématiques métier complexes en solutions fluides, ergonomiques et résilientes. Mon approche allie la rigueur du code, le respect minutieux des maquettes UI/UX et l'optimisation maximale des performances.
                </p>

                <div className="about-mini-points">
                  <div className="point-item">
                    <FaCircleCheck className="pt-icon" />
                    <span>Intégration pixel-perfect fidèle aux designs Figma</span>
                  </div>
                  <div className="point-item">
                    <FaCircleCheck className="pt-icon" />
                    <span>APIs REST sécurisées et structuration de bases de données</span>
                  </div>
                  <div className="point-item">
                    <FaCircleCheck className="pt-icon" />
                    <span>Applications mobiles natives multiplateformes iOS & Android</span>
                  </div>
                </div>
              </div>

              {/* 3. Expérience Professionnelle */}
              <div className="about-card-block">
                <div className="card-header-icon">
                  <LuBriefcase className="block-icon" />
                  <h4>Expérience Professionnelle</h4>
                </div>

                <div className="experience-timeline">

                  {/* Poste 1 : Développeur Web Junior (Actuel) */}
                  <div className="timeline-node">
                    <div className="node-marker">
                      <span className="marker-dot active-dot"></span>
                      <span className="marker-line"></span>
                    </div>
                    <div className="node-body">
                      <div className="node-top">
                        <div className="company-badge-wrap">

                          <img
                            src="https://publicaffairsafrica.com/assets/img/logo/favicon.png"
                            alt="Logo PAA"
                            className="company-logo-img"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          /><span className="node-company">PAA</span>
                        </div>
                        <span className="node-period active-period">Décembre 2025 - Actuel</span>
                      </div>
                      <h5 className="node-title">Développeur Web Junior</h5>
                      <ul className="node-tasks">
                        <li>
                          <FaCircleCheck className="task-bullet" />
                          <span><strong>Développement & maintenance :</strong> conception d’applications web performantes, scalables et centrées sur les besoins utilisateurs.</span>
                        </li>
                        <li>
                          <FaCircleCheck className="task-bullet" />
                          <span><strong>Backend & Architecture :</strong> mise en place d'APIs REST, sécurisation des flux et requêtage optimisé sur bases MySQL.</span>
                        </li>
                        <li>
                          <FaCircleCheck className="task-bullet" />
                          <span><strong>Collaboration agile :</strong> travail de concert avec les équipes produit et designers pour des livrables de haute qualité.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Poste 2 : Stage Professionnel (Mai - Décembre 2025) */}
                  <div className="timeline-node">
                    <div className="node-marker">
                      <span className="marker-dot"></span>
                      <span className="marker-line"></span>
                    </div>
                    <div className="node-body">
                      <div className="node-top">
                        <div className="company-badge-wrap">

                          <img
                            src="https://publicaffairsafrica.com/assets/img/logo/favicon.png"
                            alt="Logo PAA"
                            className="company-logo-img"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          /><span className="node-company">PAA</span>
                        </div>
                        <span className="node-period">Mai 2025 - Décembre 2025</span>
                      </div>
                      <h5 className="node-title">Stage Professionnel — Développeur Web</h5>
                      <ul className="node-tasks">
                        <li>
                          <FaCircleCheck className="task-bullet" />
                          <span><strong>Intégration d’interfaces modernes & responsive :</strong> conversion fidèle des maquettes Figma en composants interactifs fluides.</span>
                        </li>
                        <li>
                          <FaCircleCheck className="task-bullet" />
                          <span><strong>Optimisation des performances :</strong> amélioration des temps de chargement et compatibilité multi-navigateurs.</span>
                        </li>
                        <li>
                          <FaCircleCheck className="task-bullet" />
                          <span><strong>Montée en compétences :</strong> immersion dans les bonnes pratiques de code en équipe, versioning Git et revues de code.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* 4. Cursus Scolaire & Formation */}
              <div className="about-card-block">
                <div className="card-header-icon">
                  <LuGraduationCap className="block-icon" />
                  <h4>Cursus Scolaire & Formations</h4>
                </div>

                <div className="education-card">
                  <div className="edu-icon-box">
                    <FiAward />
                  </div>
                  <div className="edu-info">
                    <span className="edu-year">2023 - 2024</span>
                    <h5>Licence en Système Informatique et Logiciel</h5>
                    <p className="edu-school">HECM (Haute École de Commerce et de Management) • Calavi, Bénin</p>
                    <p className="edu-summary">
                      Formation approfondie aux fondamentaux de l'informatique : algorithmique avancée, génie logiciel, modélisation relationnelle (Merise / UML), programmation orientée objet, architecture des systèmes et administration de bases de données.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STACK TECHNIQUE */}
      <section className="stacks-section" id="stacks">
        <div className="container">
          <div className="title-content center">
            <span className="title-badge"><BsStars />Stack technique</span>
            <h2 className='title'>Mes <span>outils</span> de développement</h2>
          </div>

          <div
            ref={wrapperRef}
            className={`hub-wrapper ${visible ? "is-visible" : ""} ${activeStack ? "has-active" : ""}`}
          >
            {size.w > 0 && (
              <svg
                className="hub-connections"
                viewBox={`0 0 ${size.w} ${size.h}`}
                aria-hidden="true"
              >
                {STACKS_DATA.map((item, i) => {
                  const x = (item.x / 100) * size.w;
                  const y = (item.y / 100) * size.h;
                  const midY = (cy + y) / 2;
                  const d = `M ${cx} ${cy} C ${cx} ${midY}, ${x} ${midY}, ${x} ${y}`;
                  const isActive = activeStack?.id === item.id;

                  return (
                    <g key={item.id} style={{ "--c": item.color, "--i": i }}>
                      <path
                        d={d}
                        pathLength="1"
                        fill="none"
                        className={`hub-trace ${isActive ? "active-trace" : ""}`}
                      />
                      {isActive && (
                        <path
                          d={d}
                          pathLength="1"
                          fill="none"
                          className="hub-signal"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            <div className="hub-core" aria-hidden="true">
              <div className="core-pulse" />
              <div className="core-pulse core-pulse-delay" />
              <div className="core-sphere" />
            </div>

            <div className="hub-nodes">
              {STACKS_DATA.map((item, i) => {
                const isActive = activeStack?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`hub-node-item ${isActive ? "is-active" : ""}`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      "--c": item.color,
                      "--i": i,
                    }}
                    tabIndex={0}
                    onMouseEnter={() => setActiveStack(item)}
                    onMouseLeave={() => setActiveStack(null)}
                    onFocus={() => setActiveStack(item)}
                    onBlur={() => setActiveStack(null)}
                  >
                    <div className="node-float">
                      <div className="node-box">
                        <span className="node-icon">{item.icon}</span>
                      </div>
                      <div className="node-badge">
                        <span className="node-title">{item.name}</span>
                        <span className="node-role">{item.role}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="portfolio-section" id="portfolio" ref={link3}>
        <div className="container">
          <div className="portfolio-header">
            <div className="title-content">
              <span className="title-badge">
                <BsStars /> Travaux choisis
              </span>
              <h2 className="title">
                Des projets <span>conçus pour impacter</span>
              </h2>
            </div>

            <div className="portfolio-segmented-tabs">
              <button
                className={`tab-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                <FiGrid className="tab-icon" />
                <span>Tous</span>
                <span className="tab-count">{countAll}</span>
              </button>
              <button
                className={`tab-btn ${filter === "web" ? "active" : ""}`}
                onClick={() => setFilter("web")}
              >
                <CiGlobe className="tab-icon" />
                <span>Web Apps</span>
                <span className="tab-count">{countWeb}</span>
              </button>
              <button
                className={`tab-btn ${filter === "mobile" ? "active" : ""}`}
                onClick={() => setFilter("mobile")}
              >
                <FiSmartphone className="tab-icon" />
                <span>Mobile</span>
                <span className="tab-count">{countMobile}</span>
              </button>
            </div>
          </div>

          <div className="portfolio-grid-showcase">
            {filteredProjects.map((project) => (
              <article key={project.id} className="showcase-card">
                <div className="mockup-bar">
                  <div className="browser-dots">
                    <span className="dot dot-close"></span>
                    <span className="dot dot-min"></span>
                    <span className="dot dot-max"></span>
                  </div>
                  <div className="browser-address">
                    <FaLock className="lock-icon" />
                    <span>{project.title.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <span className="live-status">
                    <span className="status-ping"></span>
                    {project.status}
                  </span>
                </div>

                <div className="mockup-screen">
                  <img
                    src={project.image}
                    alt={`Aperçu de ${project.title}`}
                    loading="lazy"
                  />
                  <div className="screen-overlay">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="overlay-preview-btn"
                      aria-label={`Explorer le projet ${project.title}`}
                    >
                      Explorer le site <FiArrowUpRight />
                    </a>
                  </div>
                </div>

                <div className="card-details">
                  <div className="details-meta">
                    <span className="project-category">{project.role}</span>
                    <span className="project-year">{project.year}</span>
                  </div>

                  <div className="details-header">
                    <h3 className="project-title">{project.title}</h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-action-link"
                      aria-label={`Visiter ${project.title}`}
                    >
                      <FiArrowUpRight />
                    </a>
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <div className="project-tech-pills">
                    {project.stacks.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION 
      <div className="cta" ref={link5}>
        <div className="container">
          <h2>Alors avez-vous un super projet <br /> en tête ? <span>Discutons-en.</span></h2>
          <div className="btn-cta">
            <a href="https://wa.me/+2290168364255" target="_blank" rel="noopener noreferrer">Écrivez-moi sur WhatsApp</a>
            <a href="mailto:abnegko@gmail.com" className='a-black'>Laissez-moi un mail</a>
          </div>
        </div>
      </div>*/}


      {/* =========================================
          SECTION CONTACT (FIDÈLE À L'IDENTITÉ DU SITE)
      ========================================= */}
      <section className="contact-showcase-section" id="contact" ref={link5}>
        <div className="container">
          <div className="contact-showcase-grid">

            {/* Colonne Gauche : Titre, pitch & coordonnées */}
            <div className="contact-left-col">

              {/* Badge supérieur fidèle au site */}
              <div className="title-content">
                <span className="title-badge">
                  <BsStars /> Démarrer un projet
                </span>
                <h2 className="title contact-heading">
                  Construisons votre <br />
                  <span>avenir digital</span>
                </h2>
              </div>

              {/* Pitch */}
              <p className="contact-main-desc">
                Vous avez une idée, une plateforme web ou une application mobile à concrétiser ?
                Remplissez le formulaire ci-contre ou contactez-moi directement pour échanger
                sur vos ambitions et lancer le développement.
              </p>

              {/* Coordonnées directes */}
              <div className="contact-info-list">
                <div className="contact-info-row">
                  <a href="tel:+2290168364255" className="contact-info-item">
                    <span className="contact-info-icon">
                      <FaPhoneVolume />
                    </span>
                    <div className="contact-info-meta">
                      <small>Téléphone</small>
                      <span>+229 01 68 36 42 55</span>
                    </div>
                  </a>

                  <div className="contact-info-item">
                    <span className="contact-info-icon">
                      <FaLocationDot />
                    </span>
                    <div className="contact-info-meta">
                      <small>Localisation</small>
                      <span>Bénin • Calavi / Cotonou</span>
                    </div>
                  </div>
                </div>

                <div className="contact-info-row">
                  <a href="mailto:abnegko@gmail.com" className="contact-info-item">
                    <span className="contact-info-icon">
                      <FaEnvelope />
                    </span>
                    <div className="contact-info-meta">
                      <small>Email direct</small>
                      <span>abnegko@gmail.com</span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/2290168364255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-item"
                  >
                    <span className="contact-info-icon">
                      <FaWhatsapp />
                    </span>
                    <div className="contact-info-meta">
                      <small>WhatsApp</small>
                      <span>+229 01 68 36 42 55</span>
                    </div>
                  </a>
                </div>

              </div>

            </div>

            {/* Colonne Droite : Carte Formulaire en orange de marque */}
            <div className="contact-right-col">
              <div className="contact-card-box">
                <form onSubmit={handleSubmit}>

                  {/* 1. Nom */}
                  <div className="form-group-item">
                    <label htmlFor="name">Votre nom et prénoms</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nom et prénoms"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* 2. Email */}
                  <div className="form-group-item">
                    <label htmlFor="contactInfo">Votre adresse email</label>
                    <input
                      type="email"
                      id="contactInfo"
                      name="email"
                      placeholder="adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* 3. Sélection du Service */}
                  <div className="form-group-item">
                    <label htmlFor="service">Service souhaité</label>
                    <div className="select-wrapper">
                      <select
                        id="service"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                      >
                        <option value="" disabled>Sélectionner un service</option>
                        <option value="web">Développement Web (React / Fullstack)</option>
                        <option value="mobile">Développement Mobile (React Native / iOS & Android)</option>
                        <option value="api">API REST & Architecture Backend (Node.js / MySQL)</option>
                        <option value="uiux">Intégration UI/UX Pixel-Perfect (Figma)</option>
                        <option value="autre">Autre projet spécifique</option>
                      </select>
                      <FaChevronDown className="select-arrow" />
                    </div>
                  </div>

                  {/* 4. Message */}
                  <div className="form-group-item">
                    <label htmlFor="message">Votre message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Décrivez brièvement votre projet, vos besoins techniques ou vos délais..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* 5. Bouton Soumettre */}
                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={isSending}
                    >
                      <span>{isSending ? "Envoi en cours..." : "Envoyer le message"}</span>
                      <span className="btn-icon-circle">
                        <FaPaperPlane />
                      </span>
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="contents">
            <div className="logo">
              <h1><span>A</span>bed</h1>
            </div>
            <div className="reseaux">


              <a href=""><FaInstagram /></a><a href="" className='linkedin'><FaLinkedin /></a><a href=""><FaFacebookF /></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App