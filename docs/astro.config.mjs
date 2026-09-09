// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The documentation site. It describes skill/ and is never held to it:
// `normative:` in CHANGEPACK.md names skill/ alone, so no page here is a spec.
export default defineConfig({
  // Where the site is meant to answer. GitHub Pages serves this repository
  // under a project path, so `base` carries that path into every generated
  // link and canonical URL. Publishing is a later package's business, and a
  // move to an apex domain is these two lines.
  site: 'https://allan-lancioni.github.io/changepack',
  base: '/changepack',
  integrations: [
    starlight({
      title: 'changepack',
      // Both languages carry a prefix and neither sits at the root, so every
      // page has exactly one URL and no language is privileged. `root` is
      // unset on purpose: setting it would serve one locale from /.
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        pt: { label: 'Português', lang: 'pt-BR' },
      },
      // The sidebar is declared with the pages it points at, in group 3.
      // Starlight autogenerates from the content directory until then.
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/allan-lancioni/changepack',
        },
      ],
    }),
  ],
});
