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




  // close reservation form if close button pressed
  const reservForm = document.getElementById("reservation-form");
  function closeReservation() {
    console.log("captured close reserv form");
    reservForm.style.display = "none";
  }

/**
 * Get form field Values
 */

let fnamInput = document.getElementById('fname'); // first name from form
let lnameInput = document.getElementById('lname'); // last name from form
let emailInput = document.getElementById('email'); // Email Address from form
let teleInput = document.getElementById('telephone'); // last name
let findTable = document.getElementById('ftable'); // find table button - used by listner



/**
 * Initialse values for reservation checks.
 */
let guestNumbers = 0;
let sitting = "";
let date = "";
let firstname = "";
let lastname = "";
let email = "";
let phone = "";
let confirmationNumber = 0;
const reservations = [];
const max_sitting_Seats = 16;





/**
 *  create reservation object for storing values
 */ 
// createreservationObj();

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
  openReservation(); // Open Form Tab 1

  // Get values from form tab1
  let numGuests = document.getElementById('guestNum').value; // number of guests from form
  let dateInput = document.getElementById('ddate').value;// reservation date from form
  let timeInput = document.getElementById('dtime').value; // reservation time from form

  // Check to see if a reservation exists
  if (reservations.length === 0){
    console.log("numguests contains " + numGuests);
    console.log("Date of reservation " + dateInput);
    console.log("Sitting " + timeInput);
  }


});


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
   
  };



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
 * Function to create new reservation object

function createreservationObj() {
  const newReservation = {
    guestNumbers: numGuests.value,
    date: dateInput.value,
    sitting: timeInput.value,
    firstName: fnamInput.value,
    lastName: lnameInput.value,
    email: emailInput.value,
    phone: teleInput.value,
    confirmationNumber: generateConfirmationNumber() //generate reservation number function
  };
}
 */

/**
 *  Function to create reservation confirmation number
 */
function generateConfirmationNumber(){
  return reservations.length + 1;
}






//////////////////////////////   Use as needed ////////////////////////////
/*
    console.log("guestNumbers");
    console.log("sitting");
    console.log("firstname");
    console.log("lastname");
    console.log("email");
    console.log("phone");
    console.log("confirmationNumber");
*/