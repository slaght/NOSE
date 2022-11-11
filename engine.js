let inputs = {};

$( document ).ready(function() {
	console.log('Document ready.');
	initializePage();
	initializeInputs();
});

function initializePage() {
	console.log('Initializing Bootstrap.');
	$(function () {
		$('[data-toggle="popover"]').popover();
	});
}

function initializeInputs() {
	console.log('Initializing interface link.');
	$('.input').change(function() {
		console.log('Updating input value.');
		inputs[this.target] = this.value;
		calculateEstimates();
	});
}

function calculateEstimates() {
	console.log('Calculating estimates.');
	if(validateInputs()) {
		var time = 0
		var money = 0;
		var effort = 0;
		//do calculations here
		showEstimates(time, money, effort);
	} else {
		$('#estimates').hide();
	}
}

function validateInputs() {
	console.log('Validating inputs.');
	var passedValidation = true;
	var missingFields = '';
	if(!inputs.input1 || Integer(inputs.input1)) {
		passedValidation = false;
		missingFields += 'Input 1, ';
	}
	if(!inputs.input2) {
		passedValidation = false;
		missingFields += 'Input 2, ';
	}
	//bootstrap toast with missingFields.trim(2);
	return passedValidation;
}

function showEstimates(time, money, effort) {
	console.log('Showing estimates.');
	//convert units
	$('#time').innerHTML = time;
	$('#money').innerHTML = money;
	$('#effort').innerHTML = effort;
	$('#estimates').show();
}