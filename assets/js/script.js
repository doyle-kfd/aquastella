console.log("Script file open");

/**
*      This function is run only when the mobile menu item is clicked
*      THe function only runs on mobile phones
 */
function mobileMenu() {                   

    const navItems = document.getElementById("nav-items");             // Get nav items
    const menuItems = document.getElementById("menu");                 // Get menu items

    if (navItems.style.display === "flex") {
        // Hide menu if it's open
        navItems.style.display = "none";                               // Hide the nab items
        menuItems.style.display = "none";                              // Hide menu items
    } else {
        // Open menu if closed
        navItems.style.display = "flex";                              // Display the nav items
        navItems.style.flexDirection = "column";                      // Display as column
        menuItems.style.display = "block";                            // Display the menu items as a block
    }
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {                 // Create an event listner. Checks to see if the user clicks outside the menu. If so close.
    const navItems = document.getElementById("nav-items");            // select the nav items
    const menuButton = document.getElementById("mobileMenu");         // select the mobile menu item

    // if the nav items are visible and nav items are not clicked and menu button not licked
    if (navItems.style.display === "flex" && !navItems.contains(event.target) && event.target !== menuButton) {
        navItems.style.display = "none";                              // Close the menu
    }
});

// Prevent the menu button click from propagating to the document listener
document.getElementById("mobileMenu").addEventListener('click', function (event) {
    event.stopPropagation();
});



// Create variable to store media query

const screenSize = window.matchMedia("(max-width: 280px)")



/**
 *
 *  Function to open login form
 *
 */
function openloginForm() {
    const navItems = document.getElementById("nav-items");                     // Get the nav items
    const adminLoginForm = document.getElementById("admin-login-form");        // Get the admin login form elements

    // Check to see if the screen size is mobile 280px if it is, hide the menu when res form opened
    if (screenSize.matches) {                                                  // If media query matches
        navItems.style.display = "none";                                       // Only on mobile phones, hide the mobile menu
    }
    adminLoginForm.style.display = "block";                                    // display the login form      
    }

/**
 *
 *  Function to close login form
 *
 */
function closeloginForm() {
    loginForm.style.display = "none";                                         // hide the login form
}

/**
 *
 *  Complete login function for admin user
 *
 */

//  Initailse login form variables
const adminUsername = 'admin';                                                // admin user default name
const adminPassword = '12345';                                                // admin user password default
const adminPage = document.getElementById("adminPagelink");                   // get the admin page link for use
const loginForm = document.getElementById("admin-login-form");                // get the admin login form elements for use
const loginMenulink = document.getElementById("adminlogin");                  // Get login menu link
const logoutMenulink = document.getElementById("adminlogout");                // get the admin logout meny link
loginForm.style.display = "none";                                             // Keep login form closed at start

// Add listner to see if the admin user is authenticated
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is authenticated
    if (isAuthenticated()) {                                                  // If authenticated
        document.getElementById('adminPagelink').style.display = 'inline';      // show admin page link
        document.getElementById('adminlogin').style.display = 'none';           // hide the admin longin link
        document.getElementById('adminlogout').style.display = 'inline';        // show the admin logout link
    } else {                                                                  // If not authenticated 
        document.getElementById('adminlogin').style.display = 'inline';         // Show the admin login link
        document.getElementById('adminPagelink').style.display = 'none';        // hide the admin page
    }
});

/**
 *  Function to submit userId and password
 *  If correct then show admin page in menu, otherwise keep hidden
 */
