
let tbody = document.getElementById('tbody');
let ctrs = [-1,-1];

/*
 * CHANGE SIZE IF YOU WANNA FIDDLE WITH THE SCRIPT
*/
const SIZE = 4;

//start empty
let dices = '0'.repeat(SIZE).split('');//some hack to create an array from a sting of SIZE character

initHTML(dices);

function start()
{

	//generate start values
	for (var i = 0; i < dices.length; i++) {
		dices[i] = roll(0); //'1' = all dices at 1, n = all dices between 1 and n !
	}

	//clear table
	tbody.innerHTML = '';
	//update HTML
	updateTable(dices, -1, findLowest(dices), 0)

	//set vars
	let lowest = -1;
	let ctr = 0;

	//loop
	let fini = false;
	while(!fini)
	{
		//find current lowest
		lowest = findLowest(dices);
		//reroll it
		dices[lowest] = roll(6);
		//find new lowest
		newLowest = findLowest(dices);
		//ensure the last row will not have a highlighted cell  (6 6 6 6, lowest is 6)
		newLowest = (dices[newLowest] != 6) ? newLowest : -1;
		//update counter
		ctr ++;
		//update HTML
		updateTable(dices, lowest, newLowest, ctr);
		fini = checkEnd(dices);
	}
	document.getElementById('lancers').innerText = ctr;
	updateCtrs(ctr);
}

//inserrt a fresh row in the table where the lowest element is highlighted
function updateTable(array, idx, idx2, ctr)
{
	let newRow = document.createElement('tr');
	newRow.appendChild(document.createElement('td')).innerText = ctr;
	for (var i = 0; i < array.length; i++)
	{
		newRow.appendChild(document.createElement('td')).innerHTML= /*array[i] +*/ '&#98' + (55 +  array[i]) + ';';
	}
	if(idx>=0)
		//newRow.children[idx+1].setAttribute('class', 'changedVal;');
		newRow.children[idx+1].className = 'changedVal';
	if(idx2>=0)
		newRow.children[idx2+1].setAttribute('class', 'minVal');
	tbody.appendChild(newRow);
}

//keep track of min and max amount of rolls
function updateCtrs(val)
{
	//cas initial
	if(ctrs[0] < 0)
		ctrs[0] = val;
	//cas max
	if(ctrs[1]< val)
		ctrs[1] = val;
	//cas min
	if(ctrs[0] > val)
		ctrs[0] = val;

	document.getElementById('stats').innerText = 'min = ' + ctrs[0] + ' & max = ' + ctrs[1] + '';
}


//generate a number between 1 and n (included)
function roll(n)
{
	//floor over round for closest equiprobability
	return Math.floor(Math.random() * n + 1);
}

//find index of the leftmost lowest element
function findLowest(array)
{
	let min = 0;
	for(i = 1; i < array.length; i++)
	{
		if(array[i] < array[min])
		{
			min = i;
		}
	}
	return min;
}

//create the correct table in HTML
function initHTML(array)
{
	let table = document.getElementsByTagName('table')[0];
	let thead = table.children[0];
	let tfoot = table.children[1];

	thead.innerHTML = '';
	tfoot.innerHTML = '';
	thead.appendChild(document.createElement('tr'));
	tfoot.appendChild(document.createElement('tr'));
	let thead_tr = thead.firstChild;
	let tfoot_tr = tfoot.firstChild;

	/*<tr>
					<th scope="col">alerte</th>*/

	thead_tr.appendChild(document.createElement('th')).innerHTML = '#';
	thead_tr.lastChild.setAttribute('scope', 'col');
	tfoot_tr.appendChild(document.createElement('td')).innerHTML = '#';

	for(i = 0; i < array.length; i++)
	{
		thead_tr.appendChild(document.createElement('th')).innerHTML = 'dice ' + (i+1) + '';
		thead_tr.lastChild.setAttribute('scope', 'col');
		tfoot_tr.appendChild(document.createElement('td')).innerHTML = 'dice ' + (i+1) + '';

	}
}

//check if we meet the end conditions
function checkEnd(array)
{
	for (var i = 0; i < array.length; i++)
	{
		if(array[i] != 6)
			return false;
	}
	return true;
}

let anim_step = 0;
let anim_item = 1;
//create an animated element
function diceAnim()
{
	anim_step = (anim_step+1)%6;
	anim_item = (anim_item+1)%4;
	let char = '&#98' + (56 +  anim_step) + ';';
	document.getElementById('animation' + anim_item).innerHTML = char;

}

start();
setInterval(diceAnim, 120);