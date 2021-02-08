const list = document.querySelector(".numbers");
const cta = document.querySelector(".cta");
const input = document.querySelector("#combination");
// let obj = {
//     '22': {
//         occurences: 8,
//         percentage: 2
//     }
// }
if(localStorage.getItem("total") === null) {
    localStorage.setItem("total", 0);
}
if(localStorage.getItem("object") === null) {
    localStorage.setItem("object", JSON.stringify({}));
}

let obj = JSON.parse(localStorage.getItem("object"));
let total = parseInt(localStorage.getItem("total"));

const submitNumbers = (e) => {
    e.preventDefault();
    total++;
    formMainObject(input.value.split(" "));
    recalculateValues();
    clearField();
    localStorage.setItem("total", total);
    localStorage.setItem("object", JSON.stringify(obj));
}

const clearField = () => {
    input.value = "";
}

const recalculateValues = () => {
    list.innerHTML = "";
    for(let item in obj) {
        obj[item].percentage = obj[item].occurences / total * 100;
        formTheUi(obj[item], item);
    }
}

const formMainObject = (arr) => {
    arr.forEach(number => {
        if(obj[number]) {
            obj[number].occurences += 1;
            obj[number].percentage = (obj[number].occurences / total) * 100;
        }else {
            obj[number] = {
                occurences: 1,
                percentage: (1 / total) * 100
            }
        }

        
    })
}

const formTheUi = (object, number) => {
    const li = document.createElement("LI");
    li.classList.add("number-container");
    li.innerHTML = `
        <div class="number-display ${percentageClass(object.percentage)}">
            <span id="number">${number}</span>
        </div>
        <div class="number-stats">
            <p>Puta: <strong id="amount">${object.occurences}</strong></p>
            <p>Procenat: <strong id="percentage">${object.percentage.toFixed(2)}</strong>%</p>
        </div>
    `;
    list.appendChild(li);
}

const percentageClass = (percentage) => {
    if(percentage >= 30) {
        return "number-display-high";
    }else if(percentage >= 10 && percentage < 30) {
        return "number-display-medium";
    }else {
        return "number-display-low";
    }
}

recalculateValues();
cta.addEventListener("click", submitNumbers);
