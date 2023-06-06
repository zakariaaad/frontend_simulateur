var lock = document.getElementById('lock');
var key = document.getElementById('key');


function keyAnimate() {
  dynamics.animate(key, {
    translateX: 33
  }, {
    type: dynamics.easeInOut,
    duration: 500,
    complete: lockAnimate
  })
}


function lockAnimate() {
  dynamics.animate(lock, {
    rotateZ: -5,
    scale: 0.9
  }, {
    type: dynamics.bounce,
    duration: 3000,
    complete: keyAnimate
  })
}


setInterval(keyAnimate, 3000);