$('#go-top').on('click', function () {
    $('html, body').stop(true).animate({
        'scrollTop': 0
    }, 800);
})