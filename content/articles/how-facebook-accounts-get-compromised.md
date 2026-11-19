---
title: How Facebook Accounts Get Compromised — How to Protect Your Account
seoTitle: How Facebook Accounts Get Hacked — and How to Protect Yours
slug: how-facebook-accounts-get-compromised
description: Four common ways Facebook accounts are taken over, what each looks like from the victim's side, and the specific settings that would have stopped them.
category: social-media-security
categories: phishing-social-engineering
tags: facebook, meta, account takeover, phishing, two-factor authentication, business pages
date: 2026-11-09
intro: Facebook account takeovers follow a small number of well-worn patterns. We walk through each one as a scenario — what it looks like, why it works, and which protection would have stopped it cold.
---

Facebook has been around long enough that most people's accounts are layered with years of photos, messages, groups, pages and connected apps. That history is precisely what makes an account valuable to someone else. A compromised profile can be used to message friends with scams, run fraudulent adverts through a linked ad account, take over a business page, or simply be held to ransom.

Rather than list techniques in the abstract, this guide walks through four scenarios. They are **illustrative composites** — not real people — built from the patterns that platform help centres, security agencies and researchers describe again and again. Each is followed by what went wrong and what would have prevented it.

## Scenario one: the page that was "about to be deleted"

A small bakery runs its Facebook page from the owner's personal account. One morning a message arrives in the page inbox, apparently from "Meta Business Support". It says the page has received multiple intellectual-property complaints and will be unpublished within 24 hours unless the owner submits an appeal. There is a link to a form.

The form looks official, with Meta branding and a case number. It asks for the owner's name, email, phone number and password, then for "the code we just sent you". The owner fills it in. Within minutes, they are logged out. By the afternoon, the page has a new admin, the owner has been removed, and the linked ad account is running adverts for something they have never heard of.

### What went wrong

This is phishing aimed squarely at page administrators. Pages with real audiences and ad accounts with saved payment methods are worth money, so these messages are common. The appeal "form" was a lookalike page that collected the password and the one-time code and replayed them on the real site in real time.

### What would have stopped it

- **Checking inside the official tools.** Genuine warnings about a page's standing appear in Meta's own business tools and support inbox — not as a link to an outside form.
- **Never entering a login code into a page you reached from a message.** A code is only for the screen you yourself opened.
- **Phishing-resistant sign-in.** Where available, signing in with a passkey or security key means there is no code to steal; these methods only work on the genuine site.

:::warning Fake "Meta Support" is everywhere
Impersonation of Meta support shows up in Messenger, page inboxes, comments and email. Meta does not threaten to delete your page through a direct message and ask you to log in elsewhere. Read our guide on [how to identify a fake login page](/blog/how-to-identify-fake-login-page/) to learn how to check where a link really leads.
:::

## Scenario two: the password that was already out there

A retired teacher uses the same email and password on Facebook as on an old online shop account they created years ago. That shop suffers a breach, and its customer list ends up circulating among criminals. Automated tools try those email-and-password pairs on popular sites, including Facebook. One works.

The teacher does not notice anything until friends start asking why they are being sent links to a "crypto investment opportunity".

### What went wrong

This is **credential stuffing**. The attacker never interacted with the victim. They simply tried a password that had already leaked from somewhere else. The technique works because password reuse is so common.

### What would have stopped it

- A **unique password** for Facebook. See our guide to [creating strong passwords](/blog/how-to-create-strong-passwords/).
- **Two-factor authentication**, which would have required a second proof even with the correct password. Our [two-factor authentication guide](/blog/two-factor-authentication-explained/) explains which methods are strongest.
- **Login alerts.** Facebook can notify you of logins from unrecognised devices, which would have flagged the intrusion immediately.

## Scenario three: the browser extension and the stolen session

A freelance social-media manager runs several client pages. Looking for a tool to schedule posts, they install a browser extension promising "advanced Facebook analytics". On another occasion they download what they believe is a document from a potential client, which actually installs malicious software.

Neither event causes any visible problem. But in the background, software is quietly copying the browser's saved data — including the session information that keeps them logged in to Facebook. Days later, an attacker uses that session to access the business tools and adds themselves as an administrator on several client assets.

### What went wrong

Some malware is designed specifically to steal browser sessions and saved passwords; with a valid session, an attacker can act as the victim without needing to log in again. Security researchers have documented campaigns aimed squarely at people who manage Facebook business and advertising accounts — WithSecure, for example, published research in 2022 on one such operation it called Ducktail. Malicious or compromised browser extensions are a related risk, because extensions can often read data on the sites you visit.

### What would have stopped it

