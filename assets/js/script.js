console.log("Script file open");
//const resForm = document.getElementById("menu");

// Function called when reservation menu item is clicked 

function mobileMenu(){
  console.log("menu button click captured")
    // Get menu item by el    const resForm = document.getElementById("menu");ement id
    const resForm = document.getElementById("menu");
    // check to see if the menu is already drop down
    if (resForm.style.display === "block") {
    // Hide menu if its open
      resForm.style.display = "none";
      console.log("menu hidden");
     } else {
    // Open menu if closed
     resForm.style.display = "block";
     console.log("menu shown");
     }  
}


  



/**
 * 
 *  Function to open login form
 * 
 */
function openloginForm() {
  console.log("Login Form Opened")
  const resForm = document.getElementById("menu"); // get meny by id
  resForm.style.display = "none"; // Close the menu
  loginForm.style.display = "block"; // display the login form
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.522)"; // give the bg a color to bring focus to form
    // Reset the window click event handler to ensure the form hides when clicking outside
    window.onclick = function (event) {
      // check to see if the button thats bein
      if (event.target == modal) { 
          /*console.log("clicked outside the admin login form")
          console.log("Window onclick target == modal");
          loginForm.style.display = "none"; // Hide the login form
          modal.style.display = "none"; // hide the modal styling */
          console.log("Clicked outside the admin login form");
          closeloginForm();
      }
  }
}

/**
 * 
 *  Function to close login form
 * 
 */
function closeloginForm(){
  console.log("close login form button click");
  loginForm.style.display = "none"; // display the login form
  modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
}

/**
 * 
 *  Complete login function for admin user
 * 
 */

//  Initailse login form variables
const adminUsername = 'admin';
const adminPassword = '12345';
const adminPage = document.getElementById("adminPagelink");
const loginForm = document.getElementById("admin-login-form");
const loginMenulink = document.getElementById("adminlogin");// Get login menu link
const logoutMenulink = document.getElementById("adminlogout");
loginForm.style.display = "none"; // Keep login form closed at start

// Add listner to see if the admin user is authenticated
document.addEventListener('DOMContentLoaded', () => {
  // Check if the user is authenticated
  if (isAuthenticated()) {
      document.getElementById('adminPagelink').style.display = 'inline'; // show
      document.getElementById('adminlogin').style.display = 'none';
      document.getElementById('adminlogout').style.display = 'inline';
  } else {
    document.getElementById('adminlogin').style.display = 'inline';
    document.getElementById('adminPagelink').style.display = 'none'; // hide
  }
});


/**
 *  Function to submit userId and password
 *  If correct then show admin page in menu, otherwise keep hidden
 */
function login(){

  // Get userId and password values from form
  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;
  console.log(userId);
  console.log(password);

  // check to see if userID and password are correct
  if ( userId === adminUsername && password === adminPassword){
      // If yes then display admin page in menu
      localStorage.setItem('authenticated', 'true');
      adminPage.style.display = "block"; // Display the admin page
      console.log("login details accepted");
      closeloginForm(); // Close the login form
      logoutMenulink.style.display = "block"; // Show the logout link in the menu
      loginMenulink.style.display = "none"; // Hide the Login menu link
  } else {
      adminPage.style.display = "none";
      const loginError = document.getElementById("errorLogin");
      loginError.textContent = "Incorrect Cridentials";
      console.log("login details not accepted");
      document.getElementById('userId').value = "";
      document.getElementById('password').value = "";
  }
}

// Is the admin user authenticated
const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};

/**
 *  Function to logout, on logout remove admin link from menu and add login link
 */
function adminLogout() {
  console.log("admin logout clicked");
  logoutMenulink.style.display = "none"; // Hide the logout link in the menu
  loginMenulink.style.display = "block"; // Show the Login menu link
  // Reset the login credentials
  let adminUsername = 'anyone';
  let adminPassword = 'nothing';
  // Close the menu
  const menu = document.getElementById("menu");
  menu.style.display = "flex";
  localStorage.setItem('authenticated', 'false');
  document.getElementById('adminPagelink').style.display = 'none'; // hide
  console.log(adminUsername);
  console.log(adminPassword);
}



/**
 * Get form button Values
 */
let findTable = document.getElementById('ftable'); // find table button - used by listner
let makeReservation = document.getElementById('make-booking'); // find make reservation button - used by listner


/**
 * Initialse values for reservation checks.
 */
