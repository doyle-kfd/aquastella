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
 * Get form button Values
 */
let findTable = document.getElementById('ftable'); // find table button - used by listner
let makeReservation = document.getElementById('make-booking'); // find make reservation button - used by listner


/**
 * Initialse values for reservation checks.
 */
let reservations = [];
const max_sitting_Seats = 16;
const tab1 = document.getElementById("tab-1"); // Get the elements of tab-1
const tab2 = document.getElementById("tab-2"); // Get the elements of tab-2
const reservationSuccessful = document.getElementById("reservation-completed");



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
  let guests = document.getElementById('guestNum').value; // number of guests from form
  let date = document.getElementById('date').value;// reservation date from form
  let sitting = document.getElementById('sitting').value; // reservation time from form
  let message = document.getElementById('message'); // message area under find table button for displaying feedback


  // Check to see that the the fields have been filled in
  if (!guests || !sitting || !date) {
    // alert("Please fill in all fields!");
    message.textContent = "Please fill in all fields."; // Message to be displayed to booker
    message.style = "block"; // Show message content
    return;
  }

  // Check to see if a reservation exists taking date and sitting.
  let seatsAvailable = checkreservations(date, sitting);

  if (seatsAvailable >= guests) {
    completeReservation();                  // if seats available display form part 2 to complete reservation.
  } else {
    message.textContent = "Sitting Full! Please Enter A Different Day"; // Message to be displayed to guest
    message.classList.remove = 'hidden'; // remove the class hidden
  }

  
  function checkreservations(date, sitting) {
    // Create a new array existingReservations filtering only reservations matching the date and sitting provided.  
    let existingReservations = reservations.filter(r => r.date === date && r.sitting === sitting);
    // Take the existingReservations array and see how many seats are available using reduce method. 
    let bookedSeats = existingReservations.reduce((total, reservation) => total + reservation.guests, 0);
    return max_sitting_Seats - bookedSeats;
  }

  console.log("numguests contains " + guests);
  console.log("Date of reservation " + date);
  console.log("Sitting " + sitting);
});

/** 
 * Create listner function for making a reservation
 * This is the second part of the reservation making process
 * It hides the first form with the number of guests, date and sitting
 * then it shows the first name, last name, email, and telephone number form
 */
makeReservation.addEventListener("click", () => {
  // Second form tab 2 details
  let firstName = document.getElementById('fname').value;
  let lastName = document.getElementById('lname').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('telephone').value;
  // First form tab 1 details
  let guests = document.getElementById('guestNum').value;
  let sitting = document.getElementById('sitting').value;
  let date = document.getElementById('date').value;


  if (!firstName || !lastName || !email || !phone) {
    message.textContent = "Please fill in all fields."; // Message to be displayed to booker
    message.style = "block"; // Show message content
    return;
  }

  
  // Create reservation object
  const reservation = {
    date,
    sitting,
    guests,
    firstName,
    lastName,
    email,
    phone,
    confirmationNumber: generateConfirmationNumber() // Add generated confirmation number
  };

// push the reservation date, sitting, guestnumbers,  first name, last name email, telephone reservation number to array 
reservations.push(reservation);
alert('Reservation completed successfully!');


  // Get values for reservation success tab
  let successName = document.getElementById('reservation-name'); // Success Customer First Name
  let successDate = document.getElementById('reservation-date'); // Success Customer First Name
  let successTime = document.getElementById('reservation-time'); // Success Customer First Name
  let successNumber = document.getElementById('reservation-number'); // Success Customer First Name

  // Display reservation values in reservation success tab
  successName.textContent =  firstName + ",";
  successDate.textContent =   "Date: " + date;
  successTime.textContent =   "Sitting: " + sitting;
  successNumber.textContent = "Reservation No: " + reservation.confirmationNumber;




displayReservationdetails(); // Show the reservation details to the guest
console.log(reservations);
resetForm();

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
  reservForm.style.display = "block"; // Display the reservation form
  tab1.style.display = "block"; // Display the stage 1 form
  tab2.style.display = "none"; // Hide the stage 2 form until completing reservation
   
  };



/**
 *  Function to close tab 1 and show tab 2 when reservation is being made
 */
function completeReservation(){
  console.log("Entering reservation popup");
  tab1.style.display = "none"; // Hide tab1
  tab2.style.display = "block"; // Display tab2
}

/**
 *   Function to display reservation details on success
 */
function displayReservationdetails(){
  tab1.style.display = "none"; // Hide tab-1
  tab2.style.display = "none"; // Hide tab-2
  reservationSuccessful.style.display = "block"; // Display Confirmation tab
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
 *  Function to create reservation confirmation number
 */
function generateConfirmationNumber(){
  return reservations.length + 1; // get length of reservations array and increment by 1
}


/**
 * Function to reset form after reservation made
 */
function resetForm() {
  document.getElementById('guestNum').value = '';
  document.getElementById('sitting').value = 'first';
  document.getElementById('date').value = '';
  document.getElementById('fname').value = '';
  document.getElementById('lname').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telephone').value = '';

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