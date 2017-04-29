function repeat(str, num) {
  return (num > 1)? str + repeat(str, num-1) : '';
}
var paragraph = document.getElementById('render');
var button    = document.getElementById('btn');
var phrase    = "I'm testing BrowserSync and what it can do.";
button.addEventListener('click', function(e) {
  paragraph.textContent = repeat(phrase, 400);
});