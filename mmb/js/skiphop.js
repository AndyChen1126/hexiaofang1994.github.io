/**
 * Created by liyun on 2017/7/4.
 */
$(function (){

    //第一个下拉框
    var flag = 1;
    $(".skiphop-filter ul li:eq(0)").click(function (){
            if(flag==1){
                $(".popsort").show().siblings(".popbox").hide();
                $(this).find("i").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
                flag--;
                return;
            }
            if(flag==0){
                $(".popsort").hide().siblings(".popbox").hide();
                $(this).find("i").addClass("glyphicon-triangle-bottom").removeClass("glyphicon-triangle-top");
                flag++;
                return;
            }
    })


//    发送ajax请求第一个下拉框里的内容
    $.ajax({
        url:"http://139.199.192.48:9090/api/getgsshop",
        success:function (data){
            var rul = template("popsort",data);
            // console.log(rul);
            $(".popsort ul").append(rul);
            $(".popsort ul li:first").addClass("chilke")
            for(var i = 0 ; i < data.result.length; i++){
                $(".popsort ul").find("li").eq(i).attr("num",data.result[i].shopId);
                // console.log(data.result[i].shopId);
            }
        }
    })


//    发送ajax请求第二个下拉框里的内容
    $.ajax({
        url:"http://139.199.192.48:9090/api/getgsshoparea",
        success:function (data){
            var rul = template("popprice",data);
            // console.log(rul);
            $(".popprice ul").append(rul);
            $(".popprice ul li:first").addClass("chilke")
            for(var i = 0 ; i < data.result.length; i++){
                $(".popprice ul").find("li").eq(i).attr("num",data.result[i].areaId);
                // console.log(data.result[i].areaId);
            }
        }
    })


//第二个下拉框
    $(".skiphop-filter ul li:eq(1)").click(function (){
        if(flag==1){
            $(".popprice").show().siblings(".popbox").hide();
            $(this).find("i").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            flag--;
            return;
        }
        if(flag==0){
            $(".popprice").hide().siblings(".popbox").hide();
            $(this).find("i").addClass("glyphicon-triangle-bottom").removeClass("glyphicon-triangle-top");
            flag++;
            return;
        }
    })


    //第三个下拉框
    $(".skiphop-filter ul li:eq(2)").click(function (){
        if(flag==1){
            $(".popcat").show().siblings(".popbox").hide();
            $(this).find("i").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            flag--;
            return;
        }
        if(flag==0){
            $(".popcat").hide().siblings(".popbox").hide();
            $(this).find("i").addClass("glyphicon-triangle-bottom").removeClass("glyphicon-triangle-top");
            flag++;
            return;
        }
    })



    //发送ajax请求下面主体部分
    getData(0,0);
    $(".skiphop-filter ul li:eq(0)").attr("num",0)
    $(".skiphop-filter ul li:eq(1)").attr("num",0)


//    第一个下拉框下面选择部分
    var shopI;
    var areaI;
    $(".popsort").on("click","li",function (){
       var shopname = $(this).find("a").html();
       $(this).addClass("chilke").siblings().removeClass("chilke")
       $(".skiphop-filter ul li:eq(0) a").html(shopname+'&nbsp; <i class="glyphicon glyphicon-triangle-bottom"></i>')
        $(".popsort").hide().siblings(".popbox").hide();

        $(this).find("i").addClass("glyphicon-triangle-bottom").removeClass("glyphicon-triangle-top");

        flag++;
        shopI = $(this).attr("num")
        areaI = $(".skiphop-filter ul li:eq(1)").attr("num")
        // console.log(shopI);
        getData(shopI,areaI);
    })


//    第二个下拉框下面选择部分
    $(".popprice").on("click","li",function (){
        var areaname = $(this).find("a").html();
        var areaname2 = areaname.substring(0,2);
        $(this).addClass("chilke").siblings().removeClass("chilke")
        $(".skiphop-filter ul li:eq(1) a").html(areaname2+'&nbsp; <i class="glyphicon glyphicon-triangle-bottom"></i>')
        $(".popprice").hide().siblings(".popbox").hide();
        $(this).find("i").addClass("glyphicon-triangle-bottom").removeClass("glyphicon-triangle-top");
        flag++;
        shopI = $(".skiphop-filter ul li:eq(0)").attr("num");
        areaI = $(this).attr("num");
        getData(shopI,areaI);
    })


//    第三个下拉框下面选择部分
    $(".popcat").on("click","li",function (){
        var catname = $(this).find("a").html();
        $(this).addClass("chilke").siblings().removeClass("chilke")
        $(".skiphop-filter ul li:eq(2) a").html(catname+'&nbsp; <i class="glyphicon glyphicon-triangle-bottom"></i>')
        $(".popcat").hide().siblings(".popbox").hide();
        $(this).find("i").addClass("glyphicon-triangle-bottom").removeClass("glyphicon-triangle-top");
        flag++;
        // shopI = $(".skiphop-filter ul li:eq(0)").attr("num");
        // areaI = $(".skiphop-filter ul li:eq(1)").attr("num")
        var a = Math.floor(Math.random()*2)
        var b = Math.floor(Math.random()*6)
        // console.log(a);
        // console.log(b);
        getData(a,b);

    })


    //滚轮事件
    $(window).scroll(function () {
        var currentScroll = $(document).scrollTop();
        if (currentScroll >= $(document).height()-$(window).height()) {
            // getData(shopI,areaI);
            // console.log(123);
            var c = Math.floor(Math.random()*2)
            var d = Math.floor(Math.random()*6)
            // console.log(c);
            // console.log(d);
            $.ajax({
                url: "http://139.199.192.48:9090/api/getgsproduct",
                data: {
                    shopid: c,
                    areaid: d
                },
                success: function (data) {
                    var rul = template("content", data);
                    $(".skiphop-bottom ul").append(rul);
                }
            })
        }
    })


    //搜索切换
    $(".skiphop-search").click(function (){
        // if ($(".popsearch").css("display","block")){
        //     $(this).find("i").css("backgroundImage","url('../images/cha.svg')")
        // }
        if (flag==1){
            $(".popsearch").show().siblings(".popbox").hide();
            $(this).find("i").css("backgroundImage","url('../images/cha.svg')")
            flag--;
            return
        }
        if (flag==0){
            $(".popsearch").hide();
            $(this).find("i").css("backgroundImage","url('../images/search.svg')")
            flag++;
            return
        }
    })

//点击排序销量
    $(".popsearch").on("click","dd",function (){
        $(".popsearch").hide();
        $(".skiphop-search").find("i").css("backgroundImage","url('../images/search.svg')")
        flag++;
        $(this).addClass("xz").siblings().removeClass("xz")
        var e = Math.floor(Math.random()*2)
        var f = Math.floor(Math.random()*6)
        getData(e,f);
    })

//点击搜索
    $(".smt").click(function (){
      if($(".txt input").val() != ""){
          $(".popsearch").hide();
          $(".skiphop-search").find("i").css("backgroundImage","url('../images/search.svg')")
          flag++;
          $(this).addClass("xz").siblings().removeClass("xz")
          var e = Math.floor(Math.random()*2)
          var f = Math.floor(Math.random()*6)
          getData(e,f);
      }else{
          $(".popsearch p").html("亲，您啥都没输入呢？搜啥啊").show().delay(2000).fadeOut()
      }
    })


    $(".skiphop-bottom ul").on("click","li",function (){

        localStorage.done=$(this).attr('data-one')
        localStorage.dtwo=$(this).attr('data-two')
        localStorage.dthree=$(this).attr('data-three')
        // $.cookie("data-one",$(this).attr('data-one'),{expires:7,path:"/"});
        // $.cookie("data-two",$(this).attr('data-two'),{expires:7,path:"/"});
        // $.cookie("data-three",$(this).attr('data-three'),{expires:7,path:"/"});
    })

})




//封装请求数据
function getData(s,a) {
    $.ajax({
        url:"http://139.199.192.48:9090/api/getgsproduct",
        data:{
            shopid:s,
            areaid:a
        },
        success:function (data){
            var rul = template("content",data);
            $(".skiphop-bottom ul").html(rul)
            for(var i = 0 ; i < data.result.length; i++){
                $(".skiphop-bottom ul").find("li").eq(i).attr("data-one",data.result[i].productId);
                $(".skiphop-bottom ul").find("li").eq(i).attr("data-two",data.result[i].areaId);
                $(".skiphop-bottom ul").find("li").eq(i).attr("data-three",data.result[i].shopId);
            }
        }
    })
}