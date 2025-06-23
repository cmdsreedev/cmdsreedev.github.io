export const SITE = {
  website: "https://cmdsreedev.github.io/", // replace this with your deployed domain
  author: "Sreevisakh",
  profile: "https://cmdsree.dev/",
  desc: "Personal blog of Sreevisakh, a software engineer with a passion for coding and technology.",
  title: "cmdsree.dev",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/cmdsreedev/cmdsreedev.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
} as const;