function login() {

    // Get userId and password values from form
    const userId = document.getElementById('userId').value;                 // Get the submitted user id
    const password = document.getElementById('password').value;             // Get the submitted user password


    // check to see if userID and password are correct
    if (userId === adminUsername && password === adminPassword) {           // If admin name and password are correct
        // If yes then display admin page in menu
        localStorage.setItem('authenticated', 'true');                          // Set values authenticated and true in local storage for use across tabs
        adminPage.style.display = "block";                                      // Display the admin page
        closeloginForm();                                                       // Close the login form
        logoutMenulink.style.display = "block";                                 // Show the logout link in the menu
        loginMenulink.style.display = "none";                                   // Hide the Login menu link
    } else {                                                                // If admin name and password are incorrect
        adminPage.style.display = "none";                                       // hide the admin page link
        const loginError = document.getElementById("errorLogin");               // set a login error paramater 
        loginError.textContent = "Incorrect Cridentials";                       // send text to the login erriir parameter                            
        document.getElementById('userId').value = "";                           // fill userid value to blank
        document.getElementById('password').value = "";                         // fill password value to blank
    }
}

/**
 * 
 *  Function to check and see if the local storage value authenticated is set to true
 *
 */
const isAuthenticated = () => {
    return localStorage.getItem('authenticated') === 'true';                    // Is the local storage value authenticated set to true
};

/**
 *  Function to logout, on logout remove admin link from menu and add login link
 */
function adminLogout() {
    logoutMenulink.style.display = "none";                                      // Hide the logout link in the menu
    loginMenulink.style.display = "block";                                      // Show the Login menu link
    // Reset the login credentials
    let adminUsername = 'anyone';                                               
    let adminPassword = 'nothing';
    localStorage.setItem('authenticated', 'false');                            // Set local storage authentication to false
    document.getElementById('adminPagelink').style.display = 'none';           // hide  the admin page link
    window.location.href = "index.html";                                       // redirect the user to the home page on logout
}

/**
 * Get form button Values
 */
let findTable = document.getElementById('ftable');                              // find table button - used by listner
let makeReservation = document.getElementById('make-booking');                  // find make reservation button - used by listner


/**
 * 
 * 
 * Function to autofill some details into the reservations array in local storage on the very first use
 * It only populates if the reservations array is empty.
 * 
 */
// Make sure that the web page has loaded completely
document.addEventListener("DOMContentLoaded", function () {                 // Create event listner for dom loaded fully


    if (!localStorage.getItem("reservations")) {                            // Check to see if the reservations array exists... wont overwrite exising data

        const reservations = [];    	                                    // Create a blank reservations array
        let confirmationNumber = 1;                                         // Start with a reservation number of 1
        const maxSeatsPerSitting = 16;                                      // set the max seating possible of 16, per sitting
        const daysToGenerate = 30;                                          // set how many days i want to populate, 30 to start
        const sittings = ["First - 17:00", "Second - 20:30"];               // sittings are First - 17:00 and Second - 20:30
        const guestsOptions = [1, 2, 4, 6];                                 // guest seats available
        const startDate = new Date();                                       // Date for reservation starts = today

        // Setup array details
        const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];            // First names
        const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];  // Second names
        const domainNames = ["example.com", "mail.com", "test.com", "demo.com"];                            // Email domains

        // Random number generator for repeated use
        function getRandomElement(arr) {
            return arr[Math.floor(Math.random() * arr.length)];             // Calculates a random number between 0 and 1 inclusive, and multiplies it by the length of the array.
        }

        // Generate a random phone number
        function generateRandomPhoneNumber() {
            const digits = "0123456789";                                    // Define the digits to be used
            let phoneNumber = "";                                           // Define phone number starting out as blank
            for (let i = 0; i < 10; i++) {                                  // start a loop that iterates 10 times, 0 -- 9.
                phoneNumber += getRandomElement(digits);                    // take digits and pass it through the random generator and append the result to phoneNumber
            }
            return phoneNumber;                                             // return the phone number generated.
        }

        // Generate random email address using first name, last name and domain.
        function generateRandomEmail(firstName, lastName) {
            const domain = getRandomElement(domainNames);                               // get a random domaion name from domainNames
            return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;    // return value of firstname, last name and domain concatenated using template literals.
        }

        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');                 // January is 0!
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        // Start the loop for the next 30 days - starting today
        for (let day = 0; day < daysToGenerate; day++) {
            const currentDate = new Date(startDate);                                    // start date is today, set to current date
            currentDate.setDate(startDate.getDate() + day);                             // set the current date to startdate + 1 , incrementing each day of 30
            const formattedDate = formatDate(currentDate);                              // formatted date converts date string to dd-mm-yyyy

            // For each day, loop for sittings
            sittings.forEach(sitting => {
                let seatsFilled = 0;                                                                    // Sets counter set to 0

                while (seatsFilled < maxSeatsPerSitting / 2) {                                          // while the number of seats filled < 8, only take up half the seats
                    const guests = guestsOptions[Math.floor(Math.random() * guestsOptions.length)];     // pick a seat option from seat options array, 1,2,4,6
                    if (seatsFilled + guests > maxSeatsPerSitting / 2) continue;                        // check to see if seatsFilled + guests > 8

                    seatsFilled += guests;                                                              // Add guests to seatsFilled, for next loop check

                    const firstName = getRandomElement(firstNames);                     // get a first name from the firstNames array
                    const lastName = getRandomElement(lastNames);                       // get a last name from the lastNames array
                    const email = generateRandomEmail(firstName, lastName);             // get email address from firstName, lastName@domain
                    const phone = generateRandomPhoneNumber();                          // generate a random phone number from function


                    // Set up the reservations data construct
                    const reservation = {
                        confirmationNumber: confirmationNumber++,
                        date: formattedDate,
                        sitting: sitting,
                        guests: guests,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone
                    };
                    reservations.push(reservation);
                }
            });
        }

        // Save bookings to local storage
        localStorage.setItem("reservations", JSON.stringify(reservations));         // write reservations to local string
    }
});







