import './App.css'
import './responsive.css'
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { Typewriter } from 'react-simple-typewriter'
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaArrowRight } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";
import mixitup from "mixitup";
import { SiVite, SiExpo, SiMysql } from "react-icons/si";
import { RiReactjsFill } from "react-icons/ri";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaWhatsapp, FaReact, FaLinkedinIn, FaFacebookF, FaInstagram, FaLock } from "react-icons/fa";
import { CiGlobe, CiMobile1, CiDatabase, CiSearch } from "react-icons/ci";
import { MdArrowOutward, MdArrowForward } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";





function App() {

  const nav = useRef()
  const { ref, inView } = useInView({ triggerOnce: true });
  const servicesRef = useRef(null);
  const [isActive, setIsActive] = useState(false);


  const mixitupRef = useRef(null);
  const link1 = useRef(null);
  const link2 = useRef(null);
  const link3 = useRef(null);
  const link4 = useRef(null);
  const link5 = useRef(null);


  useEffect(() => {
    if (mixitupRef.current) {
      mixitup(mixitupRef.current, {
        animation: {
          duration: 400
        }
      });
    }
  }, []);


  useEffect(() => {
    const element = servicesRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);



  return (
    <div>

      {/* navbar */}

      <nav ref={nav}>
        <div className='container'>

          <div className='logo'><p><span>A</span>bed</p></div>

          <div className='link'>

            <ul>
              <li><a href="" onClick={(e) => { e.preventDefault(); link1.current.scrollIntoView({ behavior: "smooth" }) }}>Services</a></li>
              <li><a href="" onClick={(e) => { e.preventDefault(); link2.current.scrollIntoView({ behavior: "smooth" }) }}>A propos</a></li>
              <li><a href="" onClick={(e) => { e.preventDefault(); link3.current.scrollIntoView({ behavior: "smooth" }) }}>Portofolio</a></li>
              <li><a href="" class="disabled-link">Témoignages <FaLock /></a></li>
              <li><a href="" onClick={(e) => { e.preventDefault(); link4.current.scrollIntoView({ behavior: "smooth" }) }}>Contact</a></li>
            </ul>

          </div>

          <div className="btn-nav">
            <div className='btn-menu'><HiMiniBars3BottomRight size={20} color='white' style={{ padding: 7, border: "1px solid white", borderRadius: 30, cursor: 'pointer' }} /></div>
            <div className="btn-contact"><a href="" onClick={(e) => { e.preventDefault(); link5.current.scrollIntoView({ behavior: "smooth" }) }}>Collaborons</a></div>
          </div>
        </div>

      </nav>

      {/* herosection */}

      <div className="herosection" ref={servicesRef}>

        <div className='container'>

          <div className='container_hero-section'>

            <h1>Développeur web<br />  & mobile</h1>

            <p>
              Je livre :{' '}
              <span>
                <Typewriter
                  words={['Des solutions innovantes qui font la différence', 'Des produits de qualité, pensés pour durer', 'Des sites web modernes et performants', 'Des applications mobiles intuitives et engageantes', 'Des solutions sur mesure adaptées à vos besoins']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </p>


            <div className="cta">
              <a href="" onClick={(e) => { e.preventDefault(); link5.current.scrollIntoView({ behavior: "smooth" }) }} >Parlons de vos idées</a>
              <CiLocationArrow1 className='icon' />
            </div>

            <div className="reseaux">
              <a href="">Follow Us</a>
              <a href="">Behance</a>
              <a href="">Twitter</a>
            </div>

            <div className='nbr-projets' ref={ref}>
              <div><span className='nbr'>{inView && <CountUp end={1} duration={2} />} <span className='plus'>+</span></span><p>an d’expérience</p></div>
              <div><span className='nbr'>{inView && <CountUp end={4} duration={2} />} <span className='plus'>+</span></span><p>projets</p></div>
            </div>


          </div>

        </div>


      </div>


      <div className="services" ref={link1}>
        <div className="container">
          <h1 className='title'>Services</h1>
          <div className="cards">
            <div className="card">
              <CiGlobe className='i' />
              <h4>Développement Web Front-End</h4>
              <p>Je conçois des interfaces web modernes, fluides et entièrement responsives en utilisant React.js.
                Je transforme les maquettes (Figma, XD) en expériences utilisateur réelles, performantes et optimisées.</p>
            </div>
            <div className="card">
              <CiDatabase className='i' />
              <h4>Développement Web Back-End</h4>
              <p>Je développe des APIs performantes et sécurisées avec Node.js, Express et MySQL. J’assure l’authentification, la gestion des données (CRUD) et une architecture backend fiable et optimisée.</p>
            </div>
            <div className="card">
              <CiMobile1 className='i' />
              <h4>Développement Mobile (Android & iOS)</h4>
              <p>Je crée des applications mobiles performantes et intuitives avec React Native et Expo. Je développe des apps multi-plateformes avec intégration d’APIs, navigation fluide et optimisation des performances.</p>
            </div>

            <div className="card">
              <CiSearch className='i' />
              <h4>Optimisation SEO</h4>
              <p>J’améliore la visibilité des sites web sur Google grâce à des stratégies SEO efficaces : optimisation du contenu, structure technique et performances pour augmenter le trafic organique.</p>
            </div>

            <div className="card">
              <CiSearch className='i' />
              <h4>Optimisation SEO</h4>
              <p>J’améliore la visibilité des sites web sur Google grâce à des stratégies SEO efficaces : optimisation du contenu, structure technique et performances pour augmenter le trafic organique.</p>
            </div>

            <div className="card">
              <CiSearch className='i' />
              <h4>Optimisation SEO</h4>
              <p>J’améliore la visibilité des sites web sur Google grâce à des stratégies SEO efficaces : optimisation du contenu, structure technique et performances pour augmenter le trafic organique.</p>
            </div>

          </div>
        </div>
      </div>


      <div className="about" ref={link2}>
        <div className="container">
          <h1 className='title'>Qui suis-je ?</h1>
          <div className="presentation">
            <img src="images/abed.png" alt="" />
            <div className='txt'>
              <p>
                Je suis Abed-Négo Kodjaou, <span>développeur web et mobile</span> spécialisé en <span>React JS</span> et <span>React Native</span>.
                Passionné par la création d’<span>applications modernes, performantes et centrées sur l’utilisateur</span>,
                j’accompagne <span>entreprises et entrepreneurs</span> dans la transformation de leurs
                <span>idées en solutions digitales concrètes</span>.<br /><br />

                Mon objectif principal est d’aider les <span>entreprises à renforcer leur présence en ligne</span> en créant des
                <span> solutions web et mobiles performantes</span> et adaptées à leurs besoins.
                Je privilégie <span>l’intégration fidèle de maquettes existantes</span> pour transformer des designs en
                <span> expériences utilisateur réelles</span>, tout en garantissant un
                <span> code propre, structuré et optimisé</span>.
              </p>


              <div className="btn-contact"><a href="">Contactez-moi</a></div>
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio" ref={link3}>
        <div className="container">
          <h1 className='title'>Mes réalisations</h1>

          <div className="presentation">
            <div className="container-btn-filters">
              <div className="filters">
                <button data-filter="all">Tout</button>
                <button data-filter=".web">Web</button>
                <button data-filter=".mobile">Mobile</button>
              </div>
            </div>
          </div>

          <div className="container-projects" ref={mixitupRef}>
            <div className="projet mix web">
              <div className="header"><div className="browser browser1"></div><div className="browser browser2"></div><div className="browser browser3"></div></div>
              <img src="/images/icc.png" alt="" />
              <div className="projet-name">
                <h2>ICC OCITANIE</h2>
                <a target='_blank' href="https://iccoccitanie.com/"><MdArrowForward className='icon' /></a>
              </div>
            </div>
            <div className="projet mix web">
              <div className="header"><div className="browser browser1"></div><div className="browser browser2"></div><div className="browser browser3"></div></div>
              <img src="/images/yadah.png" alt="" />
              <div className="projet-name">
                <h2>Yadah Records</h2>
                <a target='_blank' href="https://forestgreen-dog-894166.hostingersite.com"><MdArrowForward className='icon' /></a>
              </div>
            </div>
            <div className="projet mix web">
              <div className="header"><div className="browser browser1"></div><div className="browser browser2"></div><div className="browser browser3"></div></div>
              <img src="/images/onepiece.png" alt="" />
              <div className="projet-name">
                <h2>One Piece</h2>
                <a target='_blank' href="https://onepieceinvest.com"><MdArrowForward className='icon' /></a>
              </div>
            </div>
            <div className="projet mix web">
              <div className="header"><div className="browser browser1"></div><div className="browser browser2"></div><div className="browser browser3"></div></div>
              <img src="/images/ufem.png" alt="" />
              <div className="projet-name">
                <h2>Ufem</h2>
                <a target='_blank' href="http://ufem-association.com"><MdArrowForward className='icon' /></a>
              </div>
            </div>
            <div className="projet mix web">
              <div className="header"><div className="browser browser1"></div><div className="browser browser2"></div><div className="browser browser3"></div></div>
              <img src="/images/kafi.png" alt="" />
              <div className="projet-name">
                <h2>Kafi Express</h2>
                <a target='_blank' href="https://violet-ibex-368210.hostingersite.com"><MdArrowForward className='icon' /></a>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="stacks">
        <div className="container">
          <h1 className='title'>Arsenal technique</h1>

          <div className="stacks-grid">
            <div className="tech-card">
              <FaReact className="tech-icon react" />
              <span className="tech-name">React 🔥</span>
            </div>

            <div className="tech-card">
              <SiVite className="tech-icon vite" />
              <span className="tech-name">Vite</span>
            </div>

            <div className="tech-card">
              <FaNodeJs className="tech-icon node" />
              <span className="tech-name">Node.js 🔥</span>
            </div>

            <div className="tech-card">
              <FaHtml5 className="tech-icon html" />
              <span className="tech-name">HTML5</span>
            </div>

            <div className="tech-card">
              <FaJs className="tech-icon js" />
              <span className="tech-name">JavaScript 🔥</span>
            </div>

            <div className="tech-card">
              <FaCss3Alt className="tech-icon css" />
              <span className="tech-name">CSS3</span>
            </div>

            <div className="tech-card">
              <FaPhp className="tech-icon php" />
              <span className="tech-name">PHP</span>
            </div>

            <div className="tech-card">
              <SiExpo className="tech-icon expo" />
              <span className="tech-name">Expo 🔥</span>
            </div>

            <div className="tech-card">
              <SiMysql className="tech-icon mysql" />
              <span className="tech-name">MySQL</span>
            </div>
            
          </div>
        </div>
      </div>

      <div className="cta-bottom" ref={link5}>
        <h2>Votre projet mérite d'exister</h2>
        <p>Ne laissez pas votre idée dans un tiroir.<br className='br-cta' /> Ensemble, donnons-lui vie.</p>
        <a href="https://wa.me/2290168364255">Donner vie au projet</a>
      </div>

      <footer ref={link4}>
        <div className="container">
          <div className="line"></div>
          <div class="footer-bottom pt-30 pb-50">
            <a href="mailto:abnegko@gmail.com">abnegko@gmail.com</a>
            <div class="icon">
              <a href=""><FaLinkedinIn className='i' /></a>
              <a href=""><FaFacebookF className='i' /></a>
              <a href="tel:+2290168364255"><IoIosPhonePortrait className='i' /></a>
              <a href=""><FaInstagram className='i' /></a>
            </div>
          </div>
          <div className='copyright'><p>COPYRIGHT @2026 BY ABED-NEGO KODJAOU</p></div>
        </div>
      </footer>



      <a href="https://wa.me/2290168364255" target='_blank'><div className={!isActive ? "cta-contact active" : "cta-contact"}><FaWhatsapp className='i' /></div></a>
    </div>
  )
}

export default App
