var currentIndex = 0;
var numItemEachRow = 4;
var data = [
    {
        path: './assets/img/video-rollout-thumb.jpg',
        label: 'OUR VISION',
        url: 'https://www.youtube.com/embed/Vv4lgRwoX08?rel=0'
    },
    {
        path: './assets/img/video-community-thumb.jpg',
        label: 'TECHNOLOGY ROOLOUT',
        url: 'https://www.youtube.com/embed/-l4mUSPZWUI?rel=0'
    },
    {
        path: './assets/img/video-vison-thumb.jpg',
        label: 'REGULATORY LANDSCAPE',
        url: 'https://www.youtube.com/embed/thFx7IndFR4?rel=0'
    },
    {
        path: './assets/img/video-regulatory-thumb.jpg',
        label: 'OUR COMMUNITY',
        url: 'https://www.youtube.com/embed/thFx7IndFR4?rel=0'
    }
];

var mediaData = [
    {
        image: "./assets/img/press/bloomberg.png"
    },
    {
        image: "./assets/img/press/business-insider.png",
        url: "http://markets.businessinsider.com/news/stocks/smart-capital-for-healthtech-startups-aenco-presents-the-world-s-first-blockchain-based-healthtech-financial-solutions-and-application-development-platform-1025138507"
    },
    {
        image: "./assets/img/press/morning-star.png",
        url: "https://www.morningstar.com/news/pr-news-wire/PRNews_20180523HK04256/smart-capital-for-healthtech-startups-aenco-presents-the-worlds-first-blockchainbased-healthtech-financial-solutions-and-application-development-platform.html"
    },
    {
        image: "./assets/img/press/dow-jones.png"
    },
    {
        image: "./assets/img/press/klse-malaysia.png",
        url: "https://ck5354.blogspot.com/p/pr-news-wire.html?rkey=20180523AE04256&filter=7336"
    },
    {
        image: "./assets/img/press/seeking-alpha.png"
    },
    {
        image: "./assets/img/press/marketwatch.png"
    },
    {
        image: "./assets/img/press/business-journals.png",
        url: "https://www.bizjournals.com/prnewswire/press_releases/2018/05/23/HK04256"
    },
    {
        image: "./assets/img/press/connect-web.png"
    },
    {
        image: "./assets/img/press/yahoo-finance.png",
        url: "https://sg.finance.yahoo.com/news/smart-capital-healthtech-startups-aenco-125300804.html"
    },
    {
        image: "./assets/img/press/healthcare-innovation.png",
        url: "https://www.enterpriseinnovation.net/article/worlds-first-blockchain-based-healthtech-financial-solutions-and-application-development?utm_source=silverpop&utm_medium=newsletter&utm_campaign=EI%20EGOV_ORG_health&mkt_tok=eyJpIjoiWVdSaE9UTTJObUZpTkdaaCIsInQiOiIrNTF2dExGSXVKMWxxblwvaGNUXC9lenNMTTRNcU5XK0dablNLcWlKYnQ3QUp0eWpIRjhzWnEyeEt0R3NwR1NtN0ZPdWlpcWZ6TkduY3RKcHpLeWJxRlkwWVRYQzFKblwvUnNnQzBDOHNZTmNtVWFNYjZybEJtcjQ5c3pBVjVcL0R6Vm4ifQ%3D%3D"
    },
    {
        image: "./assets/img/press/ihhr.png",
        url: "https://twitter.com/IHHRonline/status/1002191782719971328"
    },
    {
        image: "./assets/img/press/knbn.png",
        url: "http://www.newscenter1.tv/story/38257496/smart-capital-for-healthtech-startups-aenco-presents-the-worlds-first-blockchain-based-healthtech-financial-solutions-and-application-development"
    },
    {
        image: "./assets/img/press/fox-wflx.png",
        url: "http://www.wflx.com/story/38257496/smart-capital-for-healthtech-startups-aenco-presents-the-worlds-first-blockchain-based-healthtech-financial-solutions-and-application-development"
    },
    {
        image: "./assets/img/press/entrepreneur-magazine.png",
        url: "https://www.entrepreneur.com/article/314699"
    }
];

var partnerData = [
    {
        image: "./assets/img/partners/acticule.png",
        url: "http://acticule.com/"
    },
    {
        image: "./assets/img/partners/alpacian.png",
        url: "https://www.alpacian.com/"
    },
    {
        image: "./assets/img/partners/aptorum.png",
        url: "http://www.aptorumgroup.com/"
    },
    {
        image: "./assets/img/partners/ecovis.png",
        url: "https://www.ecovis.co.uk/"
    },
    {
        image: "./assets/img/partners/signate.png"
    },
    {
        image: "./assets/img/partners/tvm-china.png"
    },
    {
        image: "./assets/img/partners/videns.png",
        url: "http://videns-life.com/"
    },
    {
        image: "./assets/img/partners/coins-marketing.png",
        url: "http://www.coinsmarketing.com/"
    },
    {
        image: "./assets/img/partners/identity-mind.png",
        url: "https://identitymindglobal.com/"
    },
    {
        image: "./assets/img/partners/stevensons-lawyers.png"
    }
];

