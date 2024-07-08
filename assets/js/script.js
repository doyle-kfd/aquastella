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
    // create variable to store reservation tabs
    const resTab = 0;
    console.log("defining resTab");
    // run function to display tab 1
    showresTab(resTab);
    function showresTab(n) {
      console.log("trying to display tab");
      // create variable to store tab contents
      const x = document.getElementsByClassName("res-tab");
      // Display tab 1
      x[n].style.display = "block";
      // hide tab 2 while content is being filled in and reservation checked
      x[n+1].style.display = "none";
    }
  }
  }

  // close reservation form if close button pressed
  const reservForm = document.getElementById("reservation-form");
  function closeReservation() {
    console.log("captured close reserv form");
    reservForm.style.display = "none";
  }


 // Initialise the reservation form variables

const numGuests = document.getElementById('guestNum'); // number of guests
const dateInput = document.getElementById('ddate'); // reservation date
const timeInput = document.getElementById('dtime'); // reservation time
const fnamInput = document.getElementById('fname'); // first name
const lnameInput = document.getElementById('lname'); // last name
const emailInput = document.getElementById('email'); // Email Address
const teleInput = document.getElementById('telephone'); // last name
const reservNum = 1000; // Reservation Number
const mkreserv = document.getElementById('ftable'); // find table button - used by listner


// Add a listner for the submit button
mkreserv.addEventListener("click", () => {
  console.log("picked up find table button click");
  const guestNum = numGuests.value;
  const ddate = dateInput.value;
  const dtime = timeInput.value;
  const fname = fnamInput.value;
  const lname = lnameInput.value;



  console.log(guestNum);
  console.log(ddate);
  console.log(dtime);
  console.log(fname);
  console.log(lname);
});