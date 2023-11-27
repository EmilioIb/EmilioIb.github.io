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
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
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
        if (target === "all") {
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

  var mostrarModal = function (projects) {
    const modalProject = new bootstrap.Modal(
      document.getElementById("modalProject")
    );

    $(".proyecto").click(function (e) {
      const btn = e.currentTarget;
      const idProject = btn.dataset.projectid;
      const project = projects.find((e) => e.id == idProject);

      if (!project) {
        modalProject.hide();
        return;
      }

      $("#project-title").text(project.title);
      $("#project-description").text(project.descriptionLong);
      $("#project-image-link").attr("href", project.image);
      $("#project-image").attr("src", project.image);
      $("#project-repository").attr("href", project.repository);

      modalProject.show();
    });
  };

  var crearBotonesFiltros = function (categories) {
    const divBtns = document.getElementById("div-btn-filtro");
    const templateButton = document.getElementById(
      "template-btn-filtro"
    ).content;

    const fragment = document.createDocumentFragment();
    divBtns.textContent = "";

    categories.forEach((category) => {
      const clone = templateButton.cloneNode(true);
      clone.querySelector("button").textContent = category.name;
      clone.querySelector("button").setAttribute("data-target", category.value);

      if (category.value === "all") {
        clone.querySelector("button").classList.add("active");
      }

      fragment.appendChild(clone);
    });
    divBtns.appendChild(fragment);
  };

  var crearCardsProjects = function (projects) {
    const divProjects = document.getElementById("div-projects");
    const templateProject = document.getElementById(
      "template-card-project"
    ).content;

    const fragment = document.createDocumentFragment();
    divProjects.textContent = "";

    projects.forEach((project) => {
      const clone = templateProject.cloneNode(true);

      clone.querySelector(".proyecto").classList.add(project.category);
      clone
        .querySelector(".proyecto")
        .setAttribute("data-projectid", project.id);

      clone.querySelector("h5").textContent = project.title;
      clone.querySelector("img").setAttribute("src", project.image);
      clone
        .querySelector("img")
        .setAttribute("alt", `Imagen de proyecto ${project.title}`);

      fragment.appendChild(clone);
    });
    divProjects.appendChild(fragment);
  };

  var crearCardsCertificates = function (certificates) {
    const divCertificates = document.getElementById("div-certificates");
    const templateCertificate = document.getElementById(
      "template-certificate"
    ).content;

    const fragment = document.createDocumentFragment();
    divCertificates.textContent = "";

    certificates.forEach((certificate) => {
      const clone = templateCertificate.cloneNode(true);

      clone.querySelector(".cert-name").textContent =
        certificate.name.toUpperCase();
      clone.querySelector(".cert-inst").textContent = certificate.institution;
      clone.querySelector(".cert-date").textContent = certificate.date;
      clone.querySelector("a").setAttribute("href", certificate.doc);
      fragment.appendChild(clone);
    });
    // console.log(fragment);
    divCertificates.appendChild(fragment);
  };

  $(function () {
    const categories = [
      {
        value: "all",
        name: "All",
      },
      {
        value: "netcore",
        name: "Net Core",
      },
      {
        value: "nodejs",
        name: "NodeJS",
      },
      {
        value: "php",
        name: "PHP",
      },
      {
        value: "cplusplus",
        name: "C++",
      },
    ];

    const projects = [
      {
        id: 1,
        title: "Proyecto 1",
        category: "netcore",
        descriptionShort: "Pequeña descripcion del progama",
        descriptionLong:
          "Lorem irure commodo amet dolor sint pariatur aliquip sit sunt elit esse qui nostrud. Consequat aliqua quis cillum consequat adipisicing adipisicing exercitation Lorem. Nisi aliqua Lorem sint occaecat eu nulla in enim sunt. Nostrud et ex minim enim culpa quis fugiat eu dolor tempor occaecat laboris dolore mollit. Excepteur aliquip dolor ut ipsum consequat velit exercitation duis occaecat sit et magna. Ipsum pariatur ipsum aute aliqua anim qui eu aliqua consectetur elit. Ea labore eiusmod nulla tempor culpa veniam est aliquip et sit laboris eu. Pariatur ullamco sit sint aute nulla officia deserunt qui irure irure. Incididunt sit incididunt ut voluptate tempor culpa ut qui. Dolore culpa laborum Lorem deserunt anim eu nulla pariatur dolore aute proident culpa id.",
        image: "./images/projects/node.png",
        repository: "https://fancyapps.com/fancybox/plugins/html/",
      },
      {
        id: 2,
        title: "Proyecto 2",
        category: "nodejs",
        descriptionShort: "Pequeña descripcion del progama",
        descriptionLong:
          "Eiusmod amet elit in irure nulla consectetur. Tempor aliquip enim consectetur deserunt aute duis laborum elit mollit amet pariatur laboris ut. Velit ipsum ex nostrud id ad amet do adipisicing.",
        image: "./images/projects/netcore.png",
        repository: "https://fancyapps.com/fancybox/plugins/html/",
      },
      {
        id: 3,
        title: "Proyecto 3",
        category: "cplusplus",
        descriptionShort: "Pequeña descripcion del progama",
        descriptionLong:
          "Veniam non anim minim culpa incididunt ex ex do anim aliqua mollit non. Ad culpa duis laborum deserunt eiusmod reprehenderit. Aliqua qui ea incididunt occaecat nisi cupidatat. Veniam qui velit nisi eiusmod culpa. Nulla exercitation duis ad amet amet qui ex. Magna enim do velit do incididunt sint consectetur ullamco.",
        image: "./images/projects/php.jpg",
        repository: "https://fancyapps.com/fancybox/plugins/html/",
      },
    ];

    const certificates = [
      {
        name: "Certificado 1",
        institution: "La vida",
        date: "2001-01-01",
        doc: "./docs/certificado1.pdf",
      },
      {
        name: "Certificado 2",
        institution: "Mi madre",
        date: "2002-02-02",
        doc: "./docs/certificado2.pdf",
      },
      {
        name: "Certificado 3",
        institution: "La calle",
        date: "2003-03-03",
        doc: "./docs/certificado3.pdf",
      },
      {
        name: "Certificado 4",
        institution: "La muerte",
        date: "2004-04-04",
        doc: "./docs/certificado4.pdf",
      },
    ];

    fullHeight();
    goToTop();
    waypoints();

    crearBotonesFiltros(categories);
    crearCardsProjects(projects);
    crearCardsCertificates(certificates);

    carruselProjects();
    mostrarModal(projects);

    loaderPage();

    // //Obtener los datos de proyectos
    // fetch("./data/data.json")
    //   .then((res) => res.json()) // Convierte la respuesta a formato JSON
    //   .then((res) => {
    //     // Manipula los datos como desees
    //     const { projects, certificates } = res;
    //     console.log(projects, certificates);

    //     loaderPage();
    //     goToTop();
    //     fullHeight();
    //     waypoints();
    //     carruselProjects();
    //     mostrarModal();
    //   })
    //   .catch((error) => console.error("Error al leer el archivo JSON:", error));
  });
})();
