var dernierMessage = '';
var tableauEntrer = [];
var continu = false;

var cinq = document.getElementById("cinq");
var six = document.getElementById("six");
var sept = document.getElementById("sept");
var huit = document.getElementById("huit");
var neuf = document.getElementById("neuf");
var retour = document.getElementById("retour");
var zero = document.getElementById("zero");
var un = document.getElementById("un");
var deux = document.getElementById("deux");
var trois = document.getElementById("trois");
var quatre = document.getElementById("quatre");
var clear = document.getElementById("clear");
var diviser = document.getElementById("diviser");
var soustraire = document.getElementById("soustraire");
var multiplier = document.getElementById("multiplier");
var addition = document.getElementById("addition");
var virgule = document.getElementById("virgule");
var egal = document.getElementById("egal");

var affichage = document.getElementById("affichage");

function clearTableauEntrer(){
	while(tableauEntrer.length > 0){
		tableauEntrer.pop();
	}
}
function afficher(x){
	affichage.textContent = x;
	dernierMessage = x;
}

function premierChiffreNegatif(){
	let value = tableauEntrer[1];
	clearTableauEntrer();
	tableauEntrer.push('-'+value);
	console.table=tableauEntrer;
	return tableauEntrer[0];
}

function traitementMessage(tab){
	let message = '';
	
	if(tab.length === 2 && tab[0]=== '-'){
		message +=  premierChiffreNegatif();	
	}else if(tab.length>1){
		for(let index in tab){
			if(((isNaN(tab[index-1])&& tab[index-1] !== ',')||isNaN(tab[index])) && tab[index] !== ','){					
				message += ' ' + tab[index];
			}else{
				message += tab[index];
			}
							
		}
	}else{
		return tab[0];
	}
	return message;
}

function apresSigne(tab){
	return tab[tab.length-1] === '+'? false 
	: tab[tab.length-1] === '-'? false 
	: tab[tab.length-1] === '*'? false 
	: tab[tab.length-1] === '/'? false 
	: tab[tab.length-1] === ','? false 
	: true;
}

function calculer(tab){
	let index = 0;
	let resultat = 0;
	do{
		index=tab.indexOf('*');
		if(index != -1){
			resultat = parseFloat(tab[index-1]) * parseFloat(tab[index+1]);
			tab.splice(index, 2);
			tab.splice(index-1,1, resultat);
		}		
	}while(index != -1);
	do{
		index=tab.indexOf('/');
		if(index != -1){
			if(parseFloat(tab[index+1])!==0){
				resultat = parseFloat(tab[index-1]) / parseFloat(tab[index+1]);
				tab.splice(index, 2);
				tab.splice(index-1,1, resultat);
			}else{
				throw('Erreur Division par zéro!');
			}			
		}		
	}while(index != -1);
	do{
		index=tab.indexOf('+');
		if(index != -1){
			resultat = parseFloat(tab[index-1]) + parseFloat(tab[index+1]);
			tab.splice(index, 2);
			tab.splice(index-1,1, resultat);
		}		
	}while(index != -1);
	do{
		index=tab.indexOf('-');
		if(index != -1){
			resultat = parseFloat(tab[index-1]) - parseFloat(tab[index+1]);
			tab.splice(index, 2);
			tab.splice(index-1,1, resultat);
		}		
	}while(index != -1);
	afficher(tab[0] +'');
	return tab[0];
}


zero.addEventListener('click',function(){if(!continu){tableauEntrer.push(0);afficher(traitementMessage(tableauEntrer.slice()));}}); 
un.addEventListener('click',function(){if(!continu){tableauEntrer.push(1);afficher(traitementMessage(tableauEntrer.slice()));}}); 
deux.addEventListener('click',function(){if(!continu){tableauEntrer.push(2);afficher(traitementMessage(tableauEntrer.slice()));}}); 
trois.addEventListener('click',function(){if(!continu){tableauEntrer.push(3);afficher(traitementMessage(tableauEntrer.slice()));}}); 
quatre.addEventListener('click',function(){if(!continu){tableauEntrer.push(4);afficher(traitementMessage(tableauEntrer.slice()));}});
cinq.addEventListener('click',function(){if(!continu){tableauEntrer.push(5);afficher(traitementMessage(tableauEntrer.slice()));}});
six.addEventListener('click',function(){if(!continu){tableauEntrer.push(6);afficher(traitementMessage(tableauEntrer.slice()));}});
sept.addEventListener('click',function(){if(!continu){tableauEntrer.push(7);afficher(traitementMessage(tableauEntrer.slice()));}}); 
huit.addEventListener('click',function(){if(!continu){tableauEntrer.push(8);afficher(traitementMessage(tableauEntrer.slice()));}});
neuf.addEventListener('click',function(){if(!continu){tableauEntrer.push(9);afficher(traitementMessage(tableauEntrer.slice()));}});

retour.addEventListener('click',function(){	
	if(tableauEntrer.length > 0){
		tableauEntrer.pop();
	}
	afficher(traitementMessage(tableauEntrer.slice()));
	continu = false;
});   

clear.addEventListener('click',function(){	
	clearTableauEntrer();
	afficher('');
});  
diviser.addEventListener('click',function(){
	if(tableauEntrer.length>0 && apresSigne(tableauEntrer.slice())){tableauEntrer.push('/');
	afficher(traitementMessage(tableauEntrer.slice()))};
	continu = false;	
});  
soustraire.addEventListener('click',function(){
	if(apresSigne(tableauEntrer.slice())){tableauEntrer.push('-');
	afficher(traitementMessage(tableauEntrer.slice()))};
	continu = false;
}); 
multiplier.addEventListener('click',function(){
	if(tableauEntrer.length>0 && apresSigne(tableauEntrer.slice())){tableauEntrer.push('*');
	afficher(traitementMessage(tableauEntrer.slice()))};
	continu = false;
}); 
addition.addEventListener('click',function(){
	if(tableauEntrer.length>0 && apresSigne(tableauEntrer.slice())){tableauEntrer.push('+');
	afficher(traitementMessage(tableauEntrer.slice()))};
	continu = false;
}); 

virgule.addEventListener('click',function(){
	if(tableauEntrer.length>0 && !continu && apresSigne(tableauEntrer.slice())){tableauEntrer.push(',');
	afficher(traitementMessage(tableauEntrer.slice()))};
}); 

egal.addEventListener('click',function(){	 
	if(tableauEntrer.length>1 && apresSigne(tableauEntrer.slice())){
		let tableauCalculs = dernierMessage.replace(',','.').trim().split(' ');
		try{
			let resultat = calculer(tableauCalculs);
			clearTableauEntrer();
			tableauEntrer.push(resultat+'');
			continu = true;
		}catch(e){
			console.error(e);
			if(e === 'Erreur Division par zéro!'){				
				afficher(e);			
				setTimeout(() => {
					clearTableauEntrer();
					afficher('');
				},1000);
				continu = false;
			}
		}
		
	}
});

