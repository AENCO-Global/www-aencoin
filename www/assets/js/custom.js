(function ($) {
    "use strict";

    $(document).ready(function(){
        welcome();

        /** Menu Drop down toggle */
        if($('.menu-trigger').length){
            $('.menu-trigger').click(function(){
                $(this).toggleClass('active');
                $('.header-area .nav').slideToggle(200);
            });
        }

        $('#version-number').load('./version.html');

        $('.launch-modal').on('click', function(e){
            e.preventDefault();
            $('#' + $(this).data('modal-id')).modal();
        });
        $('.close').click(function(){
            $('#what-is-aenco-video').attr('src', $('#what-is-aenco-video').attr('src'));
        });

        /** Scroll Reveal Version 3 */
        window.sr = new ScrollReveal();
        sr.reveal('.sr-team-c1', {
                  origin: 'bottom',
                  distance: '50px',
                  duration: 200,
                  delay: 100
        });
        sr.reveal('.sr-team-c2', {
            origin: 'bottom',
            distance: '50px',
            duration: 200,
            delay: 200
        });
        sr.reveal('.sr-team-c3', {
            origin: 'bottom',
            distance: '50px',
            duration: 200,
            delay: 400
        });
        sr.reveal('.sr-team-c4', {
            origin: 'bottom',
            distance: '50px',
            duration: 200,
            delay: 600
        });

        /** Menu elevator animation */
        $('a[href*=\\#]:not([href=\\#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    var width = $(window).width();
                    if(width < 991) {
                        $('.menu-trigger').removeClass('active');
                        $('.header-area .nav').slideUp(200);
                    }
                    $('html,body').animate({
                        scrollTop: (target.offset().top) - 30
                    }, 700);
                    return false;
                }
            }
        });

        /** Pie Chart for Token Supply */
        var ctx = document.getElementById("token-supply").getContext('2d');
        var tokenSupplyChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Token Sale (excl. bonus allocations)',
                         'Retained by Company and Team',
                         'Ecosystem Liquidity',
                         'Allocated to Ecosystem Partners / Backers',
                         'Reserved for Incentive Programs',
                         'Bonus Allocations (on token sale)',
                         'Reserves and token sale costs '],
                datasets: [{
                    label: 'Supply Percentage',
                    data: [15, 22, 15, 12, 12, 4, 20],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(120, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(120, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        /** Pie Chart for Token Allocation */
        var ctx = document.getElementById("token-allocation").getContext('2d');
        var tokenAllocationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Sponsorship and Financial Solutions Platform for HealthTech Partners',
                         'Research, technology Development and Roll Out, and Collaboration Research',
                         'General Working Capital and Operational Expenses',
                         'Marketing and Distribution',
                         'Legal and Compliance'],
                datasets: [{
                    label: 'Token Allocation',
                    data: [40, 30, 24, 3, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

    });

    /** Page Loading Animation */
    $(window).on("load", function(){
        $(".loading-wrapper").animate({
            'opacity': '0'
        }, 400, function(){
            setTimeout(function(){
                $(".loading-wrapper").css("visibility", "hidden").fadeOut();
            }, 200);
        });
    });

    /** Header Scrolling Set White Background */
    $(window).scroll(function() {
        var width = $(window).width();
        if(width > 991) {
            var scroll = $(window).scrollTop();
            if (scroll >= 30) {
                $(".header-area").addClass("header-sticky");
                $(".header-area .dark-logo").css('display', 'block');
                $(".header-area .light-logo").css('display', 'none');
            }else{
                $(".header-area").removeClass("header-sticky");
                $(".header-area .dark-logo").css('display', 'none');
                $(".header-area .light-logo").css('display', 'block');
            }
        }
    });

    /** Window resize setting */
    $(window).resize(function(){
        welcome();
    });

    /** Welcome area height settings */
    function welcome() {
        var width = $(window).width();

        if(width > 991) {
            var height = $(window).height();
            $('.welcome-area').css('height', height - 80);
        }else{
            $('.welcome-area').css('height', 'auto');
        }
    }
})(jQuery);