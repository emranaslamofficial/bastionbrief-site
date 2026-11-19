---
title: How Public Wi-Fi Can Put Your Data at Risk
seoTitle: Is Public Wi-Fi Safe? Real Risks and How to Stay Protected
slug: public-wifi-risks
description: What really happens on public Wi-Fi today, which risks are overstated and which are not, whether you need a VPN, and simple settings that keep your devices safe.
category: network-security
categories: online-safety
tags: public wifi, vpn, evil twin, network security, travel security
date: 2026-10-20
intro: Advice about public Wi-Fi is stuck in the past. Encryption has changed the picture dramatically — but cafés, airports and hotels still carry real risks. Here is an honest, current look at what to worry about and what to do.
---

For years, the standard advice was blunt: never use public Wi-Fi. The fear was that anyone on the same network could read everything you sent. In the early days of the web, when most websites sent information unencrypted, that fear was justified.

Today the situation is different. The large majority of web traffic is encrypted with HTTPS, and most major apps encrypt their connections too. That does not make public Wi-Fi perfectly safe, but it does mean the risks have shifted. The danger is now less about someone silently reading your traffic and more about being **tricked**, being **exposed**, or connecting a vulnerable device to an untrusted network.

## Myths and realities

| Common belief | The reality today |
| --- | --- |
| "Anyone on the network can read everything I do." | Encrypted traffic (HTTPS and most apps) cannot be read by others on the network. They may still see which sites you connect to. |
| "Using public Wi-Fi to check my bank is dangerous." | Banking apps and websites use strong encryption. The bigger risk is a fake login page or a fake network asking you to sign in. |
| "A VPN makes me completely safe." | A VPN encrypts traffic between you and the VPN provider. It does not stop phishing, malware or poor passwords. |
| "Password-protected café Wi-Fi is private." | If everyone has the same password, others on the network are still sharing it with you. |
| "If the network name matches, it's the real one." | Anyone can create a network with any name, including the café's. |

## The risks that still matter

### Evil twin and fake hotspots

An "evil twin" is a rogue access point set up to imitate a legitimate network — for instance, a hotspot named exactly like the airport or hotel network. Devices may connect to it automatically if they have joined a network with that name before.

Once connected, the operator of the fake hotspot controls your path to the internet. With modern encryption they usually cannot read your banking session, but they can try other tricks: showing you a fake "login" page that asks for your email password, redirecting unencrypted traffic, or presenting fake update prompts.

### Fake captive portals

Many public networks show a sign-in page — a "captive portal" — before you can browse. Attackers imitate these pages to collect personal information or credentials. A legitimate hotel portal may ask for your room number and surname. It should **never** ask for your email password, social media login or card details for "verification".

:::warning A Wi-Fi page asking for your account password is a scam
No legitimate public Wi-Fi network needs your email, Google, Apple, Microsoft or social media password. If a network's sign-in page asks for one, disconnect.
:::

### Your device is visible to strangers

On a shared network, other devices can potentially see and connect to yours. If file sharing, network discovery, remote access or media sharing services are switched on, you may be exposing more than you realise. An out-of-date operating system with known weaknesses is a particular concern.

### Unencrypted connections that still exist

Most websites use HTTPS, but not all apps and devices encrypt every connection. Older apps, some smart devices, and certain email or file-transfer setups may still send information in a readable form. On an untrusted network, that information can be observed.

### Shoulder surfing and physical risks

The person behind you in the queue may be a bigger threat than the network. Passwords and codes typed in public can be watched or filmed. A device left unattended for a few minutes can be stolen or tampered with.

## Do you need a VPN?

A virtual private network creates an encrypted tunnel between your device and a server run by the VPN provider. On public Wi-Fi, that has real benefits: anyone on the local network — including the operator of a fake hotspot — sees only encrypted traffic going to the VPN.

But it is important to understand what a VPN does **not** do:

- It does not protect you from phishing pages, malware or weak passwords.
- It does not make you anonymous; the VPN provider can see much of what the café's network operator otherwise would.
- A poorly run or dishonest VPN can be worse than none.

> A VPN moves your trust from the café to the VPN company. That is a good trade only if the VPN company deserves it.

If you use one, choose a well-established provider with a clear privacy policy and independent audits, and be very wary of free VPNs that need to make money somehow. Many workplaces provide a VPN for business devices — use it when you are told to.

