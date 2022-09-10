// Developed by Sean Burles at FictionTribe
// Adapated from Ryan Mulligans codepen https://codepen.io/hexagoncircle/pen/RwLQLop
/**
* Download a list of files.
* @author speedplane
*/

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './asset-cart.scss';

gsap.registerPlugin(Flip, ScrollTrigger);

class AssetCart {
    constructor(options) {
      options = options || {};
      this.assets = [];
      this.downloadAssets = [];
      this.checkDeviceType = null;
      this.assetSelector = typeof options.assetSelector !== 'undefined' ? options.assetSelector : ".ft-download-asset";
      this.animationSpeed = typeof options.animationSpeed !== 'undefined' ? options.animationSpeed : 0.75;
      this.animationEase = typeof options.animationEase !== 'undefined' ? options.animationEase :  "back.in(1)";
      this.animationWiggle = typeof options.animationWiggle !== 'undefined' ? options.animationWiggle :  "elastic.out(1, 0.3)";
      this.animationRotation = typeof options.animationRotation !== 'undefined' ? options.animationRotation : true;
      this.animationStart = typeof options.animationStart !== 'undefined' ? options.animationStart : "top 70%";
      this.scrolltriggerMarkers = typeof options.scrolltriggerMarkers !== 'undefined' ? options.scrolltriggerMarkers : false;
      this.counterRotation = typeof options.counterRotation !== 'undefined' ? options.counterRotation : 720;
      this.counterEase = typeof options.counterEase !== 'undefined' ? options.counterEase : "power4.out";
      this.counterBounceAmount = typeof options.counterBounceAmount !== 'undefined' ? options.counterBounceAmount : 30;
    }

    start() {
        let self = this;
        this.assets = gsap.utils.toArray(this.assetSelector);
        const assetApp = document.createElement("div");
        assetApp.classList.add('asset-app');
        document.body.appendChild(assetApp);

        assetApp.innerHTML = `<button class="counter-wrap"><div class="asset-counter none"></div></button><div class="asset-wrap"><div class="asset-list"></div><button id="ft-download-btn" disabled>Download Files</button></div>`;
        this.assets.forEach((asset) => {
            let span = document.createElement("span")
            span.classList.add('file-icon');
            asset.prepend(span);
        })
        setTimeout(() => {
            console.log('this is initialized')
            self.runAnimation();
        }, "250")
    }

