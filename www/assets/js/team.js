var teamMemberData = [
    {
        name: 'Ian Huen',
        title: 'Co-Founder',
        image: './assets/img/profile/ian-huen.png',
        linkedin: 'https://www.linkedin.com/in/ianhuen/'
    },
    {
        name: 'Darren Lui',
        title: 'Co-Founder',
        image: './assets/img/profile/darren-lui.png',
        linkedin: 'https://www.linkedin.com/in/darren-lui/'
    },
    {
        name: 'Kenrick Fok',
        title: 'CFO',
        image: './assets/img/profile/kenrick-fok.png',
        linkedin: 'https://www.linkedin.com/in/kenrickfok/'
    },
    {
        name: 'Geoff Tipy',
        title: 'CTO',
        image: './assets/img/profile/geoffrey-tipton.png',
        linkedin: 'https://www.linkedin.com/in/geoff-tipy/'
    },
    {
        name: 'Charles Lau',
        title: 'Managing Director',
        image: './assets/img/profile/charles-lau.png',
        linkedin: 'https://www.linkedin.com/in/laucharles'
    },
    {
        name: 'Erica Chan',
        title: 'Head of Wealth Management',
        image: './assets/img/profile/erica-chan.png',
        linkedin: 'https://www.linkedin.com/in/erica-chan/'
    },
    {
        name: 'Isabella Lai',
        title: 'Senior Director',
        image: './assets/img/profile/isabella-lai.png',
        linkedin: 'https://www.linkedin.com/in/isabella-lai/'
    },
    {
        name: 'Teddy Ip',
        title: 'Senior Director',
        image: './assets/img/profile/teddy-ip.png',
        linkedin: 'https://www.linkedin.com/in/teddyip/'
    },
    {
        name: 'Nick Wan',
        title: 'Co-Investment Director',
        image: './assets/img/profile/nick-wan.png',
        linkedin: 'https://www.linkedin.com/in/nickhywan/'
    },
    {
        name: 'Calvin Poon',
        title: 'Co-Investment Director',
        image: './assets/img/profile/calvin-poon.png',
        linkedin: 'https://www.linkedin.com/in/calvin-poon/'
    },
    {
        name: 'Ally Cheung',
        title: 'Head of Community Management',
        image: './assets/img/profile/ally-cheung.png',
        linkedin: 'https://www.linkedin.com/in/allycheung/'
    },
    {
        name: 'David Carey',
        title: 'Senior Cloud Engineer',
        image: './assets/img/profile/david-carey.png',
        linkedin: 'https://www.linkedin.com/in/david-carey/'
    },
    {
        name: 'Aaron Regala',
        title: 'BUsiness Analyst',
        image: './assets/img/profile/aaron-regala.png',
        linkedin: 'https://www.linkedin.com/in/aaron-regala/'
    },
    {
        name: 'Andy Chan',
        title: 'Head of Insurance',
        image: './assets/img/profile/andy-chan.png',
        linkedin: 'https://www.linkedin.com/in/atmchan/'
    },
    {
        name: 'Michelle Au',
        title: 'Designer',
        image: './assets/img/profile/michelle-au.png',
        linkedin: ''
    },
    {
        name: 'Issac Cheung',
        title: 'Full-stack Developer',
        image: './assets/img/profile/issac-cheung.png',
        linkedin: 'https://www.linkedin.com/in/issac-cheung-6b02a1147/'
    }
];

var advisorsData = [
    {
        name: 'Professor Douglas W. Arner',
        title: 'Senior Regulatory and Strategic Advisor',
        image: './assets/img/profile/doug-arner.png',
        linkedin: 'http://www.law.hku.hk/faculty/staff/arner_douglas.php'
    },
    {
        name: 'Virginia Lam',
        title: 'Marketing Advisor',
        image: './assets/img/profile/virginia-lam.png',
        linkedin: 'https://www.linkedin.com/in/lamvirginia/'
    },
    {
        name: 'Douglas Ching',
        title: 'Marketing Advisor',
        image: './assets/img/profile/douglas-ching.png',
        linkedin: 'https://www.linkedin.com/in/dougching/'
    },
    {
        name: 'Dr. S.M. Yiu',
        title: 'Advisor',
        image: './assets/img/profile/sm-yiu.png',
        linkedin: 'https://www.cs.hku.hk/people/profile.jsp?teacher=smyiu'
    },
    {
        name: 'Jeff Marquass',
        title: 'Advisor',
        image: './assets/img/profile/jeff-marquass.png',
        linkedin: 'https://www.linkedin.com/in/jeff-marquass-4a37995'
    },
    {
        name: 'Dr. Albert Leung',
        title: 'Advisor',
        image: './assets/img/profile/albert-leung.png',
        linkedin: 'https://www.bloomberg.com/research/stocks/people/person.asp?personId=53151654&amp;capId=883253&amp;previousCapId=141391086&amp;previousTitle=GOLDENWAY%20INC'
    },
    {
        name: 'Dr. Kenny Yu',
        title: 'Advisor',
        image: './assets/img/profile/kenny-yu.png',
        linkedin: 'https://www.researchgate.net/profile/Kenny_Yu'
    },
    {
        name: 'Dr. Owen Ko',
        title: 'Advisor',
        image: './assets/img/profile/owen-ko.png',
        linkedin: 'http://www.mect.cuhk.edu.hk/people/owenko.html'
    }
];

