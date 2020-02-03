
// class user_response{
//     _message;
//     _other_desc;
//     _date;
//     _nlpRating;
//     _userRating;
//     _orgRating;
//     _action;
//     _learning;
//     _personal;
//     _perspective;
//     _applied;
//     _national;
//     _community;
//     _resonate;
//     _other;
//     get other_desc() {
//         return this._other_desc;
//     }
//
//     set other_desc(value) {
//         this._other_desc = value;
//     }
//     get date() {
//         return this._date;
//     }
//
//     set date(value) {
//         this._date = value;
//     }
//
//     get nlpRating() {
//         return this._nlpRating;
//     }
//
//     set nlpRating(value) {
//         this._nlpRating = value;
//     }
//     get userRating() {
//         return this._userRating;
//     }
//
//     set userRating(value) {
//         this._userRating = value;
//     }
//
//     get nplRating() {
//         return this._nlpRating;
//     }
//
//     set nplRating(value) {
//         this._nlpRating = value;
//     }
//
//     get orgRating() {
//         return this._orgRating;
//     }
//
//     set orgRating(value) {
//         this._orgRating = value;
//     }
//     get action() {
//         return this._action;
//     }
//
//     set action(value) {
//         this._action = value;
//     }
//
//     get learning() {
//         return this._learning;
//     }
//
//     set learning(value) {
//         this._learning = value;
//     }
//
//     get resonate() {
//         return this._resonate;
//     }
//
//     set resonate(value) {
//         this._resonate = value;
//     }
//
//     get other() {
//         return this._other;
//     }
//
//     set other(value) {
//         this._other = value;
//     }
//
//     get message() {
//         return this._message;
//     }
//
//     set message(value) {
//         this._message = value;
//     }
//
//     get national() {
//         return this._national;
//     }
//
//     set national(value) {
//         this._national = value;
//     }
//
//     get community() {
//         return this._community;
//     }
//
//     set community(value) {
//         this._community = value;
//     }
//
//     get applied() {
//         return this._applied;
//     }
//
//     set applied(value) {
//         this._applied = value;
//     }
//
//     get perspective() {
//         return this._perspective;
//     }
//
//     set perspective(value) {
//         this._perspective = value;
//     }
//
//     get personal() {
//         return this._personal;
//     }
//
//     set personal(value) {
//         this._personal = value;
//     }
//
//     constructor(action=false, learning=false, resonate=false, other=false, other_desc = 'unknown',
//                 message='unknown', date = Date.now(),
//                 national='unknown', community='unknown', applied = 'unknown', perspective = 'unknown', personal = 'unknown',
//                 userRating = 0, nlpRating =  0, orgRating = 0){
//         this._action = action;
//         this._learning = learning;
//         this._resonate = resonate;
//         this._other = other;
//         this._message = message;
//         this._national = national;
//         this._community = community;
//         this._applied = applied;
//         this._perspective = perspective;
//         this._personal = personal;
//         this._userRating = userRating;
//         this._nlpRating = nlpRating;
//         this._orgRating = orgRating;
//         this._date = date;
//         this._other_desc = other_desc;
//     }
//
// }

// $.post('/my_test',   // url
//     {myData: 'This is my data.', myData2: 'lalala'}, // data to be submit
//     function (data, status, jqXHR) {// success callback
//         console.log(status)
//     })

// Variables to send to db
// let action = false;
// let learning = false;
// let resonate = false;
// let other = false;
// let userRating;

function send_data() {
    $.ajax('/my_test', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({myData: 'data1', myData2: 'data2'}),
        success: function (data, status, xhr) {
            console.log(status)
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log(textStatus);
        }
    }).then(function(){
        console.log('sent')
    })
}

function get_data(){

}
let ur;


