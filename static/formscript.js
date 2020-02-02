

class user_response{
    constructor(type='unknown', message='unknown', option_1= false, option_2= false){
        this._type = type;
        this._message = message;
        this._option_1 = option_1;
        this._option_2 = option_2;
    }
    get type(){
        return this._type;
    }
    get message(){
        return this._message;
    }
    get option_1(){
        return this._option_1;
    }
    get option_2(){
        return this._option_2;
    }
}

// $.post('/my_test',   // url
//     {myData: 'This is my data.', myData2: 'lalala'}, // data to be submit
//     function (data, status, jqXHR) {// success callback
//         console.log(status)
//     })

// Variables to send to db
let action = false;
let learning = false;
let resonate = false;
let other = false;

function send_data(myData) {
    $.ajax('/my_test', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData),
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


// The code will only run if the webpage is loaded fully!!!
jQuery(function () {
    // $("#activity_type_box").modal();
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
        resonate = true;
        }
        if($("#learning").prop("checked") == true){
        learning = true;
        }
        if($("#action").prop("checked") == true){
        action = true;
        }
        if($("#other").prop("checked") == true){
        other = true;
        }
        $("#test_type_form").modal("hide");
        if(action){
            $("#action_box").modal();
        }
        else if(learning){
            $("#learn_box").modal();
        }
        else if (resonate){
            $("#exp_box").modal();
        }
        else if (other){
            alert("Other modal to be created")
        }
        else {
            alert("Please select at least one option")
        }
    })

})

// Logic for the updated form stages
