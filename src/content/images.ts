import stock from './stock.json';
import { asset } from '@/config/site';

export type ImageKey = keyof typeof stock.images;

/** Ruta pública y texto alternativo de una imagen del sitio. */
export function image(key: ImageKey) {
  const i = stock.images[key];
  return { src: asset(`/img/${i.file}`), alt: i.alt };
}