let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Initialise reservations array set to local storate. If not found use empty array/
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
findTable.addEventListener("click", (event) => {
  console.log("picked up find table button click");
  event.preventDefault();
  openReservationForm(); // Open Form Tab 1

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
      console.log("Seats are available");
      console.log("Number of guests looking for seats " + guests);
      console.log("Number of seats available " + seatsAvailable);
      console.log("The Date of the reservation");
      completeReservation();                  // if seats available display form part 2 to complete reservation.
  } else {
    console.log("Seats are Not available");
    console.log("Number of guests looking for seats " + guests);
    console.log("Number of seats available " + seatsAvailable);
    console.log("The Date of the reservation");
      message.textContent = "Sitting Full! Please Try Again"; // Message to be displayed to guest
      message.classList.remove = 'hidden'; // remove the class hidden
      resetForm();
      console.log("form values should now be reset");

  }

  
  function checkreservations(date, sitting) {
    // Create a new array existingReservations filtering only reservations matching the date and sitting provided.  
    
    let existingReservations = reservations.filter(r => r.date === date && r.sitting === sitting);
    console.log("Existing reservations: " + JSON.stringify(existingReservations, null, 2));
    // Take the existingReservations array and see how many seats are available using reduce method. 
    let bookedSeats = existingReservations.reduce((total, reservation) => total + Number(reservation.guests), 0);
    console.log("booked seats " + bookedSeats);
    return max_sitting_Seats - bookedSeats;
  }

  console.log("check reservations numguests contains " + guests);
  console.log("check reservations Date of reservation " + date);
  console.log("check reservations Sitting " + sitting);
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
  // Function to convert date


    let dateObj = new Date(date);  // define object as date value
    let month   = dateObj.getUTCMonth() + 1;  // get the month part of the date
    month = month < 10 ? '0' + month : month; // to display month as mm may need to add leading 0
    let  day     = dateObj.getUTCDate();      // get day part of the date object
    day  = day < 10 ? '0' + day : day;        // to display day as dd may need to add leading 0
    let year    = dateObj.getUTCFullYear();   // get year part of the date
    let newDate = day + "/" + month + "/" + year; // create new variable newDate in format dd/mm/yy
    console.log("New date displayed " + newDate);



  if (!firstName || !lastName || !email || !phone) {
    message.textContent = "Please fill in all fields."; // Message to be displayed to booker
    message.style = "block"; // Show message content
    return;
  }

  
  // Create reservation object
  const reservation = {
    confirmationNumber: generateConfirmationNumber(), // Add generated confirmation number
    date,
    sitting,
    guests,
    firstName,
    lastName,
    email,
    phone,
    
  };

// push the reservation date, sitting, guestnumbers,  first name, last name email, telephone reservation number to array 
reservations.push(reservation);
alert('Reservation completed successfully!');
updateAdminPage(); // call function to write reservation to array and trigger update event.



  // Get values for reservation success tab
  let successName = document.getElementById('reservation-name'); // Success Customer First Name
  let successDate = document.getElementById('reservation-date'); // Success Date
  let successTime = document.getElementById('reservation-time'); // Success Sitting
  let successNumber = document.getElementById('reservation-number'); // Success reservation number

  // Display reservation values in reservation success tab
  successName.textContent =  firstName + ",";
  successDate.textContent =   date;
  successTime.textContent =   sitting;
  successNumber.textContent =  reservation.confirmationNumber;

  const reservationConfirmation = reservation.confirmationNumber;
  

displayReservationdetails(); // Show the reservation details to the guest

console.log("first name for email is: " + firstName);

sendEmail(firstName, date, sitting, reservationConfirmation);
console.log("send email");
console.log(reservations);
resetForm();

});


// Initialise reservations
let modal = document.getElementById("resForm");

/**
 *    Function opens form tab 1 when "reservation" button is clicked.
 *    It displays tab 1 first. guestnum, sitting, date
 *    When reservation is available it shows tab 2. firstname, lastname, email, telephone.
 */
function openReservationForm() {
  console.log("Entering reservation popup");
  // Get reservation item by element id
  let reservForm = document.getElementById("reservation-form");
  let tab1 = document.getElementById("tab-1");
  let tab2 = document.getElementById("tab-2");
  let modal = document.getElementById("resForm");
  const menu = document.getElementById("menu");

  reservForm.style.display = "block"; // Display the reservation form
  console.log("The display value of form is set to block");
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.522)"; // give the bg a color to bring focus to form
  tab1.style.display = "block"; // Display the stage 1 form
  console.log("Display form tab 1 ");
  tab2.style.display = "none"; // Hide the stage 2 form until completing reservation
  console.log("Hide tab 2");

  menu.style.display = "none"; // Hide the menu now that the form is displayed
  console.log("Hide the menu");

  modal.style.display = "flex"; // set the modal style to flex 
  console.log("Set the reservation form to flex");
  modal.style.justifyContent = "space-around"; // show space around the form
  console.log("Justify the content space around");

  // Reset the window click event handler to ensure the form hides when clicking outside
  window.onclick = function (event) {
      // check to see if the button thats bein
      if (event.target == modal) { 
          console.log("Window onclick target == modal");
          reservForm.style.display = "none"; // Hide the reservation form
          modal.style.display = "none"; // hide the modal styling
          console.log("Set the modal to none");
          menu.style.display = "none"; // Show the menu again
          console.log("Show the menu");
      }
  }
}



    // close reservation form if close button pressed
    const reservForm = document.getElementById("reservation-form");
    function closeReservation() {
      console.log("captured close reserv form");
      reservForm.style.display = "none";
      console.log("tried to reset the modal colour");
      modal.style.backgroundColor = "rgba(0, 0, 0, 0)";


    }


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
  let dateObj = new Date(date.value);  // define object as date value
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
 console.log("started google initialisation");
document.getElementById('guestNum').value = 1;
document.getElementById('date').value = null;
document.getElementById('sitting').value = 'First - 17:00';
document.getElementById('message').value = '';
document.getElementById('fname').value = '';
document.getElementById('lname').value = '';
document.getElementById('telephone').value = '';
document.getElementById('email').value = '';

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


////////////////////////////////////////////////////////////////////
////////
///////////
//////////           Setting up email conformation using emailJS
///////
//////
////////////////////////////////////////////////////////////////
/*
(function() {
  emailjs.init('FNSI1Krox9FkKTPMn'); // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
})();
*/

function sendEmail(firstName, date, sitting, reservationConfirmation) {

  console.log("trying to send confirmation email")

  const successName = document.getElementById('reservation-name').value;
  console.log("Name of reservation" + successName);
  const successDate = document.getElementById('reservation-date').value;
  const successTime = document.getElementById('reservation-time').value;
  const successNumber = document.getElementById('reservation-number').value;

  const templateParams = {
    successName: firstName,
    successDate: date,
    successTime: sitting,
    successNumber: reservationConfirmation
};

emailjs.send('service_lgiwr1r', 'template_0fj9hod', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
        }, (error) => {
            console.log('FAILED...', error);
            alert('Failed to send email. Please try again later.');
        });
}
