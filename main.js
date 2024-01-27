class LightSlider {
    constructor(selector) {
        this.selector = selector;

        this.setup();
    }

    setup() {
        this.selector.classList.add("lightSlider-wrapper");
        const wrapper1 = document.createElement("div"); 
        wrapper1.classList.add("lightSlider-section");
        wrapper1.appendChild(LightSlider.generateCss());
        wrapper1.appendChild(
            LightSlider.generateNav(this.selector)
        );
        const wrapper2 = document.createElement("div"); 
        wrapper2.classList.add("lightSlider");
        wrapper2.appendChild(this.selector.cloneNode(true));

        wrapper1.appendChild(wrapper2);

       

        this.selector.parentNode.replaceChild(
            wrapper1,
            this.selector
        );

        document.querySelector('body').appendChild(LightSlider.generateJs())
    }

    // Constrói a navegação, setinhas e pontos
    static generateNav(selector) {
        const nav = document.createElement("div");
        nav.classList.add("lightSlider-nav");

        // Prev Btn and Next Btn
        nav.innerHTML = `
        <div id="prev-btn"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"    viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"/></g></svg></div><div id="next-btn" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="white" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"/></g></svg></div>
        `;

        // Dots
        let dots = Array.from(selector.children);

        let dotsHtml = "";
        dotsHtml = `<div class="ls_dots">`;
        for (let i = 0; i < dots.length; i++) {
            if (i === 0) {
                dotsHtml += `<div class="ls_dot active"></div>`;
            } else {
                dotsHtml += `<div class="ls_dot"></div>`;
            }
        }
        dotsHtml += `</div>`;

        nav.insertAdjacentHTML("beforeend", dotsHtml);

        return nav;
    }

    // Contrói o css
    static generateCss() {
        let stylesheet = document.createElement("style");
        stylesheet.textContent = `
            #next-btn,#prev-btn{width:50px;height:50px;top:50%;transform:translateY(-50%);cursor:pointer;display:flex;border-radius:999px}#next-btn,#prev-btn,.ls_dot{border-radius:999px}#lightSlider-section,.lightSlider-section{position:relative}#next-btn,#prev-btn,.lightSlider-nav,.ls_dots{position:absolute}.lightSlider{overflow:auto;overflow-y:hidden;scroll-behavior:smooth;scroll-snap-type:x mandatory}.lightSlider .lightSlider-wrapper{width:max-content;display:flex;flex-wrap:nowrap}.lightSlider .lightSlider-wrapper > *{width:100vw;scroll-snap-align:center}.lightSlider .lightSlider-wrapper > * img{width:100%;height:100%;object-fit:cover}.lightSlider::-webkit-scrollbar{width:auto}.lightSlider::-webkit-scrollbar-thumb{background-color:transparent}.lightSlider::-webkit-scrollbar-track{background-color:transparent}.lightSlider::-moz-scrollbar{width:auto}.lightSlider::-moz-scrollbar-thumb{background-color:transparent}.lightSlider::-moz-scrollbar-track{background-color:transparent}.lightSlider::-ms-scrollbar{width:auto}.lightSlider::-ms-scrollbar-thumb{background-color:transparent}.lightSlider::-ms-scrollbar-track{background-color:transparent}.lightSlider-nav{top:0;left:0;z-index:10;width:100%;height:100%}#prev-btn{align-items:center;justify-content:center;left:0}#next-btn{align-items:center;justify-content:center;right:0}.ls_dots{display:flex;gap:16px;left:50%;transform:translateX(-50%);bottom:32px}.ls_dot{height:12px;width:12px;background-color:#fff;opacity:.75}.ls_dot.active{opacity:1}.ls_mobile-only{display:none}@media (max-width:768px){.ls_mobile-only{display:block}.ls_desktop-only{display:none}}
        `;

        return stylesheet;
    }

    // Contrói o JS
    static generateJs() {
        let script = document.createElement('script')

        script.textContent = `       
                let lightSlider = document.querySelector(".lightSlider"), cardQuantity = document.querySelector(".lightSlider-wrapper").children.length, cardWidth = document.querySelector("body").clientWidth, position = 1, lightSliderInterval, prev = document.querySelector('#prev-btn'), next = document.querySelector('#next-btn');

                prev.addEventListener('click', ()=>{
                    changeSlide('prev')
                })
                next.addEventListener('click', ()=>{
                    changeSlide('next')
                })
                
                
                function changeSlide(direction) {
                    clearInterval(lightSliderInterval);
                    if (direction == "next") {
                        nextSlide();
                    }
                
                    if (direction == "prev") {
                        prevSlide();
                    }
                    autoPlay();
                }
                
                function autoPlay() {
                    lightSliderInterval = setInterval(function () {
                        changeSlide("next");
                    }, 9000);
                }
                
                autoPlay();
                
                function nextSlide() {
                    if (position < cardQuantity) {
                        clearDots();
                        document
                            .querySelectorAll(".ls_dot")
                            [position].classList.add("active");
                        lightSlider.scrollTo(position * cardWidth, 0);
                        position++;
                    } else {
                        startAgain();
                    }
                }
                
                function prevSlide() {
                    if (position <= cardQuantity && position > 1) {
                        position = position - 2;
                        if (position < 0) {
                            reverse();
                            return;
                        }
                        clearDots();
                        document
                            .querySelectorAll(".ls_dot")
                            [position].classList.add("active");
                        lightSlider.scrollTo(position * cardWidth, 0);
                        position++;
                    } else if (position <= 1) {
                        reverse();
                    }
                }
                
                function reverse() {
                    clearDots();
                    document
                        .querySelectorAll(".ls_dot")
                        [cardQuantity - 1].classList.add("active");
                    position = cardQuantity;
                    lightSlider.scrollTo(position * cardWidth, 0);
                }
                
                function startAgain() {
                    clearDots();
                    document.querySelectorAll(".ls_dot")[0].classList.add("active");
                    position = 1;
                    lightSlider.scrollTo(0, 0);
                }
                
                function clearDots() {
                    document
                        .querySelector(".ls_dot.active")
                        .classList.remove("active");
                }
            
        `

        return script
    }
}


    