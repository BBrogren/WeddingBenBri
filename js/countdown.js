(function() {
	var timerId =
  countdown(
    new Date(2015, 9, 10, 16, 30, 00),
    function(ts) {
      document.getElementById('counter').innerHTML = ts.toHTML("strong");
    },
    0, 5, 0);
})();



