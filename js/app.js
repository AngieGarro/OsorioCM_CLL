var nextBtn = document.querySelector('.next'),
  prevBtn = document.querySelector('.prev'),
  carousel = document.querySelector('.carousel'),
  list = document.querySelector('.list'),
  item = document.querySelectorAll('.item'),
  runningTime = document.querySelector('.carousel .timeRunning')

let timeRunning = 3000
let timeAutoNext = 7000

nextBtn.onclick = function(){
  showSlider('next')
}

prevBtn.onclick = function(){
  showSlider('prev')
}

let runTimeOut

let runNextAuto = setTimeout(() => {
  nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
  runningTime.style.animation = 'none'
  runningTime.offsetHeight /* trigger reflow */
  runningTime.style.animation = null
  runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
  let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
  if(type === 'next'){
    list.appendChild(sliderItemsDom[0])
    carousel.classList.add('next')
  } else{
    list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
    carousel.classList.add('prev')
  }

  clearTimeout(runTimeOut)

  runTimeOut = setTimeout( () => {
    carousel.classList.remove('next')
    carousel.classList.remove('prev')
  }, timeRunning)


  clearTimeout(runNextAuto)
  runNextAuto = setTimeout(() => {
    nextBtn.click()
  }, timeAutoNext)

  resetTimeAnimation() // Reset the running time animation
}

document.getElementById('language-toggle').addEventListener('click', function() {
  alert('Cambio de idioma no implementado.');
});

// Cambio de modo oscuro/claro
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  themeToggle.classList.toggle('bi-moon');
  themeToggle.classList.toggle('bi-sun');
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
// Start the initial animation
resetTimeAnimation()
