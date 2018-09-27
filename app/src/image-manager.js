const images = {
    "en": {
        "img0001": [
            "./assets/img/aenco-blockchain-en.png",
            "./assets/img/mobile/aenco-blockchain-en.m.png"
        ],
        "img0002": [
            "./assets/img/aenco-blockchain-platform-architecture-en.png",
            "./assets/img/mobile/aenco-blockchain-platform-architecture-en.m.png"
        ]
    },
    "zhcn": {
        "img0001": [
            "./assets/img/aenco-blockchain-cn.png",
            "./assets/img/mobile/aenco-blockchain-cn.m.png"
        ],
        "img0002": [
            "./assets/img/aenco-blockchain-platform-architecture-cn.png",
            "./assets/img/mobile/aenco-blockchain-platform-architecture-cn.m.png"
        ]
    },
    "kr": {
        "img0001": [
            "./assets/img/aenco-blockchain-kr.png",
            "./assets/img/mobile/aenco-blockchain-kr.m.png"
        ],
        "img0002": [
            "./assets/img/aenco-blockchain-platform-architecture-kr.png",
            "./assets/img/mobile/aenco-blockchain-platform-architecture-kr.m.png"
        ]
    },
    "jp": {
        "img0001": [
            "./assets/img/aenco-blockchain-en.png",
            "./assets/img/mobile/aenco-blockchain-en.m.png"
        ],
        "img0002": [
            "./assets/img/aenco-blockchain-platform-architecture-jp.png",
            "./assets/img/mobile/aenco-blockchain-platform-architecture-jp.m.png"
        ]
    }
};

const ImageManager = {
    getImagePath: function getImagePath(id, lang = "en", imageType = 0) {
        var imgLang = lang;
        if (!images[lang][id]) {
            imgLang = "en";
        }
        if (!images[imgLang][id]) {
            return "#";
        }
        return images[imgLang][id][imageType] ? images[imgLang][id][imageType] : images[lang][id][0];
    }
};

module.exports = ImageManager;