/**
 * Initialse values for reservation checks.
 */
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];          // Initialise reservations array set to local storate. If not found use empty array/
const max_sitting_Seats = 16;
const tab1 = document.getElementById("tab-1");                                      // Get the elements of tab-1
const tab2 = document.getElementById("tab-2");                                      // Get the elements of tab-2
const reservationSuccessful = document.getElementById("reservation-completed");

/**
 *  Create Listner for "find a table button click"
 *
 *  Step 1:
 * 
 *        it takes, number of guests, sitting and date and checks to see if there are seats available.
 *        If there are seats it goes to step 2
 *
 *  Step 2:
 *        produce form part 2 and get firstname, lastname, email and telephone number
 *        write reservation to array and give customer reservation number
 */
findTable.addEventListener("click", (event) => {
    console.log("picked up find table button click");
    event.preventDefault();                                             // Prevent form button from carrying out normal functionlity
    openReservationForm();                                              // Open Form Tab 1

    // Get values from form tab1
    let guests = document.getElementById('guestNum').value;             // number of guests from form
    let date = document.getElementById('date').value;                   // reservation date from form
    let sitting = document.getElementById('sitting').value;             // reservation time from form
    let tab1Message = document.getElementById('tab-1-message');         // message area on tab 1 for giving feedback when button clicked



    // Check to see that the the fields have been filled in
    if (!guests || !sitting || !date) {

        tab1Message.textContent = "Please fill in all fields.";         // Message to be displayed to guest booking
        tab1Message.style = "block";                                    // Show message content
        return;
    } 

    // Check to see if a reservation exists taking date and sitting.
    let seatsAvailable = checkreservations(date, sitting);

    if (seatsAvailable >= guests) {
          completeReservation();                                            // if seats available display form part 2 to complete reservation.
    } else {
        tab1Messageessage.textContent = "Sitting Full! Please Try Again";   // Message to be displayed to guest
        tab1Message.classList.remove = 'hidden';                            // remove the class hidden
        resetForm();                                                        // reset the form values for next reservaion
    }

    function checkreservations(date, sitting) {

        // Create a new array existingReservations filtering only reservations matching the date and sitting provided.

        let existingReservations = reservations.filter(r => r.date === date && r.sitting === sitting);

        // Take the existingReservations array and see how many seats are available using reduce method.
        let bookedSeats = existingReservations.reduce((total, reservation) => total + Number(reservation.guests), 0);

        return max_sitting_Seats - bookedSeats;                             // return the number of seats seats left
    }
});

