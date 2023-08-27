const histories = document.getElementById("histories");

function addHistory(questionText, timeTaken, errorCount, WPM, CPM) {
  const newRow = document.createElement("div");
  newRow.classList.add("card");

  newRow.innerHTML = `
  <h3>${questionText}</h3>
  <div>
  <p>You took: <span class="bold">${timeTaken}</span> seconds</p>
  <p>You made <span class="bold red">${errorCount}</span> mistakes</p>
  </div>
  `;

  histories.appendChild(newRow);

  let previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];
  previousTests.push({ questionText, timeTaken, errorCount, WPM, CPM });
  localStorage.setItem("testHistory", JSON.stringify(previousTests));

  displayHistory();
}

function displayHistory() {
  histories.innerHTML = "";
  const previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];

  //previousTests.forEach((test) => {

  //Sorted the Array of Results Reversely
  //to display the latest text result first
  previousTests.reverse().forEach((test) => {
    const newRow = document.createElement("div");
    newRow.classList.add("card");

    const resultWPM = parseInt(test.WPM) || false;
    const resultCPM = parseInt(test.CPM) || false;

    newRow.innerHTML = `
  <h3>${test.questionText}</h3>
  <p>You took: <span class="bold">${parseInt(test.timeTaken)}</span> seconds</p>
  <p>Typing Speed (WPM)</p>
  <p> <span class="bold">${
    resultWPM ? resultWPM.toString() + " WPM" : "No data found"
  }</span></p>
  <p>Typing Speed (CPM)</p>
  <p> <span class="bold">${
    resultCPM ? resultCPM.toString() + " CPM" : "No data found"
  }</span></p>
  <p>You made <span class="bold red">${test.errorCount}</span> mistakes</p>
  `;

    histories.appendChild(newRow);
  });
}