var mediaDataLoader = {
    getDom: function(imagePath, url = "") {
        if (url === "") {
            return `<li><img src="${imagePath}" /></li>`;
        }
        return `<li><a href="${url}"><img src="${imagePath}" /></a></li>`;
    },
    render: function(props) {
        var data = props.data || [];
        var selector = props.selector;
        var dom = "";
        for(let i = 0; i < data.length; i++) {
            dom += this.getDom(data[i].image, data[i].url);
        }
        $(selector).html(dom);
    }
};

var partnerDataLoader = {
    getDom: function(imagePath, url = "") {
        if (url === "") {
            return `<li><img src="${imagePath}" /></li>`;
        }
        return `<li><a href="${url}"><img src="${imagePath}" /></a></li>`;
    },
    render: function(props) {
        var data = props.data || [];
        var selector = props.selector;
        var dom = "";
        for(let i = 0; i < data.length; i++) {
            dom += this.getDom(data[i].image, data[i].url);
        }
        $(selector).html(dom);
    }
};

function openVideo (id) {
    var content = getVideoContent(data[id].url);
    initModal("", content);
}

function getDom(path, subtitle, id) {
    return `<div class="item" style="display:none;"><a href="#" onclick="openVideo(${id});" id="btn-video-${id}" data-toggle="modal" data-target="#modal-container"><img src="${path}" /><h3 class="subtitle">${subtitle}</h3></a></div>`;
}

var images = [];

function loadMore() {
    var endIndex = currentIndex + numItemEachRow;
    if (endIndex >= data.length) {
        endIndex = data.length;
    }
    for(let i = currentIndex; i < endIndex; i++) {
        images.push({
            id: i,
            path: data[i].path,
            subtitle: data[i].label,
            isInited: false,
            isCompleted: false,
            isAdded: false
        });
    }
    currentIndex = endIndex;
    startLoad();
}

function startLoad() {
    for(let i = 0; i < images.length; i++) {
        if (!images[i].isInited) {
            var tmpImg = new Image();
            tmpImg.src = images[i].path;
            tmpImg.onload = function() {
                images[i].isCompleted = true;
                if (checkAllImagesIsCompleted()) {
                    createDom();
                }
            };
            images[i].isInited = true;
            images[i].target = tmpImg;
        }
    }
}

function createDom() {
    var dom = "";
    for(let i = 0; i < images.length; i++) {
        if (images[i].isInited && images[i].isCompleted && !images[i].isAdded) {
            dom += getDom(images[i].path, images[i].subtitle, i);
            images[i].isAdded = true;
        }
    }
    $("#video-list").append(dom);

    $(".item:hidden").slideDown();
    checkIsLoadMoreButtonShown();
}

function checkIsLoadMoreButtonShown() {
    if (images.length !== data.length) {
        $(".btn-more-videos").show();
    } else {
        $(".btn-more-videos").hide();
    }
}

function checkAllImagesIsCompleted() {
    for(let i = 0; i < images.length; i++) {
        if (!images[i].isCompleted) {
            return false;
        }
    }
    return true;
}

function createPDF(selector, url) {
    PDFObject.embed(url, selector);
}

function getPDFContent(pdfUrl) {
    return `<div class="pdf-frame"><div id="pdfContainer"></div></div><script>createPDF("#pdfContainer", "${pdfUrl}")</script>`;
}

function getVideoContent(videoUrl) {
    return `<div class="popup-video-container"><div class="video-frame"><iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen=""></iframe></div></div>`;
}

function getLanguageSelector(languages, urls) {
    var listdom = "";
    for(let i = 0; i < languages.length; i++) {
        listdom += `<li class="nav-item">
        <a onclick="createPDF('#pdfContainer', '${urls[i]}')" class="nav-link" href="#">${languages[i]}</a>
        </li>`;
    }
    return `<ul class="nav justify-content-center languageSelector">
        ${listdom}
    </ul>`;
}

function getContributionsContent() {
    return `<table class="table">
                <thead>
                <tr>
                    <th scope="col">Restricted Individuals (Nationals or Residents of)</th>
                    <th scope="col">Hong Kong Residents</th>
                    <th scope="col">Rest of the World</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>United States of America (USA), <br> Independent State of Samoa (Samoa)</td>
                    <td>Proof of Identity: Passport or HKID</td>
                    <td>Proof of Identity: Passport</td>
                </tr>
                <tr>
                    <td>People's Republic of China</td>
                    <td>Proof of Address: Utility Bill or Bank Statement within the last three months</td>
                    <td>Proof of Address: Utility Bill or Bank Statement within the last three months</td>
                </tr>
                <tr>
                    <td>OFAC Sanctioned Countries * <a target="_blank" href="https://sanctionssearch.ofac.treas.gov/">https://sanctionssearch.ofac.treas.gov/</a>
                    </td>
                    <td>Proof of Wealth: 1 or combined statements indicating cash or equivalents, securities
                        (excluding Real Estate) in excess of HKD 8 mil
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>`;
}

