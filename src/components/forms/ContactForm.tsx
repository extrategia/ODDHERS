'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { formChallengeOptions } from '@/content/challenges';
import { site, whatsappUrl } from '@/config/site';
import { track } from '@/lib/analytics';
import { KnightArrow } from '@/components/ui/Cta';

type Fields = { nombre: string; empresa: string; correo: string; whatsapp: string; desafio: string; mensaje: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;
/**
 * idle → sending → sent | error        (cuando hay endpoint configurado)
 * idle → handoff                        (sin endpoint: el mensaje se entrega a WhatsApp y la persona lo envía)
 */
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'handoff';

const empty: Fields = { nombre: '', empresa: '', correo: '', whatsapp: '', desafio: '', mensaje: '', consent: false };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.correo.trim())) e.correo = 'Escribe un correo válido, por ejemplo nombre@empresa.com.';
  if (f.whatsapp.trim() && f.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Incluye los 10 dígitos de tu número.';
  if (!f.desafio) e.desafio = 'Elige el desafío que más se acerca.';
  if (!f.consent) e.consent = 'Necesitamos tu consentimiento para responderte.';
  return e;
}

function composeMessage(f: Fields) {
  return [
    'Hola, ODDHERS. Quiero explorar una estrategia para mi negocio.',
    '',
    `Nombre: ${f.nombre.trim()}`,
    f.empresa.trim() && `Empresa: ${f.empresa.trim()}`,
    `Correo: ${f.correo.trim()}`,
    f.whatsapp.trim() && `WhatsApp: ${f.whatsapp.trim()}`,
    `Principal desafío: ${f.desafio}`,
    f.mensaje.trim() && `Mensaje: ${f.mensaje.trim()}`,
  ].filter((l, i) => i === 1 || (typeof l === 'string' && l !== '')).join('\n');
}

