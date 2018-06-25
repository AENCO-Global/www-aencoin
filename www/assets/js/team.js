var teamMemberData = [
    {
        name: 'Ian Huen',
        title: 'Co-Founder',
        image: './assets/img/profile/ian-huen.png',
        linkedin: 'https://www.linkedin.com/in/ianhuen/',
        id: 1
    },
    {
        name: 'Darren Lui',
        title: 'Co-Founder',
        image: './assets/img/profile/darren-lui.png',
        linkedin: 'https://www.linkedin.com/in/darren-lui/',
        id: 2,
        desc: '<ul><li>Co-Founder of Aptorum Group Limited, a biotech platform</li><li>Co-Founder of Aeneas Group -Former Founder and Director at Varengold Capital, a HK based regulated asset manager and prime broker</li><li>Former Director at Barclays Capital, Barclays Bank PLC. London, Singapore and New York offices</li><li>Qualified Chartered Accountant (ICAS) at Ernst & Young LLP(UK)</li><li>CFA Charterholder<li><li>Associate of Chartered Institute of Securities & Investments</li><li>First Class Honours BSc in Biochemistry, Imperial College London</li></ul>'
    },
    {
        name: 'Kenrick Fok',
        title: 'CFO',
        image: './assets/img/profile/kenrick-fok.png',
        linkedin: 'https://www.linkedin.com/in/kenrickfok/',
        id: 3
    },
    {
        name: 'Geoff Tipy',
        title: 'CTO',
        image: './assets/img/profile/geoffrey-tipton.png',
        linkedin: 'https://www.linkedin.com/in/geoff-tipy/',
        id: 4
    },
    {
        name: 'Charles Lau',
        title: 'Managing Director',
        image: './assets/img/profile/charles-lau.png',
        linkedin: 'https://www.linkedin.com/in/laucharles',
        id: 5
    },
    {
        name: 'Erica Chan',
        title: 'Head of Wealth Management',
        image: './assets/img/profile/erica-chan.png',
        linkedin: 'https://www.linkedin.com/in/erica-chan/',
        id: 6
    },
    {
        name: 'Isabella Lai',
        title: 'Senior Director',
        image: './assets/img/profile/isabella-lai.png',
        linkedin: 'https://www.linkedin.com/in/isabella-lai/',
        id: 7
    },
    {
        name: 'Teddy Ip',
        title: 'Senior Director',
        image: './assets/img/profile/teddy-ip.png',
        linkedin: 'https://www.linkedin.com/in/teddyip/',
        id: 8
    },
    {
        name: 'Nick Wan',
        title: 'Co-Investment Director',
        image: './assets/img/profile/nick-wan.png',
        linkedin: 'https://www.linkedin.com/in/nickhywan/',
        id: 9
    },
    {
        name: 'Calvin Poon',
        title: 'Co-Investment Director',
        image: './assets/img/profile/calvin-poon.png',
        linkedin: 'https://www.linkedin.com/in/calvin-poon/',
        id: 10
    },
    {
        name: 'Ally Cheung',
        title: 'Head of Community Management',
        image: './assets/img/profile/ally-cheung.png',
        linkedin: 'https://www.linkedin.com/in/allycheung/',
        id: 11
    },
    {
        name: 'David Carey',
        title: 'Senior Cloud Engineer',
        image: './assets/img/profile/david-carey.png',
        linkedin: 'https://www.linkedin.com/in/david-carey/',
        id: 12
    },
    {
        name: 'Aaron Regala',
        title: 'BUsiness Analyst',
        image: './assets/img/profile/aaron-regala.png',
        linkedin: 'https://www.linkedin.com/in/aaron-regala/',
        id: 13
    },
    {
        name: 'Andy Chan',
        title: 'Head of Insurance',
        image: './assets/img/profile/andy-chan.png',
        linkedin: 'https://www.linkedin.com/in/atmchan/',
        id: 14
    },
    {
        name: 'Michelle Au',
        title: 'Designer',
        image: './assets/img/profile/michelle-au.png',
        linkedin: '',
        id: 15
    },
    {
        name: 'Issac Cheung',
        title: 'Full-stack Developer',
        image: './assets/img/profile/issac-cheung.png',
        linkedin: 'https://www.linkedin.com/in/issac-cheung-6b02a1147/',
        id: 16
    }
];

