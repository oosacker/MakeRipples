// Gets button from first modal screen
let modal1btn1 = document.getElementById('butt1')
let modal1btn2 = document.getElementById('butt2')
let modal1btn3 = document.getElementById('butt3')

//Provides on click listener for first modal button; displays modal two.
modal1btn1.onclick = function() {
   $("#activity_input_box2").modal()
}

//Provides on click listener for second modal button; displays modal two.
modal1btn2.onclick = function() {
   $("#activity_input_box2").modal()
}

//Provides on click listener for third modal button; displays modal two.
modal1btn3.onclick = function() {
   $("#activity_input_box2").modal()
}

$(document).ready(function () {
    $("#activity_input_box").modal()  // Display the overlay dialogue
    $("#activity_input_box2").modal()
})
