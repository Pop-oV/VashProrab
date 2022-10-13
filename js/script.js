$(document).ready(function(){
  $(`.page__slider`).slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $(`.about-us__slider`).slick({
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $(`.reviews__slider`).slick({
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    centerMode:true,
    speed: 1400,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1
  });

  $(`.services__work`).on(`click`, function(e){
    e.preventDefault();

    $(`.services__work`).removeClass(`services__work--active`)

    $(`.services__body`).removeClass(`services__body--active`)

    $(this).addClass(`services__work--active`);

    $($(this).attr(`href`)).addClass(`services__body--active`)
  });

  $('.tile-I').click(function(){
    $('.tile-II').fadeIn();
    });
  $('.plumbing-I').click(function(){
    $('.plumbing-II').fadeIn();
    });
  $('.finishing-I').click(function(){
    $('.finishing-II').fadeIn();
    });
  $('.window-I').click(function(){
    $('.window-II').fadeIn();
    });
  $('.electrician-I').click(function(){
    $('.electrician-II').fadeIn();
    });
  $('.dismantling-I').click(function(){
    $('.dismantling-II').fadeIn();
    });
  $('.gallery__overlay').click(function(event) {
      $target = $(event.target);
      if (!$target.closest($('.gallery__popup')).length) $('.gallery__overlay').fadeOut();
      if ($target.hasClass('gallery__close')) $('.gallery__overlay').fadeOut();
  });

    /* липкая шапка   */

  let header = $("#header");
  let page = $("#page");      /* делаем переменную   */
  let pageH = page.innerHeight(); /* если без "inner", тогда паддинг не учитывается. узнаем высоту блока page через id   */
  let scrollPos = $(window).scrollTop(); /* обращаемся к окну браузера, и с помщью метода scrollTop, у знаем сколько проскроллии от верха страницы*/

  $(window).on("scroll load resize", function() {  /* scroll (события) срабат.при скроле, load - при загрузке страницы, resize - при переходе с мобильной на детскоп */
    pageH = page.innerHeight(); /* проверка приresize*/
    scrollPos = $(this).scrollTop();
    if(scrollPos > pageH) {
      header.addClass("fixed"); /* добавляем класс */
    } else {
      header.removeClass("fixed"); /* удаляем класс */
    }
  });



    /* burger */

  let menu = $("#menu")
  let navToggle = $("#navToggle")
  navToggle.on("click", function (event){
    event.preventDefault();
    menu.toggleClass("show");
    navToggle.toggleClass("shows");
  })

 /* плавный скролл */
  $("[data-scroll]").on("click", function(event){  /* выборка элементов с атрибутом data-scroll */
  event.preventDefault();

    let blockID =  $(this).data(`scroll`);
    let elementOffset = $(blockID).offset().top; /* получаем отступ к данному элемента от верха  */
    menu.removeClass("show"); /* при клике закрывается меню (выше смотри) */
    navToggle.removeClass("shows");


    $("html, body").animate({
      scrollTop: elementOffset - 60
    }, 850);


  });



});

"use strict"

document.addEventListener(`DOMContentLoaded`, function () {
  const form  = document.getElementById(`form`);
  form.addEventListener(`submit`, formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add(`_sending`);
      
      let response = await fetch(`sendmail.php`, {
        method: `POST`,
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = ``;
        form.reset();
        form.classList.remove(`_sending`);
      } else {
        alert ("Ой!Что-то пошло не так!");
        form.classList.remove(`_sending`);
      }
      
    } else {
      alert(`Заполните обязательные поля!!!`);
    }

  }

  function formValidate(form) {
    let error = 0
    let formReq = document.querySelectorAll(`._req`);

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
  
      if (input.classList.contains(`_number`)) {
        if (numberTest(input)){
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else  {
        if (input.value === ``) {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }


  function formAddError(input) {
    input.parentElement.classList.add(`_error`);
    input.classList.add(`_error`);
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove(`_error`);
    input.classList.remove(`_error`);
  }

  function numberTest(input) {
    return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
  }

});