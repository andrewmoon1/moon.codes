import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;

const createTrackingScript = () => process.env.GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(process.env.GOOGLE_ANALYTICS_ID) : '';

const createAnalyticsSnippet = id =>
  `<style>.async-hide { opacity: 0 !important} </style>
<script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
})(window,document.documentElement,'async-hide','dataLayer',4000,
{'GTM-NGHSPJV':true});</script>
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('require', 'GTM-NGHSPJV');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createStylesheets = () => `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`;

export { createAppScript, createTrackingScript, createStylesheets };
