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

function getOrigin(point) {
  var rect = point.getBoundingClientRect();
  var centerX = rect.left + rect.width / 2;
  var centerY = rect.top + rect.height / 2;
  console.log(`Element ID: ${point.id}`);
  // console.log(`CenterX: ${centerX}px, CenterY: ${centerY}px`);

  return [centerX, centerY];
}

var cursorRing = document.getElementById("cursor");

document.body.addEventListener("mousemove", function(e) {
  cursorRing.style.left = e.clientX + "px",
  cursorRing.style.top = e.clientY + "px";


  var circleElements = document.querySelectorAll('.circle');
  var closestElem = "0";
  var secondClosestElem = "0";
  var minDist = 1000000000000;
  var secondMinDist = 1000000000000;

  circleElements.forEach(element => {
    console.log(element.id); // Access element content or perform other actions
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
  });

  // now that we have the closest and second closest elements,
  //    need to compute the Intersecting and Containment Distance
  console.log(closestElem);


  // intDist(origin, e) ;
  minDist += circleRadius;
  secondMinDist -= circleRadius;

  var cursorRadius = Math.min(minDist, secondMinDist);
  // cursorRing.style.left = e.clientX + "px",
  // cursorRing.style.top = e.clientY + "px";
  cursorRing.style.width = cursorRadius + "px";
  cursorRing.style.height = cursorRadius + "px";

});