---
title: "Password Managers Explained: Are They Safe?"
slug: password-managers-explained
description: How password managers work, the real risks of keeping all your passwords in one place, and how to choose and set one up safely.
category: password-security
categories: security-tools
tags: password manager, passwords, encryption, passkeys, account security
date: 2026-09-29
essential: true
intro: Putting every password in one place sounds like a terrible idea — until you compare it with the alternatives. Here is an honest look at how password managers work, what can go wrong, and why most security experts still recommend them.
---

The average person has dozens, often hundreds, of online accounts. Creating a long, unique password for each one and remembering them all is not realistic. So people reuse passwords, make small variations, or keep a list somewhere convenient. Each of those habits creates exactly the weaknesses criminals exploit.

A password manager is software that generates, stores and fills in passwords for you. You remember one strong **master password** (or use a passkey or biometrics to unlock it), and the manager handles everything else. The obvious question follows: isn't it dangerous to put all your eggs in one basket? It is a fair question, and it deserves a straight answer.

## How a password manager works

Although products differ, most reputable password managers follow the same broad design.

:::flow What happens when you save a password
- You save a login: The manager records the site address, username and password.
- It encrypts locally: Your vault is encrypted on your device using a key derived from your master password.
- It syncs ciphertext: Only the encrypted vault is stored on the provider's servers, if sync is used.
- You unlock: Your master password, biometrics or passkey unlocks the vault on your device.
- It autofills: The manager fills credentials only when the site address matches what was saved.
:::

The key idea in many leading products is **zero-knowledge encryption**: the provider stores your vault but does not have the key to decrypt it. Your master password is never sent to them. If their servers are breached, attackers get encrypted data that is only useful if they can guess your master password.

That design decision is why the strength of your master password matters so much — and why a good manager slows down guessing attempts deliberately, using key-derivation functions that make each guess expensive.

## The honest risk assessment

No security tool is risk-free. The real question is whether a password manager is **safer than what you are doing now**. Let us compare the common alternatives.

| Approach | Main risk | Overall |
| --- | --- | --- |
| Reusing one or two passwords | One breach exposes many accounts via credential stuffing | High risk |
| Small variations of one password | Patterns are easy to guess once one version leaks | High risk |
| Notes app or spreadsheet | Unencrypted, often synced, easily found by malware or anyone with your phone | High risk |
| Paper notebook at home | Safe from online attackers; risky if lost, and inconvenient for long passwords | Moderate — reasonable for some people |
| Browser's built-in manager | Tied to browser account security; fewer features | Low to moderate risk |
| Dedicated password manager | A breach of the provider or your master password is serious; mitigated by encryption and 2FA | Low risk when set up well |

For most people, a password manager — built into the browser or a dedicated one — is a significant improvement. The remaining risks are real, but they are concentrated in a single place that you can protect very well.

> A password manager does put your eggs in one basket. But it is a basket you can lock, guard and watch — unlike a hundred eggs scattered across the internet.

### What happens when a password manager company is breached?

This is not hypothetical. In December 2022, LastPass disclosed that attackers had copied backups of customer vault data. The vaults themselves were encrypted, but some unencrypted metadata, such as website addresses, was also exposed, and the incident highlighted that users with weak master passwords — or with older accounts using weaker encryption settings — faced greater risk.

The lessons from that incident are useful for anyone choosing or using a manager:

- **Your master password is your last line of defence** if encrypted data is stolen. Make it long and unique.
- **Provider transparency matters.** Look for clear documentation of the encryption design and a track record of independent security audits.
- **Rotate the most important passwords after any provider breach**, starting with email and financial accounts.

### What about malware on my device?

If your device is infected with malware that can watch what you type or read your screen while the vault is unlocked, a password manager cannot fully protect you — but nothing else can either. Keeping your device updated and following the advice in our [malware guide](/blog/malware-explained/) protects your passwords regardless of how you store them.

## The underrated benefit: phishing protection

A good password manager links each saved password to a specific website address. When you land on a fake login page — say, a lookalike of your bank — the manager will not offer to autofill, because the address does not match.

That silence is a valuable warning. If your password manager does not recognise a site you expected it to know, stop and check the address. Our guide on [how to identify a fake login page](/blog/how-to-identify-fake-login-page/) explains what to look for.