/**
 * Create listner function for making a reservation
 * This is the second part of the reservation making process
 * It hides the first form with the number of guests, date and sitting
 * then it shows the first name, last name, email, and telephone number form
 */
makeReservation.addEventListener("click", () => {                    // event listner for make reservation button click
    
    // Second form tab 2 details
    let firstName = document.getElementById('fname').value;          // First name
    let lastName = document.getElementById('lname').value;           // Last name
    let email = document.getElementById('email').value;              // Email Address
    let phone = document.getElementById('telephone').value;          // Telephone number

    // First form tab 1 details
    let guests = document.getElementById('guestNum').value;          // Number of guests
    let sitting = document.getElementById('sitting').value;          // Sitting selected - First or Second
    let date = document.getElementById('date').value;                // Date of booking
    let tab2Message = document.getElementById('tab-2-message');      // message area on tab 2 for giving feedback when button clicked
    
    
    // Function to convert date


    let dateObj = new Date(date);                                   // define object as date value
    let month = dateObj.getUTCMonth() + 1;                          // get the month part of the date
    month = month < 10 ? '0' + month : month;                       // to display month as mm may need to add leading 0
    let day = dateObj.getUTCDate();                                 // get day part of the date object
    day = day < 10 ? '0' + day : day;                               // to display day as dd may need to add leading 0
    let year = dateObj.getUTCFullYear();                            // get year part of the date
    let formattedDate = day + "-" + month + "-" + year;             // create new variable formattedDate in format dd/mm/yy


    // Validate the second tab fields to see it there are empty fields.
    if (!firstName || !lastName || !email || !phone) {                      // see if values are true... they must all have values
        tab2Message.textContent = "Please fill missing fields";             // Message to be displayed to booker
        tab2Message.style = "block";                                        // Show message content
        return;
    }

    // Create reservation object
    const reservation = {
        confirmationNumber: generateConfirmationNumber(), // Add generated confirmation number
        date: formattedDate,
        sitting,
        guests,
        firstName,
        lastName,
        email,
        phone,

    };

    // push the reservation date, sitting, guestnumbers,  first name, last name email, telephone reservation number to array
    reservations.push(reservation);
    onlyOnAdminPage();                                  // call function to write reservation to array and trigger update event.


    // Get values for reservation success tab
    let successName = document.getElementById('reservation-name');          // Success Customer First Name
    let successDate = document.getElementById('reservation-date');          // Success Date
    let successTime = document.getElementById('reservation-time');          // Success Sitting
    let successNumber = document.getElementById('reservation-number');      // Success reservation number

    // Display reservation values in reservation success tab
    successName.textContent = firstName + ",";                              // Display first name
    successDate.textContent = formattedDate;                                // Display date of reservation
    successTime.textContent = sitting;                                      // Display which sitting
    successNumber.textContent = reservation.confirmationNumber;             // Display the confirmation number

    const reservationConfirmation = reservation.confirmationNumber;

    displayReservationdetails();                                            // Show the reservation details to the guest
    localStorage.setItem('reservations', JSON.stringify(reservations));     // write reservations to localstorage

    sendEmail(firstName, formattedDate, sitting, reservationConfirmation);  // Send the reservation confirmation to the validated email address

    resetForm();                                                            // reset the form values for next reservation

});


/**
 *    Function opens form tab 1 when "reservation" button is clicked.
 *    The form has 3 tabs.
 *    It displays tab 1 first. guestnum, sitting, date
 *    When reservation is available it shows tab 2. firstname, lastname, email, telephone.
 *    The last tab shows the completed reservation detail.
 */
