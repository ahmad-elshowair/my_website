$(function () {
    // when scroll up change padding and height of navbar
    $(window).scroll(function () {
        var brand = $('a.navbar-brand');
        $(window).scrollTop() > $('.navbar').height() ? brand.addClass("width-brand") : brand.removeClass("width-brand");
    });

    // when clicked on nav item add class active
    $(".navbar-nav .nav-link").click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('#' + $(this).data('scroll')).offset().top
        }, 1500);
        $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    });


    // sync navbar links with section
    $(window).scroll(function () {
        $('.sync-section').each(function () {
            if ($(window).scrollTop() >= $(this).offset().top) {
                var syncId = $(this).attr('id');
                $('.navbar-nav .nav-link').removeClass('active')
                $('.navbar-nav .nav-link[data-scroll="' + syncId + '"]').addClass('active');
            }
        });
    });

});


// function type write
const typeWriter = function (textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// type method
typeWriter.prototype.type = function () {

    // current index of word 
    const currentIndex = this.wordIndex % this.words.length;

    // get full text of current word
    const fullTxt = this.words[currentIndex];

    // check if deleting
    if (this.isDeleting) {
        // remove txt
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //add txt
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //initial type speed 
    let typeSpeed = 300;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // check if work complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // make pause at end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // move to next word
        this.wordIndex++;
        // pause before start type
        typeSpeed = 500;
    }

    // set time out
    setTimeout(() => {
        return this.type();
    }, typeSpeed);
}


// initial on MOD load
document.addEventListener('DOMContentLoaded', init)

// initial app
function init() {
    const textElement = document.querySelector('.txt-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');

    // initial function typeWriter 
    new typeWriter(textElement, words, wait);
}