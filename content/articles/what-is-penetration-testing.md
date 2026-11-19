---
title: What Is Penetration Testing and How Does It Work?
slug: what-is-penetration-testing
description: Penetration testing in plain English: how it differs from scanning and red teaming, the types of test, how an engagement runs, and how to commission one.
category: ethical-hacking
categories: network-security, security-tools
tags: penetration testing, pentest, ethical hacking, vulnerability assessment, red team
date: 2026-10-13
intro: A penetration test is a controlled, authorised attack on your own systems, carried out so you can find and fix weaknesses before someone with worse intentions does. Here is how it works — from scoping to the final report.
---

Every organisation that runs a website, a network or an app has weaknesses it does not know about. A penetration test — often shortened to "pentest" — is one of the most direct ways to find them. Skilled testers, working with explicit permission and within agreed limits, try to compromise your systems the way a real attacker might. Then they tell you exactly what they found and how to fix it.

This guide is written for anyone who wants to understand penetration testing: business owners deciding whether they need one, people considering a security career, and readers simply curious about how ethical hacking works in practice.

## Penetration testing, scanning and red teaming

These terms are often used interchangeably, but they describe different activities with different goals.

| | Vulnerability scan | Penetration test | Red team exercise |
| --- | --- | --- | --- |
| What it is | Automated tools check for known weaknesses | Skilled people attempt to exploit weaknesses within a defined scope | A long-running, goal-based emulation of a realistic adversary |
| Main question answered | "What known issues are present?" | "How far could an attacker get through these systems?" | "Would we detect and stop a determined attacker?" |
| Human involvement | Low | High | Very high |
| Typical duration | Hours | Days to weeks | Weeks to months |
| Output | A list of findings, often with many false positives | Validated findings with impact and remediation advice | Narrative of the attack path and detection gaps |
| Best for | Frequent hygiene checks | Periodic, in-depth assurance | Mature organisations testing detection and response |

A good security programme often uses all three: scanning continuously, penetration testing periodically, and red teaming once defences are mature.

## Types of penetration test

Tests are usually defined by what is being targeted.

- **External network testing** looks at systems exposed to the internet — websites, email servers, remote access gateways — from an outsider's perspective.
- **Internal network testing** assumes an attacker is already inside, perhaps via a compromised laptop, and examines how far they could move.
- **Web application testing** focuses on websites and APIs: authentication, session handling, access control, input handling and business logic. The OWASP Web Security Testing Guide is a widely used reference.
- **Mobile application testing** examines apps and the services they talk to.
- **Cloud testing** reviews cloud configurations, identities and permissions, within the rules each cloud provider sets for customers.
- **Wireless testing** assesses Wi-Fi networks and how they are segmented.
- **Social engineering testing** measures how staff respond to simulated phishing or phone pretexts, within strict and ethical rules.
- **Physical testing** checks whether someone could gain physical access to offices or equipment.

### How much the tester knows

Tests are also described by how much information the tester is given in advance:

- **Black box:** little or no information, like an outside attacker. Realistic, but time is spent on discovery.
- **Grey box:** partial information, such as a user account or architecture overview. A common, efficient compromise.
- **White box:** full information, including source code or configurations. The most thorough coverage for the time spent.

## How an engagement runs

Industry frameworks such as the Penetration Testing Execution Standard (PTES) and NIST's technical guide to security testing (SP 800-115) describe the process in slightly different terms, but the shape is consistent.

:::flow The stages of a penetration test
- Pre-engagement: Scope, objectives, rules of engagement and written authorisation are agreed.
- Reconnaissance: Testers gather information about the in-scope targets.
- Vulnerability analysis: Potential weaknesses are identified and prioritised.
- Controlled exploitation: Selected weaknesses are carefully validated to prove real impact.
- Reporting: Findings, evidence, risk ratings and remediation advice are documented.
- Retest: Fixed issues are re-checked to confirm they are resolved.
:::

### Pre-engagement is where most of the work happens

Before any testing begins, both sides agree in writing exactly what will happen. This protects the organisation, its customers and the testers.

:::checklist What the rules of engagement should cover
- [ ] Systems, applications and addresses in scope — and explicitly out of scope
- [ ] Testing window, including dates and permitted hours
- [ ] Types of testing allowed (for example, whether social engineering is included)
- [ ] Any techniques that are not permitted, such as denial of service
- [ ] How sensitive data encountered during testing will be handled
- [ ] Emergency contacts on both sides, and how to pause testing
- [ ] Written authorisation from someone with the right to grant it, including third-party hosting providers where required
:::

### Exploitation is careful, not reckless

