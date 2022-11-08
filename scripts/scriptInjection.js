const domains = {
    client: {
        production: 'https://cdn-push.littlebigthings.dev/',
        staging: 'https://teachables-black-friday-20-22.webflow.io/'
    },
    cdn: {
        production: 'https://blackfriday-2022-main.littlebigthings.dev',
        staging: 'https://teachable-bf-2022-staging.littlebigthings.dev',
        // keep localstorage "devLocal: as the url" to develop in local for staging;
    },
    scriptPath: {
        production: 'scripts',
        staging: 'scripts',
        local: 'scripts'
    }
};

const scriptMap = {
    production: {
        '^(\/)$': ['feature-dropdown.js', 'priceChange.js', 'slider.js'],
        // basic monthly page
        '(\/pro\/)': ['slider.js'],
        // Basic annual page
        '(\/pro-annual\/)': ['slider.js'],
        // scripts goes in all pages.
        'all': ['queryforwarding.js', 'timer.js', 'animate-faq.js',],
    },
    staging: {
        '^(\/)$': ['feature-dropdown.js', 'priceChange.js', 'slider.js'],
        // basic monthly page
        '(\/pro\/)': ['slider.js'],
        // Basic annual page
        '(\/pro-annual\/)': ['slider.js'],
        // scripts goes in all pages.
        'all': ['queryforwarding.js', 'timer.js', 'animate-faq.js',],
    },
    local: {
        '^(\/)$': ['feature-dropdown.js', 'priceChange.js', 'slider.js'],
        // basic monthly page
        '(\/pro\/)': ['slider.js'],
        // Basic annual page
        '(\/pro-annual\/)': ['slider.js'],
        // scripts goes in all pages.
        'all': ['queryforwarding.js', 'timer.js', 'animate-faq.js',],
    }

}


// Class for Injection
class CdnInject {
    constructor(domains, scriptMap) {
        this.env = null;
        this.devLocal = null;
        this.cdnUrl = null;
        this.domains = domains;
        this.scriptMap = scriptMap;
        this.scriptsForPage = [];
        this.scriptPathList = this.domains.scriptPath;
        this.scriptPath = null;
        this.pageDomain = window.location.host;
        this.currentPagePath = window.location.pathname;

        // set env
        this.setEnv();

        // filtered path regex
        let filteredPath = this.filterPath(this.currentPagePath);
        // injection
        // find current path pattern in map

        filteredPath.forEach(path => {
            this.scriptsForPage.push(this.scriptMap[this.env][path]);
        })
        if (this.scriptsForPage) {
            // console.log("Script exists")
            this.loadScript();
        } else {
            // console.log("no scripts founds nothing gets loaded")
        }

    }

    setEnv() {
        const localUrl = window.localStorage.getItem("devLocal");
        this.devLocal = localUrl;
        if (this.devLocal) {
            this.env = 'local';
            this.cdnUrl = this.devLocal;
            this.cdnUrl = new URL(this.cdnUrl);
            this.scriptPath = this.scriptPathList.local;
        } else {
            if (!domains || typeof (domains) != "object" || Object.keys(domains).length < 0) {
                throw 'Domains not found';
            } else {
                // check domains
                this.stagingUrl = new URL(this.domains.client.staging);
                this.productionUrl = new URL(this.domains.client.production);
                // console.log("urls", this.stagingUrl.host, this.productionUrl.host);
                if (this.productionUrl.host === this.pageDomain) {
                    // console.log(domains);
                    this.env = 'production';
                    this.cdnUrl = new URL(this.domains.cdn.production);
                    this.scriptPath = this.scriptPathList.production;
                } else if (this.stagingUrl.host === this.pageDomain) {
                    this.env = 'staging';
                    this.cdnUrl = new URL(this.domains.cdn.staging);
                    this.scriptPath = this.scriptPathList.staging;
                }
            }

        }
    }

    injectScript(src) {
        return new Promise((resolve, reject) => {
            // console.log('Src', src);
            const script = document.createElement('script');
            script.setAttribute('type', 'module')
            script.src = src;
            script.addEventListener('load', evt => resolve(evt.target));
            script.addEventListener('error', e => reject(e.error));
            document.body.appendChild(script);
        });
    }


    loadScript() {

        this.scriptsForPage.forEach(scriptsToLoad => {
            scriptsToLoad.forEach(script => {
                let scriptToLoad = null;
                if (this.devLocal) {
                    scriptToLoad = `http://${this.cdnUrl.host}/${this.scriptPath}/${script}`
                } else {
                    scriptToLoad = `https://${this.cdnUrl.host}/${this.scriptPath}/${script}`
                }
                
                this.injectScript(scriptToLoad)
                    .then((scriptToLoad) => {
                        console.log('Script loaded! ', scriptToLoad);
                    }).catch(error => {
                        // console.error(error);
                    });
            })
        })
    }

    filterPath(currentPath) {
        let matchedUrl = Object.keys(this.scriptMap[this.env]).filter(url => {
            let regexData = new RegExp(url);
            if (regexData.test(currentPath)) {
                return url;
            }
            else if (regexData == '/all/') {
                return url;
            }
        })
        return matchedUrl;
    }

}

const checkLocalDev = new CdnInject(domains, scriptMap);

// note: remove the first / and last / on the regex expression because we can't add regex expressions as object key's we need to add them as string and while converting it back to regex it won't be same so to prevent this to happen remove the /.
