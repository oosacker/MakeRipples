// array of the keys to use to get the ripple data from the database
let ripple_objs = [];

function getRippleDetails() {
    if (ripples == undefined) {
        alert("ripples didn't work")
    } else {
        // let message = "received source and mod tagged:\n";
        // let i = 0;
        Object.keys(ripples).forEach(function (key) {
            let ripple = new user_response();
            ripple.source = ripples[key].source;
            ripple.message = ripples[key].message;
            ripple.date = new Date(ripples[key].date);
            ripple.id = ripples[key].ripple_id;
            ripple.moderationflag = ripples[key].moderate
            ripple_objs.push(ripple);
            // message = message + rippleDateSpan(ripple.date) + ", " + ripples[key].message + "\n" + ripples[key].moderate + "\n";
            // i++;
        })

        // alert(message + " saved " + ripple_objs.length + " objects");
    }
}


function getModerationCount() {
    getRippleDetails();
    let count_yes = 0;
    let count_no = 0;

    for (let i = 0; i < ripple_objs.length; i++) {
        if(ripple_objs[i].source == 'user') {
            if (ripple_objs[i].moderationflag == 'yes') {
                count_yes++
            }
            if (ripple_objs[i].moderationflag == 'completed' || ripple_objs[i].moderationflag == 'no' ) {
                count_no++
            }
        }
    }
    // alert("Moderate: " + count_yes +"\nDon't Moderate: " + count_no + "\n Total: " + ripple_objs.length);
    document.getElementById("moderation_count").innerText = count_yes;
    document.getElementById("moderation_complete").innerText = count_no;
}

getModerationCount();

//Sample dates
var dates = ["6/12/2015", "9/12/2015", "8/15/2015", "10/22/2015", "11/2/2015", "12/22/2015"];
//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//Format MM/DD/YYYY into string
function dateSpan(date) {
    var month = date.split("/")[0];
    month = monthSpan[month - 1];
    var day = date.split("/")[1];
    if (day.charAt(0) == "0") {
        day = day.charAt(1);
    }
    var year = date.split("/")[2];

    //Spit it out!
    return month + " " + day + ", " + year;
}

//Main function. Draw your circles.
function makeCircles() {
    //Forget the timeline if there's only one date. Who needs it!?
    if (dates.length < 2 || ripple_objs.length < dates.length) {
        $("#line").hide();
        $("#span")
            .show()
            .text(dateSpan(dates[0]));
        //This is what you really want.
    } else if (dates.length >= 2) {
        //Set day, month and year variables for the math
        var first = dates[0];
        var last = dates[dates.length - 1];

        var firstMonth = parseInt(first.split("/")[0]);
        var firstDay = parseInt(first.split("/")[1]);

        var lastMonth = parseInt(last.split("/")[0]);
        var lastDay = parseInt(last.split("/")[1]);

        //Integer representation of the last day. The first day is represnted as 0
        var lastInt = (lastMonth - firstMonth) * 30 + (lastDay - firstDay);

        //Draw first date circle
        $("#line").append(
            '<div class="circle '+ ripple_objs[0].source+'\"  id="circle0" style="top: ' +
            0 +
            '%;"><i class="icon"></i><div class="popupSpan">' +
            dateSpan(dates[0]) +
            "</div></div>"
        );

        $("#mainCont").append(
            '<span id="span0" class="center">' + dateSpan(dates[0]) + "</span>"
        );

        //Loop through middle dates
        for (i = 1; i < dates.length - 1; i++) {
            var thisMonth = parseInt(dates[i].split("/")[0]);
            var thisDay = parseInt(dates[i].split("/")[1]);

            //Integer representation of the date
            var thisInt = (thisMonth - firstMonth) * 30 + (thisDay - firstDay);

            //Integer relative to the first and last dates
            var relativeInt = thisInt / lastInt;

            //Draw the date circle
            $("#line").append(
                '<div class="circle '+ ripple_objs[i].source+'\"  id="circle' +
                i +
                '" style="top: ' +
                relativeInt * 100 +
                '%;"><i class="icon"></i><div class="popupSpan">' +
                dateSpan(dates[i]) +
                "</div></div>"

                //   '<div class="word" id="word' +
                // i +
                // '" style="left: ' +
                // relativeInt * 100 +
                // '%;">' +
                // "</div>"
            );

            $("#mainCont").append(
                '<span id="span' +
                i +
                '" class="right">' +
                dateSpan(dates[i]) +
                "</span>"
            );
        }

        //Draw the last date circle
        $("#line").append(
            '<div class="circle '+ ripple_objs[dates.length - 1].source+'\"  id="circle' +
            i +
            '" style="top: ' +
            99 +
            '%;"><i class="icon"></i><div class="popupSpan">' +
            dateSpan(dates[dates.length - 1]) +
            "</div></div>"
        );

        $("#mainCont").append(
            '<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + "</span>"
        );
    }

    $(".circle:first").addClass("active");
}

makeCircles();

$(".circle").mouseenter(function () {
    $(this).addClass("hover");
});

$(".circle").mouseleave(function () {
    $(this).removeClass("hover");
});

$(".circle").click(function () {
    var spanNum = $(this).attr("id");
    selectDate(spanNum);

    // console.log(document.getElementById(spanNum).style.left);
    // var locate = document.getElementById(spanNum).style.left;

    // document.getElementsByClassName("modal-content")[0].style.left = locate;
    // console.log(document.getElementById("line")[0].style.width);

    // var node = document.createElement("p");
    // var textnode = document.createTextNode(document.getElementById(spanNum).childNodes[0].textContent);
    // node.appendChild(textnode);
    // document.getElementsByClassName("content-wrap")[0].appendChild(node);
    document.getElementsByClassName("selected-date")[0].textContent = document.getElementById(spanNum).childNodes[0].textContent;
    // document.getElementsByClassName("selected-content")[0].textContent = document.getElementById(spanNum).childNodes[0].textContent;
});