var advisorsData = [
    {
        name: 'Professor Douglas W. Arner',
        title: 'Senior Regulatory and Strategic Advisor',
        image: './assets/img/profile/doug-arner.png',
        linkedin: 'http://www.law.hku.hk/faculty/staff/arner_douglas.php',
        id: 1,
        desc: [
            'Director of HOYA Surgical Optics, a specialist provider of ophthalmologists with high-quality intraocular lenses for use in the treatment of cataracts for over 25 years',
            'Former Vice President Business Development at Advanced First Aid Research, a medical device company focused on wound care product development;',
            'Former Managing Director at Vendor Management Consulting Asia, a boutique consulting firm connecting European medical devices, pharma, biotech, and FMCG companies with Asia',
            'Master Business Administration, University of Melbourne.'
        ]
    },
    {
        name: 'Julian Ting',
        title: 'Advisor',
        image: './assets/img/profile/julian-ting.png',
        linkedin: 'https://www.linkedin.com/in/julianywting/',
        id: 2,
        desc: [
            'Former General Manager at Innovative Diagnostics, a leading Asian pathology diagnostic group',
            'Formerly worked at Grange Partners in Singapore, a family office backed institution focusing on Southeast Asian Private Equity',
            'Formerly held positions at HSBC Private Wealth Solutions and ECM Libra Investment Bank',
            'Masters in Business Administration (MBA) from Columbia Business School (Dean’s Honors); Private Equity Fellow',
            'Bachelor of Laws – LLB (Hons) Programme from London School of Economics.'
        ]
    },
    {
        name: 'Dr. Kenny Yu',
        title: 'Advisor',
        image: './assets/img/profile/kenny-yu.png',
        linkedin: 'https://www.researchgate.net/profile/Kenny_Yu',
        id: 3,
        desc: [
            'Clinical Research Fellow at the Salford Royal NHS Foundation Trust in the UK',
            'PhD at The University of Manchester – Faculty of Medical and Human Sciences – Stem Cell and Neurotherapies Laboratory',
            'Key areas of research interests include Cancer Biology, Oncology, Cell Culture, Genetic Engineering, Neurosurgery, and Cancer Immunology',
            'Neurosurgeon at The University of Manchester'
        ]
    },
    {
        name: 'Dr. William Wu',
        title: 'Advisor',
        image: './assets/img/profile/william-wu.png',
        linkedin: 'https://www.lihs.cuhk.edu.hk/en-us/research/investigators/wu,kakeiwilliam.aspx',
        id: 4,
        desc: [
            'Assistant Professor at the Department of Anesthesia and Intensive Care at The Chinese University of Hong Kong;',
            'Expert in molecular pharmacology and toxicology',
            'Has published extensively in cancer biomarker diagnostics and novel therapeutics; Published more than 150 internationally recognized, peerreviewed articles in top international journals, including Nature Communications, Autophagy, Cell Research, Cancer Research with an h-index of 40, and four book chapters',
            'Earned his fellowship in the Royal College of Pathologists (FRCPath), and has been awarded the First-Class Higher Education Outstanding Scientific Research Output Award (Natural Science) by the Ministry of Education of China',
            'PhD in Medical Sciences from CUHK and received post-doctoral training in the Institute of Digestive Diseases, CUHK afterwards.'
        ]
    },
    {
        name: 'Dr. Sunny Wong',
        title: 'Advisor',
        image: './assets/img/profile/sunny-wong.png',
        linkedin: 'http://www.mect.cuhk.edu.hk/people/sunnywong.html',
        id: 5,
        desc: [
            'Assistant Professor in the Department of Medicine and Therapeutics at The Chinese University of Hong Kong;',
            'Principal investigator at the Li Ka Shing Institute of Health Science, the Institute of Digestive Disease and the State Key Laboratory of Digestive Disease;',
            'A clinician-scientist with expertise in hostmicrobe dynamics, in diseases including digestive cancers, mycobacterial and Clostridium difficile infections;',
            'Published 50+ peer-reviewed papers in top journals, including the New England Journal of Medicine and Nature Genetics;',
            'Investigator in multi-centered epidemiological studies, phase 2/3 drug trials.'
        ]
    },
    {
        name: 'Dr. Albert Leung',
        title: 'Advisor',
        image: './assets/img/profile/albert-leung.png',
        linkedin: 'https://www.bloomberg.com/research/stocks/people/person.asp?personId=53151654&amp;capId=883253&amp;previousCapId=141391086&amp;previousTitle=GOLDENWAY%20INC',
        id: 6,
        desc: [
            'Financial and Business Development Consultant of Beauchamp International Development Limited based in Hong Kong',
            'Former Assistant Vice President at Citicorp International in Hong Kong and engaging in major IPO corporate finance matters;',
            '10 years of experience in accounting and auditing in accounting firms in England between 1977 and 1987;',
            'Currently an Independent Non-Executive Director of various public companies listed on the Hong Kong Stock Exchange',
            'Director of the Hong Kong Kidney Foundation;',
            'PhD (Economics), Shanghai University of Finance & Economics',
            'MBA, Henley Business School, Brunel University (England);',
            'Member of the Hong Kong Institute of Certified Public Accountants.'
        ]
    },
    {
        name: 'Dr. Kwok Ka Wai',
        title: 'Advisor',
        image: './assets/img/profile/kwok-ka-wai.png',
        linkedin: '#',
        id: 7,
        desc: [
            'Assistant Professor in the Department of Mechanical Engineering at The University of Hong Kong',
            'Research focuses on image-guided robotic surgeries and their associated master-slave control interfaces',
            'PhD in Computing from Imperial College London',
            'BEng and MPhil degrees in Automation and Computer-Aided Engineering, The Chinese University of Hong Kong',
            'Recipient of the Croucher Foundation Fellowship, which currently supported his postdoctoral research jointly hosted by University of Georgia, and Brigham and',
            'Women’s Hospital - Harvard Medical School.'
        ]
    },
    {
        name: 'Joe Hui',
        title: 'Advisor',
        image: './assets/img/profile/joe-hui.png',
        linkedin: 'https://icb.hkuspace.hku.hk/chs/staff/detail/joe-hui',
        id: 8,
        desc: [
            'Investment Director, Quantitative Strategies, Eagle Eye Group;',
            'Guest speaker at the Institute for China Business, HKU Space',
            'Guest speaker at HanQing Advanced Institute of Economics and Finance , Renmin University of China',
            'Former Chief Investment Advisor of JLPAY China',
            'Former quantitative investment consultant roles for Hong Kong and China funds',
            'Former Senior Researcher Fellow at the Faculty of Engineering, The University of Hong Kong; Key research interests include quantitative finance, blockchain technologies, and artificial intelligence',
            'Master of Finance, Tsinghua University (Beijing).'
        ]
    },
    {
        name: 'Dr. Owen Ko',
        title: 'Advisor',
        image: './assets/img/profile/owen-ko.png',
        linkedin: 'http://www.mect.cuhk.edu.hk/people/owenko.html',
        id: 9,
        desc: [
            'Clinical Lecturer in the Department of Medicine and Therapeutics at The Chinese University of Hong Kong (“CUHK”);',
            'Published two first authored Nature papers and one first authored Nature Neuroscience paper',
            'Bachelor of Medicine and Bachelor of Surgery Programme (MBChB) at CUHK in 2005. Bachelor of Medical Sciences (BMedSci) under the mentorship of Professor Wing-ho Yung in the School of Biomedical Sciences',
            'PhD programme in Neuroscience at University College London (UCL) under the guidance of Professor Thomas Mrsic-Flogel. His breakthrough research has led to his Runnerup Award of the Eppendorf & Science Prize for Neurobiology as the first awardee in Hong Kong.'
        ]
    },
    {
        name: 'Shell Chung',
        title: 'Advisor',
        image: './assets/img/profile/shell-chung.png',
        linkedin: 'https://www.alpacian.com/',
        id: 10,
        desc: [
            'Security Consultant at Alpacian Limited, a Hong Kong based enterprise I.T. security firm',
            'Information Security & Computer Forensics Specialist',
            'Expertise in web & mobile application security assessment',
            'Providing professional advisory to listed company or corporate in Information Security & Technical issues',
            'Familiar with Information Security Risk Management framework, incident response & computer forensics investigations'
        ]
    },
    {
        name: 'Dr. Kevin Chan',
        title: 'Advisor',
        image: './assets/img/profile/kevin-chan.png',
        linkedin: 'http://www.cachetam.com/en/management.php',
        id: 11,
        desc: [
            '20 years of experience in finance and asset management;',
            'Currently a Managing Director at Cachet Asset Management, a firm that offers proprietary hedge funds, private equities, and direct investment opportunities for investors',
            'Formerly a Managing Partner at Cornucopia Capital Partners',
            'Has held positions at Goldman Sachs Asset Management in New York City, and Sparx Asset Management (Tokyo) as a Research and Quantitative Analyst',
            'Holds dual degrees from the University of Pennsylvania in Management and Technology',
            'PhD in Financial Economics from Massachusetts Institute of Technology'
        ]
    },
    {
        name: 'Jason Yau',
        title: 'Advisor',
        image: './assets/img/profile/jason-yau.png',
        linkedin: 'https://www.linkedin.com/in/jasonctyau/',
        id: 12,
        desc: [
            'Partner at St. James’s Place Wealth Management – Asia based in Hong Kong; Services Hong Kong’s top local lawyers as well as some of the most recognizable international law firms and established barrister chambers in the locale',
            'Former Financial Planning Analyst with Fisher Investments UK, engaging in client on-boarding, sales support functions, income strategies and tax planning, pension transfers and portfolio consolidation',
            'Former Wealth Management Advisor at Intrinsic Financial Services and other financial advisory roles based in London, UK.',
            'B.A. – Business from the University of Brighton'
        ]
    },
    {
        name: 'Virginia Lam',
        title: 'Marketing Advisor',
        image: './assets/img/profile/virginia-lam.png',
        linkedin: 'https://www.linkedin.com/in/lamvirginia/',
        id: 13,
        desc: [
            '15 years of marketing experience in startups-turned-listed-companies;Passion for blockchain innovations',
            'Co-Founder of COINS Marketing, a partner for fintech and blockchain projects',
            'Head of Marketing at Xbrick, a global crypto currency exchange owned by X Blockchain Pty Ltd, a blockchain technology company headquartered in Sydney, Australia',
            'Marketing Lead at The Abyss, a crypto reward ecosystem for gamers and developers',
            'Co-Founder of V Partnership, a digital marketing agency',
            'Former Marketing Director at Ensogo Limited (ASX: E88), operator of ecommerce businesses across Asia',
            'BA – University of Sydney, English and Psychology.'
        ]
    },
    {
        name: 'Douglas Ching',
        title: 'Marketing Advisor',
        image: './assets/img/profile/douglas-ching.png',
        linkedin: 'https://www.linkedin.com/in/dougching/',
        id: 14,
        desc: [
            'Over 20 years of marketing experience including digital marketing and social media marketing across the ecommerce and consumer electronics industries',
            'Co-Founder of two marketing agencies under OOKEA Group: Coins Marketing (Token sale consultant agency) and V Partnership (Digital marketing agency)',
            'Former General Manager at Ensogo Limited (ASX:E88), established China headquarters',
            'Marketing Lead at The Abyss, a crypto reward ecosystem for gamers and developers',
            'Qualified Google Analytics Individual; Cisco CCNA; Microsoft MCSE + MCDBA',
            'BA – Economics, University of Toronto, Canada'
        ]
    }
];

