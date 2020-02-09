// NATSUKI'S CODE
jQuery(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#review_form").modal();

})