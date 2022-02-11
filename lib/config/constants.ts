export const BASE_URL = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;
export const WEBSITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://cal.com";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const TRIAL_LIMIT_DAYS = 14;
export const LOGO = "/calendso-logo-white-word.svg";
export const LOGO_ICON = "/cal-com-icon-white.svg";
export const SITE_NAME = "Akv1.com";
export const ROADMAP = WEBSITE_URL + "/roadmap";
export const JOIN_SLACK = WEBSITE_URL + "/slack";
export const POWERED_BY_URL = WEBSITE_URL + "?utm_source=embed&utm_medium=powered-by-button";
export const DOCS_URL = "https://docs.cal.com/import";
export const SEO_IMG_DEFAULT = "https://cal.com/og-image.png";
export const SEO_IMG_OGIMG = "https://og-image-one-pi.vercel.app/";

/*export const WEBURL = WEBSITE_URL.replace(/(^\w+:|^)\/\//, '');
export const WEBTEXT = capitalizeFirstLetter(WEBURL);
function capitalizeFirstLetter(string):string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}*/
//export const POWERED_BY_LOGO = WEBSITE_URL+LOGO;
//export const POWERED_BY_LOGO2 = WEBSITE_URL+'/logo-white.svg';
