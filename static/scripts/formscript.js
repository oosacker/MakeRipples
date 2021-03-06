let ur;
let current_form = null;

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
    }).then(function () {
        console.log('sent')
    })
}

function clear_hide_modals() {
    $("#text_input1").val("")
    $("#learn_text").val("")
    $("#resonate_text").val("")
    $("#other_text_input").val("")
    $("#other_text").val("")

    ur = new user_response();
    ur.source = "user";

    $("input[type='radio']").prop('checked', false);
    $("input[type='checkbox']").prop('checked', false);

    $("#action_form").modal("hide");
    $("#learn_form").modal("hide");
    $("#resonate_form").modal("hide");
    $("#other_form").modal("hide");
}


$("#ripple_btn").on('click', function () {
    // hide the warning
    $('#warning').css('visibility', 'hidden');
    // hide the 'what ripple' text input
    $("#what_ripple").css('visibility', 'hidden');
    $("#first_form").modal();
    ur = new user_response();
    ur.source = "user";
});

// click handler for the 'other' checkbox
$("#other").on('change', function () {
    if ($("#other").prop('checked')) {
        $("#what_ripple").css('visibility', 'visible');
    } else {
        $("#what_ripple").css('visibility', 'hidden');
    }
});

// click handler for the next button of first form
$("#next_btn").on("click", function () {

    // flash warning if no checkboxes are selected
    if (!($("#resonate").prop('checked') || $("#learning").prop('checked') || $("#action").prop('checked') || $("#other").prop('checked'))) {
        $('#warning').css('color', 'red');
        $('#warning').css('visibility', 'visible');
        console.log('no input');
    } else {
        ur.date = $("#datepicker").datepicker("getDate");

        if ($("#resonate").prop("checked") === true) {
            ur.resonate = true;
        }
        if ($("#learning").prop("checked") === true) {
            ur.learning = true;
        }
        if ($("#action").prop("checked") === true) {
            ur.action = true;
        }
        if ($("#other").prop("checked") === true) {
            ur.other = true;
            ur.other_desc = $("#other_text").val();
        }

        $("#first_form").modal("hide");


        /* decide which form to display based on checkboxes */
        if (ur.action) {
            $("#action_form").modal();
            current_form = 'action';

            // by natsuki
            $('#warning_action1').css('color', 'red');
            $('#warning_action1').css('visibility', 'hidden');

            $('#warning_action2').css('color', 'red');
            $('#warning_action2').css('visibility', 'hidden');

            $('#warning_action3').css('color', 'red');
            $('#warning_action3').css('visibility', 'hidden');
        } else if (ur.learning) {
            $("#learn_form").modal();
            current_form = 'learn';

            // by natsuki
            $('#warning_learn1').css('color', 'red');
            $('#warning_learn1').css('visibility', 'hidden');

            $('#warning_learn2').css('color', 'red');
            $('#warning_learn2').css('visibility', 'hidden');

            $('#warning_learn3').css('color', 'red');
            $('#warning_learn3').css('visibility', 'hidden');
        } else if (ur.resonate) {
            $("#resonate_form").modal();
            current_form = 'resonate';

            // by natsuki
            $('#warning_resonate1').css('color', 'red');
            $('#warning_resonate1').css('visibility', 'hidden');

            $('#warning_resonate2').css('color', 'red');
            $('#warning_resonate2').css('visibility', 'hidden');

        } else if (ur.other) {
            $("#other_form").modal();
            current_form = 'other';

            // by natsuki
            $('#warning_other').css('color', 'red');
            $('#warning_other').css('visibility', 'hidden');
        } else {
            alert("somehow got no checked values after confirming something was checked.")
        }
    }
})


