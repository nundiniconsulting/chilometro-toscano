import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import Carta from './Carta.jsx'
import { copy } from './content.js'

const PHONE = '3313214164'
const MAPS = 'https://maps.app.goo.gl/jvZdf8JkcErctkiW9'
const MAP_EMBED =
  'https://maps.google.com/maps?q=Chilometro+Toscano,+Via+Camillo+Benso+Cavour+9,+56127+Pisa&hl=it&z=17&output=embed'
const IG = 'https://www.instagram.com/chilometro_toscano/'

export default function App() {
  const [lang, setLang] = useState('it')
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState(() => window.location.pathname)

  const t = copy[lang]
  const isCarta = path === '/carta' || path === '/carta/'

  const go = (to) => {
    const url = new URL(to, window.location.origin)
    window.history.pushState({}, '', url.pathname + url.hash)
    setPath(url.pathname)
    setOpen(false)
    if (url.hash) {
      requestAnimationFrame(() => {
        document.getElementById(url.hash.slice(1))?.scrollIntoView()
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const onNav = (event, to) => {
    event.preventDefault()
    go(to)
  }

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.title = isCarta ? 'La carta · Chilometro Toscano' : 'Chilometro Toscano · Pisa'
    document.documentElement.lang = lang
  }, [isCarta, lang])

  useEffect(() => {
    const onScroll = () => {
      setSolid(isCarta || window.scrollY > 40)
      const hero = document.querySelector('.hero-media img')
      if (hero) {
        hero.style.transform = `translateY(${Math.min(window.scrollY * 0.22, 140)}px) scale(1.08)`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isCarta])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!isCarta && hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView()
      })
    }
  }, [isCarta, path])

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((node) => {
      const top = node.getBoundingClientRect().top
      if (top < window.innerHeight * 0.88) {
        node.classList.add('is-in')
      } else {
        observer.observe(node)
      }
    })
    return () => observer.disconnect()
  }, [lang, isCarta])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <header className={`header${solid || isCarta ? ' is-solid' : ''}`}>
        <a className="brand" href="/" onClick={(event) => onNav(event, '/')}>
          <Logo className="brand-logo" />
        </a>
        <nav className={`nav${open ? ' is-open' : ''}`}>
          <a href="/#storia" onClick={(event) => onNav(event, '/#storia')}>
            {t.nav.storia}
          </a>
          <a href="/#vetrina" onClick={(event) => onNav(event, '/#vetrina')}>
            {t.nav.vetrina}
          </a>
          <a
            href="/carta"
            className={isCarta ? 'is-current' : ''}
            onClick={(event) => onNav(event, '/carta')}
          >
            {t.nav.menu}
          </a>
          <a href="/#recensioni" onClick={(event) => onNav(event, '/#recensioni')}>
            {t.nav.recensioni}
          </a>
          <a href="/#visita" onClick={(event) => onNav(event, '/#visita')}>
            {t.nav.visita}
          </a>
        </nav>
        <div className="header-actions">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === 'it' ? 'is-on' : ''} type="button" onClick={() => setLang('it')}>
              IT
            </button>
            <button className={lang === 'en' ? 'is-on' : ''} type="button" onClick={() => setLang('en')}>
              EN
            </button>
          </div>
          <a className="btn btn-dark" href="/#visita" onClick={(event) => onNav(event, '/#visita')}>
            {t.hero.cta}
          </a>
          <button className="menu-toggle" type="button" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <span />
          </button>
        </div>
      </header>

      {isCarta ? (
        <Carta t={t} onNav={onNav} />
      ) : (
      <main id="top">
        <section className="hero">
          <div className="hero-media">
            <img src="/images/olive.jpg" alt="Olio extravergine toscano" />
          </div>
          <div className="wrap">
            <p className="kicker hero-kicker reveal reveal-d1">{t.hero.kicker}</p>
            <h1 className="reveal reveal-d2">{t.hero.title}</h1>
            <p className="hero-lead reveal reveal-d2">{t.hero.lead}</p>
            <div className="hero-actions reveal reveal-d3">
              <a className="btn btn-dark" href="/#visita" onClick={(event) => onNav(event, '/#visita')}>
                {t.hero.cta}
              </a>
              <a className="btn btn-ghost" href="/#storia" onClick={(event) => onNav(event, '/#storia')}>
                {t.hero.secondary}
              </a>
            </div>
          </div>
        </section>

        <section className="stats">
          {t.stats.map((item, index) => (
            <div className="stat" data-reveal style={{ '--delay': `${index * 90}ms` }} key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="section section-paper" id="storia">
          <div className="wrap storia-layout">
            <img src="/images/pasta.jpg" alt="Pasta fresca della casa" data-reveal="left" />
            <div className="storia-head" data-reveal>
              <p className="kicker">{t.storia.kicker}</p>
              <h2>{t.storia.title}</h2>
            </div>
            <div className="prose storia-prose">
              <p data-reveal>{t.storia.p1}</p>
              <p data-reveal>{t.storia.p2}</p>
              <p data-reveal>{t.storia.p3}</p>
            </div>
          </div>
        </section>

        <section className="section section-cream" id="vetrina">
          <div className="wrap">
            <div className="vetrina-stage">
              <div className="vetrina-photo" role="img" aria-label="Tagliere di salumi e formaggi" data-reveal="left" />
              <div className="section-head" data-reveal>
                <p className="kicker">{t.vetrina.kicker}</p>
                <h2>{t.vetrina.title}</h2>
                <p className="prose">{t.vetrina.lead}</p>
              </div>
              <div className="cards">
                {t.vetrina.items.map((item, index) => (
                  <article className="card" data-reveal style={{ '--delay': `${index * 110}ms` }} key={item.title}>
                    <span className="card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                      <span> / {String(t.vetrina.items.length).padStart(2, '0')}</span>
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-paper" id="menu">
          <div className="wrap">
            <div className="menu-head" data-reveal>
              <div>
                <p className="kicker">{t.menu.kicker}</p>
                <h2>{t.menu.title}</h2>
              </div>
              <p className="prose">{t.menu.lead}</p>
            </div>
            <ol className="excerpt-list">
              {t.menu.signatures.map((dish, index) => (
                <li className="excerpt-dish" data-reveal style={{ '--delay': `${index * 80}ms` }} key={dish.name}>
                  <span className="excerpt-num">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="excerpt-course">{dish.course}</p>
                    <div className="dish-top">
                      <h3>{dish.name}</h3>
                      {dish.price ? <span className="price">{dish.price} €</span> : null}
                    </div>
                    <p>{dish.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="menu-foot">
              <p className="menu-note">{t.menu.note}</p>
              <a className="btn btn-line" href="/carta" onClick={(event) => onNav(event, '/carta')}>
                {t.menu.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="section section-cream gallery-section" aria-label="Galleria">
          <div className="wrap gallery">
            <img src="/images/tagliere.jpg" alt="Selezione di salumi e formaggi" data-reveal />
            <img src="/images/cheese.jpg" alt="Formaggi toscani" data-reveal />
            <img src="/images/wine.jpg" alt="Calici di vino" data-reveal />
            <img src="/images/olive.jpg" alt="Olio e olive" data-reveal />
          </div>
        </section>

        <section className="section section-paper" id="recensioni">
          <div className="wrap">
            <div className="reviews-head" data-reveal>
              <div>
                <p className="kicker">{t.recensioni.kicker}</p>
                <h2>{t.recensioni.title}</h2>
              </div>
              <div className="rating-box">
                <strong>{t.recensioni.rating}</strong>
                <span className="kicker">{t.recensioni.ratingLabel}</span>
              </div>
            </div>
            <div className="quotes">
              {t.recensioni.items.map((item, index) => (
                <blockquote
                  className="quote"
                  data-reveal
                  style={{ '--delay': `${index * 120}ms` }}
                  key={item.quote}
                >
                  <p>“{item.quote}”</p>
                  <footer>
                    {item.author} · {item.source}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-cream" id="visita">
          <div className="wrap visit">
            <div className="visit-copy" data-reveal>
              <p className="kicker">{t.visita.kicker}</p>
              <h2>{t.visita.title}</h2>
              <p className="prose visit-lead">{t.visita.lead}</p>
            </div>
            <div className="visit-info" data-reveal>
              <div className="contact-list">
                <a href={MAPS} target="_blank" rel="noreferrer">
                  {t.visita.address}
                  <br />
                  {t.visita.city}
                </a>
                <a href={`tel:+39${PHONE}`}>{t.visita.phone}</a>
                <a href={`mailto:${t.visita.email}`}>{t.visita.email}</a>
              </div>
              <a className="btn btn-line" href={MAPS} target="_blank" rel="noreferrer">
                {t.visita.directions}
              </a>
            </div>
            <div className="visit-hours" data-reveal>
              <p className="kicker">{t.visita.hoursTitle}</p>
              <dl className="hours-summary">
                <div>
                  <dt>{t.visita.closed}</dt>
                  <dd>{t.visita.closedDays}</dd>
                </div>
                <div>
                  <dt>{t.visita.lunch}</dt>
                  <dd>{t.visita.lunchTime}</dd>
                </div>
                <div>
                  <dt>{t.visita.dinner}</dt>
                  <dd>{t.visita.dinnerTime}</dd>
                </div>
              </dl>
            </div>
            <div className="map-wrap" data-reveal="right">
              <iframe
                title="Mappa di Chilometro Toscano, Via Cavour 9, Pisa"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
      )}

      <footer className="wrap footer">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <div>
            <div>{t.footer.legal}</div>
            <div>{t.footer.piva}</div>
          </div>
        </div>
        <div>
          <a href={IG} target="_blank" rel="noreferrer">
            {t.footer.instagram}
          </a>
          <div>{t.footer.rights}</div>
        </div>
      </footer>
    </>
  )
}
