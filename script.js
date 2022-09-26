/**
 * @author : j3r3m at antarca.fr
 * @version : 1.0.0
 * @date : 2022-09-26
 */
"use strict";

const CHORDS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];

/**
 * Transcodes a chord based on capo position 
 * @param {*} chord, capoPosition
 * @returns the chord
 */
function transco(chord, capoPosition){
    
    let chordMinor = "";
    if (chord.indexOf("m") !== -1){
        chord = chord.replace("m", "");
        chordMinor = "m";
    }

    let i = 0;
    while (i < CHORDS.length){
        if (CHORDS[i] === chord){
            const e = i - capoPosition;
            console.log(chordMinor);
            return e < 0 ? CHORDS[CHORDS.length+e] + chordMinor : CHORDS[e] + chordMinor;
        }
        i++;
    }

}

function clickButtonRAZ(){
    tabChords = [];
    divResult.textContent = "";
}


function clickButtonAdd(){
    
    let chordSelect = document.getElementById("chord-select").value;

    if (chordSelect){

        divResult.textContent = "";

        // Save selected chords
        let minor = document.getElementById("minor").checked;
        chordSelect = (minor === true) ? chordSelect + "m" : chordSelect;
        tabChords.push(chordSelect);

        // Create table result
        let tableResult = document.createElement("table");
        tableResult.classList.add("table", "table-hover");
        let theadResult = document.createElement("thead");
        let tbodyResult = document.createElement('tbody');        

        // 1 - HEADING

        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th', {scope:"col"});
        heading_1.innerHTML = "Selected chord";
        row_1.appendChild(heading_1);          
        
        // Capo -> NB_CAPO positions
        for (let posCapo = 1; posCapo <= NB_CAPO; posCapo++){

            heading_1 = document.createElement("th", {scope:"col"});
            heading_1.innerHTML = `${posCapo}`
            row_1.appendChild(heading_1);
        }
        theadResult.appendChild(row_1);

        // 2 - TRANSCO (tbody)
        
        tabChords.forEach(aChord => {

            // The selected chord

            let row_x = document.createElement('tr', {scope:"row"});
            let row_data_x = document.createElement('td');
            row_data_x.innerHTML = aChord;
            row_x.appendChild(row_data_x);

            for (let posCapo = 1; posCapo <= NB_CAPO; posCapo++){

                row_data_x = document.createElement('td');
                row_data_x.innerHTML = transco(aChord, posCapo);
                row_x.appendChild(row_data_x);
                
            }

            tbodyResult.appendChild(row_x);          

        });

        tableResult.appendChild(theadResult);  
        tableResult.appendChild(tbodyResult);  
        divResult.appendChild(tableResult);

    }   

}

// ######
// MAIN
// ######

const NB_CAPO = 7;

let tabChords = new Array();

let divResult = document.getElementById("divResult");
