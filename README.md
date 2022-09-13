![AssetCart.js logo](https://github.com/fictiontribe/AssetCart/blob/master/graphic.jpg?raw=true)
============
![npm](https://img.shields.io/npm/v/asset-cart?color=green&style=flat-square) [![GitHub Size](https://img.shields.io/github/size/fictiontribe/AssetCart/dist/asset-cart.min.js?color=%23ff5757&style=flat-square)](https://github.com/fictiontribe/AssetCart/dist/asset-cart.min.js) ![GitHub issues](https://img.shields.io/github/issues/fictiontribe/assetcart?style=flat-square) [![GitHub stars](https://img.shields.io/github/stars/fictiontribe/assetcart?style=flat-square)](https://github.com/fictiontribe/assetcart) ![FTBadge](https://img.shields.io/badge/Fiction%20Tribe-Let%20Humans%20Reign-%2381B63A)

Widget that collects all linked assets with a class and adds a cool animation effect on scroll to drop them into an asset cart for the user to view and download. This imitates a e-commerce cart functionality for better engagement. I bet you haven't seen this before ;)

![GIF demo](https://github.com/fictiontribe/AssetCart/blob/master/assetcartjs.gif?raw=true)

---

## Demo (Codepen)
[![](https://github.com/fictiontribe/AssetCart/blob/master/demobtn.png?raw=true)](https://codepen.io/russian/pen/abGmpqy)

---

## Features
- Vanilla JS
- Quick setup/activation
- No extra-work, just add the class
- The only dependancy is GSAP

---

## Installation
### CDN
To start working with AssetCart.js right away, make sure to add GSAP, ScrollTrigger, and Flip plugins before your ending <body> tag:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/Flip.min.js"></script> 
```
Then, make sure you add the AssetCart.js CSS (inside the <head> of your page):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/asset-cart/dist/asset-cart.min.css"/>
```
To initialize the plugin, add this JS code to your page and adjust plugin options to your liking (examples are commented out in the code below). Feel free to use the CodePen link to test out the plugin settings.

```html
<script type="module">
  gsap.registerPlugin(Flip, ScrollTrigger);
  import AssetCart from 'https://cdn.jsdelivr.net/npm/asset-cart/dist/asset-cart-clean.min.js';
  let assetCart = new AssetCart({
      assetSelector: ".downloadable",
      // animationSpeed: 1,
      // animationEase: "bounce.out",
      // animationRotation: true,
      // animationWiggle: "expo.out",
      // animationStart: "top 80%",
      // scrolltriggerMarkers: true,
      // counterRotation: 9000,
      // counterEase: "steps(12)",
      // counterBounceAmount: 150
  });
  assetCart.init();
</script>
```

### NPM
Alternatively, AssetCart.js can be installed with [`npm`](https://www.npmjs.com/package/asset-cart)
```sh
$ npm install asset-cart
```

and then imported and initialized in Javascript like this
```js
import AssetCart from 'asset-cart';

let assetCart = new AssetCart({
    assetSelector: ".downloadable",
    // animationSpeed: 1,
    // animationEase: "bounce.out",
    // animationRotation: true,
    // animationWiggle: "expo.out",
    // animationStart: "top 80%",
    // scrolltriggerMarkers: true,
    // counterRotation: 9000,
    // counterEase: "steps(12)",
    // counterBounceAmount: 150
});
assetCart.init();
```

…or include the JS and CSS files from this repo… 

---

## Run
Add an assetSelector class (passed as an option when you initialized the AssetCart class) or a class ".ft-download-asset" (if you haven't set custom assetSelector during the previous step).
```html
<a class="ft-download-asset" href="./images/test.zip">Read the case study</a>
```

To show an extra asset counter (think e-commerce cart) somewhere on the page, next to a form, for example, you can add this element. (It can be adjusted in code to meet your needs)

```html
<div class="ft-counter-info"><span class="ft-counter"></span><span> Assets</span></div>
```

## What's coming
- Direct integration with the CTA / form on the page
- More pre-built animation options
- Customizable Asset icons
- Instructions for CSS styling (currently done by overwriting existing styles)

---

## Developed by
<img alt="FictionTribe Logo" src="https://mishapetrov.github.io/Contrast.js/img/ft-logo.png" width="100">  
Created at <a style="color:#52337c;" href="https://fictiontribe.com">Fiction Tribe ®</a> in Portland, OR

---

## License
>You can check out the full license [here](https://github.com/mishapetrov/Contrast.js/LICENSE)

This project is licensed under the terms of the **MIT** license.