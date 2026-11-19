---
title: How to Create Strong Passwords That Are Difficult to Guess
slug: how-to-create-strong-passwords
description: Why length beats complexity, how passwords are really attacked, and a simple method for creating passphrases that are strong, unique and easy to remember.
category: password-security
categories: tutorials
tags: passwords, passphrases, credential stuffing, nist, account security
date: 2026-08-18
updated: 2026-10-28
essential: true
intro: Most password advice is outdated. Forced symbols, monthly changes and "P@ssw0rd!" substitutions do little against modern attacks. Here is what actually makes a password strong — and a method you can use today.
---

For years, we were told that a good password needed an uppercase letter, a number and a symbol, and that we should change it every few months. The result was a generation of passwords like `Summer2024!` — technically compliant, easy for attackers to predict, and reused across dozens of sites.

Modern guidance has moved on. The US National Institute of Standards and Technology (NIST), whose digital identity guidelines are widely followed, now emphasises **length**, **checking passwords against known breached lists**, and **not forcing routine changes** without a reason. Understanding why starts with how passwords are actually attacked.

## How passwords are really attacked

There is no single "password hacking" technique. There are several, and each one is defeated by a different property of a good password.

### Credential stuffing

When a website is breached, its users' email addresses and passwords often end up circulating among criminals. Automated tools then try those exact pairs on other popular sites. If you reused the password, the attacker gets in on the first try — no guessing required.

**Defeated by:** using a unique password for every account.

### Guessing common passwords

Attackers try the most common passwords and patterns first: `123456`, `password`, `qwerty`, names, sports teams, years, keyboard patterns, and predictable substitutions like `@` for `a`. Lists of commonly used passwords are compiled from previous breaches, so the most "human" choices are tried earliest.

**Defeated by:** unpredictability — avoiding words, patterns and personal details.

### Cracking stolen password databases

Well-run websites do not store your actual password; they store a scrambled version called a hash. If that database is stolen, attackers can use powerful computers to try enormous numbers of guesses offline, checking each against the stolen hashes. Here, the length and randomness of your password determine how long it survives.

**Defeated by:** length and randomness.

### Phishing and malware

No password, however strong, survives being typed into a fake login page or captured by malware. This is why strong passwords need to be paired with [two-factor authentication](/blog/two-factor-authentication-explained/) and an awareness of [how phishing works](/blog/how-phishing-attacks-work/).

**Defeated by:** two-factor authentication, passkeys and careful habits — not by the password itself.

## The three properties of a strong password

Putting that together, a strong password has three properties. It is:

1. **Long.** Each additional character multiplies the number of possible combinations. Length is the single biggest contributor to strength.
2. **Unpredictable.** It does not follow patterns or contain information about you that someone could find or guess.
3. **Unique.** It is used for exactly one account.

> A short, complex password is hard for you to remember and easy for a computer to guess. A long passphrase is the opposite.

## Why length beats complexity

Consider two options. The first is eight characters with every kind of symbol: `Tr0ub&3!`. The second is four random everyday words: `orbit velvet plank sunrise`.

The first looks strong to a human. But it follows a familiar shape — a capitalised word with substitutions and a symbol on the end — and at eight characters, it falls within reach of offline cracking. The second is much longer, contains no meaningful pattern if the words are genuinely chosen at random, and is far easier to remember and type.

| Password style | Example pattern | Why it is weak or strong |
| --- | --- | --- |
| Common word with substitutions | P@ssw0rd1 | Substitutions are the first thing cracking tools try |
| Name plus year | Name1987! | Personal details are guessable and often public |
| Keyboard pattern | qwerty123 | Appears in every common-password list |
| Short random characters | x7#Kq2 | Random, but too short to resist offline cracking |
| Long random characters | 20+ random characters | Very strong, but only practical with a password manager |
| Random-word passphrase | four to six unrelated words | Strong, memorable and easy to type |

*The examples above illustrate patterns only. Never use a password you have seen published anywhere, including in an article like this one.*

## How to create a strong passphrase

The most reliable method for passwords you need to remember is a **random-word passphrase**. The randomness is what makes it strong, so it matters that you do not choose the words yourself.

1. **Use a random source.** Physical dice with a published word list (the "Diceware" method), or the passphrase generator built into a reputable password manager. The Electronic Frontier Foundation publishes word lists designed for this purpose.
2. **Pick at least four words; five or six is better** for important accounts such as your email or password manager.
3. **Do not rearrange the words into a sentence** that makes sense. "Random" means random.
4. **Add separators if a site requires them** — spaces, hyphens or a digit between words are fine.
5. **Make it unique.** Never reuse a passphrase on another site.

:::tip How many passwords do you actually need to remember?
Ideally, very few. Use a memorable passphrase for your device login, your email account and your password manager. Let a [password manager](/blog/password-managers-explained/) generate and store long random passwords for everything else.
:::

## What to avoid

- **Personal information** — names of children, pets, partners, birthdays, addresses, favourite teams. Much of this is visible on social media.
- **Variations of an old password** — `Password1` becoming `Password2` is the first thing an attacker will try if the old one leaked.
- **Famous quotes, lyrics and phrases** — these appear in cracking dictionaries.
- **Writing passwords in a note on your phone or a file called "passwords"** — use a password manager instead.
- **Sharing passwords by text message or email**.

## Shared and family accounts

Some accounts are genuinely shared: a streaming service, a household utility account, the Wi-Fi password. Sharing is not automatically insecure, but the way people share often is.

- **Do not reuse a personal password for a shared account.** Once it is shared, assume it may be written down, saved on other devices or passed on.
- **Share through a password manager where you can.** Most offer secure sharing with family members, so the password never travels by text or email, and access can be revoked later.
- **Change shared passwords when someone leaves the household** or no longer needs access — a former housemate, an ex-partner, a contractor.
- **Prefer separate profiles or member accounts** where the service supports them. Many platforms let each person have their own login, so nobody needs to know anyone else's password.
- **For children's accounts**, use the platform's family or parental tools rather than keeping a list of their passwords in a notes app.

## Should you change your passwords regularly?

Not on a fixed schedule. Forced periodic changes tend to produce weaker passwords, because people make small, predictable modifications. NIST's guidance advises against requiring routine changes and recommends changing a password **when there is evidence it may have been compromised**.

Change a password immediately if:

- the service tells you it suffered a breach;
- you typed it into a page you now suspect was fake;
- you notice unfamiliar activity on the account;
- you have reused it anywhere else (change it to something unique);
- you shared it with someone who should no longer have access.

## Check whether your passwords have leaked

Services such as [Have I Been Pwned](https://haveibeenpwned.com/) let you check whether your email address has appeared in known data breaches. Many password managers and browsers now also warn you if a saved password appears in breach data. If any of your accounts show up, change those passwords first — starting with any you reused.

## Beyond passwords: passkeys

Passkeys are gradually replacing passwords on many major services. Instead of a secret you type, a passkey is a cryptographic key stored on your device and unlocked with your fingerprint, face or PIN. It cannot be guessed, reused or phished. Where a service offers passkeys, they are generally the more secure choice. You can read more in our guide to [two-factor authentication](/blog/two-factor-authentication-explained/).

:::checklist Password health check
- [ ] My email account has a long, unique passphrase
- [ ] No two of my important accounts share a password
- [ ] None of my passwords contain personal details or common patterns
- [ ] I have checked my email address on a breach-notification service
- [ ] I have changed any password that appeared in a breach
- [ ] I use a password manager — or have a plan to start
:::

:::takeaways
- Length and uniqueness matter more than symbols and substitutions.
- Use random-word passphrases for the few passwords you must remember.
- Let a password manager create and store everything else.
- Change passwords when there is a reason, not on a calendar.
- Pair every important password with two-factor authentication.
:::

:::faq
Q: How long should a password be?
A: For accounts protected only by a password, aim for at least 15 characters. For a passphrase of random words, four words is a reasonable minimum and five or six is better for critical accounts such as email and your password manager.
Q: Are passphrases really more secure than complex passwords?
A: A long passphrase made of genuinely random words is typically much harder to crack than a short complex password, and it is easier to remember. The randomness of word selection is essential — a well-known phrase is weak.
Q: Is it safe to let my browser save my passwords?
A: Modern browser password managers are far safer than reusing passwords or writing them in a notes app. Protect the browser account with a strong password and two-factor authentication. Dedicated password managers offer extra features such as secure sharing and cross-platform support.
Q: Should I use the same password with a different number for each site?
A: No. Attackers who obtain one version can easily guess the pattern. Each password should be completely unrelated to the others.
:::

## Sources and further reading

- NIST: [Digital Identity Guidelines (SP 800-63)](https://pages.nist.gov/800-63-4/)
- UK NCSC: [Three random words](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/use-a-strong-and-separate-password-for-email)
- EFF: [Creating strong passwords](https://ssd.eff.org/module/creating-strong-passwords)
- [Have I Been Pwned](https://haveibeenpwned.com/)
