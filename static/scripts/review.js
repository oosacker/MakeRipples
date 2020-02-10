let ripple_objs = new Array();


function getRippleDetails() {
 if (ripples == undefined){
    alert("ripples didn't work")
  }
  else {
      // let message = "received source and mod tagged:\n";
      // let i = 0;
      Object.keys(ripples).forEach(function (key) {
          if(ripples[key].source == "user") {
              let ripple = new user_response();
              ripple.source = ripples[key].source;
              ripple.message = ripples[key].message;
              ripple.date = new Date(ripples[key].date);
              ripple.id = ripples[key].ripple_id;
              ripple.moderationflag = ripples[key].moderate;
              ripple.userRating = ripples[key].user_rating;
              ripple.orgRating = ripples[key].org_rating;
              ripple_objs.push(ripple);
          }
          // message = message + rippleDateSpan(ripple.date) + ", " + ripples[key].message + "\n" + ripples[key].moderate + "\n";
          // i++;
      })

      // alert(message + " saved " + ripple_objs.length + " objects");
  }


}

function getRippleRow(ripple) {
    let review = "Not Reviewed"
    if(ripple.moderationflag == undefined){
        review = "mod error"
    }
    else if (ripple.moderationflag == 'yes'){
        review = "Review Me!"
    }
    else if (ripple.moderationflag == 'completed'){
        review = "Reviewed"
    }
    const oneDay = 24 * 60 * 60 * 1000;
    let days = Math.round((new Date() - ripple.date)/oneDay);

    let tense = "Made a ripple ";
    let endSentence = " days ago"
    if(days<0){
        tense = "Making a ripple in "
        endSentence = " days"
    }

    if (ripple.orgRating != undefined && ripple.orgRating > 0){
        rating = ripple.orgRating
    }
    else {
        rating = ripple.userRating
    }

    $("#ripples-list").append(
        '<div class="activity-item d-flex justify-content-center row" id="'+ ripple.id +'">' +
                        '<div class="activity-tag col-lg-2 my-auto col-sm-4 col-4">' +
                            '<p class="review-tag">' + review + '</p>' +
                        '</div>' +
                        '<div class="activity-desc col-lg-4 my-auto col-sm-8 col-8">' +
                            '<p class="my-auto">' + ripple.message + '</p>' +
                        '</div>' +

                        '<div class="activity-img col-lg-2 my-auto col-sm-4 col-4">' +
                             '<img class="img-item" src=\"static/images/relay-for-life.jpg\" alt=\"image\"/>'+
                        '</div>' +

                        '<div class="activity-update col-lg-2 my-auto col-sm-5 col-5">' +
                            '<p class="my-auto">' + tense + Math.abs(days) + endSentence + '</p>' +
                        '</div>' +

                        '<div class="activity-impact col-lg-2 my-auto col-sm-3 col-3">' +
                            '<p class="my-auto">Level '+ rating +' impact</p>' +
                        '</div>' +
                    '</div>')
    let tag = "#" + ripple.id
    $(tag).on("click", function () {
        // alert("clicked a box for " + ripple.id)
        reviewRipple(ripple)
    })
}

function clearRipples(){
    $("#ripples-list").empty()
}

function updateCounts(){
    let moderate = 0;
    let no_moderate = 0;
    let total = ripple_objs.length;
    for(let i = 0; i < ripple_objs.length; i++){
        if(ripple_objs[i].moderationflag == "yes"){
            moderate++
        }
        else{
            no_moderate++
        }
    }
    document.getElementById("total-count").innerText = total;
    document.getElementById("mod-count").innerText = moderate;
    document.getElementById("no-mod-count").innerText = no_moderate;
}

function getAllRipples() {
    clearRipples()
    for(let i = 0; i < ripple_objs.length; i ++){
        getRippleRow(ripple_objs[i])
    }
    checkReviewColor()
    randomImage()
}

function getModRipples() {
    clearRipples()
    for(let i = 0; i < ripple_objs.length; i ++){
        if(ripple_objs[i].moderationflag == "yes") {
            getRippleRow(ripple_objs[i])
        }
    }
    checkReviewColor()
    randomImage()
}

function getNonModRipples() {
    clearRipples()
    for(let i = 0; i < ripple_objs.length; i ++){
        if(ripple_objs[i].moderationflag != "yes") {
            getRippleRow(ripple_objs[i])
        }
    }
    checkReviewColor()
    randomImage()
}

