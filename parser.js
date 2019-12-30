const table = document.querySelector('.xl7119199')
const rows = table.lastElementChild.children;

const dataset = [];

const isCountryStartRow = (row) => {
	return Number.isInteger(parseInt(row.firstElementChild.textContent))
}

const handleStartRow = (row, newItem) => {
	newItem.country = row.children[1].textContent;
}

const isDataRow = (row) => {
	const key = row.children[1].textContent.trim();
  return ['Arrivals - Thousands', 'Tourism expenditure in the country - US$ Mn',
                 'Departures - Thousands', 'Tourism expenditure in other countries - US$ Mn'].includes(key)
}

const handleDataRow = (row, newItem, i) => {
	const key = row.children[1].textContent.trim();
	let value = +(row.children[i].textContent.replace(',', ''))
  value = Number.isNaN(value) ? null : value
  
  newItem[key] = value;
}

let newItem = {};

// Iterate over each year
for (let i = 4; i <= 26; i++) {
  for (let j = 0; j < rows.length; j++) {
    if (!rows[j].children[0].textContent && !rows[j].children[1].textContent) {
      dataset.push(newItem);
      break;
    }
    
    		if (!newItem || !newItem.year) {
      newItem = {
      	year: +rows[0].children[i].textContent
    	};
    }

  	if (isCountryStartRow(rows[j])) {
      dataset.push(newItem)
      newItem = {
      	year: +rows[0].children[i].textContent
    	};
      
      handleStartRow(rows[j], newItem)
    } else if (isDataRow(rows[j])) handleDataRow(rows[j], newItem, i)
  }
}
