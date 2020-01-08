$(() => {
    class PlayBanner {
        constructor(data) {
            this.data = data;
            this.index = 0;
            this.width = 810;
            this.name = ".bannerMain";
        }
        //接口
        init() {
            this.renderCSS(this.name);
            this.renderUI();
            this.switchImg();
            this.focusClick();
            this.playImg();
            this.suspend();
        }
        //css
        renderCSS(name) {
            let css = `
            * {
                margin: 0;
                padding: 0;
                list-style: none;
            }
    
            ${name} .slider {
                width: 810px;
                height: 400px;
                overflow: hidden;
                position: relative;
            }
    
            ${name} .slider-box {
                background: #dddddd;
                width: 10000px;
                height: 400px;
                padding: 0;
                margin: 0;
                position: absolute;
                float: left;
            }
    
            ${name} .slider-box-item {
                width: 810px;
                height: 400px;
                float: left;
                font-size: 40px;
                text-align: center;
                line-height: 400px;
            }
    
            ${name} .slider-box-item img {
                width: 810px;
                height: 400px;
            }
    
            ${name} .slider-control {
                position: absolute;
                width: 100%;
                height: 100px;
                line-height: 100px;
                top: 50%;
                margin-top: -50px;
                font-size: 60px;
            }
    
            ${name} .prev {
                font-size: 40px;
                margin-left: 30px;
      
            }
    
            ${name} .next {
                font-size: 40px;
                float: right;
                margin-right: 20px;
    
            }
    
            ${name} .slider-nav {
                position: absolute;
                right: 30px;
                bottom: 10px;
                height: 30px;
            }
    
            ${name} .slider-nav-item {
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
                float: left;
                border-radius: 5px;
                margin: 0 5px;
                text-align: center;
                width: 8px;
                height: 8px;
                line-height: 8px;
            }
    
            ${name} .active {
                background: #ff6700;
                display: block !important;
            }
    
            ${name} .box {
                margin: 0px auto;
                width: 822px;
                height: 400px;
                z-index: -1;
            }
    
            ${name} .ulA {
                width: 234px;
                height: 420px;
                border: 0;
                color: #fff;
                background: rgba(105, 101, 101, .6);
                padding: 20px 0;
                position: absolute;
                z-index: 100;
            }
    
            ${name} .ulA-li {
                width: 204px;
                height: 42px;
                line-height: 42px;
                padding-left: 30px;
                color: #fff;
                opacity: 0.8;
            }
    
            ${name} .ulB {
                position: absolute;
                width: 996px;
                height: 400px;
                background: #fff;
                top: 0px;
                left: 234px;
                display: none;
                z-index: 11;
            }
    
            ${name} .ulB-li {
                width: 204px;
                height: 80px;
                line-height: 80px;
                padding-left: 30px;
                color: #fff;
                float: left;
            }
    
            ${name} .ulB-li img {
                float: left;
                padding: 18px 20px 0 30px;
            }
    
            ${name} .ulB-li a {
                display: block;
                float: left;
                font-size: 16px;
    
            }
            ${name} .youjiantou{
                font-size: 12px;
                float: right;
                padding-right: 20px;
                color: #fff;
                
            }
            `;
            let style = document.createElement("style");
            style.innerHTML = css;
            document.head.appendChild(style);
        }

        //渲染
        renderUI() {
            this.createSlider();
            this.createSliderBox();
            this.createSliderControl();
            this.createSliderNav();
            this.slider.appendChild(this.SliderBox);
            this.slider.appendChild(this.SliderControl);
            this.slider.appendChild(this.SliderNav);
            document.querySelector(".box").appendChild(this.slider);
        }
        //创建外层大盒子
        createSlider() {
            this.slider = document.createElement("div");
            this.slider.className = "slider";
        }
        //创建banner盒子
        createSliderBox() {
            this.SliderBox = document.createElement("ul");
            this.SliderBox.className = "slider-box";
            this.SliderBox.innerHTML = this.data.map(ele =>
                `<li class="slider-box-item"><img src=${ele} alt=""></li>`
            ).join("");
        }
        //创建左右按钮
        createSliderControl() {
            this.SliderControl = document.createElement("div");
            this.SliderControl.className = "slider-control";
            this.SliderControl.innerHTML =
                ` <span class="prev iconfont icon-jiantouzuo"></span> <span class="next iconfont icon-jiantouyou"></span>`;
        }
        //创建焦点
        createSliderNav() {
            this.SliderNav = document.createElement("ol");
            this.SliderNav.className = "slider-nav";
            this.SliderNav.innerHTML = this.data.map((ele, index) =>
                `<li class="slider-nav-item ${index==0?"active":""}"></li>`
            ).join("");
        }
        //左右点击切换
        switchImg() {
            this.SliderControl.onclick = (e) => {
                e = e || window.event;
                let target = e.target || e.srcElement;
                if (target.className == "prev iconfont icon-jiantouzuo") {
                    this.prev();
                } else if (target.className == "next iconfont icon-jiantouyou") {
                    this.next();
                }
            }
        }
        //左按钮
        prev() {
            this.index--;
            if (this.index == -1) {
                this.index = this.data.length - 1;
            }
            $(this.SliderBox).stop().animate({left:`${-(this.width * this.index) + "px"}`})
            // this.SliderBox.style.left = -(this.width * this.index) + "px";
            this.focusStyle();
        }
        //右按钮
        next() {
            this.index++;
            if (this.index == this.data.length) {
                this.index = 0;
            }
            $(this.SliderBox).stop().animate({left:`${-(this.width * this.index) + "px"}`})
            // this.SliderBox.style.left = -(this.width * this.index) + "px";
            this.focusStyle();
        }
        //焦点切换
        focusClick() {
            Array.from(this.SliderNav.children).forEach((ele, index) => {
                ele.onclick = () => {
                    this.index = index;
                    $(this.SliderBox).stop().animate({left:`${-(this.width * this.index) + "px"}`})
                    // this.SliderBox.style.left = -(this.width * this.index) + "px";
                    this.focusStyle();
                }
            })
        }
        //焦点切换样式
        focusStyle() {
            Array.from(this.SliderNav.children).forEach((ele) => {
                ele.classList.remove("active");
            })
            this.SliderNav.children[this.index].classList.add("active");
        }
        //定时器 核心思路：开启一个定时器，每隔固定的时间就设置ul标签的样式
        playImg() {
            this.time = setInterval(() => {
                this.next();
            }, 5000)
        }
        //鼠标移入暂停
        suspend() {
            this.slider.onmouseenter = () => clearInterval(this.time);
            this.slider.onmouseleave = () => this.playImg();
        }
    }


    let p1 = new PlayBanner([
        "http://images.moximoxi.com/column/201912/85637116779748297715.jpg",
        "http://images.moximoxi.com/column/201907/85636989581694830298.jpg",
        "http://images.moximoxi.com/column/201609/5636093618406645325.jpg",
    ]);
    p1.init();

    // let xhr = new XMLHttpRequest;
    // xhr.open("get", "http://127.0.0.1/code/day25/task/playbanner.php", true);
    // xhr.send();
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         var data = JSON.parse(xhr.responseText);
    //         let p1 = new PlayBanner([
    //             "http://img07.jiuxian.com/brandlogo/2019/1217/274b092fe1244e09950f651a12e92518.jpg",
    //             "images/banner1.png",
    //             "images/banner2.png",
    //         ]);
    //         p1.init();
    //     } else {
    //         console.log("sb" + xhr.responseText);
    //     }
    // }
})