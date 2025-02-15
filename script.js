const conversionFactors = {
    'm': 1,
    'ft': 0.3048,
    'kg': 1,
    'lb': 0.453592,
    'kg/m³': 1,
    'lb/ft³': 16.0185
};

document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    loadHistory();

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';

    html.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        } else {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    });

    // Enable Drag and Drop for Form and History

});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const expanded = navLinks.classList.contains('active');

    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !expanded);
}

function showSection(sectionId) {
    const sections = ['home', 'historySection', 'contactSection'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (id === sectionId) {
            section.style.display = 'block';
            section.classList.add('active-section'); /* Add a class for styling */
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            section.style.display = 'none';
            section.classList.remove('active-section'); /* Remove class from other sections */
        }
    });
    document.querySelector('.nav-links').classList.remove('active');
    document.querySelector('.hamburger').setAttribute('aria-expanded', 'false'); // Close menu on section change

}

function clearValidationErrors() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

function validateForm() {
    clearValidationErrors();
    let isValid = true;

    const inputs = ['spacing', 'burden', 'powderFactor', 'mcpd', 'distance'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        const value = parseFloat(element.value);
        if (isNaN(value) || value <= 0) {
            document.getElementById(`${id}Error`).textContent = 'Please enter a valid positive number.';
            isValid = false;
        }
    });

    return isValid;
}

function convertValue(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    const fromFactor = conversionFactors[fromUnit];
    const toFactor = conversionFactors[toUnit];
    return value * fromFactor / toFactor;
}

function calculateResult() {
    if (!validateForm()) return;

    const inputs = ['spacing', 'burden', 'powderFactor', 'mcpd', 'distance'];
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'inline-block';

    // Simulate some calculation time (replace with actual calculation)
    setTimeout(() => {

        const values = inputs.map(id => {
            const element = document.getElementById(id);
            const value = parseFloat(element.value);
            const unit = document.getElementById(`${id}Unit`).value;
            return convertValue(value, unit, getDefaultUnit(id));
        });

        const multipliers = [-0.051078064, -0.617999832, -0.059792887, 0.012552282, -0.0013868513];
        const intercept = 9.225518237;

        let groundVibration = Math.abs(values.reduce((sum, value, index) => sum + (value * multipliers[index]), intercept));

        const resultDiv = document.getElementById("result");
        resultDiv.textContent = `Predicted Ground Vibration: ${groundVibration.toFixed(3)} mm/s`;
        resultDiv.style.display = "block";

        saveToHistory(...inputs.map(id => document.getElementById(id)));
        document.getElementById('calcForm').reset();
        clearValidationErrors();
        loadingSpinner.style.display = 'none';
    }, 1000); // Simulate 1 second calculation
}

function getDefaultUnit(inputId) {
    switch (inputId) {
        case 'spacing':
        case 'burden':
            case 'distance':
            return 'm';
        case 'mcpd':
            return 'kg';
        case 'powderFactor':
            return 'kg/m³';
        default:
            return '';
    }
}

document.getElementById("calcForm").addEventListener("submit", function(e) {
    e.preventDefault();
    calculateResult();
});

function saveToHistory(spacingInput, burdenInput, powderFactorInput, mcpdInput, distanceInput) {
    const spacing = parseFloat(spacingInput.value);
    const burden = parseFloat(burdenInput.value);
    const powderFactor = parseFloat(powderFactorInput.value);
    const mcpd = parseFloat(mcpdInput.value);
    const distance = parseFloat(distanceInput.value);

    const spacingUnit = document.getElementById('spacingUnit').value;
    const burdenUnit = document.getElementById('burdenUnit').value;
    const powderFactorUnit = document.getElementById('powderFactorUnit').value;
    const mcpdUnit = document.getElementById('mcpdUnit').value;
    const distanceUnit = document.getElementById('distanceUnit').value;

    const resultDiv = document.getElementById("result");
    const groundVibration = resultDiv.textContent.replace(/[^0-9.]/g, '');

    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB') + ', ' + now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    });

    const historyItem = {
        spacing: `${spacing} ${spacingUnit}`,
        burden: `${burden} ${burdenUnit}`,
        powderFactor: `${powderFactor} ${powderFactorUnit}`,
        mcpd: `${mcpd} ${mcpdUnit}`,
        distance: `${distance} ${distanceUnit}`,
        groundVibration: groundVibration,
        timestamp: timestamp
    };

    saveHistory(historyItem);
}

