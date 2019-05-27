// START
function initStart(){
	questionNumber = 0;
	punkteIch = 0;
	punkteGegner = 0;
	
	generateStartText();
	generateStartButton();
}

function generateStartText(){
	var divTitle = document.createElement('DIV');
	var divText = document.createElement('DIV');
	
	divTitle.innerHTML = '<h1><b>Konfliktlösung</b></h1>';
	divText.innerHTML = 'Beantworten Sie die Fragen und finden Sie den passenden Weg zur Lösung Ihres Konfliktes!';
	
	divStartText.appendChild(divTitle);
	divStartText.appendChild(divText);
}

function generateStartButton(){
	var btnStart = document.createElement('INPUT');
	btnStart.type = 'button';
	btnStart.value = 'Start!';
	btnStart.className = 'btn btn-primary';
	btnStart.style.width = '150px';
	btnStart.onclick = btnStartHandler;
	
	divStartButton.appendChild(btnStart);
}

function btnStartHandler(){
	removeStart();
	initQuestion();
}

// FRAGEN
function initQuestion(){
	if(questionNumber < 5){
		var questionText;
		switch(questionNumber){
			case 0:
				questionText = "Wie hoch sind Ihre jeweiligen Durchsetzungschancen?";
				break;
			case 1:
				questionText = "Wie wichtig ist das Thema für Sie beide?";
				break;
			case 2:
				questionText = "Wie wichtig sind die Ziele für Sie beide?";
				break;
			case 3:
				questionText = "Wie viel Zeit und Energie sind jeweils vorhanden?";
				break;
			case 4:
				questionText = "Halten Sie eine Einigung auf einen Kompromiss für wahrscheinlich?";
				break;
		}
		generateQuestionText(questionText);
		generateQuestionSlider();
	} else {
		initErgebnis();
	}
	
}

function generateQuestionText(questionText){
	divQuestionText.innerHTML = questionText;
}

function generateQuestionSlider(){
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
		
	var slider1 = document.createElement('FORM');
	slider1.className = 'range-field';
	var input1 = document.createElement('INPUT');
	input1.type = 'range';
	input1.id = 'slider1';
	input1.min = '1';
	input1.max = '9';
	input1.value = '5';
	
	slider1.appendChild(input1);
	
	var slider1Text = document.createElement('DIV');
	slider1Text.innerHTML = '<b>Sie</b>';
	
	var slider2 = document.createElement('FORM');
	slider2.className = 'range-field';
	var input2 = document.createElement('INPUT');
	input2.type = 'range';
	input2.id = 'slider2';
	input2.min = '1';
	input2.max = '9';
	input2.value = '5';
	
	slider2.appendChild(input2);
	
	var slider2Text = document.createElement('DIV');
	slider2Text.innerHTML = '<b>Gegenpartei</b>';
	
	var divSliderText = document.createElement('DIV');
	
	var sliderText;
	switch(questionNumber){
		case 0:
			sliderText = "niedrig \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 hoch";
			break;
		case 1:
			sliderText = "nicht wichtig \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 sehr wichtig";
			break;
		case 2:
			sliderText = "nicht wichtig \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 sehr wichtig";
			break;
		case 3:
			sliderText = "wenig \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 viel";
			break;
	}
	divSliderText.innerHTML = sliderText;
	
	divQuestionSlider.appendChild(divSliderText);
	
	divQuestionSlider.appendChild(slider1Text);
	divQuestionSlider.appendChild(slider1);
	divQuestionSlider.appendChild(slider2Text);
	divQuestionSlider.appendChild(slider2);
	
	
	
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
	btnWeiterHandler();
}

function btnNeinHandler(){
	punkteIch = punkteIch + 1;
	punkteGegner = punkteGegner + 1;
	btnWeiterHandler();
}

function auswerten(){
	punkteIch = punkteIch + (document.getElementById('slider1').value-0);
	punkteGegner = punkteGegner + (document.getElementById('slider2').value-0);
}

// ERGEBNIS

function initErgebnis(){
	durchschnittAuswertung();
	generateAuswertungTable();
	ergebnisAnzeigen();
	generateLegende();
	generateErgebnisButton();
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
	nachgeben.style.color = 'white';
	nachgeben.appendChild(document.createTextNode('1/9'));
	
	var zusammen = document.getElementById('ergebnis09');
	zusammen.style.border = '1px solid rgb(15, 255, 0)';
	zusammen.style.backgroundColor = 'rgb(15, 255, 0)';
	zusammen.style.color = 'white';
	zusammen.appendChild(document.createTextNode('9/9'));
	
	var kompromiss = document.getElementById('ergebnis45');
	kompromiss.style.border = '1px solid rgb(243, 125, 18)';
	kompromiss.style.backgroundColor = 'rgb(243, 125, 18)';
	kompromiss.style.color = 'white';
	kompromiss.appendChild(document.createTextNode('5/5'));
	
	var vermeiden = document.getElementById('ergebnis81');
	vermeiden.style.border = '1px solid gray';
	vermeiden.style.backgroundColor = 'gray';
	vermeiden.style.color = 'white';
	vermeiden.appendChild(document.createTextNode('1/1'));
	
	var konkurrieren = document.getElementById('ergebnis89');
	konkurrieren.style.border = '1px solid rgb(240, 2, 2)';
	konkurrieren.style.backgroundColor = 'rgb(240, 2, 2)';
	konkurrieren.style.color = 'white';
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

function generateErgebnisButton(){
	var btnMenu = document.createElement('INPUT');
	btnMenu.type = 'button';
	btnMenu.className = 'btn btn-secondary';
	btnMenu.value = 'Menu';
	btnMenu.onclick = btnMenuHandler;
	
	divErgebnisButton.appendChild(btnMenu);
}

function btnMenuHandler(){
	removeErgebnis();
	initStart();
}

// REMOVES

function removeStart(){
	while(divStartText.firstChild){
		divStartText.removeChild(divStartText.firstChild);
	}
	
	while(divStartButton.firstChild){
		divStartButton.removeChild(divStartButton.firstChild);
	}
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

function removeErgebnis(){
	while(divErgebnisTabelle.firstChild){
		divErgebnisTabelle.removeChild(divErgebnisTabelle.firstChild);
	}
	
	while(divErgebnisLegende.firstChild){
		divErgebnisLegende.removeChild(divErgebnisLegende.firstChild);
	}
	
	while(divErgebnisButton.firstChild){
		divErgebnisButton.removeChild(divErgebnisButton.firstChild);
	}
}

var divStart = document.getElementById('start');
var divStartText = document.getElementById('startText');
var divStartButton = document.getElementById('startButton');

var divQuestion = document.getElementById('question');
var divQuestionText = document.getElementById('questionText');
var divQuestionSlider = document.getElementById('questionSlider');
var divQuestionButton = document.getElementById('questionButton');

var divErgebnisTabelle = document.getElementById('ergebnisTabelle');
var divErgebnisLegende = document.getElementById('ergebnisLegende');
var divErgebnisButton = document.getElementById('ergebnisButton');

var questionNumber;
var punkteIch;
var punkteGegner;

var durchschnittIch;
var durchschnittGegner;

initStart();