function openReservationForm() {
    // Initialise reservations
    // Get reservation item by element id
    let resForm = document.getElementById("resForm")                            // get reservation form div
    let reservForm = document.getElementById("reservation-form");               // get reservation form itself
    let tab1 = document.getElementById("tab-1");                                // get the first tab of the reservation form
    let tab2 = document.getElementById("tab-2");                                // get the second tab of the reservation form
    let reservCompleted = document.getElementById("reservation-completed");     // get the reservation completed tab of the form
    const navItems = document.getElementById("nav-items");                      // get the nav items
 
 
    // Check to see if the device is a mobile phone 280px or <. If yes then hide menu.
    if (screenSize.matches) {                                                   // If screen size is mobile phone
        navItems.style.display = "none";                                        // hide the mobile menu
    }

    reservForm.style.display = "block";                                     // Display the reservation form
    tab1.style.display = "block";                                           // Display the stage 1 form
    tab2.style.display = "none";                                            // Hide the stage 2 form until completing reservation
    reservCompleted.style.display = "none";                                 // Hide the reservation completed page


    // Check to see if the screen size is mobile 280px if it is, hide the menu when res form opened
    if (screenSize.matches) {                                               // If screen size is mobile phone
        menu.style.display = "none";                                        // Hide the menu items
    }

    resForm.style.display = "flex";                                         // set the reservation form to flex
    resForm.style.justifyContent = "space-around";                          // space the reservation form evenly
}

// close reservation form if close button pressed
const reservForm = document.getElementById("reservation-form");             // Get the reservation form element

/**
 * Function that closes the reservation form
 * sets the form display to none
 */
function closeReservation() {
    reservForm.style.display = "none";                                      // Hide the reservation form on close button click
}

/**
 *  Function to close tab 1 and show tab 2 when reservation is being made
 */
function completeReservation() {
    tab1.style.display = "none";                // Hide tab1
    tab2.style.display = "block";               // Display tab2
}

/**
 *   Function to display reservation details on success
 */
function displayReservationdetails() {
    tab1.style.display = "none";                    // Hide tab-1
    tab2.style.display = "none";                    // Hide tab-2
    reservationSuccessful.style.display = "block";  // Display Confirmation tab
}


/**
 *  Function to create reservation confirmation number
 *  it returns the length of the array and adds 1
 *  to generate a unique number
 */
function generateConfirmationNumber() {
    return reservations.length + 1;                 // get length of reservations array and increment by 1
}

/**
 * Function to reset form after reservation made
 * the function is called from other functions and is reusable
 */
function resetForm() {
    document.getElementById('guestNum').value = 1;                      // Default number of guests to 1
    document.getElementById('date').value = null;                       // Defaults date to null
    document.getElementById('sitting').value = 'First - 17:00';         // Defaults sitting to first
    document.getElementById('fname').value = '';                        // Defaults First Name to null
    document.getElementById('lname').value = '';                        // Defaults Last Name to null
    document.getElementById('telephone').value = '';                    // Defaults telephone to null
    document.getElementById('email').value = '';                        // Defaults email to null   
}


// Run admin page specific code
onlyOnAdminPage();
/**
 * 
 * 
 *  Check to see if the site visitor is on the admin page.
 *  If they are run the table update and chart related code
 * 
 */

function onlyOnAdminPage() {
    const currentPageUrl = window.location.pathname;                // Set the variable of current path name
    if (currentPageUrl.includes('/admin')) {                        // check to see if the current path is the admin page
        loadAdminSpecificCode();                                    // If it is, then run loadAdminSpecificCode function. Stops function errors on non admin page.
    }
}


/**
 * 
 *  Admin Page Specific Code Only
 * 
 * 
 * 
 */