In a professional test, exploitation is controlled. The aim is to demonstrate that a weakness is real and to show its potential impact — not to cause damage. Testers avoid actions that could disrupt production systems unless that is explicitly agreed, and they access only the minimum data needed to prove a point.

## What a good report looks like

The report is the product you are paying for. A strong one includes:

- **An executive summary** that explains overall risk in business terms for non-technical leaders.
- **Clear findings**, each with a description, evidence, affected systems and a risk rating.
- **Practical remediation advice** that your team can act on, ideally prioritised.
- **The methodology and scope**, so you understand what was and was not tested.
- **Positive observations** — what is working well is useful information too.

> A penetration test is only as valuable as the fixes that follow it.

## How often should you test?

There is no single answer, but common triggers include:

- at least annually for important systems;
- after significant changes, such as launching a new application or migrating infrastructure;
- when required by regulation, contracts or standards your organisation follows;
- after a security incident, to confirm that weaknesses have been closed.

## Commissioning a penetration test

If you are buying a test, a few considerations help you get value.

### Choose qualified, accountable testers

Look for providers with relevant professional accreditation in your region — in the UK, for example, CREST membership and the NCSC's CHECK scheme are commonly referenced — and testers with recognised practical certifications. Ask for sample (anonymised) reports and references.

### Define what you actually want to learn

"Test everything" leads to shallow results. A focused question — "Could an outside attacker access customer data through our web application?" — leads to a far more useful test.

### Prepare your environment

Make sure the systems in scope are stable, backed up and representative of production. Inform any hosting or cloud providers whose terms require notice. Decide whether your defenders should be told in advance.

### Plan for remediation

Budget time and resources to fix what is found, then schedule a retest. The fastest way to waste a penetration test is to file the report and change nothing.

## Common misconceptions

**"A clean report means we're secure."** A penetration test examines specific systems, for a limited time, using the information and access agreed in scope. Finding nothing serious is good news about those systems at that moment — not a guarantee about everything, forever.

**"Automated scanning is the same thing, only cheaper."** Scanners are valuable for catching known issues quickly, but they struggle with business logic, chained weaknesses and context. Human testers find the flaws that matter most precisely because they think about how pieces fit together.

**"Testers will break everything."** Professional testers work to rules of engagement designed to avoid disruption, coordinate closely with your team, and stop immediately if something unexpected happens.

**"We're too small to need one."** Size alone does not decide it. What matters is what you run and what you hold. A small company with a customer portal and payment data may need testing more than a larger business with a simple brochure website.

**"Once a year is enough."** Annual testing is a common baseline, but significant changes — a new application, a major release, a migration to the cloud — can introduce new weaknesses the day after your last test.

## Pentesting as a career

Penetration testing is one of the most visible careers in ethical hacking. It suits people who enjoy solving puzzles, learning continuously and explaining technical findings clearly. Most testers build foundations in networking, operating systems and web technologies first, then practise extensively in legal lab environments. Our [beginner's guide to ethical hacking](/blog/what-is-ethical-hacking/) covers how to get started, and [ethical hacking vs black-hat hacking](/blog/ethical-hacking-vs-black-hat-hacking/) explains why authorisation is the foundation of the profession.

:::takeaways
- A penetration test is an authorised, scoped simulation of an attack that produces actionable findings.
- It differs from automated vulnerability scanning and from long-term red teaming.
- Written scope and rules of engagement come before any testing.
- The report and the fixes that follow are what make the test worthwhile.
- Test periodically and after significant changes.
:::

:::faq
Q: Is penetration testing legal?
A: Yes, when it is authorised in writing by someone with the right to grant permission and stays within the agreed scope. The same activities without authorisation are illegal in most jurisdictions.
Q: What is the difference between a vulnerability assessment and a penetration test?
A: A vulnerability assessment identifies and lists potential weaknesses, often with automated tools. A penetration test goes further, with skilled testers validating which weaknesses can actually be exploited and what impact they would have.
Q: Can a penetration test break my systems?
A: Professional testers take care to avoid disruption, and the rules of engagement define what is permitted. Some risk always remains, which is why tests are planned with backups, emergency contacts and agreed testing windows.
Q: Do small businesses need penetration testing?
A: It depends on what you run and what you are required to do. Many small businesses get more value first from fundamentals — updates, two-factor authentication, backups and a vulnerability scan. A penetration test becomes important when you operate customer-facing applications or handle sensitive data.
:::

## Sources and further reading

- NIST: [SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- OWASP: [Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- UK NCSC: [Penetration testing guidance](https://www.ncsc.gov.uk/guidance/penetration-testing)
