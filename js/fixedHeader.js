export default function fixHeader() {
    $(function () {
        let header = $('.container-bottom');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 280) {
                header.addClass('header_fixed');
            } else {
                header.removeClass('header_fixed');
            }
        });
    });
}