function printMousePos(event) {
    // document.body.textContent =
    // "clientX: " + event.clientX +
    // " - clientY: " + event.clientY;
    // if(event.clientX < 1010) {
    document.getElementsByClassName("modal-content")[0].style.left = (event.clientX + 40) + "px";
    document.getElementsByClassName("modal-content")[0].style.top = (event.clientY - 120) + "px";
    // }
    // else if(event.clientX > 1010){
    //   document.getElementsByClassName("modal-content")[0].style.left = (event.clientX - 200) + "px";
    //   var arrowup = document.getElementsByClassName("modal-content");
    //   arrowup.pseudoStyle("before","left","60px");
    // }
    // console.log(event.clientX);
}

document.getElementById("lineCont").addEventListener("click", printMousePos);


// function placeDiv(x_pos, y_pos) {
//   var d = document.getElementById('yourDivId');
//   d.style.position = "absolute";
//   d.style.left = x_pos+'px';
//   d.style.top = y_pos+'px';
// }

// var selectedCircle = document.getElementsByClassName("circle");
// selectedCircle.onclick = function() {
//  console.log("Click")
// }

function selectDate(selector) {
    var modal = document.getElementById("myModal");
    $selector = "#" + selector;
    $spanSelector = $selector.replace("circle", "span");
    var current = $selector.replace("circle", "");

    $(".active").removeClass("active");
    $($selector).addClass("active");

    if ($($spanSelector).hasClass("right")) {
        $(".center")
            .removeClass("center")
            .addClass("left");
        $($spanSelector).addClass("center");
        $($spanSelector).removeClass("right");
    } else if ($($spanSelector).hasClass("left")) {
        $(".center")
            .removeClass("center")
            .addClass("right");
        $($spanSelector).addClass("center");
        $($spanSelector).removeClass("left");
    }
    modal.style.display = "block";
    disableScroll();
}


var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

// Get the modal
var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-btn")[0];

// var modalStatus = document.getElementsByClassName("model-content");
// // When the user clicks the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    enableScroll();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        enableScroll();
    }
}


/* EDITS BY NATSUKI BELOW */
jQuery(function () {

    $('#warning_ripple').css('color', 'red');
    $('#warning_ripple').css('visibility', 'hidden');

    $('#warning_stream').css('color', 'red');
    $('#warning_stream').css('visibility', 'hidden');

    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#datepicker2").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#datepicker3").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#datepicker4").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
})

function send_ripple(ripple){
    // alert("started send user")
    $.ajax('/add_ripple', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ripple),
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



$('#stream_btn').on('click', function () {
    $('#stream_form').modal();
})

$('#create_ripple_btn').on('click', function () {
    if ($('#org_ripple_text').val() === '') {
        $('#warning_ripple').css('visibility', 'visible');
    }
    else{
        let ripple = new user_response();
        ripple.source = "organiser";
        ripple.moderationflag = "N/A";
        ripple.date = $("#datepicker").datepicker("getDate");
        ripple.message = $("#org_ripple_text").val();
        // alert("message:" + ripple.message)
        ripple.orgRating = $("#impact_score").val();

        send_ripple(ripple);
        $("#org_ripple_text").val("");
        $("#impact_score").val("");

        $('#ripple_form').modal('hide');
    }
})



$('#ripple_btn').on('click', function () {
    $('#ripple_form').modal();
})

$('#create_stream_btn').on('click', function () {
    if ($('#org_stream_text').val() === '') {
        $('#warning_stream').css('visibility', 'visible');
    }
    else{
        $('#stream_form').modal('hide');
    }
})

function addRule(sheet, selector, styles) {
    if (sheet.insertRule) return sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
    if (sheet.addRule) return sheet.addRule(selector, styles);
};

function categoryTimeline() {
    var rippleCircle = document.getElementsByClassName("circle");
    var i;
    for (i = 0; i < rippleCircle.length; i++) {
        if (rippleCircle[i].classList[1] == "user") {
            document.getElementsByClassName("circle")[i].style.border = "3px solid #63c5c0";
        } else if (rippleCircle[i].classList[1] == "organiser") {
            document.getElementsByClassName("circle")[i].style.border = "3px solid #92278f";
            addRule(document.styleSheets[0], "#"+rippleCircle[i].attributes[1].value+"::before", "background: rgb(146, 39, 143)");
        }
    }
}

function randomGenerateEvent(){
    document.getElementsByClassName("circle")[0].classList.add("checked");
    document.getElementsByClassName("circle")[3].classList.add ("main");
    document.getElementsByClassName("circle")[4].classList.add ("checked");
}

function categoryIcon() {
    var rippleCircle = document.getElementsByClassName("circle");
    var rippleIcon = document.getElementsByClassName("icon");
    var i;
    for (i = 0; i < rippleCircle.length; i++) {
        if (rippleCircle[i].classList.contains("checked")) {
            rippleIcon[i].classList.add("fas");
            rippleIcon[i].classList.add("fa-check");
        } else if (rippleCircle[i].classList.contains("main")) {
            rippleIcon[i].classList.add("fas");
            rippleIcon[i].classList.add("fa-star");
        }
    }
}

categoryTimeline()
randomGenerateEvent()
categoryIcon()