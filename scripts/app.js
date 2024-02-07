
function animarTexto(resultadoEncriptado) {
	const outputText = document.getElementById("result");

	// Animar el texto encriptado con GSAP
	gsap.to(outputText, {
		duration: 3,
		text: resultadoEncriptado,
		ease: "none",
	});
}

  // Función para validar la entrada de texto
  function isValidInput(text) {
    var regex = /^[a-z ,.ñ]+$/;
    return regex.test(text);
  }
  function encriptar() {
    const input = document.getElementById("text");
    const resultElement = document.getElementById('result');
    const output = input.value;

    if (output === "") {
        Alertas('error', 'El campo de texto está vacío');
    } else {
        if (!isValidInput(output)) {
            Alertas("error", "Por favor, ingresa un mensaje sin Mayúsculas, Acentos o Caracteres especiales");
		input.focus();
            return;
        } else {
          // Definir un objeto de correspondencias para mapear las combinaciones a sus reemplazos
            const correspondencias = {
                "e": "enter",
                "i": "imes",
                "a": "ai",
                "o": "ober",
                "u": "ufat"
            };

            // Utilizar una expresión regular para buscar coincidencias con letras y realizar reemplazos
            const resultado = output.replace(/e|i|a|o|u/g, match => correspondencias[match]);

            Alertas("success", "Mensaje encriptado exitosamente.");
            animarTexto(resultado);
            // resultElement.innerHTML = resultado;
            document.getElementById('text').value = '';
            copyButton.disabled = false;
        }
    }
    updateCharCount();
input.focus();
}

  function desencriptar() {
    const input = document.getElementById("text");
    const resultElement = document.getElementById('result');
    const output = input.value;

    if (output === "") {
        Alertas("error", "El campo de texto está vacío");
    } else {
        if (!isValidInput(output)) {
            Alertas("error", "Por favor, ingresa un mensaje sin mayúsculas o caracteres especiales");
		input.focus();
            return;
        } else {
           // Definir un objeto de correspondencias para mapear las combinaciones a sus reemplazos
            const correspondencias = {
                "enter": "e",
                "imes": "i",
                "ai": "a",
                "ober": "o",
                "ufat": "u"
            };
            // Utilizar una expresión regular para buscar coincidencias con las combinaciones y realizar reemplazos
            const resultado = output.replace(/enter|imes|ai|ober|ufat/g, match => correspondencias[match]);

            Alertas("success", "Mensaje desencriptado exitosamente.");
            animarTexto(resultado);
            // resultElement.innerHTML = resultado;
            document.getElementById('text').value = '';
            copyButton.disabled = false;
        }
    }
    updateCharCount();
    input.focus();
}

  
  // Función para copiar el resultado al portapapeles
  function copiar() {
    var resultText = document.getElementById('result').innerText;
    var textarea = document.createElement('textarea');
    textarea.value = resultText;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      Alertas("success","Mensaje copiado exitosamente.");
      document.getElementById('result').innerText="";
    } catch (err) {
      Alertas("error","Error al copiar el mensaje.");
    }
    copyButton.disabled = true;
    document.body.removeChild(textarea);
    document.getElementById('text').focus();
  }
  
  // Función para mostrar mensajes de notificación
  function Alertas(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    });
  }
  
  // Función para actualizar el contador de caracteres
  function updateCharCount() {
    var text = document.getElementById('text').value;
    var charCount = text.length;
    var charLimit = 1000;
    var charCountElement = document.getElementById('charCount');
    charCountElement.textContent = `Caracteres: ${charCount}/${charLimit}`;
  }
  
  // Evento al escribir en el campo de texto
  document.getElementById('text').addEventListener('input', function() {
    updateCharCount();
    var processButton = document.getElementById('processButton');
    var text = this.value.trim();
    processButton.disabled = text.length === 0;
    updateCharCount();
  });
  // funcion para animar el texto del titulo
const typed = new Typed('.typed',{
      strings: [
        '<i class="palabra">ENCRIPTADOR</i>',
        '<i class="palabra">DESENCRIPTADOR</i>'
            ],
            //stringsElement: '#cadenas-texto',
            typeSpeed: 75,
            startDelay: 50,
            backSpeed: 75,
            smartBackspace: true,
            shuffle: false,
            backDelay: 1500,
            loop: true,
            loopCount: false,
            showCursor: true,
            cursorChar: '|',
            contentType: 'html',
});
  
updateCharCount();
document.getElementById('text').focus();