function loadHistory() {
    const historyList = document.getElementById('historyList');
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];

    historyList.innerHTML = '';

    storedHistory.forEach((item, index) => {
        const row = document.createElement('tr');
        row.classList.add('draggable'); // Add draggable class to each row
        row.draggable = true; // Make the row draggable
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.spacing}</td>
            <td>${item.burden}</td>
            <td>${item.powderFactor}</td>
            <td>${item.mcpd}</td>
            <td>${item.distance}</td>
            <td>${item.groundVibration}</td>
            <td>${item.timestamp}</td>
        `;
        historyList.appendChild(row);
    });
      enableHistoryDragAndDrop()
     enableDragAndDrop();

}

function saveHistory(historyItem) {
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    storedHistory.unshift(historyItem);
    localStorage.setItem('history', JSON.stringify(storedHistory));
    loadHistory();
}

function downloadHistoryAsCSV() {
    // Get history data from table, NOT local storage
    const historyList = document.getElementById('historyList');
    const rows = historyList.querySelectorAll('tr');
    const data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        data.push({
            spacing: cells[1].textContent,
            burden: cells[2].textContent,
            powderFactor: cells[3].textContent,
            mcpd: cells[4].textContent,
            distance: cells[5].textContent,
            groundVibration: cells[6].textContent,
            timestamp: cells[7].textContent
        });
    });

    const csvData = Papa.unparse({
        fields: ["Spacing", "Burden", "Powder Factor", "MCPD", "Distance", "Ground Vibration (mm/s)", "Timestamp"],
        data: data.map(item => [
            item.spacing,
            item.burden,
            item.powderFactor,
            item.mcpd,
            item.distance,
            item.groundVibration,
            item.timestamp
        ])
    });

    const blob = new Blob([csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ground_vibration_history.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('downloadCSV').addEventListener('click', downloadHistoryAsCSV);

function clearHistory() {
    localStorage.removeItem('history');
    loadHistory();
}

document.getElementById('clearHistory').addEventListener('click', clearHistory);

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

function enableDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.draggable-container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragend', dragEnd);
    });

    containers.forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', dragDrop);
    });
}

let draggedItem = null;

function dragStart(e) {
    draggedItem = this;
      e.dataTransfer.setData('text/plain', '');
    setTimeout(() => {
        this.style.display = "table-row"; // Revert display style
    }, 0);
}

function dragEnd() {
    setTimeout(() => {
        this.style.display = "table-row"; // Revert display style
        draggedItem = null;
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
     e.stopPropagation();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop(e) {
    e.stopPropagation();
    this.classList.remove('hovered');

    const targetContainer = this; // Store the container for later use
    if (this.classList.contains('draggable-container')) {
        // If dropped on a container, append dragged item there
        targetContainer.appendChild(draggedItem);
    } else {
        // If dropped on card, insert dragged item before the target card
          if(targetContainer.parentNode){
               targetContainer.parentNode.insertBefore(draggedItem, targetContainer);
          }
    }
     draggedItem.style.display = "block"
    enableDragAndDrop()
}

function enableHistoryDragAndDrop() {
    const table = document.getElementById('historyTable');
    const rows = table.querySelectorAll('tbody > tr');

    rows.forEach(row => {
        row.setAttribute('draggable', true);
        row.addEventListener('dragstart', handleDragStart);
        row.addEventListener('dragenter', handleDragEnter);
        row.addEventListener('dragover', handleDragOver);
        row.addEventListener('dragleave', handleDragLeave);
        row.addEventListener('drop', handleDrop);
        row.addEventListener('dragend', handleDragEnd);
    });
}

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/plain', ''); // Necessary for Firefox to allow the drop.
  this.classList.add('dragging');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('hovered');
}

function handleDragLeave(e) {
  this.classList.remove('hovered');
}

function handleDrop(e) {
       e.stopPropagation();
           const targetRow = this; //this refers to the row on which item is dropped
   if (dragSrcEl !== this) { //if you're not just dropping on the same row
          const historyList = document.getElementById('historyList');

      historyList.insertBefore(dragSrcEl, targetRow); //Move the dragged item before target row
  }
  this.classList.remove('hovered');
  this.classList.remove('dragging')
      enableHistoryDragAndDrop(); //Update the # column after reordering
  updateRowNumbers()
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('hovered');
  this.classList.remove('dragging');

  const table = document.getElementById('historyTable');
    const rows = table.querySelectorAll('tbody > tr');

    rows.forEach(row => {
       row.classList.remove('hovered');
        row.classList.remove('dragging');
    });

   updateRowNumbers(); // Update the # column after reordering

    // Re-enable drag and drop after dragging ends
    enableHistoryDragAndDrop();
}

function updateRowNumbers() {
  const historyList = document.getElementById('historyList');
  const rows = historyList.querySelectorAll('tr');
    rows.forEach((row, index) => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell) {
            firstCell.textContent = index + 1;
        }
    });
}