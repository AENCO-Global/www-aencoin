'use strict';

var getTranslatedText = require('./src/helper').getTranslatedText;
var strReplace = require('./src/helper').strReplace;
var teamMembers = require('./src/member').teamMemberData;
var advisors = require('./src/member').advisorsData;
var media = require('./src/media');
var partners = require('./src/partners');
var videos = require('./src/video');
var tokenDistribution = require('./src/token-distribution');
var getPdfDoc = require('./src/pdfDoc').getPdfDoc;
var contribution = require('./src/contribution');
var cap = require('./src/cap');
var ImageManager = require('./src/image-manager');

var popupEndTime = Date.parse('2018-09-29T00:00:00.000Z');

function getUrlLanguageCode(lang) {
    switch(lang) {
        case 'kr':
        case 'ko':
        case 'ko-kr':
            return 'kr';
        case 'zh':
        case 'zhcn':
        case 'zh-cn':
            return 'zh';
        case 'jp':
            return 'jp';
        default:
            return 'en';
    }
}

function getLanguage(langText) {
    switch(langText) {
        case 'kr':
        case 'ko':
        case 'ko-kr':
            return 'kr';
        case 'zh':
        case 'zhcn':
        case 'zh-cn':
            return 'zhcn';
        case 'jp':
            return 'jp';
        default:
            return 'en'
    }
}

function getDefaultLanguage() {
    var url = location.href;
    const pattern = /lang=([a-z A-Z -]+)/g;
    const langMatch = url.match(pattern);
    if (langMatch) {
        let equalStrIndex = langMatch[0].search(/=/g);
        return getLanguage(langMatch[0].substring(equalStrIndex + 1));
    }
    let localStorageLanguage = window.localStorage.getItem('aenco-lang');
    if (localStorageLanguage) {
        return getLanguage(localStorageLanguage);
    }
    let browserLanguage = navigator.language;
    return getLanguage(browserLanguage)
}

function openMobileMenu() {
    $(".overlay").show();
    $("#mobile-menu").show();
    $("#mobile-menu").animate({
        right: 0
    }, 200);
}

function closeMobileMenu() {
    $(".overlay").hide();
    $("#mobile-menu").animate({
        right: -200
    }, 200, function() {
        $("#mobile-menu").hide();
    });
}

function getNumTeamMemberShown () {
    if (window.innerWidth <= 860) {
        return 4;
    } else if (window.innerWidth <= 1060) {
        return 5;
    }
    return 6;
}

