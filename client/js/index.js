$(() => {
    $.getJSON("../server/moxi-banner.json",
        function (data) {
            let liHtmlLeft = data.map(ele => `<li><a class="hotSearch" href="http://127.0.0.1/code/moxi/client/list.html">${ele.liName}</a></li>`).join("");
            $(".inServerMenu").html(liHtmlLeft);
            let rightBox = data.map(function (ele, i) {
                var h3Html = ele.rightBox.h3Text.map((ele, i) => {
                    return `
                    <h3>
                        <a href="http://127.0.0.1/code/moxi/client/list.html">
                            ${ele}
                            > </a>
                    </h3>
                    `

                }).join(",")
                // console.log(h3Html.split(","));

                let aHtml = ele.rightBox.aText.map(function (ele) {
                    return ele.map(function (ele) {
                        return `
                            <a href="http://127.0.0.1/code/moxi/client/list.html">
                            ${ele}
                            </a>&nbsp;
                            `
                    }).join("")
                }).join(",")
                // console.log(aHtml.split(","));

                var item1 = ele.rightBox.h3Text.map((ele, i) => {
                    return `
                    <li>
                    ${h3Html.split(",")[i]}
                    ${aHtml.split(",")[i]}
                </li>
                    `

                }).join("")
                // console.log(item1);


                return `
                        <div class="inServerMenuB" style="z-index: 8; display: none;">
                        <ul>
                            ${item1}
                        </ul>
                    </div>
                    `
            }).join("")
            $(".inServerMenuList").html(rightBox);

            //侧边栏滑动效果
            $(".inServerMenu li").hover(function () {
                $(this).addClass("act").siblings().removeClass("act");
                $(this).parents(".serverMenu").siblings(".inServerMenuList").find("div").eq($(this).index()).show().siblings().hide();
            })
            $(".inHeader").mouseleave(function () {
                $(".inServerMenu li").removeClass("act");
                $(".inServerMenuB").hide();
            });


        })


    // $.ajax({
    //     type: "get",
    //     url: "http://127.0.0.1/code/jiuxian/src/jiuxian/server/subpage.php",
    //     data: "data",
    //     dataType: "json",
    //     success: function (response) {
    //         var p1 = new Subpage(response);
    //         p1.init();
    //     }
    // });
    // let p1 = new PlayBanner([
    //     "http://img07.jiuxian.com/brandlogo/2019/1217/274b092fe1244e09950f651a12e92518.jpg",
    //     "images/banner1.png",
    //     "images/banner2.png",
    // ]);
    // p1.init();

    //首页登录显示
    let showText = localStorage.username ? ",欢迎您！" + localStorage.username : "请登录";
    // let num = localStorage.num;
    $(".login").text(showText);
    if (localStorage.username) {
        $(".register").text("注销");
    } else {
        $(".register").text("免费注册");
    }
    //点击注销或者注册跳转
    $(".register").click(function () {
        if ($(this).text() == "注销") {
            localStorage.removeItem("username");
            localStorage.removeItem("id");
            window.location.href = "http://127.0.0.1/code/jiuxian/src/jiuxian/client/gwc.html";
        } else {
            window.location.href = "http://127.0.0.1/code/jiuxian/src/jiuxian/client/login.html";
        }
    })



})