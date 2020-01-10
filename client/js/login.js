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

    //注册块
    //测试用
    $("#txtuserEmail").val("877588092@qq.com");
    $("#txtuserPwd").val("w1234");
    $("#txtrptPwd").val("w1234");
    //验证码
    let captcha1 = new Captcha({
        dotNum: 10,
        lineNum: 20,
        fontSize: 26,
        length: 4,
    });
    let code;
    captcha1.draw(document.querySelector('#captcha1'), r => {
        console.log(r, '验证码1');
        code = r.toUpperCase();
    });

    $(".djyzm").click(function () {
        captcha1.draw(document.querySelector('#captcha1'), r => {
            console.log(r, '验证码1');
            code = r.toUpperCase();
        });
    })

    /* 表单验证：监听对应的输入框失去焦点事件，当失去焦点的时候检查是否满足规则，如果不满足规则那么就提示！！！ */
    function userElse(item) {
        item.siblings("#result").text("请输入正确的邮箱帐号!").addClass("activeColor").show();
        item.siblings("#spPwd").text("6~16位字符,只能包含字母,数字或下划线").addClass("activeColor").show();
        item.siblings("#spRptPwd").text("两次输入的密码不一致").addClass("activeColor").show();
        item.siblings("#spcode").text("验证码不正确!").css({
            "font-size": "12px"
        }).addClass("activeColor").show();
    }

    function userTrue(item) {
        item.siblings("#result").removeClass("activeColor").hide();
        item.siblings("#spPwd").removeClass("activeColor").hide();
        item.siblings("#spRptPwd").removeClass("activeColor").hide();
        item.siblings("#spcode").removeClass("activeColor").hide();
    }

    //邮箱
    $("#txtuserEmail").blur(function () {
        let regex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if (regex.test($.trim($(this).val())) == true) {
            userTrue($(this));
        } else {
            userElse($(this));
        }
    })

    //验证码
    $("#txtCode").blur(function () {
        if ($.trim($(this).val()).toUpperCase() == code) {
            userTrue($(this));
        } else {
            userElse($(this));
        }
    });


    //密码
    $("#txtuserPwd").blur(function () {
        let regex = /^[a-zA-Z0-9.]{3,6}$/;
        if (regex.test($.trim($(this).val())) == true) {
            userTrue($(this));
        } else {
            userElse($(this));
        }
    })
    //确认密码
    $("#txtrptPwd").blur(function () {
        if ($.trim($(this).val()) == $.trim($("#txtuserPwd").val()) && $(this).val() != 0) {
            userTrue($(this));
        } else {
            userElse($(this));
        }
    })
    //鼠标获得焦点去掉提示
    // $("#txtCode").focus(function () {
    //     if ($.trim($(this).val()).toUpperCase() == code) {
    //         userTrue($(this));
    //     } else {
    //         userElse($(this));
    //     }
    // });


    /* 注册的思路： */
    /* (1) 先获取按钮，添加点击事件 */
    /* (2) 检查用户名等所有信息是否都已经正确填写 */
    /* (3) 检查是否勾选同意用户协议 */
    /* (4) 如果2+3都满足，那么就应该把需要的数据作为参数提交给服务器。 */

    $("#submit-btn").click(function () {
        $("#txtuserEmail,#txtCode,#txtuserPwd,#txtrptPwd").trigger("blur");
        if ($(".activeColor").length == 0 && $("#agreement").is(":checked") == true) {
            $.ajax({
                type: "post",
                url: "../server/register.php",
                data: `password=${$("#txtrptPwd").val()}&email=${$("#txtuserEmail").val()}`,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.status == "success") {
                        window.location.href = "moxi.html";
                    } else {
                        alert(response.data.msg)
                    }
                }
            })
        } else {
            alert("请输入正确的注册信息并勾选用户协议！")

        }

    })

    //登录
    $("#txt_usernameLogin").val("877588092@qq.com");
    $("#txt_pwdLogin").val("w.123");
    /* 表单验证：监听对应的输入框失去焦点事件，当失去焦点的时候检查是否满足规则，如果不满足规则那么就提示！！！ */
    $("#txt_usernameLogin").blur(function () {
        toggleTab($(this));
    })
    $("#txt_pwdLogin").blur(function () {
        toggleTab($(this));
    })

    function toggleTab(item) {
        if (item.val() == 0) {
            item.siblings(".users").show().addClass("activeColor");
            item.siblings(".pwds").show().addClass("activeColor");
        }
        item.focus(() => {
            item.siblings(".users").hide().removeClass("activeColor");
            item.siblings(".pwds").hide().removeClass("activeColor");
        })
    }

    /* 给立即登录按钮添加点击事件，当点击该按钮的时候获取用户名和密码，发请求给服务器，等到服务器返回的结果(登录成功 | 登录失败[帐号不存在？密码不正确]) */
    $("#login-btn").click(function () {
        let email = $("#txt_usernameLogin").val();
        let password = $("#txt_pwdLogin").val();

        // if ($(".userYzm1").val().toUpperCase() != code) {
        //     //验证码刷新
        //     let captcha1 = new Captcha({
        //         dotNum: 10,
        //         lineNum: 20,
        //         fontSize: 26,
        //         length: 4,
        //     });
        //     captcha1.draw(document.querySelector('#captcha1'), r => {
        //         console.log(r, '验证码1');
        //         code = r.toUpperCase();
        //     });
        //     $(".yzmError").show();
        //     $(".yzmError").parents(".loginName").addClass("activeColor");
        // } else {
        //     $(".yzmError").hide();
        //     $(".yzmError").parents(".loginName").removeClass("activeColor");
        //}

        /* 验证码通过，发请求登录 */
        $.ajax({
            type: "post",
            url: "../server/user.php",
            data: {
                email,
                password
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                /* 检查结果：成功 ？失败 */
                if (response.status == "success") {
                    localStorage.username = response[0].username;
                    localStorage.id = response[0].id;
                    window.location.href = "moxi.html";

                } else {
                    alert("请输入正确的用户名或密码！")
                }
            }
        });

        //获得焦点删除所有错误信息
        // $(".loginName input").focus(() => {
        //     $(".yzmError").hide();
        //     $(".user-pawd-error").hide();
        // })

    })


})