function checkReviewColor(){
    var reviewTag = document.getElementsByClassName("review-tag");
    var i;
    // var impactRate = document.getElementsByClassName("activity-impact");
    for (i = 0; i < reviewTag.length; i++) {
      if(document.getElementsByClassName("review-tag")[i].textContent == "Review Me!"){
        document.getElementsByClassName("review-tag")[i].style.backgroundColor ="#f68f20";
      }
      else if(document.getElementsByClassName("review-tag")[i].textContent == "Reviewed"){
        document.getElementsByClassName("review-tag")[i].style.backgroundColor ="#63c5c0";
      }
      else if(document.getElementsByClassName("review-tag")[i].textContent == "Not Reviewed"){
        document.getElementsByClassName("review-tag")[i].style.backgroundColor ="#4d5f96";
      }

      // if(impactRate[i].textContent == "Level 4 impact" || impactRate[i].textContent == "Level 5 impact" || impactRate[i].textContent == "Level 6 impact"){
      //   document.getElementsByClassName("img-item")[i].src = "static/images/tree Planting.jpg";
      // }
      // else if(impactRate[i].textContent == "Level 1 impact" || impactRate[i].textContent == "Level 2 impact" || impactRate[i].textContent == "Level 3 impact"){
      //   document.getElementsByClassName("img-item")[i].src = "static/images/cleaning day.jpg";
      // }
      // else if(impactRate[i].textContent == "Level 7 impact" || impactRate[i].textContent == "Level 8 impact" || impactRate[i].textContent == "Level 9 impact"){
      //   document.getElementsByClassName("img-item")[i].src = "static/images/climate board.jpg";
      // }

    }

}

function randomImage(){
    var i;
    var impactRate = document.getElementsByClassName("activity-impact");
    for (i = 0; i < impactRate.length; i++) {
      if(impactRate[i].textContent == "Level 4 impact" || impactRate[i].textContent == "Level 5 impact" || impactRate[i].textContent == "Level 6 impact"){
        document.getElementsByClassName("img-item")[i].src = "static/images/tree Planting.jpg";
      }
      else if(impactRate[i].textContent == "Level 1 impact" || impactRate[i].textContent == "Level 2 impact" || impactRate[i].textContent == "Level 3 impact"){
        document.getElementsByClassName("img-item")[i].src = "static/images/cleaning day.jpg";
      }
      else if(impactRate[i].textContent == "Level 7 impact" || impactRate[i].textContent == "Level 8 impact" || impactRate[i].textContent == "Level 9 impact"){
        document.getElementsByClassName("img-item")[i].src = "static/images/climate board.jpg";
      }

    }
}

function reviewRipple(ripple){
    $("#review_form").modal();
    $("#datepicker").datepicker('update', ripple.date);
    $("#org_ripple_text").val(ripple.message);
    $("#org_ripple_text").prop("readonly",true);
    $("#rippleId").prop("value",ripple.id);
    if(ripple.userRating>0){
        $("#impact_score").val(ripple.userRating);
    }

}

function findRipple(id){
    for(let i = 0; i < ripple_objs.length; i++){
        if(ripple_objs[i].id == id){
            return ripple_objs[i];
        }
    }
}

$("#all-btn").on("click", function () {
    // alert("clicked all")
    getAllRipples();
    $(".require-moderate").css({"color": "#000000", "text-decoration": "none"});
    $(".no-moderate").css({"color": "#000000", "text-decoration": "none"});
    $(".all-moderate").css({"color": "#63c5c0", "text-decoration": "underline"});
})
$("#mod-btn").on("click", function () {
    // alert("clicked require mod")
    getModRipples();
    $(".require-moderate").css({"color": "#63c5c0", "text-decoration": "underline"});
    $(".no-moderate").css({"color": "#000000", "text-decoration": "none"});
    $(".all-moderate").css({"color": "#000000", "text-decoration": "none"});
})
$("#non-mod-btn").on("click", function () {
    // alert("clicked no mod required")
    getNonModRipples();
    $(".require-moderate").css({"color": "#000000", "text-decoration": "none"});
    $(".no-moderate").css({"color": "#63c5c0", "text-decoration": "underline"});
    $(".all-moderate").css({"color": "#000000", "text-decoration": "none"});
})

function updateRipple(ripple){
    $.ajax('/moderate_ripple', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ripple),
        success: function (data, status, xhr) {
            console.log(status);
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log(textStatus);
        }
    }).then(function () {
        console.log('sent');
    })
}


// NATSUKI'S CODE
$("#update_ripple_btn").on("click", function () {
    let id = $("#rippleId").val();
    let ripple = findRipple(id);
    let comments = "none";
    if ($("#org_comments").val() != undefined){
        comments = $("#org_comments").val()
    }
    ripple.orgRating = $("#impact_score").val();
    ripple.orgComment = comments;
    // alert(ripple.orgComment)
    ripple.moderationflag = "completed";
    $("#review_form").modal('hide');
    updateRipple(ripple);
    $("#org_comments").val("");
    updateCounts();
    getAllRipples();
})

jQuery(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());

    getRippleDetails();
    updateCounts();
    getModRipples();

})