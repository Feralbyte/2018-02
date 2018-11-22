WebFontConfig = {
    google: { families: ['Concert One'] }
};

function loadWebFontScript() {
    let protocol = document.location.protocol == 'https:' ? 'https' : 'http';
    
    let googleWebFont = document.createElement('script');
    googleWebFont.src = `${protocol}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    googleWebFont.type = 'text/javascript';
    googleWebFont.async = 'true';
    
    let script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(googleWebFont, script);
}

loadWebFontScript();
console.log('Google custom web font Concert One loaded.');