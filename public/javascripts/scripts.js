// create an event handler to ask the user
// if they REALLY want to delete something

document.querySelectorAll('.confirmation').forEach(function(ele){
  ele.onclick = function(ev){
    var confirmation = confirm("Are you sure you want to do this?");

    if(!confirmation){
      ev.preventDefault();
      return false;
    }
  }
})