function loadAdminSpecificCode() {

    // Initialise google charts
    google.charts.load('current', {packages: ['corechart']});

    google.charts.setOnLoadCallback(drawCharts);                // Run the google charts js on function drwCharts


    function drawCharts() {
        updateReservationsTable();
    }

    /**
     *
     *
     * Function that retrieves the reservations array from local storage,
     * if the array is empty it uses a blank array.
     *
     *
     */
    function updateReservationsTable() {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];        // set the reservations variable to localSorage array reservations or blank if none found
        const tableBody = document.getElementById('reservationsTableBody');                 // get reservations table body for creating reservations table
       
        // Clear the existing table rows                
        tableBody.innerHTML = '';                                       // Set the inner html of table body to null                  

        // Populate the table with reservations
        reservations.forEach(reservation => {                           // For each reservation
            const row = document.createElement('tr');                   // Create a row

            for (const key in reservation) {                            // For each key pair in the reservation
                const cell = document.createElement('td');              // Create a table data cell
                cell.innerText = reservation[key];                      // set the cells inner text to the reservation value of key
                row.appendChild(cell);                                  // append the cell date to the row
            }

            tableBody.appendChild(row);                                 // with the cells completed, append the row to the table
        });

        // Update the stats for the reservations
        updateStats(reservations);
    }

    // Update the reservation stats for displaying
    function updateStats(reservations) {

        // Get todays date and as an ISOString and split it on the T to give yyyy-mm-dd
        const today = new Date().toISOString().split('T')[0];

        // Convert todays date to dd-mm-yy
        let dateObj = new Date(today);                      // define object as date value
        let month = dateObj.getUTCMonth() + 1;              // get the month part of the date
        month = month < 10 ? '0' + month : month;           // to display month as mm may need to add leading 0
        let day = dateObj.getUTCDate();                     // get day part of the date object
        day = day < 10 ? '0' + day : day;                   // to display day as dd may need to add leading 0
        let year = dateObj.getUTCFullYear();                // get year part of the date
        let formattedDate = day + "-" + month + "-" + year; // create new variable formattedDate in format dd/mm/yy
  
        // Initialise the variable next7Days
        const next7Days = new Date();

        // set the value of next7Days to todays date + 7
        next7Days.setDate(next7Days.getDate() + 7);

        // Set the variavle next7DaysISOString to newt7Days and split on the T to give yyyy-mm-dd
        const next7DaysISOString = next7Days.toISOString().split('T')[0];

        // Initialise the values for the stat counters
        let totalToday = 0;
        let firstSittingToday = 0;
        let secondSittingToday = 0;
        let totalNext7Days = 0;
        let firstSittingNext7Days = 0;
        let secondSittingNext7Days = 0;

        // Create loop checks on array date to see if there are reservations
        // The calculations will be used for output to counters
        // For each reservation starting with [0]
        reservations.forEach(reservation => {

            // Check and see if the date is today
            if (reservation.date === formattedDate) {
                totalToday++;                                   // If it is, increment todays date counter by 1

                // Check to see of there are reservations for first sitting
                if (reservation.sitting === 'First - 17:00') {
                    firstSittingToday++;                                    // If there are, then increment first sitting by 1
                } else if (reservation.sitting === 'Second - 20:30') {      // Check to see if the resevation is for second sitting
                    secondSittingToday++;                                   // increment counter by 1
                }
            }

            // Calculate counters for next 7 days
            // Check to see if the reservation date is greater than today and its less than the calculated ISO string
            if (reservation.date > formattedDate && reservation.date <= next7DaysISOString) {
                totalNext7Days++;                                               // If it is then increment the counter for the total next 7 days.

                // Check to see if the reservation is for the first sitting
                if (reservation.sitting === 'First - 17:00') {
                    firstSittingNext7Days++;                                    // If it is, then increment
                } else if (reservation.sitting === 'Second - 20:30') {          // check to see if the reservation is for the second sitting
                    secondSittingNext7Days++;                                   // Increment the counter by 1
                }
            }
        });

        // Update the counter text inner with the incremented counter values
        document.getElementById('totalReservationsToday').innerText = `Total: ${totalToday}`;
        document.getElementById('firstSittingToday').innerText = `First Sitting: ${firstSittingToday}`;
        document.getElementById('secondSittingToday').innerText = `Second Sitting: ${secondSittingToday}`;
        document.getElementById('totalReservationsNext7Days').innerText = `Total: ${totalNext7Days}`;
        document.getElementById('firstSittingNext7Days').innerText = `First Sitting: ${firstSittingNext7Days}`;
        document.getElementById('secondSittingNext7Days').innerText = `Second Sitting: ${secondSittingNext7Days}`;

        drawDailyChart(totalToday, firstSittingToday, secondSittingToday);
        drawWeeklyChart(reservations);

    }

    // function to create daily chart
    function drawDailyChart(total, firstSitting, secondSitting) {
        
        // create a data table from an array
        const data = google.visualization.arrayToDataTable([
            ['Sitting', 'Reservations'],                        // array header
            ['Total', total],                                   // total sittings
            ['First Sitting', firstSitting],                    //total first sittings
            ['Second Sitting', secondSitting]                   // total second sittings
        ]);

        const options = {
            title: 'Today\'s Reservations',                     // Title of chart
            chartArea: {
                width: '100%'
            },                                                  // give it full width
            hAxis: {
                title: 'Total Reservations',                    // Horizontal axis title
                minValue: 0                                     // give it a minimum value
            },
            vAxis: {
                title: 'Sitting'                                // vertical access heading
            }
        };

        // create a BarChart object at the element dailyChart
        const chart = new google.visualization.BarChart(document.getElementById('dailyChart'));
        chart.draw(data, options);                              // create the chart using defined data and options
    }

    // function to create weekly graph by day
    function drawWeeklyChart(reservations) {

        // create a new DataTable object to hold the chart data
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');                           // add a column Date as a string
        data.addColumn('number', 'Reservations');                   // add a column Reservations as a number

        // function to format dates
        function formatDate(date) {

            // specify how date should be displayed
            const options = {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            };
            // return formatted string as date
            return date.toLocaleDateString(undefined, options);
        }

        // function to format dates to dd-mm-yyyy
        function formatDateForComparison(date) {
            const day = String(date.getDate()).padStart(2, '0');            // Convert date of getDate to a string and pad with zeros if its not to characters wide
            const month = String(date.getMonth() + 1).padStart(2, '0');     // Gets month from getMonth and adds 1 to allow for 0=jan, adds a zero if there are not two chars
            const year = date.getFullYear();                                // Gets the date of full year as yyyy
            return `${day}-${month}-${year}`;                               // returns the combines template literal as dd-mm-yyyy
        }

        const today = new Date();

        // Prepare data for the next 7 days
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);                              // get today's date and increment by i
            const dateString = formatDateForComparison(date);               // format date as dd-mm-yyyy
            const formattedDate = formatDate(date);                         // format the date to display the day

            let count = 0;                                                  // initialise the counter

            // for each reservation in the reservation array
            reservations.forEach(reservation => {
                // if the reservation date is the same as the one in the date string
                if (reservation.date === dateString) {
                    count++;                                                // increment the count
                }
            });

            // add a new row to the Google charts data table
            data.addRow([formattedDate, count]);
        }

        const options = {
            title: 'Next 7 Days Reservations',                          // title of chart
            chartArea: {
                width: '100%',                                          // give it the full width
            },

            hAxis: {
                title: 'Date'                                           // horizontal axis title
            },
            vAxis: {
                title: 'Reservations',                                  // vertical axis title
                minValue: 0,                                            // set the minimum value
                maxValue: 16
            }
        };

        // create a chart object at the element weeklyChart
        const chart = new google.visualization.ColumnChart(document.getElementById('weeklyChart'));
        chart.draw(data, options);                                      // create the chart using defined data and options
    }

}

/**
 * 
 *  Function to send reservation details to guest with confirmation details
 *  Email used it the one in the reservation form
 *  Using emailJS as the integrator
 *  
 */
function sendEmail(firstName, date, sitting, reservationConfirmation) {

    const successName = document.getElementById('reservation-name').value;              // Name on reservation details
    const successDate = document.getElementById('reservation-date').value;              // Date of confirmation
    const successTime = document.getElementById('reservation-time').value;              // Time and sitting of reservtion made
    const successNumber = document.getElementById('reservation-number').value;          // Reservation number condirmed

    const templateParams = {
        successName: firstName,
        successDate: date,
        successTime: sitting,
        successNumber: reservationConfirmation
    };

    emailjs.send('service_lgiwr1r', 'template_0fj9hod', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}