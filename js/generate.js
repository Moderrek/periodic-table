// Function called when user click on element
function onClickCell(index) {
    const element = elements[index];

    modal.classList.add("enabled");
    modalContent.innerHTML = "";
    modalContent.innerHTML += `<h1> ${element.symbol}<sup>${element.number}</sup> | ${element.name}</h1>`;
    if (element.category)
        modalContent.innerHTML += `<small>${element.category}</small><br>`
    if (element.discovered_by)
        modalContent.innerHTML += `Discovered by: ${element.discovered_by}<br>`;
    if (element.named_by)
        modalContent.innerHTML += `Named by: ${element.named_by}<br>`
    if (element.summary)
        modalContent.innerHTML += `<p>${element.summary}</p>`
    if (element.appearance)
        modalContent.innerHTML += `Appearance: ${element.appearance}<br>`
    if (element.phase)
        modalContent.innerHTML += `Phase: ${element.phase}<br>`;
    if (element.density)
        modalContent.innerHTML += `Density: ${element.density * 1000}kg/m<sup>3</sup><br>`
    if (element.melt)
        modalContent.innerHTML += `Melts: ${element.melt}°K<br>`
    if (element.boil)
        modalContent.innerHTML += `Boils: ${element.boil}°K<br>`
    if (element.atomic_mass)
        modalContent.innerHTML += `Atomic mass: ${element.atomic_mass}<br>`
    if (element.electron_configuration)
        modalContent.innerHTML += `Electron config.: ${element.electron_configuration}<br>`
}

// Creates cell element in table
function createCell(element) {
    const cell = document.createElement("td");
    cell.style.width = "60px";
    cell.style.height = "60px";
    // Store element index in HTMLElement attribute.
    // <td data-index="INDEX">...
    cell.setAttribute("data-index", element.index);
    cell.setAttribute("symbol", element.symbol);
    // Append text to cell

    const symbol = document.createElement("span");
    symbol.innerText = element.symbol;
    symbol.classList.add("symbol");
    cell.appendChild(symbol);
    
    const underText = document.createElement("span");
    underText.innerText = element.name;
    underText.classList.add("symbol-name");
    cell.appendChild(underText);
    // Style
    cell.style.backgroundColor = "#" + element["cpk-hex"];
    // Add click event to cell
    cell.addEventListener("click", () => onClickCell(element.index));
    return cell;
}

function createEmptyCell() {
    const cell = document.createElement("td");
    cell.style.width = "60px";
    cell.style.height = "60px";
    return cell;
}

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-text");
const close = document.getElementById("close");

// Close modal when click outside
function hideModal() {
    modal.classList.remove("enabled");
}

close.addEventListener("click", () => hideModal());
window.addEventListener("click", (event) => {
    if (event.target != modal) return;
    hideModal();
});

// Transforms collection of elements to 2D array with positioned elements.
let elementsTable = [];
for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    // Append index to element data.
    element.index = i;

    const indexY = element.ypos - 1;
    // Create row if doesn't exists
    if (!elementsTable[indexY]) elementsTable[indexY] = [];
    // Set element into his position
    const indexX = element.xpos - 1;
    elementsTable[indexY][indexX] = element;
}

// Generate table with element position
// call createCell
const table = document.getElementById("table");
for (let y = 0; y < elementsTable.length; y += 1) {
    const tableRow = document.createElement("tr");
    for (let x = 0; x < elementsTable[y].length; x += 1) {
        const element = elementsTable[y][x];
        const isEmpty = element === undefined
        if (!isEmpty) {
            tableRow.appendChild(createCell(element));
        } else {
            tableRow.appendChild(createEmptyCell());
        }
    }
    table.appendChild(tableRow);
}