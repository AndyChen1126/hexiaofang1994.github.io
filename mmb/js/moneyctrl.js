$(function () {
    // 绑定点击下一页事件
    getData()
    var currentPageNum = 1;
    var curPage;
    $(".shengqiankong-next").click(function () {
        if ($(".shengqiankong-next").hasClass("disabled")) {
            return;
        }
        currentPageNum++;
        getData(currentPageNum);
        //  $('option').eq(currentPageNum-1).attr("selected","selected").siblings().removeAttr("selected");
        
        $("select").val(currentPageNum);
    })
    // 绑定点击上一页事件
    $(".shengqiankong-previous").click(function () {
        if ($(".shengqiankong-previous").hasClass("disabled")) {
            return;
        }
        currentPageNum--;
        getData(currentPageNum);
        // $('option').eq(currentPageNum-1).attr("selected","selected").siblings().removeAttr("selected");
        $("select").val(currentPageNum);
    })
    // 页面下拉框选择事件
        $("select").on("change", function () {
        curPage = $(this).val();
        currentPageNum = curPage;
        console.log(curPage);
        getData(curPage);
    })
    //  封装获取数据函数
    function getData(myPageNum) {
        $.ajax({
            url: "http://139.199.192.48:9090/api/getmoneyctrl",
            data: {
                pageid: myPageNum,
            },
            success: function (data) {
                var result = template("shengqiankong", data)
                //  console.log(data.result[2].productId)
                result = result.replace(/&#60;/g, "<");
                result = result.replace(/&#62;/g, ">");
                result = result.replace(/&#34;/g, "'");
                $(".shengqiankong-items").html(result)
                var totalPage = Math.ceil(data.totalCount/data.pagesize);
                // console.log(data.result[1].productId);
                for(var i=0;i<data.result.length;i++){
                  $("li").eq(i).attr("id",data.result[i].productId)   
              }
               $(".shengqiankong-items").on("click","li",function(){
                localStorage.money=$(this).attr("id")
                console.log($(this).attr("id"))
               }) 
                //  判断最后一页 第一页的禁用
                if (myPageNum == totalPage) {
                    console.log(123);
                    $(".shengqiankong-next").addClass("disabled")
                } else {
                    $(".shengqiankong-next").removeClass("disabled")
                }
                if (myPageNum == 1) {
                    $(".shengqiankong-previous").addClass("disabled")
                } else {
                    $(".shengqiankong-previous").removeClass("disabled")
                }
           
                //    动态添加Option
                if ($("select").html() == "") {
                    for (var i = 1; i <= totalPage; i++) {
                        var text = i + "/" + totalPage;
                        var str = $("<option></option>")
                        str.html(text)
                        str.attr("value", i)
                        $("select").append(str)
                    }
                }
                
            }
        })
    }

})

   

