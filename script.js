function initQuestion(questionNumber){
	if(questionNumber < 5){
		var questionText;
		switch(questionNumber){
			case 0:
				questionText = "Wie hoch sind Ihre Durchsetzungschancen?";
				break;
			case 1:
				questionText = "Wie wichtig ist das Thema für Sie beide?";
				break;
			case 2:
				questionText = "Wie wichtig sind Ihnen die Ziele?";
				break;
			case 3:
				questionText = "Welche Partei ist stärker?";
				break;
			case 4:
				questionText = "Ist die Einigung auf einen Kompromiss wahrscheinlich?";
				break;
		}
		generateQuestionText(questionText);
		generateQuestionSlider(questionNumber);
	} else {
		initErgebnis();
	}
	
}

function generateQuestionText(questionText){
	divQuestionText.innerHTML = questionText;
}

function generateQuestionSlider(questionNumber){
	if(questionNumber == 4){
		var btnJa = document.createElement('INPUT');
		btnJa.type = 'button';
		btnJa.value = 'Ja';
		btnJa.className = 'btn btn-success';
		btnJa.style.marginRight = '10px';
		btnJa.onclick = btnJaHandler;
		
		var btnNein = document.createElement('INPUT');
		btnNein.type = 'button';
		btnNein.value = 'Nein';
		btnNein.className = 'btn btn-danger';
		btnNein.onclick = btnNeinHandler;
		
		divQuestionSlider.appendChild(btnJa);
		divQuestionSlider.appendChild(btnNein);
	} else {
		var slider = document.createElement('FORM');
	slider.className = 'range-field';
	var input = document.createElement('INPUT');
	input.type = 'range';
	input.id = 'slider';
	input.min = '1';
	input.max = '9';
	input.value = '5';
	
	slider.appendChild(input);
	
	var divSliderText = document.createElement('DIV');
	
	var sliderText;
	switch(questionNumber){
		case 0:
			sliderText = "niedrig \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 hoch";
			break;
		case 1:
			sliderText = "Gegner \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Ich";
			break;
		case 2:
			sliderText = "nicht wichtig \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 wichtig";
			break;
		case 3:
			sliderText = "Gegner \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Ich";
			break;
		case 4:
			sliderText = "unwahrscheinlich \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 sehr wahrscheinlich";
			break;
	}
	divSliderText.innerHTML = sliderText;
	
	divQuestionSlider.appendChild(divSliderText);
	
	divQuestionSlider.appendChild(slider);
	
	generateQuestionButton();
	}
	
}

function generateQuestionButton(){
	var button = document.createElement('INPUT');
	button.type = 'button';
	button.value = 'Weiter';
	button.className = 'btn btn-primary';
	button.onclick = btnWeiterHandler;

	divQuestionButton.appendChild(button);
}

function btnWeiterHandler(){
	if(questionNumber < 4){
		auswerten();
	}
	removeQuestion();
	questionNumber++;
	initQuestion(questionNumber);
}

function btnJaHandler(){
	punkteIch = punkteIch + 5;
	punkteGegner = punkteGegner + 5;
	console.log('ICH: ' + punkteIch);
	console.log('GEGNER: ' + punkteGegner);
	btnWeiterHandler();
}

function btnNeinHandler(){
	punkteIch = punkteIch + 1;
	punkteGegner = punkteGegner + 1;
	console.log('ICH: ' + punkteIch);
	console.log('GEGNER: ' + punkteGegner);
	btnWeiterHandler();
}

function auswerten(){
	var vergebenePunkte = document.getElementById('slider').value;
	punkteIch = punkteIch + (vergebenePunkte-0);
	punkteGegner = punkteGegner + (10-vergebenePunkte);
	console.log('ICH: ' + punkteIch);
	console.log('GEGNER: ' + punkteGegner);
}

// ERGEBNIS

function initErgebnis(){
	durchschnittAuswertung();
	generateAuswertungTable();
	ergebnisAnzeigen();
	generateLegende();
}

function durchschnittAuswertung(){
	durchschnittIch = Math.round(punkteIch / 5);
	durchschnittGegner = Math.round(punkteGegner / 5);
}

function generateAuswertungTable(){
	var table = document.createElement('TABLE');
	table.style.marginLeft = 'auto';
	table.style.marginRight = 'auto';
	var tblBody = document.createElement('TBODY');
	
	table.appendChild(tblBody);
	
	for(var i = 0; i < 10; i++){
		var tr = document.createElement('TR');
		tblBody.appendChild(tr);
		for(var j = 0; j < 10; j++){
			var td = document.createElement('TD');
			td.id = 'ergebnis' + i + j;
			td.style.width = '50px';
			td.style.height = '50px';
			td.style.border = '1px solid transparent';
			tr.appendChild(td);
		}
	}
	
	divErgebnisTabelle.appendChild(table);
	
	tabelleBeschriften();
}

