console.log("Script file open");
//const resForm = document.getElementById("menu");

// Function called when reservation menu item is clicked

function mobileMenu() {
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
function closeloginForm() {
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
const loginMenulink = document.getElementById("adminlogin"); // Get login menu link
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
function login() {

    // Get userId and password values from form
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    console.log(userId);
    console.log(password);

    // check to see if userID and password are correct
    if (userId === adminUsername && password === adminPassword) {
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
    menu.style.display = "none"; // Hide menu on logout
    localStorage.setItem('authenticated', 'false');
    document.getElementById('adminPagelink').style.display = 'none'; // hide
    console.log(adminUsername);
    console.log(adminPassword);
}

/**
 * Get form button Values
 */
let findTable = document.getElementById('ftable'); // find table button - used by listner
let makeReservation = document.getElementById('make-reservation'); // find make reservation button - used by listner


/**
 * 
 * 
 * Function to autofill some details into the reservations array in local storage on the very first use
 * It only populates if the reservations array is empty.
 * 
 */
// Make sure that the web page has loaded completely
document.addEventListener("DOMContentLoaded", function() {
          // When its loaded completly
          console.log("Starting to check for existing reservations array");

          // Check to see if the reservations array exists... wont overwrite exising data
          if (!localStorage.getItem("reservations")) {

            console.log("Array not found start creating now");

            const reservations = [];                               // Create a blank reservations array
            let confirmationNumber = 1;                            // Start with a reservation number of 1
            const maxSeatsPerSitting = 16;                         // set the max seating possible of 16, per sitting
            const daysToGenerate = 30;                             // set how many days i want to populate, 30 to start
            const sittings = ["First - 17:00", "Second - 20:30"];  // sittings are First - 17:00 and Second - 20:30
            const guestsOptions = [1, 2, 4, 6];                    // guest seats available
            const startDate = new Date();                          // Date for reservation starts = today
    
            // Setup array details
            const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];                // First names
            const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];      // Second names
            const domainNames = ["example.com", "mail.com", "test.com", "demo.com"];                                // Email domains
    
            // Random number generator for repeated use
            function getRandomElement(arr) {
                return arr[Math.floor(Math.random() * arr.length)]; // Calculates a random number between 0 and 1 inclusive, and multiplies it by the length of the array.
            }
            
            // Generate a random phone number
            function generateRandomPhoneNumber() {
                const digits = "0123456789";                       // Define the digits to be used
                let phoneNumber = "";                              // Define phone number starting out as blank
                for (let i = 0; i < 10; i++) {                     // start a loop that iterates 10 times, 0 -- 9.
                    phoneNumber += getRandomElement(digits);       // take digits and pass it through the random generator and append the result to phoneNumber
                }
                return phoneNumber;                                // return the phone number generated.
            }
            
            // Generate random email address using first name, last name and domain.
            function generateRandomEmail(firstName, lastName) {
                const domain = getRandomElement(domainNames);                                    // get a random domaion name from domainNames
                return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;         // return value of firstname, last name and domain concatenated using template literals.
            }

            function formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
            
            // Start the loop for the next 30 days - starting today
            for (let day = 0; day < daysToGenerate; day++) {                                                       
                const currentDate = new Date(startDate);                                                         // start date is today, set to current date
                currentDate.setDate(startDate.getDate() + day);                                                  // set the current date to startdate + 1 , incrementing each day of 30
                const formattedDate = formatDate(currentDate);                                                   // formatted date converts date string to dd-mm-yyyy
                
                // For each day, loop for sittings
                sittings.forEach(sitting => {
                    let seatsFilled = 0;                                                                         // Seats counter set to 0
     
                    while (seatsFilled < maxSeatsPerSitting / 2) {                                               // while the number of seats filled < 8, only take up half the seats
                        const guests = guestsOptions[Math.floor(Math.random() * guestsOptions.length)];          // pick a seat option from seat options array, 1,2,4,6
                        if (seatsFilled + guests > maxSeatsPerSitting / 2) continue;                             // check to see if seatsFilled + guests > 8
    
                        seatsFilled += guests;                                                                   // Add guests to seatsFilled, for next loop check
    
                        const firstName = getRandomElement(firstNames);                                          // get a first name from the firstNames array
                        const lastName = getRandomElement(lastNames);                                            // get a last name from the lastNames array
                        const email = generateRandomEmail(firstName, lastName);                                  // get email address from firstName, lastName@domain
                        const phone = generateRandomPhoneNumber();                                               // generate a random phone number from function
                        

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
            localStorage.setItem("reservations", JSON.stringify(reservations));                                    // write reservations to local string
        }
    });







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
    let date = document.getElementById('date').value; // reservation date from form
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
        completeReservation(); // if seats available display form part 2 to complete reservation.
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


    let dateObj = new Date(date); // define object as date value
    let month = dateObj.getUTCMonth() + 1; // get the month part of the date
    month = month < 10 ? '0' + month : month; // to display month as mm may need to add leading 0
    let day = dateObj.getUTCDate(); // get day part of the date object
    day = day < 10 ? '0' + day : day; // to display day as dd may need to add leading 0
    let year = dateObj.getUTCFullYear(); // get year part of the date
    let formattedDate = day + "-" + month + "-" + year; // create new variable formattedDate in format dd/mm/yy
    console.log("New date displayed " + formattedDate);

    if (!firstName || !lastName || !email || !phone) {
        message.textContent = "Please fill in all fields."; // Message to be displayed to booker
        message.style = "block"; // Show message content
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
    alert('Reservation completed successfully!');
    onlyOnAdminPage(); // call function to write reservation to array and trigger update event.


    // Get values for reservation success tab
    let successName = document.getElementById('reservation-name'); // Success Customer First Name
    let successDate = document.getElementById('reservation-date'); // Success Date
    let successTime = document.getElementById('reservation-time'); // Success Sitting
    let successNumber = document.getElementById('reservation-number'); // Success reservation number

    // Display reservation values in reservation success tab
    successName.textContent = firstName + ",";
    successDate.textContent = formattedDate;
    successTime.textContent = sitting;
    successNumber.textContent = reservation.confirmationNumber;

    const reservationConfirmation = reservation.confirmationNumber;

    displayReservationdetails(); // Show the reservation details to the guest
    localStorage.setItem('reservations', JSON.stringify(reservations)); // write reservations to localstorage
    console.log("writing the reservation to loacal storage");
    console.log("first name for email is: " + firstName);

    sendEmail(firstName, formattedDate, sitting, reservationConfirmation);
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
function completeReservation() {
    console.log("Entering reservation popup");
    tab1.style.display = "none"; // Hide tab1
    tab2.style.display = "block"; // Display tab2
}

/**
 *   Function to display reservation details on success
 */
function displayReservationdetails() {
    tab1.style.display = "none"; // Hide tab-1
    tab2.style.display = "none"; // Hide tab-2
    reservationSuccessful.style.display = "block"; // Display Confirmation tab
}

/**
 * Create function to change input date from format yyyy-mm-dd to dd-mm-yy
 */
function convertDate() {
    console.log("date conversion function started")
    let dateObj = new Date(date.value); // define object as date value
    let month = dateObj.getUTCMonth() + 1; // get the month part of the date
    month = month < 10 ? '0' + month : month; // to display month as mm may need to add leading 0
    let day = dateObj.getUTCDate(); // get day part of the date object
    day = day < 10 ? '0' + day : day; // to display day as dd may need to add leading 0
    let year = dateObj.getUTCFullYear(); // get year part of the date
    let formattedDate = day + "/" + month + "/" + year; // create new variable formattedDate in format dd/mm/yy
    console.log(formattedDate);
}

/**
 *  Function to create reservation confirmation number
 */
function generateConfirmationNumber() {
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
    const currentPageUrl = window.location.pathname;
    if (currentPageUrl.includes('/admin')) {
        loadAdminSpecificCode();
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
    google.charts.load('current', {
        packages: ['corechart']
    });

    google.charts.setOnLoadCallback(drawCharts);

    console.log("ended google initialisation");

    function drawCharts() {
        updateReservationsTable();
    }

    /**
     *
     *  Function to write reservation to array local storage
     *
     */
    function updateAdminPage() {
        // localStorage.setItem('reservations', JSON.stringify(reservations)); // write reservations to localstorage
        window.dispatchEvent(new Event('storage')); // trigger event to check for updates in local storage
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
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        const tableBody = document.getElementById('reservationsTableBody');
        console.log("starting Update Reservations Display Table");
        // Clear the existing table rows
        tableBody.innerHTML = '';

        // Populate the table with reservations
        reservations.forEach(reservation => {
            const row = document.createElement('tr');

            for (const key in reservation) {
                const cell = document.createElement('td');
                cell.innerText = reservation[key];
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        });
        console.log("completed Update Reservations Table");

        // Update the stats
        updateStats(reservations);
    }

    // Update the reservation stats for displaying
    function updateStats(reservations) {
        console.log(reservations);
        // Get todays date and as an ISOString and split it on the T to give yyyy-mm-dd
        const today = new Date().toISOString().split('T')[0];
        //console.log(today);

        // Convert todays date to dd-mm-yy
        let dateObj = new Date(today); // define object as date value
        let month = dateObj.getUTCMonth() + 1; // get the month part of the date
        month = month < 10 ? '0' + month : month; // to display month as mm may need to add leading 0
        let day = dateObj.getUTCDate(); // get day part of the date object
        day = day < 10 ? '0' + day : day; // to display day as dd may need to add leading 0
        let year = dateObj.getUTCFullYear(); // get year part of the date
        let formattedDate = day + "-" + month + "-" + year; // create new variable formattedDate in format dd/mm/yy
        console.log("New date displayed " + formattedDate);



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
                totalToday++; // If it is, increment todays date counter by 1
                // Check to see of there are reservations for first sitting
                if (reservation.sitting === 'First - 17:00') {
                    firstSittingToday++; // If there are, then increment first sitting by 1
                } else if (reservation.sitting === 'Second - 20:30') { // Check to see if the resevation is for second sitting
                    secondSittingToday++; // increment counter by 1
                }
            }

            // Calculate counters for next 7 days
            // Check to see if the reservation date is greater than today and its less than the calculated ISO string
            if (reservation.date > formattedDate && reservation.date <= next7DaysISOString) {
                totalNext7Days++; // If it is then increment the counter for the total next 7 days.
                // Check to see if the reservation is for the first sitting
                if (reservation.sitting === 'First - 17:00') {
                    firstSittingNext7Days++; // If it is, then increment
                } else if (reservation.sitting === 'Second - 20:30') { // check to see if the reservation is for the second sitting
                    secondSittingNext7Days++; // Increment the counter by 1
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
            ['Sitting', 'Reservations'], // array header
            ['Total', total], // total sittings
            ['First Sitting', firstSitting], //total first sittings
            ['Second Sitting', secondSitting] // total second sittings
        ]);

        const options = {
            title: 'Today\'s Reservations', // Title of chart
            chartArea: {
                width: '100%'
            }, // give it full width
            hAxis: {
                title: 'Total Reservations', // Horizontal axis title
                minValue: 0 // give it a minimum value
            },
            vAxis: {
                title: 'Sitting' // vertical access heading
            }
        };

        // create a BarChart object at the element dailyChart
        const chart = new google.visualization.BarChart(document.getElementById('dailyChart'));
        chart.draw(data, options); // create the chart using defined data and options
    }

    // function to create weekly graph by day
function drawWeeklyChart(reservations) {
    // create a new DataTable object to hold the chart data
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Date'); // add a column Date as a string
    data.addColumn('number', 'Reservations'); // add a column Reservations as a number

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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const today = new Date();

    // Prepare data for the next 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // get today's date and increment by i
        const dateString = formatDateForComparison(date); // format date as dd-mm-yyyy
        const formattedDate = formatDate(date); // format the date to display the day

        let count = 0; // initialise the counter

        // for each reservation in the reservation array
        reservations.forEach(reservation => {
            // if the reservation date is the same as the one in the date string
            if (reservation.date === dateString) {
                count++; // increment the count
            }
        });

        // add a new row to the Google charts data table
        data.addRow([formattedDate, count]);
    }

    const options = {
        title: 'Next 7 Days Reservations', // title of chart
        chartArea: {
            width: '100%' // give it the full width
        },
        hAxis: {
            title: 'Date' // horizontal axis title
        },
        vAxis: {
            title: 'Reservations', // vertical axis title
            minValue: 0 // set the minimum value
        }
    };

    // create a chart object at the element weeklyChart
    const chart = new google.visualization.ColumnChart(document.getElementById('weeklyChart'));
    chart.draw(data, options); // create the chart using defined data and options
}

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