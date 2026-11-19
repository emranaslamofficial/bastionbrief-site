---
title: How to Identify a Fake Login Page
slug: how-to-identify-fake-login-page
description: Learn to read a web address like a security professional, spot lookalike domains and fake pop-up windows, and use simple tools that flag fake login pages for you.
category: phishing-social-engineering
categories: online-safety
tags: phishing, fake login page, url, domains, password manager, passkeys
date: 2026-10-06
intro: A fake login page can copy every pixel of the real one. What it cannot copy is the real address. Learn to read a URL correctly and you will spot most fakes in two seconds.
---

Fake login pages are the workhorse of credential phishing. They are cheap to make — a copy of the real page's design is trivial to produce — and they are linked from emails, texts, social media messages, adverts and QR codes. Visually, a good one is indistinguishable from the real thing. Logos, fonts, colours and error messages can all be cloned.

So do not try to judge a login page by how it looks. Judge it by **where it is**. That means reading the web address properly, which turns out to be a skill very few people were ever taught.

## How to read a web address

A web address (URL) has several parts, and only one of them tells you who actually controls the page. Take this example:

`https://login.northbank.example/account/signin?ref=email`

| Part | In the example | What it means |
| --- | --- | --- |
| Scheme | https:// | The connection is encrypted. It says nothing about who owns the site |
| Subdomain | login. | A label chosen freely by whoever owns the domain |
| Registered domain | northbank.example | **The part that identifies the owner.** This is what you check |
| Path | /account/signin | A location on that site, chosen freely by the owner |
| Query | ?ref=email | Extra information, chosen freely by the owner |

The **registered domain** is the name plus its ending (such as `.com`, `.co.uk` or `.org`) that sits immediately before the first single slash after the `//`. Everything to its left is a subdomain the owner can set to anything. Everything to its right is a path the owner can set to anything.

:::tip Read from the right
Find the first single `/` after `https://`. Look immediately to its left. The last two parts there (or three, for endings like `.co.uk`) are the registered domain. That — and only that — tells you whose site you are on.
:::

## The tricks attackers use

Because people tend to scan a URL for a familiar brand name, attackers place that name anywhere *except* the registered domain. Here are the most common patterns, using fictional domains.

### The brand in the subdomain

`https://northbank.example.secure-login.example/`

The brand name appears first, but the registered domain is `secure-login.example`. The owner of that domain can create any subdomain they like, including one called `northbank.example`.

### The brand in the path

`https://account-verify.example/northbank.example/login`

Here the brand appears after the domain, in the path. It is just a folder name on someone else's site.

### Extra words and hyphens

`https://northbank-security.example/` or `https://northbank.example-support.com/`

Adding "security", "support", "verify", "login" or "help" to a brand name creates a completely different domain that anyone can register.

### Typosquatting and lookalike characters

`https://northbamk.example/` or `https://n0rthbank.example/`

A swapped letter, a zero instead of an "o", or an uppercase "I" instead of a lowercase "l" is easy to miss at a glance. Some attacks use characters from other alphabets that look identical to Latin letters (for example, the Cyrillic "а"). Browsers often display these as an encoded address beginning with `xn--`, which is itself a reason for caution.

### A different ending

`https://northbank.co/` instead of `https://northbank.com/`

The ending is part of the registered domain. A different ending is a different website owned by potentially anyone.

### Hidden destinations

Shortened links, QR codes and buttons with friendly text hide the real destination until you arrive. That is not proof of fraud — legitimate organisations use them too — but it means you must check the address bar after the page loads.

## Test yourself

Using the right-to-left rule, which of these would genuinely belong to a bank that owns `northbank.example`?

| Address | Registered domain | Verdict |
| --- | --- | --- |
| https://www.northbank.example/login | northbank.example | Genuine |
| https://secure.northbank.example/signin | northbank.example | Genuine — subdomain of the real site |
| https://northbank.example.account-check.example/ | account-check.example | Fake |
| https://login-northbank.example/ | login-northbank.example | Fake — different domain |
| https://northbank.example-verify.example/ | example-verify.example | Fake |
| https://verify.example/northbank.example/ | verify.example | Fake |

If you got all six, you can already outperform most phishing pages.

## The padlock does not mean "safe"

For years people were told to look for the padlock icon. That advice is now misleading. The padlock — and `https://` — means your connection to the site is encrypted, so nobody in between can read it. It says nothing about **who** you are connected to. Phishing sites routinely use HTTPS, because certificates are free and automatic.

> The padlock tells you the conversation is private. It does not tell you who you are talking to.

## Other warning signs

The address is the most reliable signal, but a few other clues can help:

