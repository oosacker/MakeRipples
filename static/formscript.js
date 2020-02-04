
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

function clear_hide_modals(){
    $("#text_input1").val("")
    $("#learn_text").val("")
    $("#resonate_text").val("")
    $("#other_text_input").val("")
    $("#other_text").val("")



    $("input[type='radio']").prop('checked',false);
    $("input[type='checkbox']").prop('checked',false);

    $("#action_form").modal("hide");
    $("#learn_form").modal("hide");
    $("#resonate_form").modal("hide");
    $("#other_form").modal("hide");
}

let ur;


// The code will only run if the webpage is loaded fully!!!
jQuery(function () {
    let what_ripple = $("#what_ripple");
    let warning_msg =  $('#warning');
    $("#ripple_btn").on('click', function () {
        // hide the warning
        warning_msg.css('visibility', 'hidden');
        // hide the 'what ripple' text input
        what_ripple.css('visibility', 'hidden');
        $("#first_form").modal();
        ur = new user_response();
    });

    // $("#first_form").modal();

    let datepicker = $("#datepicker");
    datepicker.datepicker({
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());

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
            // alert(ur.date)
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
                $("#other_form").modal();
            } else {
                alert("somehow got no checked values after confirming something was checked.")
            }
        }
    })

    $("button[name='back_btn']").on("click",function(){
        warning_msg.css('visibility', 'hidden');
        what_ripple.css('visibility', 'hidden');
        ur.message = undefined
        clear_hide_modals();
        //show first modal
        $("#first_form").modal();
    })

    $("button[name='submit_btn']").on("click",function(){
        ur.message = $("#text_input1").val()
        if(ur.message === undefined || ur.message === ""){
            ur.message = $("#learn_text").val()
        }
        if(ur.message === undefined || ur.message === ""){
            ur.message = $("#resonate_text").val()
        }
        if(ur.message === undefined || ur.message === ""){
            ur.message = $("#other_text_input").val()
        }
        if(ur.message === undefined || ur.message === ""){
            alert("Please enter a description")
        }

        else {
            if ($("input[name='national_radio']:checked")) {
                ur.national = $("input[name='national_radio']:checked").val();
            }
            if ($("input[name='community_radio']:checked")) {
                ur.community = $("input[name='community_radio']:checked").val();
            }
            if ($("input[name='perspective_radio']:checked")) {
                ur.perspective = $("input[name='perspective_radio']:checked").val();
            }
            if ($("input[name='applied_radio']:checked")) {
                ur.applied = $("input[name='applied_radio']:checked").val();
            }
            if ($("input[name='personal_radio']:checked")) {
                ur.personal = $("input[name='personal_radio']:checked").val();
            }
            ur.userRating = calculate();

            // alert(JSON.stringify(ur));

            send_user();

            clear_hide_modals();

            fetch_data();

        }
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

function fetch_data() {
    // Send a fetch request via GET
    fetch('/fetch_data')
        .then(function (response) {
            // Parse response as JSON
            return response.json();
        })
        .then(function (json) {
            console.log('fetch');
        })
}