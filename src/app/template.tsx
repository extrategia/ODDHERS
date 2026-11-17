import { KnightMark } from '@/components/ui/KnightMark';

/**
 * Transición entre páginas: una cortina con el caballo que se retira al entrar.
 * Es una animación CSS, así que funciona sin JavaScript y nunca deja la página tapada.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true">
        <KnightMark />
      </div>
      {children}
    </>
  );
}
