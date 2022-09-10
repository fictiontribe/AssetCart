# asset-counter-widget
Widget to create a list of assets on page and download them
Super basic quick explanation of setup and use for now

## Required files

https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js.    
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/Flip.min.js.    

Load **download-assets.js** below gsap and plugins and as close to closing body tag as possible.

Include **downloadassets.scss** in your scss file

To indicate you want to include a asset in the widget use **.ft-download-asset** class. If everything is set up correctly it should just work

## Example

```<a class="ft-download-asset" href="./images/test.zip">Read the case study</a>```

To show an extra counter somewhere on the page, next to a form for example you can add this element. Can also adjust in code to meet your needs

``` <div class="ft-counter-info"><span class="ft-counter"></span><span> Assets</span></div>```
