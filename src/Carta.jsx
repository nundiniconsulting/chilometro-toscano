export default function Carta({ t, onNav }) {
  const c = t.carta

  return (
    <main className="carta-page" id="carta">
      <section className="carta-intro wrap">
        <p className="kicker">{c.kicker}</p>
        <h1>{c.title}</h1>
        <p className="prose carta-lead">{c.lead}</p>
      </section>

      <section className="wrap">
        <div className="carta-sheet">
          {c.groups.map((group) => (
            <div className="carta-group" key={group.name}>
              <p className="kicker">{group.name}</p>
              {group.dishes.map((dish) => (
                <article className="dish" key={dish.name}>
                  <div className="dish-top">
                    <h2>{dish.name}</h2>
                    {dish.price ? <span className="price">{dish.price} €</span> : null}
                  </div>
                  <p>{dish.desc}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
        <div className="menu-foot">
          <p className="menu-note">{c.note}</p>
          <a className="btn btn-line" href="/" onClick={(event) => onNav(event, '/')}>
            {c.back}
          </a>
        </div>
      </section>
    </main>
  )
}
