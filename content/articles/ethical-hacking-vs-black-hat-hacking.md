---
title: Ethical Hacking vs Black-Hat Hacking
seoTitle: "Ethical Hacking vs Black-Hat Hacking: The Real Differences"
slug: ethical-hacking-vs-black-hat-hacking
description: White hat, black hat and grey hat explained — how authorisation, intent, disclosure and consequences separate ethical hackers from criminals who use similar skills.
category: ethical-hacking
categories: cybersecurity
tags: ethical hacking, black hat, white hat, grey hat, vulnerability disclosure, cyber law
date: 2026-09-22
intro: Ethical and criminal hackers can share the same knowledge and even the same tools. What separates them is not skill — it is permission, intent and what happens after a weakness is found.
---

Security people often describe hackers by the colour of their hat — a shorthand borrowed from old Western films, where heroes wore white and villains wore black. Like most shorthand, it is a simplification. But the distinctions it points to are real, and they matter enormously, both legally and ethically.

## The short answer

| | Ethical (white-hat) hacking | Black-hat hacking |
| --- | --- | --- |
| Permission | Explicit, written authorisation from the system owner | None |
| Scope | Clearly defined and respected | Whatever the attacker can reach |
| Purpose | Find and fix weaknesses | Profit, disruption, espionage, revenge or notoriety |
| What happens to findings | Reported privately to the owner with remediation advice | Exploited, sold or leaked |
| Handling of data | Minimum necessary, kept confidential, deleted after | Stolen, sold, used for extortion |
| Legal status | Lawful when within an agreement | Criminal in most jurisdictions |
| Typical outcome | A safer system | Victims, losses and potential prosecution |

The tools and techniques may overlap. Everything around them does not.

## White hats: defenders who think like attackers

White-hat hackers include penetration testers, red teamers, application security specialists, security researchers and bug bounty hunters working within programme rules. What unites them is that their work is **authorised and defensive**. They attack systems because someone asked them to, so that weaknesses can be found and fixed before a criminal finds them.

