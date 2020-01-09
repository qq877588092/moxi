$(() => {
    $.getJSON("../server/main.json",
        function (data) {
            let html = data.map(function (ele, i) {
                let spans = `
                <span class="f_ico">${i+1}F</span><b>${ele.liName}</b><span class="f_s_title"></span>
                    `
                let as = ele.rightimg.map(function (ele, i) {
                    return `
                    <a href="http://127.0.0.1/code/moxi/client/list.html"
                    id="ContentPlaceHolder1_uc_1f_Activity_r_Floor_Right_floor_right_a_0" target="_blank"
                    class="f_pro_box ${i==0||i==5?"f_pro_big":""}">
                    <div class="f_pro_list">
                        <div class="f_pro_img"><img src=${ele}></div>
                    </div>
                    </a>
                    `
                }).join("")

                return `
            <div class="f_title f_title_01" id="f_title_1">
                ${spans}
            </div>
            <div class="f_con f_con_01">
                <div class="f_con_l" id="J_kv2">
                    <div class="f_con_slider_con">
                        <div class="smallBox">

                        </div>
                    </div>
                </div>
                <div class="f_con_r">
                    ${as}
                </div>
            </div>
                `

            }).join("")
            $(".main_con").append(html);

            //小banner
            // console.log($(".smallBox"));
            $(".smallBox").each(function (i, e) {
                let p2 = new PlayBannerMain(data[i].bannerimg);
                p2.init();

            });
            //循环删除插入页面尾部的标签，再复制删除
            $(".bannerBoxmin").each(function (i, e) {
                $(e).appendTo($(".smallBox").eq(i));
            });

            //楼层电梯
            //获取楼层盒子距离窗口顶部距离
            let mainTop = $(".bandSales").offset().top / 2;
            //监听页面滚动 
            $(window).scroll(function () {
                //判断滚动条距离大于或等于楼层距离时显示导航条
                if ($(document).scrollTop() >= mainTop) {
                    $(".f_fast_link").fadeIn()
                } else {
                    $(".f_fast_link").fadeOut();
                }
                //滚动到对应楼层让左侧电梯显示楼层号
                //循环楼层获取对应top值
                $(".f_con_01").each(function (index, ele) {
                    //判断垂直滚动条距离大于等于楼层top值时让左侧电梯盒子更换背景色显示楼层号 
                    // console.log($(ele).height()/2);
                    //获取当前元素高度一半加上top的值，精确定位
                    let height = $(ele).offset().top - $(ele).height() / 2;
                    if ($(document).scrollTop() >= height) {
                        $(ele).siblings(".f_fast_link").children("a").eq(index).addClass("color").siblings().removeClass("color");
                    }
                })
            })

            //点击跳转对应楼层
            $(".f_fast_link a").click(function () {
                // console.log($(this).index());
                // console.log($(".shoppingBox").eq($(this).index()).offset().top);
                //点击判断li是否为返回顶部   
                if ($(this).index() == $(".f_fast_link a").length - 1) {
                    //设置滚动条位置
                    $("body,html").stop().animate({
                        scrollTop: 0
                        //scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置。
                    })
                } else {
                    //获取点击对应楼层的top值
                    let boxTop = $(".f_con_01").eq($(this).index()).offset().top - $(".f_con_01").height() / 4;
                    //设置滚动条位置
                    $("body,html").stop().animate({
                        scrollTop: boxTop
                        //scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置。
                    })
                    //点击更换楼层背景色
                    $(this).addClass("color").siblings().removeClass("color");
                }

            })

        })


})