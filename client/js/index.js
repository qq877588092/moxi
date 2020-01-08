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
            $(".inServerMenu li").hover(function () {
                $(this).addClass("act").siblings().removeClass("act");
                $(this).parents(".serverMenu").siblings(".inServerMenuList").find("div").eq($(this).index()).show().siblings().hide();
            })
            $(".inHeader").mouseleave(function () {
                $(".inServerMenu li").removeClass("act");
                $(".inServerMenuB").hide();
            });


        })

})