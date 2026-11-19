'use strict';
/**
 * Category taxonomy. `motif` selects the illustration used for article art,
 * `colors` are the two gradient stops used in that art.
 */
module.exports = [
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    motif: 'shield',
    colors: ['#62e6c4', '#8b93ff'],
    description: 'Foundational security concepts, habits and checklists that protect everyday people and small teams.',
    intro:
      'Start here if you want the big picture. These guides cover the habits and fundamentals that stop most real-world attacks — the boring, reliable things that work.',
  },
  {
    slug: 'ethical-hacking',
    name: 'Ethical Hacking',
    motif: 'terminal',
    colors: ['#8b93ff', '#c08bff'],
    description: 'How authorised security testing works, the ethics and law behind it, and how to start learning legally.',
    intro:
      'Ethical hacking is security testing done with permission, to find weaknesses before criminals do. These explainers cover how the profession works, where the legal lines sit, and how to learn the skills in safe, legal lab environments.',
  },
  {
    slug: 'social-media-security',
    name: 'Social Media Security',
    motif: 'chat',
    colors: ['#ff9db8', '#8b93ff'],
    description: 'Protect Instagram, Facebook and other social accounts from takeover, scams and impersonation.',
    intro:
      'Social accounts are valuable to criminals because they carry trust: your friends, your audience, your ad budget. Learn how these accounts are targeted, how to lock them down, and how to recover if something goes wrong.',
  },
  {
    slug: 'privacy',
    name: 'Privacy',
    motif: 'eye',
    colors: ['#7fd7ff', '#62e6c4'],
    description: 'Reduce what companies, data brokers and strangers can learn about you online.',
    intro:
      'Privacy is not about having something to hide. It is about deciding who gets to know what about you. These guides help you reduce your data footprint without giving up the internet.',
  },
  {
    slug: 'online-safety',
    name: 'Online Safety',
    motif: 'radar',
    colors: ['#62e6c4', '#f3d36b'],
    description: 'Practical safety for phones, accounts and everyday online life — including what to do when something goes wrong.',
    intro:
      'Online safety is about the decisions you make every day: what you tap, install, share and trust. Here you will find practical advice for your devices and a calm plan for incidents.',
  },
  {
    slug: 'phishing-social-engineering',
    name: 'Phishing & Social Engineering',
    motif: 'hook',
    colors: ['#f3b95f', '#ff8a8a'],
    description: 'Recognise manipulative messages, fake login pages and the psychological tricks attackers rely on.',
    intro:
      'Most account compromises start with a person being persuaded to do something. Learn the patterns behind phishing and social engineering so the next convincing message gets a second look.',
  },
  {
    slug: 'malware',
    name: 'Malware',
    motif: 'bug',
    colors: ['#ff8a8a', '#c08bff'],
    description: 'Viruses, ransomware, spyware and infostealers explained — with warning signs and prevention.',
    intro:
      'Malicious software has changed. Much of it now quietly steals passwords and session data rather than announcing itself. Understand the main families, how they spread, and how to keep them off your devices.',
  },
  {
    slug: 'network-security',
    name: 'Network Security',
    motif: 'wifi',
    colors: ['#7fd7ff', '#8b93ff'],
    description: 'Wi-Fi, routers, VPNs and how data moves — explained for people who are not network engineers.',
    intro:
      'Every account and device you own sits on a network. These guides explain where network risk really lies today and which protections are worth your time.',
  },
  {
    slug: 'password-security',
    name: 'Password Security',
    motif: 'key',
    colors: ['#62e6c4', '#7fd7ff'],
    description: 'Strong passwords, password managers, two-factor authentication and passkeys.',
    intro:
      'Passwords are still the front door to most of your digital life. Learn how to make them strong, how to manage dozens of them without stress, and how to add the second lock that stops most takeovers.',
  },
  {
    slug: 'tutorials',
    name: 'Tutorials',
    motif: 'steps',
    colors: ['#f3d36b', '#62e6c4'],
    description: 'Step-by-step walkthroughs for securing accounts and devices.',
    intro:
      'Hands-on, step-by-step guides. Each tutorial is designed to be followed in one sitting and leaves you measurably safer at the end.',
  },
  {
    slug: 'security-tools',
    name: 'Security Tools',
    motif: 'tools',
    colors: ['#8b93ff', '#62e6c4'],
    description: 'Password managers, authenticator apps and the professional tooling behind security testing.',
    intro:
      'Good tools make good security habits easier. These guides explain what popular categories of security tools actually do, how to evaluate them, and their limits.',
  },
];