### Often better: your phone's hotspot

Mobile data connections are generally harder to intercept than an open café network. If you have the data allowance, tethering your laptop to your own phone's hotspot is often the simplest and safest option.

## Settings that make a real difference

A few minutes adjusting your devices removes most of the public-network risk.

### On laptops

- **Windows:** when you join a public network, choose the **Public** network profile. This turns off network discovery and file sharing. Keep Microsoft Defender Firewall on.
- **macOS:** keep the built-in firewall turned on and disable file sharing, screen sharing and remote login in System Settings when you do not need them.

### On phones

- Turn off **auto-join** for public networks you do not use regularly, and remove old networks from your saved list.
- Set **AirDrop** (iPhone) or **Quick Share / Nearby Share** (Android) to "Contacts only" or off when in public.
- Keep Bluetooth off when you are not using it, if your devices allow it easily.

### On every device

- **Keep software updated.** Updates close the weaknesses that make exposed devices vulnerable.
- **Check for HTTPS** and pay attention to browser certificate warnings. Never click through a warning saying a connection is not private on a public network.
- **Use two-factor authentication** on important accounts so that even a stolen password is not enough. See our [two-factor authentication guide](/blog/two-factor-authentication-explained/).

:::checklist Before you connect to public Wi-Fi
- [ ] I have confirmed the exact network name with staff or signage
- [ ] My device is set to treat this as a public network
- [ ] File sharing and nearby sharing are off or limited to contacts
- [ ] My operating system and browser are up to date
- [ ] I will not enter account passwords into a Wi-Fi sign-in page
- [ ] I am using a reputable VPN or my own hotspot for sensitive work
:::

## What to avoid on public networks

You do not need to avoid public Wi-Fi entirely, but it is sensible to be more cautious about:

- installing software or updates that a web page — rather than your device — prompts you to install;
- logging in to accounts through links received while connected;
- accessing work systems without your organisation's VPN;
- ignoring browser security warnings.

## And at home?

Your home network deserves attention too, because every device you own connects through it.

- Change the router's default admin password.
- Use WPA3 encryption if your router and devices support it, or WPA2 if not. Avoid outdated options such as WEP.
- Install router firmware updates, or replace routers that no longer receive them.
- Use a strong, unique Wi-Fi password, and consider a separate guest network for visitors and smart devices.

For broader privacy steps, see [how to improve your online privacy](/blog/improve-online-privacy/), and for device-level protection read [how to protect your smartphone from cyber threats](/blog/protect-smartphone-from-cyber-threats/).

:::takeaways
- Modern encryption means most traffic on public Wi-Fi cannot simply be read by others.
- The real risks are fake hotspots, fake sign-in pages, exposed devices and shoulder surfing.
- Never enter an account password into a Wi-Fi sign-in page.
- Set networks to "public", limit sharing, keep devices updated, and use two-factor authentication.
- A reputable VPN or your own mobile hotspot adds protection for sensitive tasks.
:::

:::faq
Q: Is it safe to use online banking on public Wi-Fi?
A: Banking apps and websites use strong encryption, so the risk is lower than it once was. The main danger is being tricked onto a fake page. Use the official banking app, check for certificate warnings, and consider using mobile data or a VPN for extra assurance.
Q: Can someone hack my phone through public Wi-Fi?
A: A fully updated phone with sharing features limited is a difficult target. Risks increase if the phone is outdated, has unnecessary services exposed, or if you are tricked into installing something or entering credentials on a fake page.
Q: Are free VPNs safe for public Wi-Fi?
A: Some are reputable, but many free VPNs make money by collecting and selling data or showing intrusive ads. Research the provider carefully and prefer services with transparent ownership, clear privacy policies and independent audits.
Q: How can I tell if a Wi-Fi network is fake?
A: You often cannot tell from the name alone. Ask staff for the exact network name, be suspicious of duplicate or open networks with similar names, and disconnect if a sign-in page asks for account passwords or payment details unexpectedly.
:::

## Sources and further reading

- US FTC: [Using public Wi-Fi networks](https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know)
- UK NCSC: [Using public Wi-Fi](https://www.ncsc.gov.uk/collection/device-security-guidance)
- EFF: [Choosing the VPN that's right for you](https://ssd.eff.org/module/choosing-vpn-thats-right-you)
