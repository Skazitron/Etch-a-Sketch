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
regularGridColumn.style.cssText = 'border: 2px solid grey; text-align: center; display:inline-block; margin-right: -2px';
regularGridColumn.style.backgroundColor = 'white';
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
            regularGridColumn.id = 'column' + i;
            regularGridColumn.classList = 'column'
            regularGridRow.appendChild(regularGridColumn.cloneNode(true));
        }
        for(i=1; i<tempRowNum; i++){
            regularGridRow.id = 'row' + i;
            sketchBox.appendChild(regularGridRow.cloneNode(true));
        }
    }

    body.appendChild(sketchBox)
}

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
function selectFunction(e){
    let selectedIndex = event.target.selectedIndex;
    console.log(e.target.options[selectedIndex].value);
    var whichSelect = e.target.id
    if(whichSelect == 'setRow'){
        tempRowNum = Number(e.target.options[selectedIndex].value);
    }
    if(whichSelect == 'setColumn'){
        tempColumnNum = Number(e.target.options[selectedIndex].value);
    }
    //scaling
    if (tempRowNum > tempColumnNum){
        scaleSize = 700/tempRowNum;
    }
    else if (tempRowNum <= tempColumnNum){
        scaleSize = 700/tempColumnNum;
    }
}

//sketchBox

var sketchBox = document.createElement('div')
sketchBox.appendChild(regularGridRow)

//button for reset
var buttonReset = document.createElement('button')
buttonReset.style.cssText = buttonGridSelector.style.cssText;
buttonReset.textContent = 'Reset'
buttonReset.addEventListener('click', function(e){
   var blank = [].slice.call(document.querySelectorAll('.column'))
   blank.forEach(function(item){
        item.style.backgroundColor = 'white';
   })
})

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
    grayscale.textContent = 'Grayscale Mode: Off'
})
//grayscale button
var grayscale = document.createElement('button')
grayscale.style.cssText = colorChange.style.cssText
grayscale.textContent = 'Grayscale Mode: Off'
grayscale.addEventListener('click', function(e){
    colorChange.textContent = 'Rainbow Mode: Off'
    if(grayscale.textContent == 'Grayscale Mode: Off'){
        grayscale.textContent = 'Grayscale Mode: On';

    } else {
        grayscale.textContent = 'Grayscale Mode: Off';
    }
})

//fill
var gsFill = 0;
sketchBox.addEventListener('mouseover', function(e){        
    if(grayscale.textContent !== 'Grayscale Mode: On' && colorChange.textContent !== 'Rainbow Mode: On' && e.target.classList.value !== 'row'){
       e.target.style.backgroundColor = 'black'
    }
    else if(grayscale.textContent == 'Grayscale Mode: On' && e.target.classList.value !== 'row'){
        gsFill = (gsFill + 5)%255;
        e.target.style.backgroundColor = `rgb(${gsFill}, ${gsFill}, ${gsFill})`
     }       
    else if(colorChange.textContent !== 'Rainbow Mode: On' && e.target.classList.value !== 'row'){
        
    }
})


//testing
mainBox.appendChild(optionsBox);
mainBox.appendChild(buttonGridSelector);
mainBox.appendChild(buttonReset);
mainBox.appendChild(colorChange);
mainBox.appendChild(grayscale)

