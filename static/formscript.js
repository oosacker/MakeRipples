// The code will only run if the webpage is loaded fully!!!
jQuery(function () {
    $("#activity_type_box").modal();

    $("#exp_btn").on("click", function(){
        $("#activity_type_box").modal("hide");
        $("#exp_box").modal();
    })

    $("#learn_btn").on("click",function(){
        $("#activity_type_box").modal("hide");
        $("#learn_box").modal();
    })

    $("#action_btn").on("click",function(){
        $("#activity_type_box").modal("hide");
        $("#action_box").modal();
    })

})