var currentNumItems = getNumItemEachRow();

function isNumItemChanged() {
    return getNumItemEachRow() !== currentNumItems;
}

function getNumItemEachRow () {
    return 8;
}

var teamList = {};

function getMemberLoad(selector, btnSelector, data, type) {
    if (!teamList[selector]) {
        teamList[selector] = memberLoad(selector, btnSelector, data, type);
    }
    return teamList[selector];
}

function showDetailInfo(id, type) {
    var data = teamMemberData;
    var memberData = {};
    if (type === 2) {
        data = advisorsData;
    }
    for(let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            memberData = data[i];
            break;
        }
    }
    var content = getMemberDetailedInfo(memberData.image, memberData.name, memberData.title, memberData.desc);
    initModal("", content, false, "team-member-popup");
}

function memberLoad(selector, btnSelector, data, type) {
    return {
        element: $(selector),
        btnElement: $(btnSelector),
        memberCurrentIndex: 0,
        memberImages: [],
        memberData: data,
        type: type,
        getDom: function getDom(name, title, imagePath, linkedUrl, id, type) {
            if (type == 2) {
                return `<div class="team-round" style="display:none;">
                        <div class="profile">
                            <div class="img">
                                <img src="${imagePath}" alt="${name}">
                                <ul class="social">
                                    <li><a href="#" data-toggle="modal" data-target="#modal-container" onclick="showDetailInfo(${id}, ${type});"><div class="icon icon-profile"></div></a></li>
                                    <li><a target="_blank" href="${linkedUrl}"><div class="icon icon-linkedin"></div></a><div class="clear"></div></li>
                                </ul>
                            </div>
                            <div class="name">${name}</div>
                            <div class="title">${title}</div>
                        </div>
                    </div>`;
            } else {
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
            }
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
                    dom += this.getDom(this.memberData[i].name, this.memberData[i].title, this.memberData[i].image, this.memberData[i].linkedin, this.memberData[i].id, this.type);
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
    getMemberLoad("#team-member-list", "#btn-team-more", teamMemberData, 1).loadMoreMembers();
    getMemberLoad("#advisor-list", "#btn-advisors-more", advisorsData, 2).loadMoreMembers();
});