export function ContactForm() {
  const id = useId();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [handoffUrl, setHandoffUrl] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const hasEndpoint = !!site.formEndpoint;
  const hasWhatsapp = !!whatsappUrl();

  // Preselecciona el desafío cuando se llega desde el selector (/contacto?desafio=…).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('desafio');
    if (q && (formChallengeOptions as readonly string[]).includes(q)) setF((s) => ({ ...s, desafio: q }));
  }, []);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const blur = (k: keyof Fields) => {
    const msg = validate(f)[k];
    setErrors((e) => ({ ...e, [k]: msg }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (status === 'sending') return;
    const e = validate(f);
    setErrors(e);
    const firstBad = (Object.keys(e) as (keyof Fields)[])[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    if (honeypot.current?.value) return; // bot

    if (hasEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...f, origen: window.location.href, _subject: `Nuevo contacto: ${f.nombre} — ${f.desafio}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        setF(empty);
        track('form_submit', { desafio: f.desafio });
      } catch {
        setStatus('error');
      }
    } else if (hasWhatsapp) {
      // No hay endpoint: no fingimos un envío. Entregamos el mensaje a WhatsApp.
      const url = whatsappUrl(composeMessage(f));
      setHandoffUrl(url);
      setStatus('handoff');
      window.open(url, '_blank', 'noopener');
      track('form_whatsapp_handoff', { desafio: f.desafio });
    } else {
      setStatus('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const err = (k: keyof Fields) =>
    errors[k] ? <p className="field__error" id={`${id}-${k}-err`}>{errors[k]}</p> : null;
  const aria = (k: keyof Fields) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined,
  });

  if (status === 'sent') {
    return (
      <div className="form-status form-status--ok" ref={statusRef} tabIndex={-1} role="status">
        <p className="h3">Recibimos tu mensaje.</p>
        <p>Te escribiremos al correo que nos dejaste para acordar una primera conversación.</p>
        <button type="button" className="btn-plain" onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-busy={status === 'sending'}>
      <div className="form__row">
        <div className="field">
          <label htmlFor={`${id}-nombre`}>Nombre <span aria-hidden="true">*</span></label>
          <input id={`${id}-nombre`} name="nombre" type="text" autoComplete="name" required value={f.nombre}
            onChange={(e) => set('nombre', e.target.value)} onBlur={() => blur('nombre')} {...aria('nombre')} />
          {err('nombre')}
        </div>
        <div className="field">
          <label htmlFor={`${id}-empresa`}>Empresa</label>
          <input id={`${id}-empresa`} name="empresa" type="text" autoComplete="organization" value={f.empresa}
            onChange={(e) => set('empresa', e.target.value)} />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor={`${id}-correo`}>Correo electrónico <span aria-hidden="true">*</span></label>
          <input id={`${id}-correo`} name="correo" type="email" autoComplete="email" inputMode="email" required value={f.correo}
            onChange={(e) => set('correo', e.target.value)} onBlur={() => blur('correo')} {...aria('correo')} />
          {err('correo')}
        </div>
        <div className="field">
          <label htmlFor={`${id}-whatsapp`}>WhatsApp</label>
          <input id={`${id}-whatsapp`} name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" value={f.whatsapp}
            onChange={(e) => set('whatsapp', e.target.value)} onBlur={() => blur('whatsapp')} {...aria('whatsapp')} />
          {err('whatsapp')}
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-desafio`}>Principal desafío <span aria-hidden="true">*</span></label>
        <select id={`${id}-desafio`} name="desafio" required value={f.desafio}
          onChange={(e) => set('desafio', e.target.value)} onBlur={() => blur('desafio')} {...aria('desafio')}>
          <option value="" disabled>Elige una opción</option>
          {formChallengeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {err('desafio')}
      </div>
      <div className="field">
        <label htmlFor={`${id}-mensaje`}>Mensaje <span className="field__opt">(opcional)</span></label>
        <textarea id={`${id}-mensaje`} name="mensaje" rows={3} value={f.mensaje} onChange={(e) => set('mensaje', e.target.value)} />
      </div>

      {/* Trampa para bots: invisible para personas y lectores de pantalla. */}
      <div className="hp" aria-hidden="true">
        <label>No llenar <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field field--check">
        <input id={`${id}-consent`} name="consent" type="checkbox" checked={f.consent}
          onChange={(e) => set('consent', e.target.checked)} {...aria('consent')} />
        <label htmlFor={`${id}-consent`}>
          Acepto que ODDHERS use estos datos para responder a mi solicitud, conforme al{' '}
          <Link href="/aviso-de-privacidad" className="ulink">aviso de privacidad</Link>.
        </label>
        {err('consent')}
      </div>

      <div className="form__submit">
        <button type="submit" className="cta cta--primary" disabled={status === 'sending'} data-magnetic="">
          <span className="cta__label">
            {status === 'sending' ? 'Enviando…' : hasEndpoint ? 'Enviar mensaje' : 'Continuar en WhatsApp'}
          </span>
          <KnightArrow />
        </button>
        {!hasEndpoint && hasWhatsapp && (
          <p className="form-note">Al continuar se abre WhatsApp con tu mensaje listo para enviar.</p>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="form__live">
        {status === 'handoff' && (
          <div className="form-status">
            <p><strong>Tu mensaje todavía no se ha enviado.</strong> Lo abrimos en WhatsApp: envíalo desde ahí para que lo recibamos.</p>
            <a className="ulink" href={handoffUrl} target="_blank" rel="noopener noreferrer">¿No se abrió? Abrir WhatsApp</a>
          </div>
        )}
        {status === 'error' && (
          <div className="form-status form-status--error">
            <p>
              <strong>No pudimos enviar tu mensaje.</strong>{' '}
              {hasWhatsapp ? 'Inténtalo de nuevo o escríbenos por WhatsApp.' : 'Inténtalo de nuevo en unos minutos.'}
            </p>
            {hasWhatsapp && (
              <a className="ulink" href={whatsappUrl(composeMessage(f))} target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