// The code will only run if the webpage is loaded fully!!!
jQuery(function () {
    // $("#activity_type_box").modal();
    $(document).ready(function() {
        ur = new user_response();
    })

    $("#first_form").modal();

    let datepicker = $("#datepicker");
    datepicker.datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());

    let warning_msg =  $('#warning');
    // hide the warning
    warning_msg.css('visibility', 'hidden');

    let what_ripple = $("#what_ripple");
     // hide the 'what ripple' text input
    what_ripple.css('visibility', 'hidden');

    let resonate_check = $("#resonate");
    let learning_check = $("#learning");
    let action_check = $("#action");
    let other_check = $("#other");
    // {# click handler for the 'other' checkbox #}
    other_check.on('change', function () {
        if (other_check.prop('checked')) {
            what_ripple.css('visibility', 'visible');
        }
        else{
            what_ripple.css('visibility', 'hidden');
        }
    });

    $("#next_btn").on("click",function(){
        if (!(resonate_check.prop('checked') || learning_check.prop('checked') || action_check.prop('checked') || other_check.prop('checked')))
                {
                    // flash warning if no checkboxes are selected
                    warning_msg.css('color', 'red');
                    warning_msg.css('visibility', 'visible');
                }
        else {
            ur.date = datepicker.datepicker("getDate");
            alert(ur.date)
            if (resonate_check.prop("checked") === true) {
                ur.resonate = true
                // resonate = true;
            }
            if (learning_check.prop("checked") === true) {
                ur.learning = true
                // learning = true;
            }
            if (action_check.prop("checked") === true) {
                ur.action = true
                // action = true;
            }
            if (other_check.prop("checked") === true) {
                ur.other = true
                ur.other_desc = $("#other_text").val()
                // other = true;
            }
            $("#first_form").modal("hide");
            if (ur.action) {
                $("#action_form").modal();
            } else if (ur.learning) {
                $("#learn_form").modal();
            } else if (ur.resonate) {
                $("#resonate_form").modal();
            } else if (ur.other) {
                alert("hasn't been made yet")
            } else {
                alert("somehow got no checked values after confirming something was checked.")
            }
        }
    })

    $("button[name='submit_btn']").on("click",function(){
        ur.message = $("#text_input1").val()
        if(ur.message === undefined || ur.message === ""){
            ur.message = $("#learn_text").val()
        }
        if(ur.message === undefined || ur.message === ""){
            ur.message = $("#resonate_text").val()
        }
        // ur.message = $("textarea[name='text_input']").val()
        alert(ur.message)

        if($("input[name='national_radio']:checked")){
            ur.national = $("input[name='national_radio']:checked").val();
        }
        if($("input[name='community_radio']:checked")) {
            ur.community = $("input[name='community_radio']:checked").val();
        }
        if($("input[name='perspective_radio']:checked")){
            ur.perspective = $("input[name='perspective_radio']:checked").val();
        }
        if($("input[name='applied_radio']:checked")) {
            ur.applied = $("input[name='applied_radio']:checked").val();
        }
        if($("input[name='personal_radio']:checked")) {
            ur.personal = $("input[name='personal_radio']:checked").val();
        }
        ur.userRating = calculate();

        alert(JSON.stringify(ur));

        send_user();
    })

})

// Logic for getting impact value from user input
function calculate(){
    // alert("started calculate()")
    if(ur.action){
        if(ur.national == 'yes'){
            return 9;
        }
        if(ur.community == 'yes'){
            return 8;
        }
        return 7;
    }
    else if(ur.learning){
        if(ur.perspective == 'yes'){
            return 6;
        }
        if(ur.applied == 'yes'){
            return 5;
        }
        return 4;
    }
    else if(ur.resonate){
        if(ur.personal == 'yes'){
            return 3;
        }
        return 2;
    }
    else{
        return 0;
    }
}

function send_user(){
    // alert("started send user")
    $.ajax('/add_ripple', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ur),
        success: function (data, status, xhr) {
            console.log(status)
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log(textStatus);
        }
    }).then(function(){
        console.log('sent')
    })
}