- **Installing extensions sparingly**, only from well-established publishers, and reviewing them regularly.
- **Treating unexpected attachments with suspicion**, especially archives and executables sent by people you have never worked with. Our [malware guide](/blog/malware-explained/) covers the warning signs.
- **Reviewing active sessions and business admins** on a schedule, and removing anything unfamiliar.
- **Keeping the device updated** and running reputable security software.

## Scenario four: the friend who needed help

A student receives a Messenger message from a friend: *"I'm locked out of my account, can I use your number to receive my recovery code? Just send me what comes through."* A code arrives. The student forwards it.

In reality, the "friend" was an attacker who had already taken over the friend's account. The code was for the **student's own** account. Forwarding it gave the attacker what they needed to reset the student's password — and now the cycle continues from the student's profile.

### What went wrong

This is social engineering in its purest form. The request exploited trust and helpfulness, and arrived through a channel the student considered safe. The underlying trick — getting a victim to relay a code meant for them — is the same one used against Instagram users, described in [how hackers target Instagram accounts](/blog/how-hackers-target-instagram-accounts/).

### What would have stopped it

A simple, absolute rule: **never pass on a verification code**. If a friend asks for something unusual, verify through a different channel, such as calling them.

## The patterns underneath

Look at the four scenarios together and the same few weaknesses keep appearing:

| Weakness | Scenarios | The fix |
| --- | --- | --- |
| Password reuse | Two | Unique password per site, ideally in a password manager |
| No second factor, or one that can be phished | One, two, four | Two-factor authentication with an authenticator app, passkey or security key |
| Trusting unexpected messages | One, four | Verify through official tools or a separate channel |
| Untrusted software on the device | Three | Minimal extensions, careful downloads, updates |
| Nobody checking for intruders | All | Login alerts and periodic session reviews |

> Most account takeovers are not sophisticated. They are patient, and they bet on someone being in a hurry.

## A Facebook security routine that actually sticks

You do not need to become a security expert. You need a short routine you can repeat. Facebook's settings move occasionally, but at the time of writing most of the relevant options live under **Accounts Center → Password and security**, and Meta's **Security Checkup** tool walks you through the essentials.

:::checklist Do this once
- [ ] Set a unique, long password for Facebook (and for the email account linked to it)
- [ ] Turn on two-factor authentication, preferring an authentication app, passkey or security key over text messages
- [ ] Save your recovery codes somewhere offline
- [ ] Turn on alerts for unrecognised logins
- [ ] Confirm your contact email and phone number are current and secure
- [ ] Remove apps and websites you no longer use from your Facebook settings
:::

:::checklist Do this every few months
- [ ] Review "Where you're logged in" and log out of anything unfamiliar
- [ ] If you manage pages or ad accounts, check the list of people with access and remove anyone who should not be there
- [ ] Check ad accounts for unexpected payment methods or spending
- [ ] Review installed browser extensions
:::

## If your account has already been compromised

Go directly to Meta's official recovery page at [facebook.com/hacked](https://www.facebook.com/hacked) from a device you trust, and follow the steps there. Do not respond to people who offer to recover your account for a fee — they are almost always scammers targeting people in a vulnerable moment. Our step-by-step guide to [recovering and securing a compromised Facebook account](/blog/recover-hacked-facebook-account/) goes through the process in order, including how to warn friends and check business assets.

:::faq
Q: How do I know if someone else is logged into my Facebook account?
A: Check the list of active sessions in your Facebook security settings, often labelled "Where you're logged in". It shows devices and approximate locations. Log out of any session you do not recognise and change your password.
Q: Can my Facebook account be hacked if I have two-factor authentication on?
A: It becomes much harder, but not impossible. Attackers can still trick people into entering codes on fake pages or forwarding them, and session-stealing malware can bypass the login step entirely. Phishing-resistant methods such as passkeys and security keys, plus careful habits, close most of those gaps.
Q: Does Meta contact page owners through Messenger about violations?
A: Messages in Messenger or page inboxes threatening to delete your page and asking you to log in through a link are a hallmark of phishing. Check your page's status inside Meta's official business tools instead of following links.
Q: What should I do if friends say they received strange messages from me?
A: Assume your account may be compromised. Change your password from a trusted device, enable two-factor authentication, log out of all other sessions, and warn friends through another channel not to click any links or share any codes.
:::

## Sources and further reading

- Meta Help Centre: [Hacked and fake accounts](https://www.facebook.com/hacked)
- US Federal Trade Commission: [How to recognize and avoid phishing scams](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams)
- UK NCSC: [Social media: how to use it safely](https://www.ncsc.gov.uk/guidance/social-media-how-to-use-it-safely)
