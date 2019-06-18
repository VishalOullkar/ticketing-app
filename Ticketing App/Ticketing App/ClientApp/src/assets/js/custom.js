
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
function myMethod() {
  alert(" calling custom javascript code");
}

//$(window).load(function () {
//  $('#myModal').modal('show');
//}); 

function popUp() {
  $(window).load(function () {
    $('#myModal').modal('show');
  }); 

}
