const tableBody = document.getElementById("tableBody");
const submit = document.getElementById("form");

let editingIndex = null;

submit.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const rollNumber = document.querySelector("#roll-number").value.trim();

  if (!firstName || !lastName || !rollNumber) {
    Toastify({
      text: "All fields are required!",
      duration: 2000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #f44336, #d32f2f)",
    }).showToast();
    return;
  }

  if (editingIndex !== null) {
    const row = tableBody.rows[editingIndex];
    row.cells[1].textContent = firstName;
    row.cells[2].textContent = lastName;
    row.cells[3].textContent = rollNumber;

    Toastify({
      text: "Form updated successfully!",
      duration: 2000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, blue, skyblue)",
    }).showToast();

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("roll-number").value = "";

    return;
  }
  Toastify({
    text: "Form submitted successfully!",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #4caf50, #087f23)",
  }).showToast();

  const formData = {
    firstName,
    lastName,
    rollNumber,
  };
  // console.log(formData);

  const storedData = JSON.parse(localStorage.getItem("tableData")) || [];

  storedData.push(formData);

  localStorage.setItem("tableData", JSON.stringify(storedData));

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("roll-number").value = "";

  addRow(formData);
  updatedSerial();
});

function updatedSerial() {
  const row = tableBody.querySelectorAll("tr");
  row.forEach((row, index) => {
    row.querySelector("td").textContent = index + 1;
  });
}

function addRow(data) {
  const newRow = document.createElement("tr");
  newRow.classList.add(
    "border-b",
    "hover:bg-gray-100",
    "transition-colors",
    "duration-200"
  );
  newRow.innerHTML = `
    <td class="p-2 text-center">${
      tableBody.querySelectorAll("tr").length + 1
    }</td>
    <td class="p-2 text-center font-medium text-gray-700">${data.firstName}</td>
    <td class="p-2 text-center font-medium text-gray-700">${data.lastName}</td>

    <td class="p-2 text-center font-medium text-gray-700">${
      data.rollNumber
    }</td>
    <td class="p-2 flex justify-center gap-2">
      <button class="edit bg-sky-500 p-2 rounded text-white font-semibold hover:bg-sky-600 transition-colors duration-200">
        Edit
      </button>
      <button class="delete bg-rose-500 p-2 rounded text-white font-semibold hover:bg-rose-600 transition-colors duration-200">
        Delete
      </button>
    </td>
  `;

  tableBody.appendChild(newRow);
}

const existingData = JSON.parse(localStorage.getItem("tableData"));

if (existingData.length > 0) {
  existingData.forEach((data) => {
    addRow(data);
  });
} else {
  const noDataFoudn = document.createElement("tr");
  noDataFoudn.innerHTML = `<td colspan="5" class="text-center">No data found</td>`;
  tableBody.appendChild(noDataFoudn);
}

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const row = e.target.closest("tr");
    const rowIndex = [...tableBody.rows].indexOf(row);

    const storedData = JSON.parse(localStorage.getItem("tableData"));

    storedData.splice(rowIndex, 1);

    localStorage.setItem("tableData", JSON.stringify(storedData));

    row.remove();

    Toastify({
      text: "Data deleted from table",
      duration: 2000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #f44336, #d32f2f)",
    }).showToast();

    updatedSerial();
  } else {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");

    document.querySelector("#firstName").value = cells[1].textContent;
    document.querySelector("#lastName").value = cells[2].textContent;
    document.querySelector("#roll-number").value = cells[3].textContent;

    editingIndex = [...tableBody.rows].indexOf(row);

    Toastify({
      text: "Edit Data",
      duration: 2000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, orange, yellow)",
    }).showToast();
  }
});
