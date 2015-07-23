function rem(){
    var h;
    var dpr = window.navigator.appVersion.match(/iphone/gi)?window.devicePixelRatio:1;
    var scale = 1 / dpr;
    var docEl = document.documentElement;
    var metaEl = document.createElement('meta');

    function setUnitA(){
        window.rem = docEl.getBoundingClientRect().width / 16;
        console.log('rem:' + window.rem);
        docEl.style.fontSize = window.rem + 'px';
    }

    window.dpr = dpr;
    window.addEventListener('resize', function() {
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
    }, false);
    document.addEventListener('click', function() {
        console.log('click');
    }, false);
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(h);
            h = setTimeout(setUnitA, 300);
        }
    }, false);

    docEl.setAttribute('data-dpr', dpr);
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = document.createElement('div');
        wrap.appendChild(metaEl);
        // document.write(wrap.innerHTML);
        console.log(wrap.innerHTML);
    }

    setUnitA();
}

rem();
