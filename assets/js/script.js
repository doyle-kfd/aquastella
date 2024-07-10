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

/**
 *    Function opens form tab 1 when "reservation" button is clicked.
 *    It displays tab 1 first. guestnum, sitting, date
 *    When reservation is available it shows tab 2. firstname, lastname, email, telephone.
 */
function openReservation(){
  console.log("Entering reservation popup");
  // Get reservation item by element id
  const reservForm = document.getElementById("reservation-form");
  // Get tab1 elements
  const tab1 = document.getElementById("tab-1");
  const tab2 = document.getElementById("tab-2");

  reservForm.style.display = "block"; // Display the reservation form
  tab1.style.display = "block"; // Display the stage 1 form
  tab2.style.display = "none"; // Hide the stage 2 form until completing reservation
  



  /* ////////////////////////// Look to delete before finishing project /////////////// */
  /* // Get reservation item by element id
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
  } */
  };


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






/**
 *  Create Listner for "find a table button click"
 *
 *  Step 1:
 *        it takes, number of guests, sitting and date and checks to see if there are seats available.
 *        If there are seats it goes to step 2
 * 
 *  Step 2:
 *        produce form part 2 and get firstname, lastname, email and telephone number
 *        write reservation to array and give customer reservation number
 */
findTable.addEventListener("click", () => {
   console.log("picked up find table button click");
   // create reservation object for storing values
   createreservationObj();

  // Check to see if the date is available, then if there are seats available at that sitting
  // Check if there are any bookings yet
  if (reservations.length === 0) {
    console.log("no records in the data")
    // Go to second form page and get name, email and telephone - then write the reservation to the array
    completeReservation();

  };


  
  // Convert date from yyyy-mm-dd to dd-mm-yy - will be needed to display in dashboard
  convertDate();



 


});


/**
 *  Function to close tab 1 and show tab 2 when reservation is being made
 */
function completeReservation(){
  console.log("Entering reservation popup");
  // Get reservation item by element id
  // const reservForm = document.getElementById("reservation-form");
  // Get tab 1 elements
  let tab1 = document.getElementById("tab-1");
  // Get tab1 elements
  const tab2 = document.getElementById("tab-2"); // Get tabt element
  tab1.style.display = "none"; // Hide tab1
  tab2.style.display = "block"; // Display tab2
}




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
 * Initialse values for reservation checks.
 */
let guestNumbers = 0;
let sitting = "";
let firstname = "";
let lastname = "";
let email = "";
let phone = "";
let confirmationNumber = 0;
const reservations = [];
const max_sitting_Seats = 16;

/**
 * Function to create new reservation object
 */
function createreservationObj() {
  const newReservation = {
    guestNumbers: guestNumbers,
    sitting: sitting,
    firstName: firstname,
    lastName: lastname,
    email: email,
    phone: phone,
    confirmationNumber: generateConfirmationNumber() //generate reservation number function
  };
}


/**
 *  Function to create reservation confirmation number
 */
function generateConfirmationNumber(){
  return reservations.length + 1;
}