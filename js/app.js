var nextBtn = document.querySelector('.next'),
  prevBtn = document.querySelector('.prev'),
  carousel = document.querySelector('.carousel'),
  list = document.querySelector('.list'),
  item = document.querySelectorAll('.item'),
  runningTime = document.querySelector('.carousel .timeRunning')

let timeRunning = 3000
let timeAutoNext = 10000

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
  runningTime.style.animation = 'runningTime 10s linear 1 forwards'
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

// Cambio de Idioma
document.addEventListener("DOMContentLoaded", function () {
  const defaultLang = "en"; // Idioma por defecto (inglés)
  document.documentElement.lang = defaultLang;

  // Aplicar el idioma por defecto en la carga de la página
  document.querySelectorAll("[data-en][data-es]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${defaultLang}`);
  });

  // Asegurar que el botón muestre la opción correcta
  document.getElementById("language-toggle").textContent = " ES";
});

// Cambio de idioma al hacer clic en el botón
document.getElementById("language-toggle").addEventListener("click", function () {
  const currentLang = document.documentElement.lang === "en" ? "es" : "en";
  document.documentElement.lang = currentLang;

  // Cambiar el texto de todos los elementos según el idioma seleccionado
  document.querySelectorAll("[data-en][data-es]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  // Cambiar el texto del botón
  this.textContent = currentLang === "en" ? " ES" : " EN";
});

// Cambio de modo Oscuro / Claro
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo"); // Asegurar que el logo está seleccionado correctamente
  const currentTheme = localStorage.getItem("theme");

  // Aplicar el tema guardado al cargar la página
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.classList.replace("bi-moon", "bi-sun");
    if (logo) logo.src = "img/generalImg/Logo_WhiteColor.png"; // Cambio de logo en modo oscuro
  } else {
    if (logo) logo.src = "img/generalImg/Logo_ColorPalette.png"; // Cambio de logo en modo claro
  }

  themeToggle.addEventListener("click", function () {
    // Alternar la clase dark-mode en el body
    document.body.classList.toggle("dark-mode");

    // Verificar si el modo oscuro está activo
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Cambiar el logo según el modo
    if (logo) {
      logo.src = isDarkMode
        ? "img/generalImg/Logo_WhiteColor.png"
        : "img/generalImg/Logo_ColorPalette.png";
    }

    // Guardar la preferencia en localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Cambiar el ícono de sol/luna
    themeToggle.classList.toggle("bi-moon", !isDarkMode);
    themeToggle.classList.toggle("bi-sun", isDarkMode);
  });
});

// Scroll BTN
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

// Nav Active selector
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // Selecciona todas las secciones
  const navLinks = document.querySelectorAll(".navegacion a");

  function setActiveSection() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 60; // Ajuste por el header
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveSection);
});

// Start the initial animation
resetTimeAnimation()
