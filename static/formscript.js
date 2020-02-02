class user_response{
    constructor(type, message, option_1, option_2){
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


jQuery(function () {
    let ajax_promise = $.ajax('/my_test', {
        type: 'POST',  // http method
        //dataType: 'json', // only needed when receiving
        contentType: 'application/json',
        data: JSON.stringify({myData: 'data1', myData2: 'data2'}),
        success: function (data, status, xhr) {
            console.log(status)
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log(textStatus);
        }
    })
})

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
