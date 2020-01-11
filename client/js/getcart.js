$(() => {
    /* 发请求获取购物车中商品的数量 */
    /* 检查登录状态，如果已经登录那么就请求获取购物车的数量 */
    if (localStorage.id) {
        $.ajax({
            url: "../server/getTotalCount.php",
            data: {
                id: localStorage.id
            },
            dataType: "json",
            success: function ({
                total
            }) {
                // console.log(total);
                $("#head_car_count").text(total);
            }
        });
    }
})