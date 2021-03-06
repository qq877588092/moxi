$(() => {
    $.getJSON("../server/moxi-banner.json",
        function (data) {
            let liHtmlLeft = data.map(ele => `<li><a class="hotSearch" href="#">${ele.liName}</a></li>`).join("");
            $(".inServerMenu").html(liHtmlLeft);
            let rightBox = data.map(function (ele, i) {
                var h3Html = ele.rightBox.h3Text.map((ele, i) => {
                    return `
                    <h3>
                        <a href="">
                            ${ele}
                            > </a>
                    </h3>
                    `

                }).join(",")
                // console.log(h3Html.split(","));

                let aHtml = ele.rightBox.aText.map(function (ele) {
                    return ele.map(function (ele) {
                        return `
                            <a href="#">
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
            $("#navAll").hover(function () {
                $(this).parents(".nav").siblings(".serverMenu").show();
            })
            $(".inServerMenu li").hover(function () {
                $(this).addClass("act").siblings().removeClass("act");
                $(this).parents(".serverMenu").siblings(".inServerMenuList").find("div").eq($(this).index()).show().siblings().hide();
            })
            $(".inHeader").mouseleave(function () {
                $(".serverMenu").hide();
                $(".inServerMenu li").removeClass("act");
                $(".inServerMenuB").hide();
            });

        })

    //放大镜
    $(".left").mouseover(function () {
        // let mw = $(".right").width() / $(".right img").width() * $(".left").width();
        // let mh = $(".right").height() / $(".right img").height() * $(".left").height();
        // console.log(mw,mh);

        // $(".move").css({
        //     width: mw,
        //     height: mh
        // });
        //蒙版显示
        $(".move").show();
        $(".right").show();
    })
    $(".left").mousemove(function (e) {
        // console.log($(".box").offset().left);
        //获取鼠标位置
        let X = e.pageX;
        let Y = e.pageY;
        //计算蒙版移动距离
        let moveX = X - $(this).offset().left - $(".move").width() / 2;
        let moveY = Y - $(this).offset().top - $(".move").height() / 2;
        // console.log(moveX, moveY);
        //获取蒙版最大移动距离
        let maxX = $(this).width() - $(".move").width();
        let maxY = $(this).height() - $(".move").height();
        //设置可移动距离
        if (moveX >= maxX) {
            moveX = maxX;
        } else if (moveX <= 0) {
            moveX = 0;
        }
        if (moveY >= maxY) {
            moveY = maxY;
        } else if (moveY <= 0) {
            moveY = 0;
        }
        //赋值让蒙版移动
        $(".move").css({
            left: moveX + "px",
            top: moveY + "px",
        })
        // 蒙版移动距离/蒙版最大移动距离==大图片移动距离/大图片最大移动距离
        var maxImgX = $(".right img").width() - $(".right").width(); //大图片最大移动距离
        var maxImgY = $(".right img").height() - $(".right").height();
        var bigX = moveX * maxImgX / maxX; // 蒙版移动距离*大图片最大移动距离/蒙版最大移动距离==大图片移动距离
        var bigY = moveY * maxImgY / maxY;
        console.log(bigX, bigY);

        // var bigX = ($(".right img").width() - $(".right").width()) / maxX;
        // var bigY = ($(".right img").height() - $(".right").height()) / maxY;
        // 因为大图片移动的方向是相反的所以要加负号
        $(".right img").css({
            left: -bigX + "px",
            top: -bigY + "px",
        })
    })
    $(".left").mouseleave(function () {
        $(".move").css("display", "none");
        $(".right").css("display", "none");
    })

    //拿list页面传来的数据渲染页面
    let str = decodeURI(window.location.search); //接收url字符串
    let arr = str.slice(1).split("&"); //切割成数组
    let obj = {}; //创建空对象接收数组转换成对象
    arr.forEach(function (ele, index) {
        let data = ele.split("=");
        let key = data[0];
        let val = data[1];
        obj[key] = val;
    })
    // console.log(obj);
    $(".dpBinImg img")[0].src = obj.src;
    $(".hyb-dinfo-box-center h1").text(obj.name);
    $("#em-pricecny").text(obj.price);
    $(".hyb-price-ago").text(obj.discount);
    // $(".right img")[0].src = "http://img07.jiuxian.com/2019/0710/12ef7ca49b644a16b55d45b1282413586.jpg";


    /* 实现点击添加商品到购物车的功能 */

    //点击注销或者注册跳转
    let showText = localStorage.username ? "欢迎您！" + localStorage.username : "请登录";
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
            // window.location.href = "http://127.0.0.1/code/jiuxian/src/jiuxian/client/gwc.html";
        } else {
            window.location.href = "./loginRegister.html";
        }
    })
    $("#btn-buycart2s").click(function (e) {
        /* 检查是否已经登录 ，如果没有登录那就跳转到登录页面*/
        if (!localStorage.username) {
            window.location.href = "./loginRegister.html";
        }
        /* 获取当前商品的ID */
        let good_id = obj.good_id;
        console.log(good_id);

        /* 发送网络请求把当前数据添加到购物车表中 */
        /* 数据库表 cart_id  good_id  num isChecked */
        /* 添加数据： */
        /* 删除数据： */
        /* 更新数据： */
        $.ajax({
            url: "../server/cart.php",
            data: {
                type: "add",
                good_id: good_id,
                id: localStorage.id
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.status == "success") {
                    $("#head_car_count").text($("#head_car_count").text() * 1 + 1);
                }
            }
        });
    })




})