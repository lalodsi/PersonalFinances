import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcss from '@tailwindcss/postcss';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    postcss()
  ]
};