:::warning Do not override the warning
If autofill does not appear, resist the temptation to copy your password from the vault and paste it in manually. That is exactly what the fake site is waiting for.
:::

## Types of password managers

### Built into your browser or operating system

Chrome, Edge, Firefox and Safari all include password managers, as do Apple's and Google's platforms. They are free, convenient and much better than reusing passwords. Their limitations are mostly about working across different ecosystems — for example, using an iPhone with a Windows laptop — and about having fewer features for sharing or emergency access.

### Dedicated password managers

Standalone products work across browsers, operating systems and devices, and usually add features such as secure sharing with family members, breach monitoring, emergency access and storage for passkeys, notes and documents. Some are free, many charge a modest subscription.

### Offline or self-hosted

Some managers store the vault only on your device, or let you host the sync service yourself. These give you more control but require more technical care, particularly around backups.

## How to choose one

Rather than recommend a specific brand — products and pricing change — here is what to look for:

:::checklist Choosing a password manager
- [ ] End-to-end, zero-knowledge encryption, clearly documented
- [ ] Published independent security audits
- [ ] Two-factor authentication or passkey support for unlocking the account
- [ ] Works on every device and browser you use
- [ ] Password generator and breach alerts
- [ ] Passkey storage, if you plan to use passkeys
- [ ] A clear account recovery and emergency access process
- [ ] An established company with a transparent history of handling incidents
:::

## Setting one up safely

1. **Create a strong master password.** Use a random-word passphrase of at least five or six words. It must not be used anywhere else. Our guide to [creating strong passwords](/blog/how-to-create-strong-passwords/) explains how.
2. **Turn on two-factor authentication** for the password manager account. See our [two-factor authentication guide](/blog/two-factor-authentication-explained/).
3. **Save the recovery kit** or emergency codes the manager provides, and store them offline.
4. **Import or add your most important accounts first** — email, banking, phone account, social media.
5. **Change reused passwords** as you go, using the generator. Start with accounts that share a password.
6. **Remove old copies** — delete passwords from notes apps, spreadsheets and browsers you no longer use.
7. **Set up emergency access** if offered, so a trusted person can reach your accounts if something happens to you.

You do not need to migrate everything in one sitting. Many people simply update each password the next time they log in to that site.

:::tip Write down your master password — carefully
It is reasonable to write your master password on paper and store it somewhere physically secure at home, at least until you have memorised it. Online attackers cannot reach a piece of paper in a drawer.
:::

:::takeaways
- Password managers make unique, strong passwords practical, which removes the risk of credential stuffing.
- Reputable managers encrypt your vault so the provider cannot read it.
- Your master password and the account's two-factor authentication are critical — make them strong.
- Autofill that refuses to work is a useful phishing warning.
- A browser's built-in manager is a perfectly good start.
:::

:::faq
Q: Are password managers safe to use?
A: For the vast majority of people, yes — far safer than reusing passwords or storing them in notes. The key requirements are a strong, unique master password, two-factor authentication on the manager account, and keeping your devices updated.
Q: What happens if I forget my master password?
A: With zero-knowledge managers, the provider usually cannot recover it for you. Most offer a recovery kit, recovery code or account recovery option that you set up in advance. Do that on day one.
Q: Is the password manager built into my browser good enough?
A: For many people it is. It is free, encrypted and convenient. A dedicated manager may suit you better if you use multiple browsers or ecosystems, or want family sharing and emergency access.
Q: Can a password manager store passkeys?
A: Many modern password managers can store and sync passkeys, letting you use them across devices. Check the product's documentation for current support.
Q: Should I store two-factor codes in my password manager too?
A: Some managers can generate authenticator codes. It is convenient, but it combines both factors in one place. For your most critical accounts — especially the password manager itself and your email — consider keeping the second factor on a separate app or hardware key.
:::

## Sources and further reading

- UK NCSC: [Password managers: using browsers and apps to safeguard your passwords](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/password-managers)
- US CISA: [Use strong passwords](https://www.cisa.gov/secure-our-world/use-strong-passwords)
- LastPass: [Notice of security incident](https://blog.lastpass.com/posts/notice-of-recent-security-incident)