    runAnimation() {
        let self = this;
        let assetCartClass = this;
        let i = 0;
        const appList = document.querySelector('.asset-list');
        const appCounter = document.querySelector('.asset-counter');
        const appCounterWrap = document.querySelector('.counter-wrap');
        const appWrapper = document.querySelector('.asset-app');
        const ftCounterInfo = document.querySelector('.ft-counter-info .ft-counter');
        let isAvailable;

        // Find out if extra counter element exists
        if (ftCounterInfo) {
            isAvailable = true;
        } else {
            isAvailable = false;
        }

        const setActiveItemClass = (item, isActive) => item.classList.toggle('active', isActive);

        // Set empty values for items
        appList.innerHTML = '';
        appCounter.innerHTML = '';


        const addToList = (item) => {
            const state = Flip.getState(item);

            setActiveItemClass(item, true);
            appCounterWrap.appendChild(item);

            Flip.from(state, {
                duration: this.animationSpeed,
                spin: this.animationRotation,
                ease: this.animationEase,
                onComplete: () => {

                    gsap.fromTo(item,
                        { y: 12, opacity: 0 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: this.animationWiggle
                        });

                }
            });
        };


        const watchFiles = () => {
            var deleteFiles = document.querySelectorAll('.ft-erase');
            Array.from(deleteFiles).forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    remove(link)
                });
            });
        }

       

        this.assets.forEach((asset) => {

            // Check the file extention and add filetype class
            self.checkExtention(asset)
            
            gsap.to(asset, {
                scrollTrigger: {
                    // this will use the assets as the trigger
                    trigger: asset,
                    start: this.animationStart,
                    scrub: false,
                    once: true,
                    markers: this.scrolltriggerMarkers,
                    onEnter: function onEnter(self) {
                        i++;
                        // Init downlaod button
                        assetCartClass.downloadButton();
                        self.trigger.classList.add("active");

                        // Get file URL  
                        var downloadUrl = self.trigger._gsap.target.href;
                        // Get File Name
                        let filenameSmall = self.trigger._gsap.target.href.split('/').pop();
                        let filename = filenameSmall[0].toUpperCase() + filenameSmall.substring(1);
                        // Get file classes
                        let itemcClassListArr = self.trigger._gsap.target.classList
                        // console.log(itemcClassListArr);

                        // Check for class names that start with fti to append file types to
                        const iconClassNames = [];
                        itemcClassListArr.forEach((itemClass) => {
                            console.log(itemClass)
                            let n = itemClass.startsWith("fti");
                            if (n) {
                                iconClassNames.push(itemClass)
                                console.log(iconClassNames)
                            }
                        })
                        let withSpaces = iconClassNames.join(' ');
                        console.log(withSpaces)
                        // Create Object to push to file array
                        let obj = {};
                        obj['download'] = downloadUrl;
                        obj['filename'] = filename;
                        assetCartClass.downloadAssets.push(obj); // 
                       
                        // Create the list item to show in the box
                        appList.innerHTML += '<div class="item ' + withSpaces + '"><p>' + filename + '</p><div class="control-container"><span class="ft-download-file"><a href="' + downloadUrl + '" download><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 212.973 212.973" style="enable-background:new 0 0 212.973 212.973;" xml:space="preserve"> <path d="M205.473,76.146c-4.143,0-7.5,3.358-7.5,7.5v103.32H15V83.646c0-4.142-3.357-7.5-7.5-7.5S0,79.503,0,83.646v110.82 c0,4.142,3.357,7.5,7.5,7.5h197.973c4.143,0,7.5-3.358,7.5-7.5V83.646C212.973,79.503,209.615,76.146,205.473,76.146z"/> <path d="M101.171,154.746c1.407,1.407,3.314,2.197,5.304,2.197c1.989,0,3.896-0.79,5.304-2.197l32.373-32.374 c2.929-2.929,2.929-7.678,0-10.606c-2.93-2.93-7.678-2.929-10.607,0l-19.569,19.569l0.004-112.828c0-4.142-3.357-7.5-7.5-7.5 c-4.142,0-7.5,3.358-7.5,7.5l-0.004,112.829l-19.546-19.547c-2.929-2.929-7.677-2.93-10.607,0c-2.929,2.929-2.929,7.677,0,10.606 L101.171,154.746z"/> </svg></a></span><span class="ft-erase"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" ><path d="M 67.433 90 H 22.567 c -1.059 0 -1.935 -0.826 -1.997 -1.883 l -3.778 -64.518 c -0.032 -0.55 0.164 -1.088 0.542 -1.489 c 0.378 -0.401 0.904 -0.628 1.455 -0.628 h 52.42 c 0.551 0 1.077 0.227 1.455 0.628 c 0.378 0.4 0.573 0.939 0.542 1.489 L 69.43 88.117 C 69.367 89.174 68.492 90 67.433 90 z M 24.454 86 h 41.092 l 3.544 -60.518 H 20.91 L 24.454 86 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 76.714 25.482 H 13.286 c -1.104 0 -2 -0.896 -2 -2 v -3.961 c 0 -5.188 4.221 -9.41 9.41 -9.41 h 48.609 c 5.188 0 9.409 4.221 9.409 9.41 v 3.961 C 78.714 24.587 77.818 25.482 76.714 25.482 z M 15.286 21.482 h 59.428 v -1.961 c 0 -2.983 -2.427 -5.41 -5.409 -5.41 H 20.696 c -2.983 0 -5.41 2.427 -5.41 5.41 V 21.482 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 57.197 14.112 H 32.803 c -1.104 0 -2 -0.896 -2 -2 C 30.803 5.433 36.236 0 42.915 0 h 4.17 c 6.679 0 12.112 5.433 12.112 12.112 C 59.197 13.216 58.302 14.112 57.197 14.112 z M 35.052 10.112 h 19.896 C 54.055 6.603 50.868 4 47.085 4 h -4.17 C 39.131 4 35.945 6.603 35.052 10.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 55.865 75.688 c -0.039 0 -0.079 -0.001 -0.119 -0.003 c -1.103 -0.065 -1.944 -1.012 -1.879 -2.114 l 2.196 -37.53 c 0.064 -1.103 0.997 -1.948 2.114 -1.88 c 1.103 0.064 1.944 1.011 1.879 2.113 L 57.86 73.805 C 57.798 74.867 56.916 75.688 55.865 75.688 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 34.135 75.688 c -1.051 0 -1.933 -0.82 -1.995 -1.883 l -2.198 -37.531 c -0.064 -1.103 0.777 -2.049 1.88 -2.113 c 1.095 -0.072 2.049 0.777 2.113 1.88 l 2.198 37.53 c 0.064 1.103 -0.777 2.049 -1.88 2.113 C 34.214 75.687 34.174 75.688 34.135 75.688 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 45 75.688 c -1.104 0 -2 -0.896 -2 -2 V 36.157 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 37.531 C 47 74.792 46.104 75.688 45 75.688 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g></svg></span></div></div>';

                        watchFiles();
                    
                        // Add and animate the new File count  
                        var tl = gsap.timeline();
                        tl.fromTo(appCounter,
                            { rotation: 0 }, {
                            duration: 1.3,
                            ease: assetCartClass.counterEase,
                            rotation: assetCartClass.counterRotation,
                            y: -assetCartClass.counterBounceAmount,
                            onStart: function onComplete() {
                                // Update counter
                                appCounter.innerHTML = assetCartClass.downloadAssets.length;
                                if (isAvailable) {
                                    ftCounterInfo.innerHTML = assetCartClass.downloadAssets.length;
                                }
                            }
                        },
                        );
                        tl.to(appCounter, {
                            duration: 0.8,
                            ease: assetCartClass.counterEase,
                            y: 0,
                            clearProps: 'all'
                        }, "-=0.6");

                        if (assetCartClass.downloadAssets.length < 1) {
                            if (isAvailable) {
                                ftCounterInfo.innerHTML = 0;
                            }

                            appCounterWrap.classList.add('none')
                            appCounterWrap.classList.remove('active')
                        } else {
                            appCounterWrap.classList.add('active')
                            appCounterWrap.classList.remove('none')
                        }

                        addToList(asset.firstChild);

                    },
                }
            });
        });


        appCounterWrap.addEventListener('click', () => appWrapper.classList.toggle('open'));


        //  Remove items from array and list
        const remove = (elem) => {
            console.log(elem)
            const appCounterWrap = document.querySelector('.counter-wrap');
            const appCounter = document.querySelector('.asset-counter');
            const appWrapper = document.querySelector('.asset-app');

            // console.log(elem.parentElement);   
            const itemText = elem.parentElement.textContent.substr(1);
            // console.log(itemText);
            const itemPos = self.downloadAssets.findIndex(elem => elem.name == itemText);
            // console.log(itemPos);
            var tl = gsap.timeline();
            tl.to(elem.parentNode.parentNode, {
                duration: 0.5,
                x: '50px',
                height: 0,
                autoAlpha: 0,
                ease: "power2.out",
                onComplete: () => {
                    elem.parentNode.parentNode.remove(elem.parentNode.parentNode);
                }
            })
            self.downloadAssets.splice(itemPos, 1);

            // Check if we have assets and add or remove classes to hide or show and update counter
            if (self.downloadAssets.length < 1) {
                if (isAvailable) {
                    ftCounterInfo.innerHTML = 0;
                }
                appCounterWrap.classList.add('none')
                appCounterWrap.classList.remove('active')
                appWrapper.classList.remove('open')
            } else {
                appCounterWrap.classList.add('active')
                appCounterWrap.classList.remove('none')

                var tl = gsap.timeline();
                tl.fromTo(appCounter,
                    { rotation: 0 }, {
                    duration: 1.3,
                    ease: assetCartClass.counterEase,
                    rotation: assetCartClass.counterRotation,
                    y: -assetCartClass.counterBounceAmount,
                    onStart: function onComplete() {
                        // Update counter
                        appCounter.innerHTML = self.downloadAssets.length;
                        if (isAvailable) {
                            ftCounterInfo.innerHTML = self.downloadAssets.length;
                        }
                    }
                },
                );
                tl.to(appCounter, {
                    duration: 0.8,
                    ease: assetCartClass.counterEase,
                    y: 0,
                    clearProps: 'all'
                }, "-=0.6");
            }
            self.downloadButton();
        }

    }

    download_files(files) {
        const download_next = (i) => {
            if (i >= files.length) {
                return;
            }
            var a = document.createElement('a');
            a.href = files[i].download;
            a.target = '_parent';
            // Use a.download if available, it prevents plugins from opening.
            if ('download' in a) {
                a.download = files[i].filename;
            }
            // Add a to the doc for click to work.
            (document.body || document.documentElement).appendChild(a);
            if (a.click) {
                a.click(); // The click method is supported by most browsers.
            } 
            // Delete the temporary link.
            a.parentNode.removeChild(a);
            // Download the next file with a small timeout. The timeout is necessary
            // for IE, which will otherwise only download the first file.
            setTimeout(() => {
                download_next(i + 1);
            }, 500);
        }
        // Initiate the first download.
        download_next(0);
    }

    checkExtention(elem) {
        // Split the href by the last period to get exension 
        let n = elem.href.split(".");
        let ext = n[(n.length) - 1];
        elem.classList.add('fti-' + ext)
    }

    // Initialize the download, disable is no assets and hide if mobile
    downloadButton() {
        if (this.downloadAssets.length < 1) {
            document.getElementById('ft-download-btn').setAttribute('disabled', '');
        } else {
            document.getElementById('ft-download-btn').removeAttribute('disabled');
        }
        if (this.checkDeviceType == 'mobile' || this.checkDeviceType == 'tablet') {
            document.getElementById('ft-download-btn').classList.add('remove')
        }
    }

    deviceType() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.checkDeviceType = "mobile";
        } else {
            this.checkDeviceType = "desktop";
        }
        return this;
    }
    
    init() {
        this.deviceType().start();
        const downloadBtn = document.querySelector('#ft-download-btn');
        // Click to download all files from our download_files function
        downloadBtn.addEventListener("click", () => this.download_files(this.downloadAssets));
    }
}

export default AssetCart;