var currentNumItems = getNumItemEachRow();

function isNumItemChanged() {
    return getNumItemEachRow() !== currentNumItems;
}

function getNumItemEachRow () {
    var aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio <= 600 / 1012) {
        return 1;
    }
    else if (aspectRatio <= 1000 / 1012) {
        return 2;
    }
    else if (aspectRatio <= 1400 / 1012) {
        return 3;
    }
    return 4;
}

var teamList = {};

function getMemberLoad(selector, btnSelector, data) {
    if (!teamList[selector]) {
        teamList[selector] = memberLoad(selector, btnSelector, data);
    }
    return teamList[selector];
}

function memberLoad(selector, btnSelector, data) {
    return {
        element: $(selector),
        btnElement: $(btnSelector),
        memberCurrentIndex: 0,
        memberImages: [],
        memberData: data,
        getDom: function getDom(name, title, imagePath, linkedUrl) {
            return `<div class="team-round" style="display:none;">
                        <div class="profile">
                            <div class="img">
                                <img src="${imagePath}" alt="${name}">
                                <ul class="social">
                                    <li><a target="_blank" href="${linkedUrl}"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                            <div class="name">${name}</div>
                            <div class="title">${title}</div>
                        </div>
                    </div>`;
        },
        loadMoreMembers: function loadMoreMembers() {
            var that = this;
            var numItemPerRow = getNumItemEachRow();
            currentNumItems = numItemPerRow;
            var offset = that.memberCurrentIndex % numItemPerRow;
            var endIndex = that.memberCurrentIndex + numItemPerRow - offset;
            if (endIndex >= that.memberData.length) {
                endIndex = that.memberData.length;
            }
            for(let i = that.memberCurrentIndex; i < endIndex; i++) {
                that.memberImages.push({
                    id: i,
                    path: that.memberData[i].image,
                    isInited: false,
                    isCompleted: false,
                    isAdded: false
                });
            }
            that.memberCurrentIndex = endIndex;
            that.startLoad();
        },
        startLoad: function startLoad() {
            var that = this;
            for(let i = 0; i < that.memberImages.length; i++) {
                if (!that.memberImages[i].isInited) {
                    var tmpImg = new Image();
                    tmpImg.src = that.memberImages[i].path;
                    tmpImg.onload = function() {
                        that.memberImages[i].isCompleted = true;
                        if (that.checkAllImagesIsCompleted()) {
                            that.createDom();
                        }
                    };
                    tmpImg.onerror = function() {
                        that.memberImages[i].isCompleted = true;
                        if (that.checkAllImagesIsCompleted()) {
                            that.createDom();
                        }
                    }
                    that.memberImages[i].isInited = true;
                    that.memberImages[i].target = tmpImg;
                }
            }
        },
        createDom: function createDom() {
            var dom = "";
            for(let i = 0; i < this.memberImages.length; i++) {
                if (this.memberImages[i].isInited && this.memberImages[i].isCompleted && !this.memberImages[i].isAdded) {
                    dom += this.getDom(this.memberData[i].name, this.memberData[i].title, this.memberData[i].image, this.memberData[i].linkedin);
                    this.memberImages[i].isAdded = true;
                }
            }
            this.element.append(dom);
        
            this.element.find(".team-round:hidden").slideDown();
            this.checkIsLoadMoreButtonShown();
        },
        checkIsLoadMoreButtonShown: function checkIsLoadMoreButtonShown() {
            if (this.memberImages.length !== this.memberData.length) {
                this.btnElement.show();
            } else {
                this.btnElement.hide();
            }
        },
        checkAllImagesIsCompleted: function checkAllImagesIsCompleted() {
            for(let i = 0; i < this.memberImages.length; i++) {
                if (!this.memberImages[i].isCompleted) {
                    return false;
                }
            }
            return true;
        }
    };
}

$(function () {
    getMemberLoad("#team-member-list", "#btn-team-more", teamMemberData).loadMoreMembers();
    getMemberLoad("#advisor-list", "#btn-advisors-more", advisorsData).loadMoreMembers();
});