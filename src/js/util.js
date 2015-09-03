
function time() {
  return Date.now() * 0.001;
}

function s(number, single, other) {
  if(!single) single = '';
  if(!other)   other = 's';
  if(number == 1) return single;
  return other;
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function degrees(radians) {
  return radians * 180 / Math.PI;
}

function lerp(il, i, ih, ol, oh) {
  return ((i - il) / (ih - il)) * (oh - ol) + ol;
}
