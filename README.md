# Shipping Containers Scanner

> Shipping containers recognition App built with NativeScript-Vue and Firebase using [BoxTech](https://www.bic-boxtech.org/) API to collect shipping containers data.

[![Author](https://img.shields.io/badge/author-DavidFreitas-049c88?style=flat-square)](https://github.com/davidwlfreitas)
[![Languages](https://img.shields.io/github/languages/count/davidwlfreitas/shipping-containers?color=%23049c88&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/davidwlfreitas/shipping-containers?color=049c88&style=flat-square)](https://github.com/davidwlfreitas/shipping-containers/stargazers)
[![Forks](https://img.shields.io/github/forks/davidwlfreitas/shipping-containers?color=%23049c88&style=flat-square)](https://github.com/davidwlfreitas/shipping-containers/network/members)
[![Contributors](https://img.shields.io/github/contributors/davidwlfreitas/shipping-containers?color=049c88&style=flat-square)](https://github.com/davidwlfreitas/shipping-containers/graphs/contributors)

# :clapper: Preview (Android)

---

<p align="center">
    <img src="preview.gif" width="700"/>
</p>

---

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Running the App](#tophat-running-the-app)
* [FAQ](#postbox-faq)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :rocket:  Features

- Text Recognition by [Firebase Machine Leaning Kit](https://firebase.google.com/docs/ml)
- Login integrated with [BoxTech Global Container Database API](https://app.bic-boxtech.org/login)  
- Shipping Containers Recognition Algorithm based on [ISO 6346](https://en.wikipedia.org/wiki/ISO_6346)
- Integration with Firebase [Analytics](https://firebase.google.com/docs/analytics/) and [Crashlytics](https://firebase.google.com/docs/crashlytics/)
- Animation using [Lottie](https://lottiefiles.com/) Files
- Dark Mode

# :tophat: Running the App

```bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```

# :postbox: Faq

**Question:** How can I login in the app?

**Answer:** You've got to first create an account on [BoxTech Global Container Database](https://app.bic-boxtech.org/login) so that you gonna be able to login at the app and behind the scenes, we gonna provide a BoxTech JWT token to allow you to get shipping containers information through the BoxTech Global Container Database [API](https://bic-boxtech.github.io/BIC-Boxtech-API-documentation/index.html).

##
**Question:** What is BoxTech?

**Answer:** BoxTech is a non-profit service operated by the [Bureau International des Containers](https://www.bic-code.org/) – a non-profit organization serving the container transportation industry. 
BoxTech allows shippers, forwarders and other stakeholders to access a single database, eliminating the need to either visit multiple websites to obtain the tare weight data or to obtain this information from the weight indicated on the door of each container.
Feel free to find more information through their official [website](https://www.bic-boxtech.org/).

##
**Question:** What is BoxTech Global Container Database?

**Answer:** The BoxTech Global Container Database is a neutral, centralized data repository providing container owners and users a platform to easily exchange container fleet technical details. BoxTech provides an easy-to-access source of container characteristics to help support carriers, shippers, forwarders and other stakeholders in the supply chain. 

##
**Question:** Is this app running for IOS?

**Answer:** Not yet. Just for Android at the moment.

##
**Question:** What does ISO 6346 mean?

**Answer:** [ISO 6346](https://en.wikipedia.org/wiki/ISO_6346) is an international standard covering the coding, identification and marking of shipping containers. The standard establishes a visual identification system for every container that includes a unique serial number (with [check digit](https://www.bic-code.org/check-digit-calculator/)), the owner, a country code, a size, type and equipment category as well as any operational marks. The standard is managed by the [International Container Bureau (BIC)](https://www.bic-code.org/).

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [Shipping Containers Scanner](https://github.com/davidwlfreitas/shipping-containers/issues) repository. If you already found a solution to your problem, **I would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/davidwlfreitas/shipping-containers/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/davidwlfreitas/shipping-containers/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020

This project is under the [MIT license](https://github.com/davidwlfreitas/shipping-containers/blob/master/LICENSE).

Made with :beers: by [David Freitas](https://github.com/davidwlfreitas) :8ball:
