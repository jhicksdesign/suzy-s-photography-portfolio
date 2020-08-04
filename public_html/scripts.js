const gallerySwitch = (ev) => {
  const buttonOne = document.getElementById("button-one");
  const buttonTwo = document.getElementById("button-two");
  const buttonThree = document.getElementById("button-three");
  const firstRow = document.getElementById("first-row");
  const secondRow = document.getElementById("second-row");
  const thirdRow = document.getElementById("third-row");
  if (ev === buttonOne) {
    buttonOne.disabled = true;
    buttonTwo.disabled = false;
    buttonThree.disabled = false;
    firstRow.classList.remove("d-none")
    secondRow.classList.add("d-none")
    thirdRow.classList.add("d-none")
  } else if (ev === buttonTwo) {
    buttonOne.disabled = false;
    buttonTwo.disabled = true;
    buttonThree.disabled = false;
    firstRow.classList.add("d-none")
    secondRow.classList.remove("d-none")
    thirdRow.classList.add("d-none")
  } else {
    buttonOne.disabled = false;
    buttonTwo.disabled = false;
    buttonThree.disabled = true;
    firstRow.classList.add("d-none")
    secondRow.classList.add("d-none")
    thirdRow.classList.remove("d-none")
  }
}