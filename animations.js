/*PERFIL – EFECTO 3D INTERACTIVO CON EL MOUSE*/

if (window.matchMedia("(pointer: fine)").matches) {
  // efectos que usan mousemove / hover
}
 
const perfilImg = document.querySelector("#perfil img");

perfilImg.addEventListener("mousemove", (e) => {
  const rect = perfilImg.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = (-y / (rect.height / 2)) * 15;
  const rotateY = (x / (rect.width / 2)) * 15;

  perfilImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  perfilImg.style.boxShadow = `
    ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(26,255,100,0.7),
    ${rotateY * 2}px ${-rotateX * 2}px 20px rgba(139,92,246,0.5)
  `;
});

perfilImg.addEventListener("mouseleave", () => {
  perfilImg.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  perfilImg.style.boxShadow = "0 0 20px #1AFF64, 0 0 40px #8B5CF6";
});

/*PERFIL – EFECTO TYPING (NOMBRE Y DESCRIPCIÓN)*/

const perfilName = document.querySelector("#perfil h1");
const perfilDesc = document.querySelector("#perfil p");

// Función typing
function typeText(element, text, speed = 30, callback) {
  let i = 0;
  element.textContent = ""; // aseguramos que esté vacío

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      if (callback) callback();
    }
  }

  typing();
}

// Ejecutamos el efecto typing
typeText(perfilName, "N0US", 150, () => {
  setTimeout(() => {
    typeText(
      perfilDesc,
      "I am a Full Stack Developer with a strong passion for technology, creativity, and problem-solving. I enjoy building efficient, scalable solutions and turning ideas into functional, user-focused products. Constantly seeking new challenges and opportunities, I am driven by continuous learning, innovation, and professional growth in dynamic environments.",
      20
    );
  }, 500);
});


/* EFECTO LINTERNA (SEGUIMIENTO DEL MOUSE)*/
if (window.matchMedia("(pointer: fine)").matches) {

  const light = document.getElementById("light");

  document.addEventListener("mousemove", e => {
    const x = e.clientX - light.offsetWidth / 2;
    const y = e.clientY - light.offsetHeight / 2;
    light.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

}

const light = document.getElementById("light");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX - light.offsetWidth / 2;
  const y = e.clientY - light.offsetHeight / 2;

  light.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});


/* ANIMACIÓN DE BARRAS DE IDIOMAS*/

const skillsSection = document.querySelector("#habilidades");
const bars = skillsSection.querySelectorAll(".progress-bar");

// Guardamos el width original
bars.forEach((bar) => {
  bar.dataset.originalWidth = bar.style.width;
  bar.style.width = "0%";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          bar.style.width = bar.dataset.originalWidth;
        });
      } else {
        bars.forEach((bar) => {
          bar.style.width = "0%";
        });
      }
    });
  },
  { threshold: 0.15 }
);

observer.observe(skillsSection);