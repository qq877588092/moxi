$(() => {
    $.getJSON("../server/moxi-banner.json",
        function (data) {
            let liHtmlLeft = data.map(ele => `<li><a class="hotSearch" href="javascript:;">${ele.liName}</a></li>`).join("");
            $(".inServerMenu").html(liHtmlLeft);
            let rightBox = data.map(function (ele, i) {
                var h3Html = ele.rightBox.h3Text.map((ele, i) => {
                    return `
                    <h3>
                        <a href="javascript:;">
                            ${ele}
                            > </a>
                    </h3>
                    `

                }).join(",")
                // console.log(h3Html.split(","));

                let aHtml = ele.rightBox.aText.map(function (ele) {
                    return ele.map(function (ele) {
                        return `
                            <a href="javascript:;">
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

    function lists(data) {
        let html = data.map(function (ele, i) {
            return `
                <li class="sel-shop-iteam" good_id=${ele.good_id}>
                <div style="position: absolute; top: 0px;">  
                </div>
                <div class="s-pic">
                    <a href="javascript:;" target="_blank" title=${ele.title}>
                        <img src=${ele.src} _src=${ele.src} style="width: 158px; height: 149px;">&nbsp;</a>
                </div>
                <div class="cart-price" protype="0" proid="72079">
                    <strong class="price" title=${ele.price}>
                    ${ele.price}</strong> <strong class="price" style="color: #f00;
                            line-height: 16px;">
                            ${ele.discount}</strong>    
                    <input type="button" value="免费试用" style="cursor:pointer;display:none" class="FreeTrial">
                </div>
                <em class="s-dec"><a href="javascript:;" target="_blank" title=${ele.title}>
                    
                ${ele.title}</a> </em>
                
            </li>
                `
        }).join("")
        $(".select-list").html(html);

        /* 实现点击跳转详情页传入对应商品数据 */
        $(".sel-shop-iteam").click(function () {
            // console.log($(this).attr("good_id"));
            // console.log(data[$(this).index()]);
            let title = data[$(this).index()].title;
            let src = data[$(this).index()].src;
            let price = data[$(this).index()].price;
            let discount = data[$(this).index()].discount;
            let good_id = data[$(this).index()].good_id;
            // let src = $(this).children("div").children("img")[0].src;
            // let name = $(this).children("div").children("h6")[0].innerText;
            // let price = $(this).children("div").children("h3")[0].innerText;
            let queryString = `src=${src}&name=${title}&price=${price}&discount=${discount}&good_id=${good_id}`;
            // console.log(queryString);
            window.location.href = "http://127.0.0.1/code/moxi/client/show.html?" + queryString;
        })

    }

    function getMysql(page, type, i) {
        $.ajax({
            type: "get",
            url: "../server/getMysql.php",
            data: `page=${page}&sortType=${type}&i=${i}`,
            dataType: "json",
            success: function (response) {
                console.log(response);

                lists(response);
            }
        });
    }

    //页面刷新获取第一页数据
    getMysql(1);

    //后台获取页码生成标签
    $.ajax({
        type: "get",
        url: "../server/getPage.php",
        dataType: "json",
        success: function (response) {
            console.log(response);

            let count = response.count;
            //商品头部页码显示
            $(".page .total").text(count);
            let html1 = "";
            for (i = 0; i < count; i++) {
                html1 +=
                    `<a class="item-cur ${i==0?"on":""}"
                    href="javascript:;">${i+1}</a>`
            }
            let html2 =
                `
                <div class="con">
                    <a class="last">上一页</a>
                    <div class="items">
                    ${html1}
                    </div><a class="next"
                    href="javascript:;">下一页</a>
                    <a class="total">共
                    ${count}页 </a><a class="to">跳转到第<input type="text">页</a> <a href="javascript:;" class="ensure">确定</a>
                </div>
            `

            $(".pager").append(html2);
            $(".item-cur ").click(function () {
                $(this).addClass("on").siblings().removeClass("on");
                //发请求获取数据
                //商品头部页码显示
                $(".page .cur").text($(this).index() + 1);
                getMysql($(this).index());
            })
        }

    });


    /* 处理排序 */
    var k = 1;
    //定义一个变量点击1次排高，第二次排低
    $(".tabs").click(function () {
        if (k == 1) {
            console.log($(this).index());
            getMysql(1, $(this).index(), k);
            k = 2;
        } else {
            console.log($(this).index());
            getMysql(1, $(this).index(), k);
            k = 1;
        }
        $(this).addClass("bgColor").siblings().removeClass("bgColor");
        console.log($(this).children("a").children("i"));

        $(this).children("a").children("i").toggleClass("xlbgImg");
    })


})