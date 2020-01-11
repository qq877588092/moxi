$(() => {
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
      window.location.href = "../loginRegister.html";
    }
  })

  loadCart();

  function loadCart() {
    $.ajax({ //获取商品数据
      data: {
        type: "get",
        id: localStorage.id
      },
      url: "../server/cart.php",
      dataType: "json",
      success: function (res) {
        // console.log(res.data);
        $(res.data).each((index, ele) => {
          // console.log(ele);
          renderUI(ele);
        })
        gwc();
      }
    });
  }

  /* 渲染购物车 */
  function renderUI(data) {
    // console.log(data.goods);
    let html = data.goods.map(item => {
      return `
                <div class="item item-list" good_id=${item.good_id}>
                <div class="item-s-form">
                    <div class="cart-checkbox" style="display:block;"><input childcount="0"
                            buycart="GWC_1_0_0_0_0_0_0_0_0_0_0_0_0" class="checkbox-choose zixuan" type="checkbox"
                            value="44537"></div>
                    <div class="p-goods cell" style="margin-left: 20px;">
                        <div class="pic p-img"><a href="#"><img
                                    src=${item.src}></a>
                        </div>
                        <div class="proname p-msg"><a
                                href="#">${item.title}</a>
                            <div class="tips"></div>
                        </div>
                    </div>
                    <div class=" p-price cell"><em class="p-m pic">￥${item.price.substring(0,item.price.length - 4)}</em> </div>
                    <div class="procount_new p-quantity cell">
                        <div class="wrap-input"> <a href="javascript:void(0);" class="btn-reduce jian"
                                cartkey="44537">-</a> <input class="buy-num val" type="text" cartkey="44537"
                                value=${item.num} count="1"> <a href="javascript:void(0);" class="btn-add jia"
                                cartkey="44537">+</a> </div>
                    </div>
                    <div class=" p-sum cell price"> <em>￥0</em></div>
                    <div class=" p-action cell"> <a href="javascript:;"
                            onclick="MX.Goods.Collect('44537',0);">移入收藏夹</a> <a class="btn-delete"
                            href="javascript:;" cartkey="44537">删除</a> </div>
                    <div class="clr"></div>
                </div>
            </div>
          `
    }).join('');
    $(".cart-item-list").append(html);
  }

  //购物车功能
  function gwc() {
    //进来先计算小计
    $(".price").each((i, ele) => {
      // console.log(Number($(".val").eq(i).attr("value")));
      // console.log(Number($(".p-price>em").eq(i).text().slice("1")));
      $(ele).text("￥" + Number($(".val").eq(i).attr("value")) * Number($(".p-price>em").eq(i).text().slice("1")));
    })
    //全选
    $(".quanxuan").click(function () {
      $(".zixuan,.quanxuan").prop("checked", $(this).prop("checked"))
      total();
    });
    //子选
    // console.log($(".zixuan"));
    $(".zixuan").click(function () {
      console.log("=========");
      if ($(".zixuan:checked").length == $(".zixuan").length) {
        $(".quanxuan").prop("checked", true)
      } else {
        $(".quanxuan").prop("checked", false)
      }
      total();
    })
    //+选
    $(".jia").click(function () {
      let vals = $(this).siblings(".val").val();
      vals++;
      $(this).siblings(".val").val(vals);
      price($(this), vals);
      //发请求改变数量
      let good_id = $(this).parents(".item-list").attr("good_id");
      updateCartData("jia", good_id, localStorage.id);
      console.log("+++++++++");
      total();
    })
    //-选
    $(".jian").click(function () {
      let vals = $(this).siblings(".val").val();
      if (vals == 1) {
        return false;
      }
      vals--;
      $(this).siblings(".val").val(vals);
      price($(this), vals);
      //发请求改变数量
      // console.log($(this).parents(".item-list").attr("good_id"));
      let good_id = $(this).parents(".item-list").attr("good_id");
      updateCartData("jian", good_id, localStorage.id);
      console.log("---------");
      total();
    })
    //输入计量
    $(".val").keyup(function () {
      let sum = $(this).val();
      price($(this), sum);
      total();
    })
    //+-选功能块
    function price(item, val) {
      let sum = item.parents(".procount_new").siblings(".p-price").children(".pic").text().substr(1);
      sum = "¥" + (sum * val).toFixed(2);
      console.log(item.parents(".procount_new").siblings(".price"));
      item.parents(".procount_new").siblings(".price").text(sum);
    }
    //总价功能块
    function total() {
      let sum = 0;
      $(".zixuan:checked").parent().siblings(".price").each(function (i, ele) {
        sum += Number($(ele).text().slice(1));
        console.log(sum);
      })
      $(".sumPrice>em").text("¥" + sum.toFixed(2));
    }
    //删除块
    $(".p-action").on("click", ".btn-delete", function () {
      if (confirm("确定删除该商品吗？")) {
        let good_id = $(this).parents(".item-list").attr("good_id");
        $(this).parents(".item-list").remove();
        $.ajax({
          url: "../server/cart.php",
          data: {
            type: "del",
            good_id,
            id: localStorage.id
          },
          dataType: "json",
          success: function (response) {
            console.log(response);
            total();
          }
        });
        alert("删除成功");
        return true;
      }
      return false;
    })

    //
    function updateCartData(flag, good_id, id) {
      $.ajax({
        url: "../server/cart.php",
        data: {
          type: "update",
          flag,
          id,
          good_id
        }
      });
    }
  }


})