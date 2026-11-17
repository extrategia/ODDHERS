import { Hero } from '@/components/sections/Hero';
import { Challenges } from '@/components/sections/Challenges';
import { Manifesto } from '@/components/sections/Manifesto';
import { Solutions } from '@/components/sections/Solutions';
import { Method } from '@/components/sections/Method';
import { Work } from '@/components/sections/Work';
import { Difference } from '@/components/sections/Difference';
import { Ai } from '@/components/sections/Ai';
import { About } from '@/components/sections/About';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * Homepage narrativa. El orden sigue la decisión del visitante:
 * 1 qué es → 2 ¿entienden mi problema? → 3 cómo piensan → 4 cómo me ayudan → 5 cómo trabajan
 * → 6 qué han hecho → 7 por qué ellos → 8 tecnología sin humo → 9 quiénes son → 10 contacto.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Challenges />
      <Manifesto />
      <Solutions />
      <Method />
      <Work />
      <Difference />
      <Ai />
      <About />
      <FinalCta />
    </>
  );
}
