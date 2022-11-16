if ('URLSearchParams' in window) {
    // console.log("Browser supports URLSearchParams");
} else {
    const polyfill = 'https://unpkg.com/@ungap/url-search-params@0.2.2/min.js';
    const polyfillScript = document.createElement('script');
    polyfillScript.setAttribute('src', polyfill);
    document.head.appendChild(polyfillScript);
}

const querystring = new URLSearchParams(window.location.search);
const params = Object.fromEntries(querystring.entries());

$('a').each(function() {
    const href = $(this).attr('href');
    let regexCheck = /\bmailto\b/;
    if(href && params // 👈 null and undefined check
    && Object.keys(params).length != 0
    && Object.getPrototypeOf(params) === Object.prototype
    && (href.indexOf('#') < 0  || href.indexOf('#') > 0 )&& !regexCheck.test(href)){
            const url = new URL(href);
            const linkQueryString = new URLSearchParams(url.search);
            const linkParams = Object.fromEntries(linkQueryString.entries());
            // merge
            const updatedParams = {
                ...params,
                ...linkParams
            }
            // update link
            let newLink = "https://" + url.host + url.pathname + url.hash;
            newLink = new URL(newLink);
            for (const property in updatedParams) {
                newLink.searchParams.set(property, updatedParams[property]);
            }
            $(this).attr('href', newLink)
    }
});