const element = document.querySelectorAll('#editButton')
element.forEach(function(el){
  el.addEventListener('click', () => {
    location.href = "/test";;
  });
});