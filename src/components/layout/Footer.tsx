import Link from 'next/link';
import { asset, nav, site, whatsappUrl } from '@/config/site';
import { solutions } from '@/content/solutions';

export function Footer() {
  const wa = whatsappUrl();
  const year = new Date().getFullYear();
  return (
    <footer className="footer" data-theme="dark">
      <div className="container footer__top">
        <div className="footer__brand">
          <img src={asset('/brand/oddhers-eslogan-negativo.png')} alt="ODDHERS. Otras ideas. Otra estrategia." width={1398} height={455} loading="lazy" />
          <p>Firma de estrategia creativa. {site.location.label}.</p>
        </div>
        <nav className="footer__col" aria-label="Sitio">
          <p className="label">Sitio</p>
          <ul>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="ulink">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Soluciones">
          <p className="label">Soluciones</p>
          <ul>
            {solutions.map((s) => (
              <li key={s.slug}><Link href={`/soluciones/${s.slug}`} className="ulink">{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="footer__col">
          <p className="label">Contacto</p>
          <ul>
            {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="ulink" data-track="whatsapp_footer">WhatsApp</a></li>}
            {site.contact.email && <li><a href={`mailto:${site.contact.email}`} className="ulink">{site.contact.email}</a></li>}
            {site.contact.instagram && <li><a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="ulink">Instagram</a></li>}
            {site.contact.facebook && <li><a href={site.contact.facebook} target="_blank" rel="noopener noreferrer" className="ulink">Facebook</a></li>}
            <li><Link href="/contacto" className="ulink">Formulario de contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer__mark" aria-hidden="true">
        <img src={asset('/brand/oddhers-horizontal-negativo.png')} alt="" width={1195} height={298} loading="lazy" />
      </div>
      <div className="container footer__bottom">
        <p>© {year} ODDHERS. {site.creed}</p>
        <Link href="/aviso-de-privacidad" className="ulink">Aviso de privacidad</Link>
      </div>
    </footer>
  );
}
