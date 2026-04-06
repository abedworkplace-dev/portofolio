import { useState, useRef, useEffect } from 'react'
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

  if (inView && !hasStarted) {
    setHasStarted(true);
  }


  const containerRef = useRef(null);

  useEffect(() => {
    const mixer = mixitup(containerRef.current, {
      selectors: {
        target: ".mix"
      },
      animation: {
        duration: 300
      }
    });

    return () => mixer.destroy();
  }, []);

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

            <div className="btn-menu"><a href="pdf/cv.pdf" className='btn' download>Voir mon CV</a><HiMiniBars3BottomRight
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
              <h2><span></span>Je suis dévéloppeur full-stack</h2>
              <h3>
                Créateur digital <br />
                <span>Web</span> & <span>Mobile</span>
              </h3>
              <p>
                Tu souhaites marquer ta présence en ligne ou développer ton business en ligne ? Eh bien, tu es au bon endroit ! Je t’aide à créer des solutions digitales performantes, que ce soit pour ton site web, ton application mobile ou ta présence numérique.
              </p>
              <a href='https://wa.me/+2290168364255'>Commencer maintenant</a>
            </div>
            <div className="img">
              <img src="/images/abed.png" alt="" />

            </div>
          </div>
        </div>
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
            <form action="">
              <div className="inputs">
                <input type="text" name="" id="" placeholder='Nom & Prénoms' />
                <input type="text" name="" id="" placeholder='Adresse mail' />
              </div>
              <div className="inputs">
                <input type="text" name="" id="" placeholder='Téléphone' />
                <input type="text" name="" id="" placeholder='Objet' />
              </div>
              <div className="inputs"><textarea name="" id="" placeholder='Message'></textarea></div>
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

    </div >
  )
}

export default App