Our [beginner's guide to ethical hacking](/blog/what-is-ethical-hacking/) describes these roles and how people train for them legally, and [what is penetration testing](/blog/what-is-penetration-testing/) explains how a professional engagement is structured.

## Black hats: crime with a keyboard

Black-hat hacking is unauthorised access or interference for the attacker's own ends. Today, most of it is organised and financially motivated. It includes:

- stealing and selling credentials and personal data;
- deploying ransomware and extorting victims;
- taking over social media and business accounts to run scams;
- business email compromise and payment fraud;
- espionage on behalf of companies or states.

Many black-hat operations look less like a lone genius and more like a business, with specialised roles, suppliers and customer support. Some groups sell access to compromised networks; others sell ready-made phishing kits; others handle negotiation and money laundering.

> The difference between a security tester and a criminal is rarely what they know. It is whether they asked first.

## Grey hats: good intentions, real risks

Grey-hat hacking sits in between. A grey hat might probe a website without permission, find a vulnerability, and then report it to the owner — sometimes expecting thanks, sometimes asking for payment.

It is tempting to see this as harmless or even helpful. But it carries real problems:

- **It is usually still unauthorised access**, and in many jurisdictions that is an offence regardless of motive.
- **The owner cannot distinguish a well-meaning tester from an attacker** while it is happening. Incident response costs real time and money.
- **Testing can cause damage** — taking down a service, corrupting data or exposing personal information — even unintentionally.
- **Asking for payment after unauthorised testing can look like extortion**, which is a serious offence in its own right.

:::warning If you stumble across a vulnerability
If you notice a security problem by accident during normal use of a website, stop. Do not explore further, do not access other people's data, and do not test whether you can "go deeper". Report what you observed through the organisation's official disclosure channel, if it has one.
:::

## How legitimate disclosure works

Responsible security research has well-established processes that protect both researchers and organisations.

### Vulnerability disclosure policies

Many organisations publish a vulnerability disclosure policy explaining how to report security issues, what kind of testing is acceptable, and what the researcher can expect in return. Some include "safe harbour" language committing not to pursue legal action against researchers who follow the rules.

A growing number of websites publish a `security.txt` file — a standard defined in RFC 9116 — at a predictable location on their site, listing where to send security reports.

### Coordinated disclosure

In coordinated vulnerability disclosure, the researcher reports privately, the organisation fixes the issue, and details are published only after users are protected — usually on an agreed timeline. This balances the public's right to know with the need to avoid handing attackers a ready-made weapon.

### Bug bounty programmes

Bug bounty programmes invite researchers to test specific, in-scope systems and pay rewards for valid findings. They make authorisation explicit, but only within their stated scope and rules. Testing outside that scope is not covered.

### The legal landscape is evolving

Lawmakers and prosecutors increasingly recognise the value of good-faith security research. In 2022, for example, the US Department of Justice announced a policy that good-faith security research should not be charged under the Computer Fraud and Abuse Act. Policies like this do not make unauthorised testing safe, though: they apply only in narrow circumstances, they do not bind every jurisdiction, and they do not prevent civil action.

## A quick ethics check: is this OK?

Abstract principles are easier to apply with examples. Here is how the authorisation rule plays out in situations people genuinely ask about.

| Situation | Acceptable? | Why |
| --- | --- | --- |
| Practising on a deliberately vulnerable app running on your own laptop | Yes | You own the system and it exists for practice |
| Working through labs on a legal training platform | Yes | The platform grants permission within its rules |
| Testing a company's site under its published bug bounty, within scope | Yes, within the rules | The programme authorises specific activity — nothing more |
| Scanning your school or employer's network "out of curiosity" | No | You have not been authorised, even if you are a student or staff member |
| Trying to log in to a friend's account to "test" their password | No | Accessing someone else's account is not yours to authorise, and may break the platform's terms even with their consent |
| Noticing during normal use that a page shows other users' data, then reporting it without digging further | Generally yes | You did not go looking, you stopped, and you reported responsibly |
| Continuing to explore that flaw "to see how bad it is" | No | Further access goes beyond accidental discovery |

When in doubt, the answer is to stop and ask the system owner for written permission. If you cannot get it, you have your answer.

## Other "hats" and colours you might hear

Security culture has generated a whole wardrobe of terms. A few you will encounter:

- **Red team** — the authorised group that emulates attackers.
- **Blue team** — the defenders who detect and respond.
- **Purple team** — red and blue working together to improve detection.
- **Script kiddie** — a dismissive term for someone running other people's tools without understanding them.
- **Hacktivist** — someone who hacks to make a political statement. Unauthorised hacktivism is still unauthorised access.

## Why the distinction matters to everyone

This is not just an academic debate for security professionals. It affects ordinary people in very practical ways.

### "Hackers for hire" are almost always scams

Search for help with a hacked account, and you will find people offering to "hack back", recover accounts, spy on a partner's phone or change grades. Anyone offering these services is either offering to commit a crime on your behalf — making you complicit — or, far more often, simply planning to take your money and disappear. Some will then attempt to blackmail you for having asked.

If you have lost access to an account, use the platform's official recovery process. Our guide on [what to do if your online account has been hacked](/blog/what-to-do-if-account-hacked/) explains how.

### Curiosity needs a legal outlet

Many talented security professionals started out curious about how systems work. That curiosity is valuable — and there are excellent legal ways to explore it, from capture-the-flag competitions to deliberately vulnerable practice applications. Learning in those environments builds the same skills without harming anyone or risking a criminal record.

:::tip For aspiring security professionals
Treat authorisation as non-negotiable from day one. Employers and clients hire testers because they can be trusted. A history of respecting scope and disclosing responsibly is one of the most valuable things you can build.
:::

:::takeaways
- White hats test with explicit permission and report findings so they can be fixed.
- Black hats access systems without permission for their own gain.
- Grey-hat testing — unauthorised but well-meant — still carries legal and ethical risk.
- Coordinated disclosure, published policies and bug bounties provide legitimate channels.
- "Hackers for hire" offering to break into accounts are criminals or, more likely, scammers.
:::

:::faq
Q: Is grey-hat hacking illegal?
A: Often, yes. If it involves accessing a system without authorisation, it may break computer misuse laws regardless of good intentions. Some organisations offer safe harbour through published disclosure policies, but only for activity within their stated rules.
Q: Do ethical hackers and black-hat hackers use the same tools?
A: Frequently. Many security tools are dual-use: they can help defenders find weaknesses or help attackers exploit them. The difference lies in authorisation, scope and what is done with the results.
Q: Can a black-hat hacker become an ethical hacker?
A: Some people with past offences have moved into legitimate security careers, but a criminal record can close many doors, particularly for roles requiring background checks or security clearance. It is far better to learn legally from the start.
Q: How do I report a security vulnerability I found by accident?
A: Look for a vulnerability disclosure policy or security.txt file on the organisation's website and follow its instructions. Report what you saw, avoid further testing, do not access other people's data, and do not publicise the issue before it is fixed.
:::

## Sources and further reading

- US Department of Justice: [Policy for charging cases under the Computer Fraud and Abuse Act (2022)](https://www.justice.gov/opa/pr/department-justice-announces-new-policy-charging-cases-under-computer-fraud-and-abuse-act)
- IETF: [RFC 9116 — A File Format to Aid in Security Vulnerability Disclosure](https://www.rfc-editor.org/rfc/rfc9116)
- UK NCSC: [Vulnerability Disclosure Toolkit](https://www.ncsc.gov.uk/information/vulnerability-disclosure-toolkit)
- US CISA: [Coordinated vulnerability disclosure process](https://www.cisa.gov/resources-tools/programs/coordinated-vulnerability-disclosure-program)
