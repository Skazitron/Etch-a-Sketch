var body = document.querySelector('body');

// manipulate the first box here
var mainBox = document.querySelector('.box');
mainBox.style.cssText = 'text-align: center; font-size: 18px; margin-top: 30px; margin-bottom: 20px;'
var header = document.createElement('h1')
header.textContent = 'Etch-a-Sketch!'
header.style.marginBottom = '-2px';
mainBox.appendChild(header)

// manipulating rows and colums
var regularGridRow = document.createElement('div')
var regularGridColumn = document.createElement('div')
regularGridRow.classList = 'row';
regularGridColumn.classlist = 'column';
regularGridColumn.cssText = 'display: inline;'
regularGridRow.appendChild(regularGridColumn);
regularGridColumn.style.cssText = 'border: 2px solid grey; text-align: center; display:inline-block; background-color: white; margin-right: -2px';
regularGridRow.style.cssText = 'text-align: center; margin-bottom: -7px;'

// button for selecting grid layout
var tempColumnNum;
var tempRowNum;
var buttonGridSelector = document.createElement('button')
buttonGridSelector.textContent = 'Select';
buttonGridSelector.classList = 'select-button'
buttonGridSelector.style.cssText = 'color: white; background-color: black; border-style: solid; border-radius: 6px; width: 4%; font-size: 18px; margin: 0;'
buttonGridSelector.addEventListener('click', gridLayout)
function gridLayout(e){
    console.log(e.target.classList.value)
    sketchBox.innerHTML = ''
    regularGridRow.innerHTML = ''
    sketchBox.appendChild(regularGridRow);
    regularGridColumn.style.cssText += 'width: ' + scaleSize + 'px;' + ' height:' + scaleSize + 'px;'
    if(e.target.classList.value == 'select-button'){
        for(i=0; i<tempColumnNum; i++){
            regularGridRow.appendChild(regularGridColumn.cloneNode(true));
        }
        for(i=1; i<tempRowNum; i++){
            sketchBox.appendChild(regularGridRow.cloneNode(true));
        }
    }

    body.appendChild(sketchBox)
}

//button for reset
var buttonReset = document.createElement('button')
buttonReset.style.cssText = buttonGridSelector.style.cssText;
buttonReset.textContent = 'Reset'
buttonReset.addEventListener('click', function(){
    regularGridColumn.style.cssText = regularGridColumn.style.cssText;
})

// options 
var optionGridRow = document.createElement('select');
optionGridRow.id = 'setRow';
optionGridRow.addEventListener('change', selectFunction);
var optionGridColumn = document.createElement('select');
optionGridColumn.addEventListener('change', selectFunction);
optionGridColumn.id = 'setColumn';
var optionsList = document.createElement('option');
var optionRow = document.createElement('option');
var optionColumn = document.createElement('option')
optionRow.textContent = "Row"
optionColumn.textContent = "Column"
optionGridRow.appendChild(optionRow);
optionGridColumn.appendChild(optionColumn);
for(i=2; i<=64; i++){
    optionsList.value = i;
    optionsList.textContent = i;
    optionGridRow.appendChild(optionsList.cloneNode(true))
    optionGridColumn.appendChild(optionsList.cloneNode(true))
}
var optionsBox = document.createElement('div')
var scaleSize;
optionsBox.style.cssText = 'margin-top: 10px; margin-bottom: 8px;'
optionsBox.textContent = 'Grid Layout: '
optionsBox.appendChild(optionGridRow);
optionsBox.appendChild(optionGridColumn);
function selectFunction(e){ // how do I pick the specific option?
    let selectedIndex = event.target.selectedIndex;
    console.log(e.target.options[selectedIndex].value);
    var whichSelect = e.target.id
    console.log(e.target.id)
    if(whichSelect == 'setRow'){
        tempRowNum = e.target.options[selectedIndex].value;
        console.log(tempRowNum);
    }
    if(whichSelect == 'setColumn'){
        tempColumnNum = e.target.options[selectedIndex].value;
        console.log(tempColumnNum)
    }
    if (tempRowNum>tempColumnNum){
        scaleSize = 900/tempRowNum;
    }
    else if (tempRowNum <= tempColumnNum){
        scaleSize = 900/tempColumnNum
    }
}

//sketchBox

var sketchBox = document.createElement('div')
sketchBox.appendChild(regularGridRow)

//black fill

//color change button
var colorChange = document.createElement('button')
colorChange.style.cssText = 'color: white; background-color: black; border-style: solid; border-radius: 6px; font-size: 18px; margin: 0;'
colorChange.textContent = 'Rainbow Mode: Off'
colorChange.addEventListener('click', function(e){
    if (colorChange.textContent == 'Rainbow Mode: On'){
        colorChange.textContent = 'Rainbow Mode: Off'
    }
    else {
        colorChange.textContent = 'Rainbow Mode: On'
    }
})

//testing
mainBox.appendChild(optionsBox);
mainBox.appendChild(buttonGridSelector);
mainBox.appendChild(buttonReset);
mainBox.appendChild(colorChange);

