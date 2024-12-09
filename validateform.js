
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();


    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre.length < 2) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (mensaje.length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    this.submit();
  });

