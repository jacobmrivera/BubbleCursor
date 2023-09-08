// Get the first element with the class "circle"
var circleItem = document.querySelector(".circle");
if (circleItem) {
  // Get the width of the element
  var circleRadius = circleItem.offsetWidth / 2; // This includes padding and borders
}

// Function to compute Intersecting Distance
function intDist(item, curs) {
  dX = (item[0] - curs.clientX) ** 2;
  dY = (item[1] - curs.clientY) ** 2;

  return Math.sqrt(dX + dY) - circleRadius;
}

// Function to computer Containment Distance
function conDist(item, curs) {
  dX = (item[0] - curs.clientX) ** 2;
  dY = (item[1] - curs.clientY) ** 2;
  return Math.sqrt(dX + dY) + circleRadius;
}

// Function to compute origin distance
function originDist(item, curs) {
  dX = (item[0] - curs.clientX) ** 2;
  dY = (item[1] - curs.clientY) ** 2;
  return Math.sqrt(dX + dY);
}

// gets the origin of a circle element
function getOrigin(point) {
  var rect = point.getBoundingClientRect();
  var centerX = rect.left + rect.width / 2;
  var centerY = rect.top + rect.height / 2;
  return [centerX, centerY];
}

var cursorRing = document.getElementById("cursor");

// Function to check if the bubble cursor overlaps with an element
function isCursorOverElement(element) {
    const cursorRect = cursorRing.getBoundingClientRect();
    console.log(cursorRect);
    const elementRect = element.getBoundingClientRect();

    // Calculate the distance between the centers of the cursor and the element
    const cursorX = cursorRect.left + cursorRect.width / 2;
    const cursorY = cursorRect.top + cursorRect.height / 2;

    const elementX = elementRect.left + elementRect.width / 2;
    const elementY = elementRect.top + elementRect.height / 2;

    const distance = Math.sqrt((cursorX - elementX) ** 2 + (cursorY - elementY) ** 2);

    // Check if the distance is less than the sum of the radii of the cursor and the element
    return distance < cursorRect.width / 2 + elementRect.width / 2;
}

var bool = false;

document.body.addEventListener("mousemove", function(e) {
  cursorRing.style.left = e.clientX + "px",
  cursorRing.style.top = e.clientY + "px";

  var circleElements = document.querySelectorAll('.circle');
  var closestElem = "0";
  var secondClosestElem = "0";
  var minDist = 1000000000000;
  var secondMinDist = 1000000000000;

  circleElements.forEach(element => {
    let origin = getOrigin(element);
    let X = origin[0];
    let Y = origin[1];

    var dist = originDist(origin, e);
    if (dist < minDist) {
      // switch put new element in first place
      secondMinDist = minDist;
      minDist = dist;
      secondClosestElem = closestElem;
      closestElem = element.id;
    } else if (dist < secondMinDist && dist >= minDist) {
      secondMinDist = dist;
      secondClosestElem = element.id;
    }

    if (isCursorOverElement(element)) {
      element.style.borderColor = 'gray';
    } else {
      element.style.borderColor = 'transparent';
    }
  });

  // set to get containment and intersecting distances
  minDist += circleRadius;
  secondMinDist -= circleRadius;

  var cursorRadius = Math.min(minDist, secondMinDist);

  if (bubbleBool){
    cursorRing.style.width = (cursorRadius + 30) + "px";
    cursorRing.style.height = (cursorRadius + 30) + "px";
  }

  if (bool == false) {
    circleElements.forEach((e) => {
      e.addEventListener("click", clickElement);
      });
    bool = true;
  }
});

// Function to trigger a click event on an element
function clickElement(element) {
  let circleEls = document.querySelectorAll('.circle');
  circleEls.forEach(element => {
    if (isCursorOverElement(element)) {
      element.style.backgroundColor = 'blue'; // set circle to blue
      setTimeout(function() { // wait 1 second and go back to red
        element.style.backgroundColor = 'red';
    }, 1000);
    }
  });
}

// adds listening to everywhere on grid object
window.onload = function () {
  var grid = document.getElementById('grid');
  grid.addEventListener("click", clickElement);
};

var bubbleBool = true;
// sets or unsets the bubble depending on the button click
function switchCursor() {
  var cursorToChange = document.getElementById("cursor");

    if (bubbleBool) {
      cursorToChange.style.width = "0px";
      cursorToChange.style.height = "0px";
      bubbleBool = false;
    }else {
      cursorToChange.style.width = "100px";
      cursorToChange.style.height = "100px";
      bubbleBool = true;
    }
}