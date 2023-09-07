// Function to compute Intersecting Distance
function intDist(t1, t2) {
  return p1 * p2;
}


// Function to computer Containment Distance
function conDist(t1, t2) {
  return
}

function getOrigin(point) {
  var rect = point.getBoundingClientRect();
  var centerX = rect.left + rect.width / 2;
  var centerY = rect.top + rect.height / 2;
  console.log(`Element ID: ${point.id}`);
  console.log(`CenterX: ${centerX}px, CenterY: ${centerY}px`);
}

var cursorRing = document.getElementById("cursor");

document.body.addEventListener("mousemove", function(e) {
  cursorRing.style.left = e.clientX + "px",
  cursorRing.style.top = e.clientY + "px";
});

var circleElements = document.querySelectorAll('.circle');

circleElements.forEach(element => {
  console.log(element.id); // Access element content or perform other actions
  getOrigin(element);
});





