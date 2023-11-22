(function () {
  "use strict";

  //Funncion para saber si estamos en dispositivo movil
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  //Funcion para poner el div de inicio al maximo div
  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };

  // Funcion para ir a la cima de la pagia
  var goToTop = function () {
    $(".js-gotop").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500
      );

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  // Loading page
  var loaderPage = function () {
    $(".fh5co-loader").fadeOut("slow");
  };

  // Waypoints
  var waypoints = function () {
    $(".animated-element").waypoint({
      handler: function (direction) {
        if (direction === "down") {
          // Si el elemento está bajando en pantalla, añadir la clase de animación
          $(this.element).addClass("animate__animated animate__fadeIn");
          this.destroy(); // Solo necesitamos animar una vez
        }
      },
      offset: "50%", // Ajusta según sea necesario
    });
  };

  // Filtrar proyectos al hacer clic en los botones
  var carruselProjects = function () {
    $(".btn-filtro").click(function () {
      //Quita clase seleccionada a todos los botones y se la da al boto clickeado
      $(".btn-filtro").removeClass("active");
      $(this).addClass("active");

      //Obtiene el target del boton clickeado
      const target = $(this).data("target");

      //Anima todos los recuadros saliedo
      $(".proyecto").addClass("animate__animated animate__fadeOutRight");

      //Funcion con tiieout para ejecutarse al terminar la animacion de saliida
      setTimeout(function () {
        //Oculta todos los proyectos
        $(".proyecto").addClass("d-none");

        //Si el target es todos le quita la animacion de salida, los muestra y les añade la animacion de entrada
        if (target === "todos") {
          $(".proyecto")
            .removeClass("d-none animate__fadeOutRight")
            .addClass("animate__fadeInRight");
        } else {
          // Si el valor de 'data-target' no es "todos", muestra solo los proyectos de la categoría especificada con animación de entrada
          $(".proyecto." + target)
            .removeClass("d-none animate__fadeOutRight")
            .addClass("animate__fadeInRight");
        }
      }, 500);
    });
  };

  $(function () {
    //Obtener los datos de proyectos
    fetch("./data/data.json")
      .then((res) => res.json()) // Convierte la respuesta a formato JSON
      .then((res) => {
        // Manipula los datos como desees
        const { projects, certificates } = res;
        console.log(projects, certificates);

        loaderPage();
        goToTop();
        fullHeight();
        waypoints();
        carruselProjects();
      })
      .catch((error) => console.error("Error al leer el archivo JSON:", error));
  });
})();
