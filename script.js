// JavaScript to toggle between light and dark mode
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', () => {
    // Toggle between light and dark theme
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        toggleButton.textContent = '🌙';  // Change icon to moon for light mode
    } else {
        document.body.setAttribute('data-theme', 'dark');
        toggleButton.textContent = '🌞';  // Change icon to sun for dark mode
    }
});

// Function to generate calendar for a given month and year
function generateCalendar(month, year) {
    const monthYear = document.getElementById('month-year');
    const calendarBody = document.querySelector('#calendar tbody');
    
    // Set the month-year heading
    monthYear.textContent = `${getMonthName(month)} ${year}`;
    
    // Clear existing table rows
    calendarBody.innerHTML = '';
    
    // Calculate first day of the month and the number of days in the month
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create rows for the calendar
    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td'));
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('td');
        cell.textContent = day;
        row.appendChild(cell);
        
        // If it's the last day of the week, append the row and create a new one
        if ((firstDay + day) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
    }
    // Append the last row
    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }

    // Highlight today's date
    const today = new Date();
    if (month === today.getMonth() && year === today.getFullYear()) {
        const cells = calendarBody.getElementsByTagName('td');
        for (let i = 0; i < cells.length; i++) {
            if (parseInt(cells[i].textContent) === today.getDate()) {
                cells[i].classList.add('today');
            }
        }
    }
}

// Helper function to get month name
function getMonthName(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
}

// Initial calendar setup
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
generateCalendar(currentMonth, currentYear);

// Navigation buttons
document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
    
});