const system = {
    numTeamMemberShown: getNumTeamMemberShown(),
    numAdvisorShown: getNumTeamMemberShown(),
    numVideoShown: 4,
    language: getDefaultLanguage(),
    isLanguageSubMenuOpen: false,
	init: function() {
        var that = this;
        $('a[href*=\\#]:not([href=\\#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                if (target.hasClass("faq-area")) {
                    $(".section-cat-one").hide();
                    $(".section-cat-two").show();
                    $('html,body').animate({
                        scrollTop: (target.offset().top) - 120
                    }, 700);
                    return false;
                }
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $(".section-cat-one").show();
                    $(".section-cat-two").hide();
                    var width = $(window).width();
                    if(width < 991) {
                        $('.menu-trigger').removeClass('active');
                        $('.header-area .nav').slideUp(200);
                    }
                    $('html,body').animate({
                        scrollTop: (target.offset().top) - 120
                    }, 700);
                    return false;
                }
            }
        });

        $(window).scroll(function(event){
            var st = $(this).scrollTop();
            if (st > 80) {
                $(".header").css("background-color", "rgba(0,0,0,1)");
            } else {
                $(".header").css("background-color", "rgba(0,0,0," + st / 80 + ")");
            }
        });

        window.onresize = function(e) {
            that.numTeamMemberShown = Math.max(that.numTeamMemberShown, getNumTeamMemberShown());
            that.numAdvisorShown = Math.max(that.numAdvisorShown, getNumTeamMemberShown());
            that.updateTeamMemberList();
            that.updateAdvisorList();
        };

        $(".adv").html(this.getPromotionPopup());
        this.showPromotionPopup();

        this.getSlider();
        this.updateVideos();
        this.updateMediaAndPartners();
        this.updateTeamMemberList();
        this.updateAdvisorList();
        this.addButtonListener();
        this.startCounter();
        this.updateCounterText();
        this.updateTitle();
        this.updateSoftcapBar();
        tokenDistribution.render();
        tokenDistribution.updateTable(this.language);
        //cap.updateValue();
    },
    addButtonListener: function() {
        var that = this;
        $("#btn-more-videos").click(function(){
            $("#video-list .item:hidden").slideDown();
            $("#btn-more-videos").hide();
            that.numVideoShown = videos.length;
        });
        $("#btn-team-more").click(function(){
            $("#team-member-list .team-round:hidden").slideDown();
            $("#btn-team-more").hide();
            that.numTeamMemberShown = teamMembers.length;
        });
        $("#btn-advisors-more").click(function(){
            $("#advisor-list .team-round:hidden").slideDown();
            $("#btn-advisors-more").hide();
            that.numAdvisorShown = advisors.length;
        });
        $("#mobile-menu-btn").on("click", function() {
            openMobileMenu();
        });
        $(".mobile-menu").on("click", function() {
            closeMobileMenu();
        });
        $(".menu-area").on("click", function() {
            closeMobileMenu();
        });
        $(".menu-area .list-group .close-when-click").on("click", function() {
            closeMobileMenu();
        });
        $(".language-selector-container").mouseover(function(){
            $(".language-selector-container").addClass("expanded");
            $(".language-selector").show();

        });
        $(".language-selector-container").mouseout(function(){
            $(".language-selector-container").removeClass("expanded");
            $(".language-selector").hide();
        });
        $(".btn-contributors").click(function() {
            that.initModal(getTranslatedText(that.language, "text0005"), contribution.getContributionSection(that.language));
        });
        $(".btn-learn").click(function() {
            that.initModal(getTranslatedText(that.language, "text2001"), contribution.getLearnMoreContent(that.language));
        });
        $(".btn-language").click(function() {
            event.stopPropagation();
            if (that.isLanguageSubMenuOpen) {
                $(".sub-menu").animate({right: 0});
                that.isLanguageSubMenuOpen = false;
            } else {
                $(".sub-menu").animate({right: 200});
                that.isLanguageSubMenuOpen = true;
            }
        });
        $(".btn-lang-item").click(function(){
            $(".sub-menu").animate({right: 0});
            that.isLanguageSubMenuOpen = false;
        });
        $(".btn-show-promotion").mouseover(function() {
            that.hoverPromotionPopup();
        });
        $(".btn-show-promotion").mouseout(function() {
            that.hidePromotionPopup();
        });
    },
    getPDFDom: function getPDFDom() {
        return `<div class="pdf-frame"><div id="pdfContainer"></div></div>`;
    },
    getBreakPointsScale: function getBreakPointsScale() {
        var breakpoints = [];
        var scale = 1;
        if (window.innerWidth / window.innerHeight >= 1400 / 1012) {
            scale = Math.abs(window.innerWidth / 1400);
        } else if (window.innerWidth / window.innerHeight >= 1000 / 1012) {
            scale = Math.abs(window.innerWidth / 1000);
        } else if (window.innerWidth / window.innerHeight >= 800 / 1012) {
            scale = Math.abs(window.innerWidth / 1000);
        } else if (window.innerWidth / window.innerHeight >= 600 / 1012) {
            scale = Math.abs(window.innerWidth / 1000);
        }
        return scale;
    },
    getSlider: function getSlider() {
        var scale = this.getBreakPointsScale();
        $(".regular").slick({
            dots: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            variableWidth: false,
            centerMode: true,
            centerPadding: 0,
            autoplay: true,
            responsive: [
                {
                  breakpoint: 1400,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    variableWidth: false,
                    centerMode: true,
                    centerPadding: 0
                  }
                },
                {
                  breakpoint: 1100 ,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    variableWidth: false,
                    centerMode: true,
                    centerPadding: 0
                  }
                },
                {
                  breakpoint: 850,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    variableWidth: false,
                    centerMode: true,
                    centerPadding: 0
                  }
                },
                {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: false,
                      variableWidth: false,
                      centerMode: true,
                      centerPadding: 0
                    }
                }
            ]
        });
    },
    getVideos: function getVideos() {
        let html = "";
        var that = this;
        const lang = this.language;
        for(let i = 0; i < videos.length; i++) {
            const path = videos[i].path;
			const label = getTranslatedText(lang, videos[i].label);
			const id = videos[i].id;
            const displayStyle = i < this.numVideoShown ? "block" : "none";
            html += `<div class="item" style="display:${displayStyle}"> 
                        <a href="#" onclick="window.openVideo(${id})" data-toggle="modal" data-target="#modal-container">
                            <img src="${path}" />
                            <h3 class="subtitle">${label}</h3>
                        </a>
                    </div>`;
        }
        return html;
    },
    getVideoContent: function getVideoContent(videoUrl) {
        return `<div class="popup-video-container"><div class="video-frame"><iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen=""></iframe></div></div>`;
    },
    getMediaOrPartners: function getMediaOrPartners(data) {
        let html = "";
        for(let i = 0; i < data.length; i++) {
            const {
                url = "",
                image = ""
            } = data[i];
            if (url === "") {
                html += `<li><img src="${image}" /></li>`;
            } else {
                html += `<li><a target="_blank" href="${url}"><img src="${image}" /></a></li>`;
            }
        }
        return html;
    },
    getTeamMemberDom: function getTeamMemberDom(name, image, title, linkedin, id, isShown, isAdvisor) {
        const infoStyle = isAdvisor ? "list-item" : "none";
        const displayStyle = isShown ? "block" : "none";
        return `<div class="team-round" style="display: ${displayStyle};">
                    <div class="profile">
                        <div class="img">
                            <img src="${image}" alt="${name}" width="120" height="120">
                        </div>
                        <div class="name"><span class="f4">${name}</span></div>
                        <div class="title"><h6>${title}</h6></div>
                        <div class="link">
                            <ul class="social">
                                <li style="display: ${infoStyle};"><a class="btn-info" onclick="window.showDetailInfo(${id});" href="#" data-toggle="modal" data-target="#modal-container"><div class="icon icon-profile"></div></a></li>
                                <li><a target="_blank" href="${linkedin}"><div class="icon icon-linkedin"></div></a></li>
                                <div class="clear"></div>
                            </ul>
                        </div>
                    </div>
                </div>`;
    },
	getTeamMemberList: function getTeamMemberList() {
        let html = "";
        const lang = this.language;
		for(let i = 0; i < teamMembers.length; i++) {
			const name = getTranslatedText(lang, teamMembers[i].name);
			const title = getTranslatedText(lang, teamMembers[i].title);
			const image = teamMembers[i].image;
            const linkedin = teamMembers[i].linkedin;
            const id = teamMembers[i].id;
            const isShown = i < this.numTeamMemberShown;
			html += this.getTeamMemberDom(name, image, title, linkedin, id, isShown, false);
        }
        return html;
    },
    getAdvisorList: function getAdvisorList() {
        let html = "";
        const lang = this.language;
        for(let i = 0; i < advisors.length; i++) {
            const name = getTranslatedText(lang, advisors[i].name);
		    const title = getTranslatedText(lang, advisors[i].title);
		    const image = advisors[i].image;
            const linkedin = advisors[i].linkedin;
            const id = advisors[i].id;
            const isShown = i < this.numAdvisorShown;
            html += this.getTeamMemberDom(name, image, title, linkedin, id, isShown, true);
        }
        return html;
    },
    showDetailInfo: function showDetailInfo(id) {
        var data;
        var that = this;
        for(let i = 0; i < advisors.length; i++) {
            if (advisors[i].id === id) {
                data = advisors[i];
                break;
            }
        }
        that.initModal("", that.getMemberDetailedInfo(data.image, data.name, data.title, data.desc), "team-member-popup");
    },
    getMemberDetailedInfo: function getMemberDetailedInfo(imgPath  = "", inName  = "", inTitle = "", desc = []) {
        var descTxt = "<ul>";
        var that = this;
        for(let i = 0; i < desc.length; i++) {
            let descStr = getTranslatedText(that.language, desc[i]);
            descTxt += `<li>${descStr}</li>`;
        }
        descTxt += "</ul>";
        let name = getTranslatedText(that.language, inName);
        let title = getTranslatedText(that.language, inTitle);
        return `<div class="member-info-container">
            <div class="member-image">
                <img src="${imgPath}" />
            </div>
            <div class="info">
                <ul>
                    <li class="name popup-name f4">${name}</li>
                    <li class="title popup-title"><h6>${title}</h6></li>
                    <li class="desc"><h5>
                        ${descTxt}
                    </h5></li>
                </ul>
            </div>
        </div>`;
    },
    hoverPromotionPopup: function hoverPromotionPopup() {
        $(".adv").show();
    },
    showPromotionPopup: function showPromotionPopup() {
        var that = this;
        var now = Date.now();
        if (now >= popupEndTime) {
            return;
        }
        that.initModal("", that.getPromotionPopup(), "promotion-popup");
        $('#modal-container').modal('show');
    },
    hidePromotionPopup: function hidePromotionPopup() {
        $(".adv").hide();
    },
    getPromotionPopup: function getPromotionPopup() {
        var that = this;
        var lang_code = getUrlLanguageCode(that.language);
        let image_prefix = './assets/img/promotion/';
        let imagePath_50free = `${image_prefix}50free-${lang_code}.jpg`;
        let imagePath_free = `${image_prefix}200free-${lang_code}.jpg`;
        let imagePath_per = `${image_prefix}5per-bonus-${lang_code}.jpg`;
        let imagePath_fomo = `${image_prefix}fomo-en.jpg`;
        var now = Date.now();
        var startTime = Date.parse('2018-08-30T00:00:00.000Z');
        var endTime = Date.parse('2018-09-01T00:00:00.000Z');
        var freeStartTime = Date.parse('2018-09-01T00:00:00.000Z');

        if (now >= popupEndTime) {
            return '';
        }

        if (now >= freeStartTime) {
            imagePath_free = imagePath_50free;
        }
        var isFomoStarted = now >= startTime && now < endTime;
        var containerClass = "";
        var promotionFomo = `<div class="tb-block">
                                <img src="${imagePath_fomo}" />
                            </div>`;
        if (!isFomoStarted) {
            promotionFomo = "";
            containerClass = "one-col-promotion";
        }
        return `<div class="promotion-area table-container ${containerClass}">
                    <div class="tb-block">
                        <img src="${imagePath_free}" />
                        <img src="${imagePath_per}" />
                    </div>
                    ${promotionFomo}
                    <div class="clear"></div>
                </div>`;

    },
    openVideo: function openVideo(id) {
        let data;
        var that = this;
        for(let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                data = videos[i];
            }
        }
        let label = getTranslatedText(that.language, data.label);
        let url = data.url;
        let videoUrl = url[that.language] ? url[that.language] : url["en"];
        that.initModal(label, that.getVideoContent(videoUrl), "video-popup");
    },
	updateTeamMemberList: function updateTeamMemberList() {
		$("#team-member-list").html(this.getTeamMemberList());
    },
    updateAdvisorList: function updateAdvisorList() {
        $("#advisor-list").html(this.getAdvisorList());
    },
    updateMediaAndPartners: function updateMediaAndPartners() {
        $("#media-list").html(this.getMediaOrPartners(media));
        $("#partner-list").html(this.getMediaOrPartners(partners));
    },
    updateVideos: function updateVideos() {
        $("#video-list").html(this.getVideos());
    },
    updateCounterText: function updateCounterText() {
        $(".flip-clock-divider.days span.flip-clock-label").html(getTranslatedText(this.language, "text0199"));
        $(".flip-clock-divider.hours span.flip-clock-label").html(getTranslatedText(this.language, "text0200"));
        $(".flip-clock-divider.minutes span.flip-clock-label").html(getTranslatedText(this.language, "text0201"));
        $(".flip-clock-divider.seconds span.flip-clock-label").html(getTranslatedText(this.language, "text0202"));
    },
    updateTitle: function updateTitle() {
        window.document.title = getTranslatedText(this.language, "text0228");
    },
    changeLang: function changeLang(lang) {
        //this.language = lang;
        window.localStorage.setItem('aenco-lang', lang);
        location.href="?lang=" + getUrlLanguageCode(lang);
        /*this.showPromotionPopup();
        this.updateTeamMemberList();
        this.updateAdvisorList();
        this.updateVideos();
        this.updateCounterText();
        this.updateTitle();
        tokenDistribution.updateTable(this.language);*/
    },
    startCounter: function startCounter() {
        /*var now = Date.now();
        var endTime = Date.parse('2018-09-01T00:00:00.000Z');
        var diff = (endTime - now) / 1000;
        diff = 0;
        if (diff <= 0) {
            diff = 0;
            $('.count-down-container').hide();
            return;
        }
        var clock = $('.clock').FlipClock(diff, {
            clockFace: 'DailyCounter',
            countdown: true
        });*/
    },
    initModal: function initModal(title = "", content = "", extraModalClass = "") {
        var className = "modal-dialog " + extraModalClass;
        $("#modal-container .modal-title").html(title);
        $("#modal-container .modal-dialog").attr("class", className);
        $("#modal-container #modal-body-content").html(content);
    },
    updateSoftcapBar: function() {
        cap.init({language: this.language});
    }
};

