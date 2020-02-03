
class user_response{
    get userRating() {
        return this._userRating;
    }

    set userRating(value) {
        this._userRating = value;
    }

    get nplRating() {
        return this._nplRating;
    }

    set nplRating(value) {
        this._nplRating = value;
    }

    get orgRating() {
        return this._orgRating;
    }

    set orgRating(value) {
        this._orgRating = value;
    }
    get action() {
        return this._action;
    }

    set action(value) {
        this._action = value;
    }

    get learning() {
        return this._learning;
    }

    set learning(value) {
        this._learning = value;
    }

    get resonate() {
        return this._resonate;
    }

    set resonate(value) {
        this._resonate = value;
    }

    get other() {
        return this._other;
    }

    set other(value) {
        this._other = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get national() {
        return this._national;
    }

    set national(value) {
        this._national = value;
    }

    get community() {
        return this._community;
    }

    set community(value) {
        this._community = value;
    }

    get applied() {
        return this._applied;
    }

    set applied(value) {
        this._applied = value;
    }

    get perspective() {
        return this._perspective;
    }

    set perspective(value) {
        this._perspective = value;
    }

    get personal() {
        return this._personal;
    }

    set personal(value) {
        this._personal = value;
    }

    constructor(action=false, learning=false,resonate=false,other=false,
                message='unknown',
                national='unknown', community='unknown', applied = 'unknown', perspective = 'unknown', personal = 'unknown',
                userRating = 0, nplRating =  0, orgRating = 0){
        this._action = action;
        this._learning = learning;
        this._resonate = resonate;
        this._other = other;
        this._message = message;
        this._national = national;
        this._community = community;
        this._applied = applied;
        this._perspective = perspective;
        this._personal = personal;
        this._userRating = userRating;
        this._nplRating = nplRating;
        this._orgRating = orgRating;
    }

}

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
    $("#test_type_form").modal();

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

    $("#next_btn").on("click",function(){
        if($("#resonate").prop("checked") == true){
            ur.resonate = true
            // resonate = true;
        }
        if($("#learning").prop("checked") == true){
            ur.learning = true
        // learning = true;
        }
        if($("#action").prop("checked") == true){
            ur.action = true
        // action = true;
        }
        if($("#other").prop("checked") == true){
            ur.other = true
        // other = true;
        }
        $("#test_type_form").modal("hide");
        if(ur.action){
            $("#action_box").modal();
        }
        else if(ur.learning){
            $("#learn_box").modal();
        }
        else if (ur.resonate){
            $("#exp_box").modal();
        }
        else if (ur.other){
            alert("Other modal to be created")
        }
        else {
            alert("Please select at least one option")
        }
    })

    $("button[name='submit_btn']").on("click",function(){
        ur.message = $("textarea[name='text_input']").val()

        if($("input[name='national']:checked")){
            ur.national = $("input[name='national']:checked").val();
        }
        if($("input[name='community']:checked")) {
            ur.community = $("input[name='community']:checked").val();
        }
        if($("input[name='perspective']:checked")){
            ur.perspective = $("input[name='perspective']:checked").val();
        }
        if($("input[name='applied']:checked")) {
            ur.applied = $("input[name='applied']:checked").val();
        }
        if($("input[name='personal']:checked")) {
            ur.personal = $("input[name='personal']:checked").val();
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
    alert("started send user")
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