(function (window, document, scriptTag, dataLayerName, containerId) {
  'use strict';

  window[dataLayerName] = window[dataLayerName] || [];
  window[dataLayerName].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  var firstScript = document.getElementsByTagName(scriptTag)[0];
  var gtmScript = document.createElement(scriptTag);
  var dataLayerQuery = dataLayerName !== 'dataLayer' ? '&l=' + dataLayerName : '';

  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + containerId + dataLayerQuery;
  firstScript.parentNode.insertBefore(gtmScript, firstScript);
})(window, document, 'script', 'dataLayer', 'GTM-NQFMZTML');
