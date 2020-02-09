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
          ripple_objs.push(ripple);
          // message = message + rippleDateSpan(ripple.date) + ", " + ripples[key].message + "\n" + ripples[key].moderate + "\n";
          // i++;
      })

      // alert(message + " saved " + ripple_objs.length + " objects");
  }
}