export interface RiskItem {
  id: string;
  titleBn: string;
  titleEn: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  descriptionBn: string;
  descriptionEn: string;
  technicalImpactBn: string;
  technicalImpactEn: string;
  solutionBn: string;
  solutionEn: string;
  codeSnippet?: string;
}

export interface MetricCard {
  labelBn: string;
  labelEn: string;
  score: string;
  benchmark: string;
  verdictBn: string;
  verdictEn: string;
  status: 'optimal' | 'warning' | 'caution';
}

export const ARCHITECTURE_METRICS: MetricCard[] = [
  {
    labelBn: 'ডেভেলপমেন্ট স্পিড ও মেইনটেইনেবিলিটি',
    labelEn: 'Developer Velocity & Maintainability',
    score: '৯৮%',
    benchmark: 'Industry Top Tier',
    verdictBn: 'ব্লগার XML কোড আর কখনো হাত দিতে হবে না; গিটহাব পুশেই লাইভ আপডেট।',
    verdictEn: 'Zero Blogger template tampering needed; Git push deploys instantaneously.',
    status: 'optimal'
  },
  {
    labelBn: 'কোড সিকিউরিটি ও সিনট্যাক্স আইসোলেশন',
    labelEn: 'Code Security & Syntax Isolation',
    score: '৯৫%',
    benchmark: 'Zero XML Conflicts',
    verdictBn: 'React/Vite/Webpack বান্ডল ব্লগের XML পার্সার দ্বারা কখনো করাপ্ট হবে না।',
    verdictEn: 'Complex bundler outputs will never trigger Blogger XML entity parse errors.',
    status: 'optimal'
  },
  {
    labelBn: 'এসইও ও অর্গানিক ইনডেক্সিং সক্ষমতা',
    labelEn: 'Organic SEO & Indexability',
    score: '৪২%',
    benchmark: 'High Vulnerability without Meta',
    verdictBn: 'সতর্কতা: সঠিক মেটাট্যাগ ও ফলব্যাক না থাকলে ব্লগের ডোমেইন গুগল সার্চে ফাঁকা দেখাবে।',
    verdictEn: 'Risk of empty indexing: Googlebot crawls Blogger shell, not dynamic iframe contents.',
    status: 'warning'
  },
  {
    labelBn: 'মোবাইল ইউজার এক্সপেরিয়েন্স ও ভিউপোর্ট',
    labelEn: 'Mobile Touch & Viewport Stability',
    score: '৭৮%',
    benchmark: 'Requires 100dvh CSS',
    verdictBn: 'সাধারণ 100vh দিলে মোবাইলে অ্যাড্রেস বারের কারণে স্ক্রোল ঝাঁকুনি হবে।',
    verdictEn: 'Standard 100vh produces Safari/Chrome address-bar jump; requires dynamic dvh.',
    status: 'caution'
  }
];

