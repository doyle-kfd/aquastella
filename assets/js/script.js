console.log("Script file open");

// Function called when toggle menu item is clicked 
function toggleMenu(){
  console.log("menu button click captured")
    // Get menu item by element id
    const x = document.getElementById("menu");
    // check to see if the menu is already drop down
    if (x.style.display === "block") {
    // Hide menu if its open
      x.style.display = "none";
     } else {
    // Open menu if closed
     x.style.display = "block";
     }
}

// Function called when reservation button is clicked

function makeReservation(){
  console.log("capturing reservation click");
  // Get reservation item by element id
  const reservForm = document.getElementById("reservation-form");
  // check to see if reservation form is already open
  if (reservForm.style.display === "block") {
    // hide form
    reservForm.style.display = "none";
  } else {
    // open if closed 
    reservForm.style.display = "block";
  }
  }

  // close reservation form
  const reservForm = document.getElementById("reservation-form");
  function closeReservation() {
    console.log("captured close reserv form");
    reservForm.style.display = "none";
  }