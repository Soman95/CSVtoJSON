const input = document.querySelector('input[type="file"]');
input.addEventListener('change', function (e) {
    const reader = new FileReader(); //utilising the FileReader browser API to read CSV files selected
    reader.onload = function () { //once the reader has finished loading it will call the following callback
        const file = reader.result
        csvJSON(file)
    }
    reader.readAsText(input.files[0]) //as we are dealing with CSV files we just want to read the file as text
}, false)


function csvJSON(csvFile) {

    let rows = csvFile.split("\n"); //using line breaks as delimiter

    let result = [];

    let headers = rows[0].split(","); //this is assuming incoming CSV file contains headers in the first row
    //                                as words/figures are comma seperated we use can utilise that here

    for (let i = 1; i < rows.length; i++) { // i = 1 as we skip the first row, first row is the headers row

        let obj = {};
        let currentline = rows[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);

    }

    const output = document.getElementById('output');
    output.innerText = JSON.stringify(result);
    console.log(result);
    return result;
}

function reset() {
    const output = document.getElementById('output');
    output.innerText = '';
}

