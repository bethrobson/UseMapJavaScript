function readData(file, id) {
	d3.csv(file, processData)
		.then((data) => mapData(data))
        .then((data) => reduce(data))
        .then((data) => graph(data, id));
}

function processData(datum) {
    let dataItem = {
        date: new Date(datum.DATE) || undefined,
        tmax: parseFloat(datum.TMAX) || 0.0,
		tmin: parseFloat(datum.TMIN) || 0.0
    };
    return dataItem;
}

function mapData(data) {
	let dataMap = new Map();
	data.forEach(datum => {
		let key = datum.date.getFullYear();
		let a = dataMap.get(key) || [];
		a.push({ tmax: datum.tmax, tmin: datum.tmin });
		dataMap.set(key, a);
	});
	return dataMap;
}

function reduce(dataMap) {
	let data = [];
	dataMap.forEach((array, key) => {
		// averages. use maxmin for max mins instead
		data.push(average(array, key));
		//data.push(maxmin(array, key));
	});
	data = data.slice(1, data.length-1);
	return data;
}

function graph(data, id) {
	// graph function here
	console.log(data);
}

// helper functions
function round22(v) {
	return (Math.round(v * 100))/100;
}

function average(array, key) {
	let sum = array.reduce((acc, v) => {
		return {
			tmax: acc.tmax + v.tmax,
			tmin: acc.tmin + v.tmin
		};
	}, { tmax: 0, tmin: 0 })
	let avg = { year: key,
				tmax: sum.tmax/array.length, 
				tmin: sum.tmin/array.length };
	return avg;
}

// Homework
function maxmin(array, key) {
	let maxes = array.map(v => v.tmax);
	let mins = array.map(v => v.tmin);
	let arrayMax = Math.max(...maxes);
	let arrayMin = Math.min(...mins);
	return ({year: key, tmax: arrayMax, tmin: arrayMin });
}


