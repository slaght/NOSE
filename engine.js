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

	$("#estimates").hide();
	$("#alert-container").hide();
}

function initializeInputs() {
	console.log('Initializing interface link.');
	$('.input').change(function() {
		console.log('Updating input value.');
		inputs[this.id] = this.value;
		console.log(inputs);
		calculateEstimates();
	});
}

function calculateEstimates() {
	console.log('Calculating estimates.');
	if(validateInputs()) {
		var effort = 0;

		var kloc = get('kloc');
		var type = get('type');

		var rely = get('rely');
		var data = get('data');
		var cplx = get('cplx');
		var ruse = get('ruse');
		var docu = get('docu');

		var time = get('time');
		var stor = get('stor');
		var pvol = get('pvol');

		var acap = get('acap');
		var pcap = get('pcap');
		var pcon = get('pcon');
		var aexp = get('aexp');
		var plex = get('plex');
		var ltex = get('ltex');

		var tool = get('tool');
		var site = get('site');
		var sced = get('sced');

		var c = 0;
		var k = 0;
		if(type=='organic') {
			c = 3.2;
			k = 1.05;
		} else if(type=='embedded') {
			c = 2.8;
			k = 1.20;
		} else if(type=='semi-detached') {
			c = 3.0;
			k = 1.12;
		}

		var e = c * (kloc ** k);
		effort = e * rely * data * cplx * ruse * docu * time * stor * pvol * acap * pcap * pcon * aexp * plex * ltex * tool * site * sced;

		showEstimates(effort);
	} else {
		$('#estimates').hide();
	}
}

function get(fieldName) {
	if(!inputs[fieldName]) {
		return 1;
	}
	return inputs[fieldName];
}

function validateInputs() {
	console.log('Validating inputs.');
	var passedValidation = true;
	var missingFields = '';

	if(!inputs.kloc || Number.isInteger(inputs.kloc)) {
		passedValidation = false;
		missingFields += 'Estimated KLOC, ';
	}
	if(!inputs.type) {
		passedValidation = false;
		missingFields += 'Project Type, ';
	}

	if(!passedValidation) {
		var alert = $("#alert-container");
		$("#alert").html('Please fill in the following fields: ' + missingFields.slice(0, missingFields.length - 2));

		alert.slideDown();
		window.setTimeout(function() {
			alert.slideUp();
		}, 2500);
	}

	return passedValidation;
}

function showEstimates(effort) {
	console.log('Showing estimates.');
	$('#effort').html('Project effort: ' + Math.round(effort * 100) / 100 + ' person-months');

	if(inputs['sala']) {
		$('#money').html('Project cost: ' + (Math.round(effort * 100) / 100) * inputs['sala'] + ' currency units');
	} else {
		$('#money').html('');
	}

	$('#estimates').show();
}