$(function(){
    $.ajax({
        url:"http://139.199.192.48:9090/api/getmoneyctrlproduct",
        data:{
          productid:localStorage.money,
        },
        success:function(data){
              console.log(data)
              var res=template("discount",data)
              $(".guoneizhekou-container").append(res)
        }
    })
})