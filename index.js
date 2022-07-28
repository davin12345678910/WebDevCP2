/*
 * Name: Davin Win Kyi
 * Date: April 17th, 2022
 * Section: CSE 154 AH
 * This is the JavaScript code for the linear search program
 * This allos the program to properly simulate the linear search
 * algorithm step by step, such as the next step in the program, going back a step
 * in a linear search, stopping when the element is found, stopping
 * when the elemnet in not in the array, and much more (such as: asking for
 * user input).
 */

// We will need this for JS files in CSE 154
"use strict";

(function() {
  window.addEventListener('load', init);

  /**
   * This is the initalization function
   */
  function init() {
    let buttonStart = id('enter');
    buttonStart.addEventListener('click', validNumber);
  }

  /**
   * This is to check if we were given a valid number of array elements
   * in other words, any number of elements from 1 to 10
   */
  function validNumber() {
    let count = id('array-count').value;
    let numberCount = parseInt(count);
    const ten = 10;
    if (!isNaN(numberCount) && numberCount <= ten && numberCount > 0) {
      initArray(count);
    }
  }

  /**
   * This is to initalize the array of the program
   *  as well as the controls and other features
   * @param {const} count this is the number of element in the array
   */
  function initArray(count) {

    // This is to add the needed buttons
    addButtons();

    /**
     * This is to add the needed inputs where users
     * can input the numbers that they want in the array
     */
    createInputs(count);

    // This is where we will make the array
    createArray(count);

    // This is where we make the place where the user can input the element they want to search
    createSearchInput();

    // This is to update the behavior of elmeents on the webpage that need to be changed
    updateBehavior();
  }

  /**
   * This is to add the needed buttons to the website
   */
  function addButtons() {
    /**
     * Here we will add the start, prev, and next, clear, and reset
     * Which the user may want to use
     */
    let controls = id('controls');

    let pOne = document.createElement('p');
    pOne.textContent = "Current index:";
    pOne.id = "title-index";

    let pTwo = document.createElement('p');
    pTwo.id = "current-element";

    let buttonStart = document.createElement('button');
    buttonStart.textContent = "Start";
    buttonStart.id = "start-search";

    let buttonPrev = document.createElement('button');
    buttonPrev.textContent = "Prev";
    buttonPrev.id = "prev";

    let buttonNext = document.createElement('button');
    buttonNext.textContent = "Next";
    buttonNext.id = "next";

    let buttonClear = document.createElement('button');
    buttonClear.textContent = "Clear";
    buttonClear.id = "clear";

    let buttonReset = document.createElement('button');
    buttonReset.textContent = "Reset";
    buttonReset.id = "reset";

    controls.appendChild(pOne);
    controls.appendChild(pTwo);
    controls.appendChild(buttonStart);
    controls.appendChild(buttonPrev);
    controls.appendChild(buttonNext);
    controls.appendChild(buttonClear);
    controls.appendChild(buttonReset);
  }

  /**
   * This is to create the needed inputs for the website
   * @param {const} count this is the number of elments in the array
   */
  function createInputs(count) {
    let inputs = id('inputs');
    let numbers = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth',
    'Seventh', 'Eight', 'Ninth', 'Tenth'];
    for (let i = 0; i < count; i++) {
      let currentLabel = document.createElement('label');
      currentLabel.textContent = numbers[i] + " array element:";
      let currentInput = document.createElement('input');
      currentInput.id = 'input ' + (i + 1);
      inputs.appendChild(currentLabel);
      inputs.appendChild(currentInput);
    }
  }

  /**
   * This is to create the needed array for the website
   * @param {const} count this is the number of elements in the array
   */
  function createArray(count) {
    let array = id('array');
    for (let i = 1; i <= count; i++) {
      let arrayElement = document.createElement('section');
      arrayElement.id = i;
      const result = count - i;
      if (result === 0) {
        arrayElement.classList.add('last-box');
      }
      array.appendChild(arrayElement);
    }
  }

  /**
   * This is to create the places where you can put the
   * number that you want to search for
   */
  function createSearchInput() {
    let inputElement = id('search-value');
    let inputTitle = document.createElement('label');
    inputTitle.id = "search-element-label";
    inputTitle.textContent = "Element to search for:";

    let searchElement = document.createElement('input');
    searchElement.id = "search-element";

    inputElement.appendChild(inputTitle);
    inputElement.appendChild(searchElement);
  }

  /**
   * This is to update the behavior of buttons and other elements
   * inn the webpage
   */
  function updateBehavior() {
    id('enter').disabled = true;
    id('array-count').disabled = true;

    /**
     * this is where we will initalize the behavior of the buttons
     */
    let startButton = id('start-search');
    startButton.addEventListener('click', confirm);
    let prevButton = id('prev');
    prevButton.disabled = true;
    let nextButton = id('next');
    nextButton.disabled = true;
    let clearButton = id('clear');
    clearButton.disabled = true;
    clearButton.addEventListener('click', clear);
    let resetButton = id('reset');
    resetButton.disabled = true;
    resetButton.addEventListener('click', reset);
  }

  /**
   * This is the function that deals with the case when a
   * user clicks on the start button of the webpage
   *  and checks to see if the input given is valid or not
   */
  function confirm() {
    let count = id('array-count').value;
    let numberCount = parseInt(count);
    let array = [];

    let valid = true;
    for (let i = 0; i <= numberCount - 1; i++) {
      let currentString = "" + id("input " + (i + 1)).value;
      for (let j = 0; j < currentString.length; j++) {
        if (isNaN(parseInt(currentString.charAt(j)))) {
          valid = false;
        }
      }
      array[i] = parseInt(id("input " + (i + 1)).value);
    }
    let input = id('search-element').value;
    let inputString = "" + input;
    for (let i = 0; i < inputString.length; i++) {
      if (isNaN(parseInt(inputString.charAt(i)))) {
        valid = false;
      }
    }
    let inputValue = parseInt(input);
    array[numberCount] = inputValue;

    if (valid) {
      validStart(array);
    }
  }

  /**
   * This is a function that starts building the array and updating buttons
   * @param {const[]} array thisi is the array of values we will put into our array
   */
  function validStart(array) {
    let count = id('array-count').value;
    let numberCount = parseInt(count);

    /**
     * If this is the case we will also need to disable the
     * start button of the array
     */
    let startButton = id('start-search');
    startButton.disabled = true;

    // Here you will set all of the elements in the array
    for (let i = 1; i <= numberCount; i++) {
      id('' + i).textContent = array[i - 1];
    }
    let firstBox = id('1');
    firstBox.classList.add('highlight');
    let positionText = id('current-element');
    positionText.textContent = 0;

    // Here you will be setting the evenListeners and behavior of some buttons of the program
    let prevButton = id('prev');
    let nextButton = id('next');
    nextButton.disabled = false;
    prevButton.addEventListener('click', prevElement);
    nextButton.addEventListener('click', nextElement);

    // This is where you will check if the first value if the value you were looking for
    if (array[0] === array[numberCount]) {
      firstElementValid();
    }
    disableInputs();
  }

  /**
   * This is the case when you have the first element being
   * the element in which you wanted to find
   */
  function firstElementValid() {
    let startButton = id('start-search');
    let prevButton = id('prev');
    let nextButton = id('next');
    prevButton.disabled = true;
    startButton.disabled = true;
    nextButton.disabled = true;
    let newElement = document.createElement('p');
    newElement.textContent = "Session is complete! Index found at: 0";
    newElement.id = "complete";
    let titleIndex = id('title-index');
    titleIndex.remove();
    let index = id('current-element');
    index.remove();
    id('controls').appendChild(newElement);
    let clearButton = id('clear');
    clearButton.disabled = false;
    let resetButton = id('reset');
    resetButton.disabled = false;
  }

  /**
   * This is to disable the inputs, when you have a valid input
   * for all 10 elements and the search e;lement
   */
  function disableInputs() {
    let count = id('array-count').value;
    let numberCount = parseInt(count);
    for (let i = 1; i <= numberCount; i++) {
      id('input ' + i).disabled = true;
    }
    id('search-element').disabled = true;
  }

  /**
   *This is the function that deals with the case when a
   *user clicks on the prev button of the webpage
   */
  function prevElement() {
    let positionText = id('current-element');
    let prevIndex = parseInt(positionText.textContent) - 1;
    const four = 4;
    const five = 5;
    const six = 6;
    const seven = 7;
    const eight = 8;
    const nine = 9;
    const constantArray = [0, 1, 2, 3, four, five, six, seven, eight, nine];
    if (prevIndex === constantArray[0]) {
      id('' + (prevIndex + 1)).classList.add('highlight');
      id('' + (prevIndex + 2)).classList.remove('highlight');
      let prevButton = id('prev');
      prevButton.disabled = true;
      positionText.textContent = prevIndex;
    } else {
      positionText.textContent = prevIndex;

      // Here you are going to add the right highlights
      id('' + (prevIndex + 1)).classList.add('highlight');
      id('' + (prevIndex + 2)).classList.remove('highlight');
    }
  }

  /**
   * This is the function that deals with the case when a
   * user clicks on the next button of the webpage
   */
  function nextElement() {
    let count = id('array-count').value;
    let numberCount = parseInt(count);

    // This is the array in which we will need
    const four = 4;
    const five = 5;
    const six = 6;
    const seven = 7;
    const eight = 8;
    const nine = 9;
    const constantArray = [0, 1, 2, 3, four, five, six, seven, eight, nine];
    let array = [];
    for (let i = 0; i <= numberCount - 1; i++) {
      array[i] = parseInt(id("input " + (i + 1)).value);
    }

    // this is the element in which we are searching for
    let input = id('search-element').value;
    let inputValue = parseInt(input);
    array[numberCount] = inputValue;

    // get the position in which we are currently at
    let positionText = id('current-element');
    let nextIndex = parseInt(positionText.textContent) + 1;

    // This is the case when we can validly change the text
    if (nextIndex <= constantArray[numberCount - 1]) {
      positionText.textContent = nextIndex;
    }

    // This is the case when we are at the first element
    if (nextIndex - 1 === constantArray[0]) {
      id('' + constantArray[1]).classList.add('highlight');
      let prevButton = id('prev');
      prevButton.disabled = false;
    }
    regularNextBehavior(nextIndex, numberCount, array);
  }

  /**
   * This will allow us to deal with what to do next, such as giving a found message
   * or saying that the element was not found, and updating the highlighted element in the
   * array that we are on
   * @param {const} nextIndex this is the nextIndex we are looking at in the array
   * @param {const} numberCount this is the number of elements in the array
   * @param {const[]} array this is the array which we will use
   */
  function regularNextBehavior(nextIndex, numberCount, array) {
    // These are all the regular cases
    if (nextIndex < numberCount) {
      id('' + (nextIndex + 1)).classList.add('highlight');
      id('' + nextIndex).classList.remove('highlight');
    }

    // This is if the element is found
    if (nextIndex < numberCount && array[nextIndex] === array[numberCount]) {
      elementFound(nextIndex);
    }

    // This is if we did not find the element
    if (nextIndex === numberCount) {
      elementNotFound(nextIndex);
    }
  }

  /**
   * This is the case when we do not find the element in which we inputed
   * @param {const} nextIndex - this is the nextindex which we will update to
   */
  function elementNotFound(nextIndex) {
    id('' + (nextIndex)).classList.remove('highlight');
    let newElement = document.createElement('p');
    newElement.textContent = "Session is complete! Element was not found";
    newElement.id = "complete";
    let titleIndex = id('title-index');
    titleIndex.remove();
    let index = id('current-element');
    index.remove();
    id('controls').appendChild(newElement);
    let prevButton = id('prev');
    prevButton.disabled = true;
    let startButton = id('next');
    startButton.disabled = true;
    id('controls').appendChild(newElement);
    let clearButton = id('clear');
    clearButton.disabled = false;
    let resetButton = id('reset');
    resetButton.disabled = false;
  }

  /**
   * This is when we do find the element in which we wanted
   * @param {const} nextIndex - this is the nextindex which we will update to
   */
  function elementFound(nextIndex) {
    id('' + (nextIndex + 1)).classList.add('highlight-green');
    let prevButton = id('prev');
    prevButton.disabled = true;
    let startButton = id('next');
    startButton.disabled = true;
    let newElement = document.createElement('p');
    newElement.textContent = "Session is complete! Index found at: " + nextIndex;
    newElement.id = "complete";
    let titleIndex = id('title-index');
    titleIndex.remove();
    let index = id('current-element');
    index.remove();
    id('controls').appendChild(newElement);
    let clearButton = id('clear');
    clearButton.disabled = false;
    let resetButton = id('reset');
    resetButton.disabled = false;
  }

  /**
   * This is the clearing function of the program
   * Which allows you to choose a new size array
   */
  function clear() {
    id('enter').disabled = false;
    id('array-count').value = "";
    id('array-count').disabled = false;

    // erase the inputs
    while (!(id('inputs').lastElementChild === null)) {
      id('inputs').removeChild(id('inputs').lastElementChild);
    }
    while (!(id('search-value').lastElementChild === null)) {
      id('search-value').removeChild(id('search-value').lastElementChild);
    }
    while (!(id('array').lastElementChild === null)) {
      id('array').removeChild(id('array').lastElementChild);
    }
    while (!(id('controls').lastElementChild === null)) {
      id('controls').removeChild(id('controls').lastElementChild);
    }
  }

  /**
   * This is the reset function of the program
   * Which will reset the array with the size that you initally wanted
   * In other words same size array but with different values
   */
  function reset() {
    let count = id('array-count').value;
    let numberCount = parseInt(count);
    let resetButton = id('reset');
    resetButton.disabled = true;
    let clearButton = id('clear');
    clearButton.disabled = true;
    let startButton = id('start-search');
    startButton.disabled = false;

    for (let i = 1; i <= numberCount; i++) {
      id('input ' + i).disabled = false;
      id('input ' + i).value = "";
      id('' + i).classList.remove('highlight');
      id('' + i).classList.remove('highlight-green');
      id('' + i).textContent = "";
    }
    let searchInput = id('search-element');
    searchInput.value = '';
    searchInput.disabled = false;

    // Here we will deal with the
    let removeElement = id('complete');
    removeElement.remove();
    let titleIndex = document.createElement('p');
    let indexElement = document.createElement('p');
    titleIndex.textContent = "Current Index: ";
    titleIndex.id = "title-index";
    indexElement.id = "current-element";
    id('controls').prepend(indexElement);
    id('controls').prepend(titleIndex);
  }

  /**
   * Allows you to get the certain element with the given id
   * @param {string} id - this is the id of the element to find
   * @returns {Element} - that will be the object that has that id
   */
  function id(id) {
    return document.getElementById(id);
  }
})();
