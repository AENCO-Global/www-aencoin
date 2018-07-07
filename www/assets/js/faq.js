function createPDF(selector, url) {
    PDFObject.embed(url, selector);
}

function getPDFContent(pdfUrl) {
    return `<div class="pdf-frame"><div id="pdfContainer"></div></div><script>createPDF("#pdfContainer", "${pdfUrl}")</script>`;
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
    if (hasMultipleLanguages) {
        $("#modal-container #modal-body-content").removeClass("no-langauge-bar");
    } else {
        $("#modal-container #modal-body-content").addClass("no-langauge-bar");
    }
}

var modalBtnCallback = [
    {
        btnSelector: ".btn-welcome-whitepaper",
        options: {
            type: 2,
            url: "./assets/docs/aenco-whitepaper.pdf",
            languages: [
                {
                    id: 'ENGLISH',
                    url: './assets/docs/aenco-whitepaper.pdf'
                },
                {
                    id: '中文',
                    url: './assets/docs/aenco-whitepaper-cn.pdf'
                }
            ]
        },
        title: "WHITEPAPER"
    },
    {
        btnSelector: ".btn-welcome-token-paper",
        options: {
            type: 2,
            url: "./assets/docs/aenco-token-economics.pdf",
            languages: [
                {
                    id: 'ENGLISH',
                    url: './assets/docs/aenco-token-economics.pdf'
                },
                {
                    id: '中文',
                    url: './assets/docs/aenco-token-economics-cn.pdf'
                }
            ]
        },
        title: "TOKEN PAPER"
    },
    {
        btnSelector: ".btn-two-pager",
        options: {
            type: 2,
            url: "./assets/docs/aenco-two-pager.pdf"
        },
        title: "TWO PAGER"
    },
    {
        btnSelector: ".btn-presentation",
        options: {
            type: 2,
            url: "./assets/docs/aenco-presentation.pdf"
        },
        title: "SLIDE PRESENTATION"
    },
    {
        btnSelector: ".btn-terms",
        options: {
            type: 2,
            url: "./assets/docs/aenco-terms-conditions.pdf"
        },
        title: "TERMS OF USE"
    },
    {
        btnSelector: ".btn-disclaimer",
        options: {
            type: 2,
            url: "./assets/docs/disclaimer.pdf"
        },
        title: "RISK DISCLAIMER"
    },
    {
        btnSelector: ".btn-policy",
        options: {
            type: 2,
            url: "./assets/docs/privacy-policy.pdf"
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
}

$(function () {
    initCallback();
})

$(function () {
    $("#navbarToggleExternalContent a").on("click", function() {
        $("#navbarToggleExternalContent").removeClass("show");
    });

    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > 80) {
            $(".header").css("background-color", "rgba(0,0,0,1)");
        } else {
            $(".header").css("background-color", "rgba(0,0,0," + st / 80 + ")");
        }
    });
});