- **You arrived from a message, not by choice.** Links in unexpected emails, texts and DMs deserve the most scrutiny.
- **It asks for more than usual.** A login page that immediately asks for your two-factor code, card number, date of birth or security answers on the same screen is suspicious.
- **It always accepts your password** — or always rejects it. Some phishing pages show an error the first time to capture you typing it twice.
- **It is a pop-up window that will not leave the browser.** Some attacks draw a fake "Sign in with…" window inside the web page itself, complete with a fake address bar. A real pop-up is a separate browser window: you can drag it outside the main browser window, and it appears separately in your taskbar. A fake one cannot leave the page.
- **After you log in, you are bounced to the real site's home page.** This is a common way to make victims think nothing happened.

## Why fakes are so convincing

It helps to understand why fake login pages fool careful people, because it explains why "it looked real" is not a useful test.

Building a convincing copy of a login page takes very little effort: the real page's design, logos and text are visible to anyone who visits it. Phishing kits — ready-made packages sold or shared among criminals — bundle these copies with tools that collect what victims type. Some forward credentials and one-time codes to the real site instantly, so the attacker can sign in while the code is still valid, and then redirect the victim to the genuine website so that nothing seems wrong.

On phones the problem is worse. Mobile browsers often show only part of the address, and apps that open links in built-in browsers may hide the address bar entirely. If you cannot see the full domain, assume you cannot verify the page, and open the service's official app or a bookmark instead.

### Teaching others to check

If you help family members or colleagues with technology, the right-to-left rule is one of the most valuable things you can teach. Practise with real examples from your own inbox: open a genuine message from a bank or retailer, find the registered domain together, and then compare it with a spam message. A few minutes of practice builds a habit that lasts.

## Let your tools do the checking

Humans are not good at examining every character of every address. These tools do it automatically:

### Password managers

A [password manager](/blog/password-managers-explained/) remembers the exact domain where each password belongs. On a lookalike domain, it will not offer to fill your password. Treat that as a red flag rather than an inconvenience.

### Passkeys and security keys

Passkeys and hardware security keys are cryptographically tied to the genuine domain. On a fake site, they simply do not work — there is nothing for the attacker to capture. They are the most effective technical defence against fake login pages. Our [two-factor authentication guide](/blog/two-factor-authentication-explained/) explains how to start using them.

### Browser warnings

Modern browsers block many known phishing sites with a full-page warning. Never click past a warning that says a site is deceptive or dangerous.

### Bookmarks

For sites you log in to often, such as your bank or email, use a bookmark or the official app. Then you never need to follow a link to reach them.

:::checklist Before you type a password
- [ ] I chose to go to this site; I did not arrive from an unexpected message
- [ ] I have read the registered domain from the right, and it is correct
- [ ] My password manager recognises this site and offers to autofill
- [ ] The page is not asking for unusual information
- [ ] If a sign-in pop-up appeared, it behaves like a real separate window
:::

## If you already entered your details

Act quickly; the attacker may be using your details right now.

1. Go to the real site by typing its address and **change your password**.
2. If you reused that password anywhere else, change it there too.
3. **Log out of other sessions** and turn on [two-factor authentication](/blog/two-factor-authentication-explained/) if it is not already on.
4. If you entered a two-factor code, review recent account activity carefully.
5. If you entered financial details, contact your bank using the number on your card.
6. Report the page through your browser's "report unsafe site" option and, for work accounts, tell your IT team.

For a fuller recovery plan, see [what to do if your online account has been hacked](/blog/what-to-do-if-account-hacked/). To understand the messages that lead to fake login pages in the first place, read [how phishing attacks work](/blog/how-phishing-attacks-work/).

:::faq
Q: Can a fake website have HTTPS and a padlock?
A: Yes. HTTPS only means the connection is encrypted. Phishing sites routinely use valid certificates. Always check the domain name itself.
Q: What is the safest way to log in to important accounts?
A: Use the official app or a bookmark rather than links in messages, let a password manager autofill, and enable a passkey or security key where the service supports it.
Q: How do I check where a link goes before clicking?
A: On a computer, hover your mouse over the link and read the address that appears, usually at the bottom of the window. On a phone, press and hold the link to preview the address. Then apply the right-to-left rule.
Q: What does "xn--" mean at the start of a web address?
A: It indicates an internationalised domain name that contains non-Latin characters. These are legitimate for many languages, but they are also used to create lookalikes of familiar brands. If you were expecting a familiar English-language site, be cautious.
:::

## Sources and further reading

- UK NCSC: [Phishing: spot and report scam emails, texts, websites and calls](https://www.ncsc.gov.uk/collection/phishing-scams)
- US FTC: [How to recognize and avoid phishing scams](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams)
- FIDO Alliance: [Passkeys](https://fidoalliance.org/passkeys/)
