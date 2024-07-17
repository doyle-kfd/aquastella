console.log("Admin Specific JS Loaded");


// Initialise google charts
google.charts.load('current', {'packages':['corechart', 'bar']});
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
    localStorage.setItem('reservations', JSON.stringify(reservations)); // write reservations to localstorage
    window.dispatchEvent(new Event('storage')); // trigger event to check for updates in local storage
  }
  
  
  // Add event listner to check when DOM is fully loaded.
  document.addEventListener('DOMContentLoaded', function() {
    updateReservationsTable();
  
    // Listen for storage events
    window.addEventListener('storage', function() {
        updateReservationsTable();
    });
  });
  




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
  
    // Update the stats
    updateStats(reservations);
  }
  
  // Update the reservation stats for displaying
  function updateStats(reservations) {
    // Get todays date and as an ISOString and split it on the T to give yyyy-mm-dd
    const today = new Date().toISOString().split('T')[0];
  
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
        if (reservation.date === today) {
            totalToday++; // If it is, increment todays date counter by 1
            // Check to see of there are reservations for first sitting
            if (reservation.sitting === 'First - 17:00') {
                firstSittingToday++; // If there are, then increment first sitting by 1
            } else if (reservation.sitting === 'Second - 20:30') {  // Check to see if the resevation is for second sitting
                secondSittingToday++; // increment counter by 1
            }
        }
  
        // Calculate counters for next 7 days
        // Check to see if the reservation date is greater than today and its less than the calculated ISO string
        if (reservation.date > today && reservation.date <= next7DaysISOString) {
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
        chartArea: {width: '100%'}, // give it full width
        hAxis: {
            title: 'Total Reservations', // Horizontal axis title
            minValue: 0                  // give it a minimum value
        },
        vAxis: {                       
            title: 'Sitting'             // vertical access heading
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
  
          //function to format dates
          function formatDate(date) {
            // specify how date should ve displayed
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            // return formatted string as date
            return date.toLocaleDateString(undefined, options);
        }
  
  // Prepare data for the next 7 days
  // take todays date
  const today = new Date();
  //  for 7 iterations
  for (let i = 0; i < 7; i++) {
      const date = new Date(today); // set the date value as today
      date.setDate(today.getDate() + i); // get todays day/date and increment by 1
      const dateString = date.toISOString().split('T')[0]; // get the long string date and split on T
      const formattedDate = formatDate(date);  // Format the date to display the day
  
      let count = 0;  // initialise the counter
      
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
      chartArea: {width: '100%'},   // give it the full width
      hAxis: {
          title: 'Reservations',        // horizontal axis
          minValue: 0                   // set the minimum value
      },
      vAxis: {
          title: 'Date'                // vertical axis title
      }
  };
  
  
  // create a chart object at the element weeklyChart
  const chart = new google.visualization.ColumnChart(document.getElementById('weeklyChart'));
  chart.draw(data, options);  // create the chart using defined data and options
  }
  
   
   