let ripple_objs = [];


function getRippleDetails() {
 if (ripples == undefined){
    alert("ripples didn't work")
  }
  else {
      // let message = "received source and mod tagged:\n";
      // let i = 0;
      Object.keys(ripples).forEach(function (key) {
          let ripple = new user_response();
          ripple.source = ripples[key].source;
          ripple.message = ripples[key].message;
          ripple.date = new Date(ripples[key].date);
          ripple.id = ripples[key].ripple_id;
          ripple.moderationflag = ripples[key].moderate;
          ripple.userRating = ripples[key].user_rating;
          ripple_objs.push(ripple);
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

    $("#ripples-list").append(
        '<div class="activity-item d-flex justify-content-center row">' +
                        '<div class="activity-tag col-lg-2 my-auto col-sm-4 col-4">' +
                            '<p class="review-tag">' + review + '</p>' +
                        '</div>' +
                        '<div class="activity-desc col-lg-4 my-auto col-sm-8 col-8">' +
                            '<p class="my-auto">' + ripple.message + '</p>' +
                        '</div>' +

                        '<div class="activity-img col-lg-2 my-auto col-sm-4 col-4">' +
                        //    add image here
                        '</div>' +

                        '<div class="activity-update col-lg-2 my-auto col-sm-5 col-5">' +
                            '<p class="my-auto">' + tense + Math.abs(days) + endSentence + '</p>' +
                        '</div>' +

                        '<div class="activity-impact col-lg-2 my-auto col-sm-3 col-3">' +
                            '<p class="my-auto">Level '+ ripple.userRating +' impact</p>' +
                        '</div>' +
                    '</div>')
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
}

function getModRipples() {
    clearRipples()
    for(let i = 0; i < ripple_objs.length; i ++){
        if(ripple_objs[i].moderationflag == "yes") {
            getRippleRow(ripple_objs[i])
        }
    }
    checkReviewColor()
}

function getNonModRipples() {
    clearRipples()
    for(let i = 0; i < ripple_objs.length; i ++){
        if(ripple_objs[i].moderationflag != "yes") {
            getRippleRow(ripple_objs[i])
        }
    }
    checkReviewColor()
}

function checkReviewColor(){
    var reviewTag = document.getElementsByClassName("review-tag");
    var i;
    for (i = 0; i < reviewTag.length; i++) {
      if(document.getElementsByClassName("review-tag")[i].textContent == "Review Me!"){
        document.getElementsByClassName("review-tag")[i].style.backgroundColor ="#f68f20";
        console.log("orange");
      }
      else if(document.getElementsByClassName("review-tag")[i].textContent == "Not Reviewed"){
        document.getElementsByClassName("review-tag")[i].style.backgroundColor ="#63c5c0";
      }
      else if(document.getElementsByClassName("review-tag")[i].textContent == "completed"){
        document.getElementsByClassName("review-tag")[i].style.backgroundColor ="#4d5f96";
      }

    }

}

$("#all-btn").on("click", function () {
    // alert("clicked all")
    getAllRipples()
})
$("#mod-btn").on("click", function () {
    // alert("clicked require mod")
    getModRipples()
})
$("#non-mod-btn").on("click", function () {
    // alert("clicked no mod required")
    getNonModRipples()
})

getRippleDetails()
updateCounts()
getModRipples()