// click handler for the submit buttons for all forms
$("button[name='submit_btn']").on("click", function () {

    switch (current_form) {

        case('action'): {

            console.log('action')

            if ($("input:radio[name='national_radio']:checked").val() === undefined) {
                $('#warning_action2').css('visibility', 'visible');
            } else {
                ur.national = $("input[name='national_radio']:checked").val();
                console.log(ur.national);
            }

            if ($("input:radio[name='community_radio']:checked").val() === undefined) {
                $('#warning_action1').css('visibility', 'visible');
            } else {
                ur.community = $("input[name='community_radio']:checked").val();
                console.log(ur.community);
            }

            if ($("#text_input1").val() === '') {
                $('#warning_action3').css('visibility', 'visible');
            } else {
                ur.message = $("#text_input1").val().substring(0,500);
                console.log(ur.message);
            }

            if ($("input:radio[name='national_radio']:checked").val() !== undefined && $("input:radio[name='community_radio']:checked").val() !== undefined && $("#text_input1").val() !== '') {
                ur.userRating = calculate();
                console.log(ur);
                send_user();
                clear_hide_modals();

            }

            break;
        }


        case('resonate'): {

            console.log('resonate')

            if ($("input:radio[name='personal_radio']:checked").val() === undefined) {
                $('#warning_resonate1').css('visibility', 'visible');
            } else {
                ur.personal = $('input[name="personal_radio"]').val();
                console.log(ur.personal);
            }

            if ($("#resonate_text").val() === "") {
                $('#warning_resonate2').css('visibility', 'visible');
            } else {
                ur.message = $("#resonate_text").val().substring(0,500);
                console.log(ur.message);
            }

            if ($("input:radio[name='personal_radio']:checked").val() !== undefined && $("#resonate_text").val() !== "") {
                ur.userRating = calculate();
                console.log(ur);
                send_user();
                clear_hide_modals();
            }

            break;
        }


        case('learn'): {

            console.log('learn');

            if ($("input:radio[name='perspective_radio']:checked").val() === undefined) {
                $('#warning_learn2').css('visibility', 'visible');
            } else {
                ur.perspective = $("input[name='perspective_radio']:checked").val();
                console.log(ur.perspective);
            }

            if ($("input:radio[name='applied_radio']:checked").val() === undefined) {
                $('#warning_learn1').css('visibility', 'visible');
            } else {
                ur.applied = $("input[name='applied_radio']:checked").val();
                console.log(ur.applied);
            }

            if ($("#learn_text").val() === "") {
                $('#warning_learn3').css('visibility', 'visible');
            } else {
                ur.message = $("#learn_text").val().substring(0,500);
                console.log(ur.message);
            }

            if ($("input:radio[name='perspective_radio']:checked").val() !== undefined && $("input:radio[name='applied_radio']:checked").val() !== undefined && $("#learn_text").val() !== "") {
                ur.userRating = calculate();
                console.log(ur);
                send_user();
                clear_hide_modals();

            }

            break;
        }


        case('other'): {

            console.log('other')

            if ($("#other_text_input").val() === "") {
                $('#warning_other').css('visibility', 'visible');
            } else {
                ur.message = $("#other_text_input").val().substring(0,500);
                ur.userRating = calculate();
                console.log(ur);
                send_user();
                clear_hide_modals();

            }

            break;
        }


        default: {
            console.log('error in switch');
            break;
        }
    }

})

// click handler for the back button of the first form
$("button[name='back_btn']").on("click", function () {
    $('#warning').css('visibility', 'hidden');
    $("#what_ripple").css('visibility', 'hidden');
    // ur.message = undefined
    clear_hide_modals();
    //show first modal
    $("#first_form").modal();
})


// Logic for getting impact value from user input
function calculate() {
    // alert("started calculate()")
    if (ur.action) {
        if (ur.national == 'yes') {
            return 9;
        }
        if (ur.community == 'yes') {
            return 8;
        }
        return 7;
    } else if (ur.learning) {
        if (ur.perspective == 'yes') {
            return 6;
        }
        if (ur.applied == 'yes') {
            return 5;
        }
        return 4;
    } else if (ur.resonate) {
        if (ur.personal == 'yes') {
            return 3;
        }
        return 2;
    } else {
        return 1;
    }
}


function send_user() {
    // alert("started send user")
    $.ajax('/add_ripple', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ur),
        success: function (data, status, xhr) {
            console.log(status);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log(textStatus);
        }
    }).then(function () {
        console.log('sent');
        location.reload();
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


// The code will only run if the webpage is loaded fully!!!
jQuery(function () {
    $("#datepicker").datepicker({
        startDate: first,
        endDate: last,
        autoclose: true,
        todayHighlight: true,

    }).datepicker('update', new Date());
})
