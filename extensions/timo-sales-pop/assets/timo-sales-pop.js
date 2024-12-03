(() => {
  console.log('🎅🎅🎅test test');
  const BASE_URL = 'https://localhost:3000/scripttag/index.min.js';
  const scriptElement = document.createElement('script');
  scriptElement.async = !0;
  scriptElement.src = BASE_URL;
  const firstScriptElement = document.getElementsByTagName('script')[0];
  firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
})();