export const TECHNICAL_RISKS: RiskItem[] = [
  {
    id: 'seo-penalty',
    titleBn: '১. এসইও ও সার্চ ইনডেক্সিং ফাঁদ (The SEO Black Hole)',
    titleEn: '1. The Iframe SEO Black Hole & Search Indexing',
    severity: 'CRITICAL',
    descriptionBn: 'গুগল ক্রলার যখন ব্লগের ঠিকানায় (yourblog.blogspot.com) যাবে, তখন সে কেবল একটি খালি <iframe> ট্যাগ পাবে। আইফ্রেমের ভেতরের টেক্সট গুগলের কাছে মূল পেজের কন্টেন্ট হিসেবে গণ্য হয় না।',
    descriptionEn: 'When Googlebot indexes your Blogspot URL, it encounters a bare iframe shell. The rendered app content belongs to Netlify, starving the Blogspot domain of rankable copy.',
    technicalImpactBn: 'ব্লগস্পট ডোমেইন গুগল সার্চে "Empty or Thin Content" হিসেবে ড্রপ করবে এবং র‍্যাঙ্কিং প্রায় শূন্যে নেমে আসবে।',
    technicalImpactEn: 'Blogspot domain suffers severe ranking penalties and may be de-indexed for lack of crawlable semantic DOM.',
    solutionBn: 'ব্লগার XML-এর <head> সেকশনে সম্পূর্ণ OpenGraph, Twitter Cards, Schema.org JSON-LD এবং <body>-তে একটি <noscript> কি-ওয়ার্ড সমৃদ্ধ টেক্সট সামারি যোগ করতে হবে।',
    solutionEn: 'Inject full OpenGraph, Twitter Cards, Schema.org JSON-LD structured data into the Blogger <head>, and embed a crawlable semantic fallback summary.',
    codeSnippet: `<meta name="description" content="আপনার অ্যাপ্লিকেশনের বিস্তারিত ডেসক্রিপশন..."/>
<meta property="og:title" content="আপনার অ্যাপের নাম"/>
<meta property="og:type" content="website"/>
<noscript>
  <div style="padding:20px; text-align:center;">
    <h1>আপনার অ্যাপের নাম</h1>
    <p>এই অ্যাপ্লিকেশনটি ব্যবহার করতে জাভাস্ক্রিপ্ট চালু করুন।</p>
  </div>
</noscript>`
  },
  {
    id: 'csp-cors-blocking',
    titleBn: '২. ব্রাউজার সিকিউরিটি হেডার ব্লকিং (X-Frame-Options & CSP Trap)',
    titleEn: '2. Frame Blocking via X-Frame-Options & CSP',
    severity: 'CRITICAL',
    descriptionBn: 'নেটলিফাই বা বিভিন্ন ফ্রেমওয়ার্ক সুরক্ষার স্বার্থে ডিফল্টভাবে X-Frame-Options: SAMEORIGIN বা DENY পাঠিয়ে দেয়। যদি এটি সক্রিয় থাকে, ব্রাউজার ব্লগে আইফ্রেমটি লোড করতে দেবে না এবং সাদা স্ক্রিন বা "Refused to connect" দেখাবে।',
    descriptionEn: 'Many production deployments and frameworks inject X-Frame-Options: SAMEORIGIN or DENY by default. If present, modern browsers block the iframe with a console security violation.',
    technicalImpactBn: 'ব্যবহারকারী ব্লগে ভিজিট করলে অ্যাপ্লিকেশনটি লোডই হবে না, সম্পূর্ণ খালি/ব্ল্যাঙ্ক স্ক্রিন দেখতে পাবেন।',
    technicalImpactEn: 'Total catastrophic rendering failure in parent domain; users observe a persistent blank canvas or browser refusal screen.',
    solutionBn: 'নেটলিফাই-এর রুট ডিরেক্টরিতে একটি "_headers" ফাইল তৈরি করে Content-Security-Policy তে ব্লগস্পটের ডোমেইন স্পষ্টভাবে অনুমতি (Whitelist) দিতে হবে।',
    solutionEn: 'Configure a Netlify "_headers" file or netlify.toml explicitly granting frame-ancestors permission to blogspot.com and custom domains.',
    codeSnippet: `# Netlify _headers file
/*
  Content-Security-Policy: frame-ancestors 'self' https://*.blogspot.com https://*.blogger.com https://*.google.com
  X-Frame-Options: ALLOW-FROM https://*.blogspot.com`
  },
  {
    id: 'mobile-viewport-bounce',
    titleBn: '৩. মোবাইল ভিউপোর্ট ও ডাবল স্ক্রোলবার বিপর্যয় (Mobile Viewport Defect)',
    titleEn: '3. Mobile Viewport Collapse & Safari Address Bar Bouncing',
    severity: 'HIGH',
    descriptionBn: 'মোবাইল ব্রাউজারে (বিশেষ করে iOS Safari এবং Android Chrome) ব্যবহারকারী যখন স্ক্রল বা টাচ করে, ব্রাউজারের নিচের নেভিগেশন বারটি ছোট-বড় হয়। সাধারণ "height: 100vh" দিলে স্ক্রিন লাফাতে থাকে এবং দুটি স্ক্রোলবার তৈরি হয়।',
    descriptionEn: 'Mobile browser address bars dynamically collapse and expand during touch interactions. A fixed 100% or 100vh style triggers layout thrashing, rubber-band glitching, and nested scrollbars.',
    technicalImpactBn: 'মোবাইলে ব্যবহারকারীর জন্য সফটওয়্যারটি ব্যবহার করা অসম্ভব বা অত্যন্ত বিরক্তিকর হয়ে পড়ে।',
    technicalImpactEn: 'Severe degradation of mobile touch targets, trapped touch drag events, and clipped bottom action buttons.',
    solutionBn: 'আধুনিক CSS ডায়নামিক ভিউপোর্ট ইউনিট "100dvh" ব্যবহার করতে হবে এবং overscroll-behavior: none সেট করে বডির বাউন্সিং বন্ধ করতে হবে।',
    solutionEn: 'Adopt modern dynamic viewport units (100dvh) with fallback to window.innerHeight via CSS custom properties, and suppress parent touch bounce.',
    codeSnippet: `html, body {
  width: 100%;
  height: 100%;
  height: 100dvh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}`
  },
  {
    id: 'deep-link-loss',
    titleBn: '৪. ইউআরএল স্টেট ও হিস্ট্রি হারিয়ে যাওয়া (URL State & Deep Link Loss)',
    titleEn: '4. Parent URL State Decoupling & Navigation Loss',
    severity: 'MEDIUM',
    descriptionBn: 'ব্যবহারকারী যখন আইফ্রেমের ভেতরে কোনো বাটন চেপে অন্য পেজে যায় বা কোনো হিসেব করে, তখন ব্লগস্পটের অ্যাড্রেস বার (URL) কিন্তু অপরিবর্তিত থাকে। ব্যবহারকারী পেজটি রিলোড দিলে বা লিংক শেয়ার করলে ভেতরের ডেটা হারিয়ে সরাসরি হোমে ফিরে আসবে।',
    descriptionEn: 'Actions inside the iframe do not mutate the parent Blogger address bar. If a user copies the URL or refreshes, internal application state is obliterated.',
    technicalImpactBn: 'শেয়ারেবল লিংক কাজ করবে না এবং রিফ্রেশ করলে ব্যবহারকারী বর্তমান কাজ হারিয়ে ফেলবে।',
    technicalImpactEn: 'Zero shareable deep links; browser back/forward buttons navigate out of Blogger entirely rather than handling internal history.',
    solutionBn: 'উভয় সাইটের মধ্যে window.postMessage দিয়ে একটি নিরাপদ কমিউনিকেশন ব্রিজ তৈরি করা যায়, যা ব্লগের URL-এ Hash (#state) আপডেট রাখবে।',
    solutionEn: 'Implement a bidirectional postMessage event listener between Netlify and Blogger shell to synchronize hash fragments (#calc-result).',
    codeSnippet: `// Parent Blogger Script
window.addEventListener('message', (e) => {
  if (e.origin === 'https://your-app.netlify.app' && e.data.hash) {
    history.replaceState(null, '', '#' + e.data.hash);
  }
});`
  },
  {
    id: 'adsense-policy-violation',
    titleBn: '৫. গুগল অ্যাডসেন্স অনুমোদন না পাওয়া (Google AdSense Low-Value Trap)',
    titleEn: '5. Google AdSense Policy Rejection ("Low Value Content")',
    severity: 'HIGH',
    descriptionBn: 'অনেকে ব্লগস্পট ব্যবহার করেন ফ্রিতে গুগল অ্যাডসেন্স অনুমোদন নেওয়ার জন্য। কিন্তু ব্লগে কোনো কন্টেন্ট ছাড়া কেবল আইফ্রেম বসালে গুগল অ্যাডসেন্স রোবট একে "Low value content" বা "Scraped content" বলে একাউন্ট বাতিল করে দেয়।',
    descriptionEn: 'Publishers seeking AdSense monetization often get rejected because the Blogger host has zero crawlable text paragraphs, violating AdSense Site Quality Guidelines.',
    technicalImpactBn: 'ব্লগার ডোমেইনে কোনোভাবেই গুগল অ্যাডসেন্স বা অ্যাড নেটওয়ার্ক অনুমোদন পাবে না।',
    technicalImpactEn: 'Immediate rejection during AdSense site reviews with code "Valuable inventory: No content / under construction".',
    solutionBn: 'যদি অ্যাডসেন্স থেকে আয় করতে চান, তবে বিজ্ঞাপন কোড ব্লগের থিমে না রেখে নেটলিফাই-এর কোডের ভেতর (ইন-অ্যাপ ব্যানার) বসাতে হবে।',
    solutionEn: 'Deploy ad network scripts (AdSense / Adsterra / Carbon) directly within the Netlify web app shell, rather than on the host Blogger theme.',
    codeSnippet: `<!-- Place Ad units inside Netlify index.html, NEVER outside the iframe -->`
  }
];

