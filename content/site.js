'use strict';
/**
 * Global site configuration. Edit this file to rebrand, change the domain,
 * or connect the contact/newsletter forms to a real backend.
 */
module.exports = {
  name: 'Bastion Brief',
  shortName: 'Bastion',
  // Production origin, no trailing slash. Used for canonical URLs, sitemap, Open Graph.
  url: 'https://bastionbrief.com',
  lang: 'en',
  locale: 'en_US',
  tagline: 'Defensive cybersecurity, clearly explained.',
  description:
    'Bastion Brief publishes practical, defensive cybersecurity education — phishing awareness, account security, privacy guidance and ethical hacking explainers written for real people.',
  themeColor: '#05070b',

  // Optional. Leave empty strings / arrays until the accounts really exist.
  twitterHandle: '', // e.g. '@bastionbrief'
  social: [
    // { label: 'X', url: 'https://x.com/your-handle', icon: 'x' },
    // { label: 'LinkedIn', url: 'https://www.linkedin.com/company/your-page', icon: 'linkedin' },
    // { label: 'YouTube', url: 'https://www.youtube.com/@your-channel', icon: 'youtube' },
  ],
  // Public contact address shown on the contact page (optional).
  contactEmail: '',

  /**
   * Form integration. Each endpoint must accept a JSON POST and return 2xx on success.
   * Works with Formspree, Basin, Getform, a Netlify/Vercel/Cloudflare function, or your own API.
   * While these are empty the forms validate input but clearly tell the visitor that
   * nothing was sent — they never fake a successful delivery.
   */
  forms: {
    contactEndpoint: '',
    newsletterEndpoint: '',
  },

  postsPerPage: 9,
};