function addChangeLanguageCallback(btnSelector, pdfSelector, url) {
    return `<script>
                $("${btnSelector}").on("click", function() {
                    createPDF("#${pdfSelector}", "${url}");
                })
            </script>`;
}

function initModal(title = "", content = "", hasMultipleLanguages = false) {
    $("#modal-container .modal-title").html(title);
    $("#modal-container #modal-body-content").html(content);
    console.log("hasMultipleLanguages", hasMultipleLanguages);
    if (hasMultipleLanguages) {
        $("#modal-container #modal-body-content").removeClass("no-langauge-bar");
    } else {
        $("#modal-container #modal-body-content").addClass("no-langauge-bar");
    }
}

var modalBtnCallback = [
    {
        btnSelector: "#btn-welcome-whitepaper",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/aenco-whitepaper.pdf",
            languages: [
                {
                    id: 'ENGLISH',
                    url: 'https://www.aencoin.com/assets/docs/aenco-whitepaper.pdf'
                },
                {
                    id: '中文',
                    url: 'https://www.aencoin.com/assets/docs/aenco-whitepaper-cn.pdf'
                }
            ]
        },
        title: "WHITEPAPER"
    },
    {
        btnSelector: "#btn-welcome-token-paper",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/aenco-token-economics.pdf",
            languages: [
                {
                    id: 'ENGLISH',
                    url: 'https://www.aencoin.com/assets/docs/aenco-token-economics.pdf'
                },
                {
                    id: '中文',
                    url: 'https://www.aencoin.com/assets/docs/aenco-token-economics-cn.pdf'
                }
            ]
        },
        title: "TOKEN PAPER"
    },
    {
        btnSelector: "#btn-two-pager",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/aenco-two-pager.pdf"
        },
        title: "TWO PAGER"
    },
    {
        btnSelector: "#btn-presentation",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/aenco-presentation.pdf"
        },
        title: "SLIDE PRESENTATION"
    },
    {
        btnSelector: "#btn-terms",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/aenco-terms-conditions.pdf"
        },
        title: "TERMS OF USE"
    },
    {
        btnSelector: "#btn-disclaimer",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/disclaimer.pdf"
        },
        title: "RISK DISCLAIMER"
    },
    {
        btnSelector: "#btn-policy",
        options: {
            type: 2,
            url: "https://www.aencoin.com/assets/docs/privacy-policy.pdf"
        },
        title: "PRIVACY POLICY"
    }
];

var contentMap = [];

function initCallback() {
    var html = "";
    var btnSelector;
    for(let i = 0; i < modalBtnCallback.length; i++) {
        var content = "";
        var options = modalBtnCallback[i].options;
        btnSelector = modalBtnCallback[i].btnSelector;
        var pdfUrl = options.url;
        var languages = [];
        var urls = [];
        if (options.languages) {
            for(let j = 0; j < options.languages.length; j++) {
                languages.push(options.languages[j].id);
                urls.push(options.languages[j].url);
            }
            content += getLanguageSelector(languages, urls);
        }
        content += getPDFContent(pdfUrl);
        contentMap.push(content);
        $(btnSelector).on("click", function() {
            var key = i;
            var title = modalBtnCallback[key].title || "";
            initModal(title, contentMap[key], modalBtnCallback[i].options.languages);
        });
    }

    $("#btn-video-core").on("click", function() {
        initModal("", getVideoContent("https://www.youtube.com/embed/Vv4lgRwoX08?rel=0"));
    });

    $("#btn-launch-video").on("click", function() {
        initModal("", getVideoContent("https://www.youtube.com/embed/qDYAOZP2dTg?rel=0"));
    });

    $("#btn-contributors").on("click", function() {
        initModal("", getContributionsContent());
    })
}

function getBreakPointsScale() {
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
}

function renderSlider() {
    var scale = getBreakPointsScale();
    $(".regular").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1400 * scale,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 1000 * scale,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 800 * scale,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
                breakpoint: 600 * scale,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            }
        ]
    });
}

$(function () {
    loadMore();
    initCallback();
})

$(function () {
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
    window.onresize = function(e) {
        render(window.innerWidth, window.innerHeight);
        if (isNumItemChanged()) {
            getMemberLoad("#team-member-list", "#btn-team-more", teamMemberData).loadMoreMembers();
            getMemberLoad("#advisor-list", "#btn-advisors-more", advisorsData).loadMoreMembers();
        }
    };
    render(window.innerWidth, window.innerHeight);

    renderSlider();

    mediaDataLoader.render({
        selector: "#media-list",
        data: mediaData
    });

    partnerDataLoader.render({
        selector: "#partner-list",
        data: partnerData
    });

    $("#navbarToggleExternalContent a").on("click", function() {
        $("#navbarToggleExternalContent").removeClass("show");
    });
});