export const BLOGGER_PRODUCTION_XML = (appUrl: string, appTitle: string, appDescription: string, permissions: string) => `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultmessages='false' b:layouts='false' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' name='viewport'/>
  <title>${appTitle || 'ওয়েব অ্যাপ্লিকেশন'}</title>
  
  <!-- এসইও ও সোশ্যাল মেটা ডাটা (SEO & Social OpenGraph) -->
  <meta content='${appDescription || 'একটি আধুনিক প্রফেশনাল ওয়েব অ্যাপ্লিকেশন'}' name='description'/>
  <meta content='${appTitle || 'ওয়েব অ্যাপ্লিকেশন'}' property='og:title'/>
  <meta content='${appDescription || 'একটি আধুনিক প্রফেশনাল ওয়েব অ্যাপ্লিকেশন'}' property='og:description'/>
  <meta content='website' property='og:type'/>
  <meta content='summary_large_image' name='twitter:card'/>

  <style type='text/css'>
    /*<![CDATA[*/
    :root {
      --app-bg: #0f172a;
      --loader-accent: #38bdf8;
    }
    
    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
      background-color: var(--app-bg);
      overscroll-behavior: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* অ্যাপ ফ্রেম কনটেইনার */
    #app-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      height: 100dvh;
      display: flex;
      flex-direction: column;
    }

    iframe#core-app {
      width: 100%;
      height: 100%;
      border: 0;
      flex: 1;
      display: block;
      background-color: transparent;
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    iframe#core-app.is-loaded {
      opacity: 1;
    }

    /* প্রি-লোডার স্পিনার */
    #app-preloader {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--app-bg);
      z-index: 50;
      transition: opacity 0.4s ease, visibility 0.4s;
    }

    #app-preloader.fade-out {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .spinner {
      width: 44px;
      height: 44px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top-color: var(--loader-accent);
      animation: spin 0.8s linear infinite;
    }

    .loader-text {
      margin-top: 16px;
      color: #94a3b8;
      font-size: 14px;
      letter-spacing: 0.5px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    /*]]>*/
  </style>
</head>
<body>

  <!-- লোডার ও ফলব্যাক কনটেইনার -->
  <div id='app-container'>
    <div id='app-preloader'>
      <div class='spinner'></div>
      <div class='loader-text'>অ্যাপ্লিকেশন প্রস্তুত হচ্ছে...</div>
    </div>

    <!-- মূল অ্যাপ্লিকেশন আইফ্রেম -->
    <b:section id='main-app-section' showaddelement='false'>
      <b:widget id='HTML101' locked='true' title='Core App' type='HTML' visible='true'>
        <b:includable id='main'>
          <iframe 
            id='core-app' 
            src='${appUrl || 'https://your-app.netlify.app'}' 
            allow='${permissions || 'clipboard-write; fullscreen; encrypted-media'}'
            referrerpolicy='no-referrer-when-downgrade'
            onload='handleAppLoaded()'>
          </iframe>
        </b:includable>
      </b:widget>
    </b:section>
  </div>

  <!-- স্ক্রিপ্ট: লোডিং ও স্টেট সিনক্রোনাইজেশন -->
  <script type='text/javascript'>
    //<![CDATA[
    function handleAppLoaded() {
      var iframe = document.getElementById('core-app');
      var preloader = document.getElementById('app-preloader');
      if (iframe) iframe.classList.add('is-loaded');
      if (preloader) preloader.classList.add('fade-out');
    }

    // ফলব্যাক টাইমার: নেটওয়ার্ক স্লো থাকলে ৫ সেকেন্ড পর লোডার বন্ধ হবে
    setTimeout(handleAppLoaded, 4500);

    // ডিপ-লিঙ্ক হ্যাশ সিঙ্ক লিসেনার (Optional State Bridge)
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'SYNC_URL_HASH') {
        history.replaceState(null, '', '#' + event.data.hash);
      }
    }, false);
    //]]>
  </script>

  <!-- এসইও ক্রলার ফলব্যাক -->
  <noscript>
    <div style='color:#fff; padding:2rem; text-align:center;'>
      <h2>${appTitle || 'ওয়েব অ্যাপ্লিকেশন'}</h2>
      <p>${appDescription || 'এই অ্যাপ্লিকেশনটি মসৃণভাবে চালাতে ব্রাউজারে জাভাস্ক্রিপ্ট সক্রিয় করুন।'}</p>
    </div>
  </noscript>

</body>
</html>`;

export const NETLIFY_HEADERS_SNIPPET = (bloggerSubdomain: string) => `# Place this in your Netlify publish directory as '_headers'
# This permits Blogger to embed your app without security rejection

/*
  X-Frame-Options: ALLOW-FROM https://${bloggerSubdomain || 'your-blog'}.blogspot.com
  Content-Security-Policy: frame-ancestors 'self' https://${bloggerSubdomain || '*'}.blogspot.com https://*.blogger.com https://*.google.com
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`;

export const NETLIFY_TOML_SNIPPET = (bloggerSubdomain: string) => `[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "frame-ancestors 'self' https://${bloggerSubdomain || '*'}.blogspot.com https://*.blogger.com https://*.google.com"
    X-Frame-Options = "ALLOW-FROM https://${bloggerSubdomain || 'your-blog'}.blogspot.com"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;