var app = angular.module('todoApp', []);

app.controller('AppController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  var todoList = this;
  todoList.done = 1;
  todoList.lang = getDefaultLanguage();
  todoList.isCounterShown = false;

  todoList.getTranslatedText = function(key) {
    var txt = getTranslatedText(todoList.lang, key);
    return $sce.trustAsHtml(txt);
  };

  todoList.getTranslatedTextWithPlaceholder = function(key, placeholder, value) {
    var txt = getTranslatedText(todoList.lang, key);
    txt = strReplace(txt, placeholder, value);
    return $sce.trustAsHtml(txt);
  }

  todoList.getTranslatedTextWithUrl = function(key, url) {
    var txt = getTranslatedText(todoList.lang, key);
    txt = strReplace(txt, '<a>', '<a target="_blank" href="' + url + '">');
    return $sce.trustAsHtml(txt);
  }

  todoList.getTranslatedTextWithPdf = function(key, pdfid) {
    var pdfPath = getPdfDoc(pdfid, todoList.lang).path;
    var txt = getTranslatedText(todoList.lang, key);
    txt = strReplace(txt, '<a>', '<a target="_blank" href="' + pdfPath + '">');
    return $sce.trustAsHtml(txt);
  }

  todoList.changeLang = function(lang) {
      //todoList.lang = lang;
      system.changeLang(lang);
  }

  todoList.getPDFPath = function(id) {
      return getPdfDoc(id, todoList.lang).path;
  }

  todoList.getCoreVideoUrl = function() {
    var url = 'https://www.youtube.com/embed/kfWu3fKLe2I?rel=0';
    switch(todoList.lang) {
        case 'zhcn':
            url = 'https://www.youtube.com/embed/U5A5d22b17E';
    }
    var html = '<iframe class="embed-responsive-item" src="' + url + '" allowfullscreen=""></iframe>';
    return $sce.trustAsHtml(html);
  }

  todoList.getBlockchainDiagram = function() {
    const imageId = "img0001";
    const desktopImage = ImageManager.getImagePath(imageId, todoList.lang, 0);
    const mobileImage = ImageManager.getImagePath(imageId, todoList.lang, 1);
    var html = `<img
                    srcset="${mobileImage} 479w, ${desktopImage} 480w"
                    sizes="(max-width: 479px) 479px, (min-width: 480px) 480px"
                    src="${desktopImage}"
                    alt="Aenco Blockchain"
                    title="Aenco Blockchain"
                />`;
    return $sce.trustAsHtml(html);
  }

  todoList.getBlockchainPlatformDiagram = function() {
    const imageId = "img0002";
    const desktopImage = ImageManager.getImagePath(imageId, todoList.lang, 0);
    const mobileImage = ImageManager.getImagePath(imageId, todoList.lang, 1);
    var html = `<img
                    srcset="${mobileImage} 479w, ${desktopImage} 480w"
                    sizes="(max-width: 479px) 479px, (min-width: 480px) 480px"
                    src="${desktopImage}"
                    alt="Aenco Blockchain Platform"
                    title="token &amp; smart modules"
                />`;
    return $sce.trustAsHtml(html);
  }

  todoList.updateIcoStatus = function() {
    var now = Date.now();
    var endTime = Date.parse('2018-10-29T00:00:00.000Z');
    var diff = (endTime - now) / 1000;
    var txt = getTranslatedText(todoList.lang, "text0274");
    if (diff <= 0) {
        txt = getTranslatedText(todoList.lang, "text0279");
    } else {
        todoList.isCounterShown = true;
        var clock = $('.clock').FlipClock(diff, {
            clockFace: 'DailyCounter',
            countdown: true
        });
    }
    return $sce.trustAsHtml(txt);
  }
}]);

window.showDetailInfo = system.showDetailInfo.bind(system);
window.openVideo = system.openVideo.bind(system);

$(function() {
    system.init();
});

