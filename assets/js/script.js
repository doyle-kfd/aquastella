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

/**
 * Get form field Values
 */
let numGuests = document.getElementById('guestNum'); // number of guests from form
let dateInput = document.getElementById('ddate');// reservation date from form
let timeInput = document.getElementById('dtime'); // reservation time from form
let fnamInput = document.getElementById('fname'); // first name from form
let lnameInput = document.getElementById('lname'); // last name from form
let emailInput = document.getElementById('email'); // Email Address from form
let teleInput = document.getElementById('telephone'); // last name
let findTable = document.getElementById('ftable'); // find table button - used by listner
const reservations = [];
/**
 *  Create Listner for "find a table button click"
 */
findTable.addEventListener("click", () => {
  console.log("picked up find table button click");

  
  // Convert date from yyyy-mm-dd to dd-mm-yy - will be needed to display in dashboard
  convertDate();



 


});





/**
 * Create function to change input date from format yyyy-mm-dd to dd-mm-yy
 */
function convertDate () {
  console.log("date conversion function complete")
  let dateObj = new Date(dateInput.value);  // define object as date value
  let month   = dateObj.getUTCMonth() + 1;  // get the month part of the date
  month = month < 10 ? '0' + month : month; // to display month as mm may need to add leading 0
  let  day     = dateObj.getUTCDate();      // get day part of the date object
  day  = day < 10 ? '0' + day : day;        // to display day as dd may need to add leading 0
  let year    = dateObj.getUTCFullYear();   // get year part of the date
  let newDate = day + "/" + month + "/" + year; // create new variable newDate in format dd/mm/yy
  console.log(newDate);
}


/**
 * Function to create new reservation
 */
function makeReservation() {
  const newReservation = {
    guestNumbers: guestNumbers,
    sitting: sitting,
    firstName: firstname,
    lastName: lastname,
    email: email,
    phone: phone,
    confirmationNumber: generateConfirmationNumber() //generate reservation number function
  };
  reservations.push(newReservation);
}


/**
 *  Function to create reservation confirmation number
 */
function generateConfirmationNumber(){
  return reservations.length + 1;
}