function tabelleBeschriften(){
	var wert1 = 9;
	for(var i = 0; i < 9; i++){
		var td = document.getElementById('ergebnis' + i + '0');
		td.appendChild(document.createTextNode(wert1));
		wert1--;
	}
	
	var wert2 = 1;
	for(var i = 1; i < 10; i++){
		var td = document.getElementById('ergebnis9' + i);
		td.appendChild(document.createTextNode(wert2));
		wert2++;
	}
	
	var nachgeben = document.getElementById('ergebnis01');
	nachgeben.style.border = '1px solid rgb(2, 63, 240)';
	nachgeben.style.backgroundColor = 'rgb(2, 63, 240)';
	nachgeben.appendChild(document.createTextNode('1/9'));
	
	var zusammen = document.getElementById('ergebnis09');
	zusammen.style.border = '1px solid rgb(15, 255, 0)';
	zusammen.style.backgroundColor = 'rgb(15, 255, 0)';
	zusammen.appendChild(document.createTextNode('9/9'));
	
	var kompromiss = document.getElementById('ergebnis45');
	kompromiss.style.border = '1px solid rgb(243, 125, 18)';
	kompromiss.style.backgroundColor = 'rgb(243, 125, 18)';
	kompromiss.appendChild(document.createTextNode('5/5'));
	
	var vermeiden = document.getElementById('ergebnis81');
	vermeiden.style.border = '1px solid gray';
	vermeiden.style.backgroundColor = 'gray';
	vermeiden.appendChild(document.createTextNode('1/1'));
	
	var konkurrieren = document.getElementById('ergebnis89');
	konkurrieren.style.border = '1px solid rgb(240, 2, 2)';
	konkurrieren.style.backgroundColor = 'rgb(240, 2, 2)';
	konkurrieren.appendChild(document.createTextNode('9/1'));
}

function ergebnisAnzeigen(){
	var row = 9 - durchschnittGegner;
	var column = durchschnittIch;
	
	var tdErgebnis = document.getElementById('ergebnis' + row + column);
	if(tdErgebnis.firstChild){
		tdErgebnis.removeChild(tdErgebnis.firstChild);
	}
	tdErgebnis.style.backgroundColor = 'black';
	tdErgebnis.style.color = 'white';
	tdErgebnis.appendChild(document.createTextNode(durchschnittIch + '/' + durchschnittGegner));
	tdErgebnis.style.border = '1px solid black';
}

function generateLegende(){
	var div19 = document.createElement('DIV');
	var div99 = document.createElement('DIV');
	var div55 = document.createElement('DIV');
	var div11 = document.createElement('DIV');
	var div91 = document.createElement('DIV');
	var divErgebnis = document.createElement('DIV');
	
	div19.style.color = 'rgb(2, 63, 240)';
	div19.innerHTML = '1/9: Nachgeben/Entgegenkommen';
	
	div99.style.color = 'rgb(15, 255, 0)';
	div99.innerHTML = '9/9: Zusammenarbeiten';
	
	div55.style.color = 'rgb(243, 125, 18)';
	div55.innerHTML = '5/5: Kompromisse schließen';
	
	div11.style.color = 'gray';
	div11.innerHTML = '1/1: Vermeiden/Flucht';
	
	div91.style.color= 'rgb(240, 2, 2)';
	div91.innerHTML = '9/1: Konkurrieren';
	
	divErgebnis.innerHTML = 'Ihr Ergebnis';
	
	divErgebnisLegende.appendChild(div19);
	divErgebnisLegende.appendChild(div99);
	divErgebnisLegende.appendChild(div55);
	divErgebnisLegende.appendChild(div11);
	divErgebnisLegende.appendChild(div91);
	divErgebnisLegende.appendChild(divErgebnis);
}

function removeQuestion(){
	while(divQuestionText.firstChild){
		divQuestionText.removeChild(divQuestionText.firstChild);
	}
	
	while(divQuestionSlider.firstChild){
		divQuestionSlider.removeChild(divQuestionSlider.firstChild);
	}
	
	while(divQuestionButton.firstChild){
		divQuestionButton.removeChild(divQuestionButton.firstChild);
	}
}

var divStart = document.getElementById('start');
var divQuestion = document.getElementById('question');
var divQuestionText = document.getElementById('questionText');
var divQuestionSlider = document.getElementById('questionSlider');
var divQuestionButton = document.getElementById('questionButton');

var divErgebnisTabelle = document.getElementById('ergebnisTabelle');
var divErgebnisLegende = document.getElementById('ergebnisLegende');
var divErgebnisButton = document.getElementById('ergebnisButton');

var questionNumber = 0;
var punkteIch = 0;
var punkteGegner = 0;

var durchschnittIch;
var durchschnittGegner;

initQuestion(questionNumber);




