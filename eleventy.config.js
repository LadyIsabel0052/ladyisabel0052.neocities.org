const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.setQuietMode(true);

  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("content/assets");
  eleventyConfig.addPassthroughCopy("content/css");
  eleventyConfig.addPassthroughCopy("content/scripts");

  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "xml", "json", "md"]);

  eleventyConfig.addFilter("date", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
  });

  eleventyConfig.addCollection("navItems", function(collectionsApi) {
    const blog = collectionsApi.getFilteredByTag("blog");
    const latest = blog.at(-1);
    const latestUrl = latest?.url ?? "/blog/posts/";

    return [
      {
        label: "Home",
        url: "/",
        icon: "/assets/Sprite-house-light.png",
      },
      {
        label: "About",
        icon: "/assets/Sprite-about-light.png",
        children: [
          { label: "About the site", url: "/about/about/" },
          { label: "About Me",       url: "/about/me/" },
          { label: "Site Manifesto", url: "/about/manifesto/" },
        ],
      },
      {
        label: "Blog",
        url: "/blog/",
        icon: "/assets/Sprite-blog-light.png",
        children: [
          { label: "Latest", url: latestUrl },
          { label: "Posts",  url: "/blog/posts/" },
        ],
      },
      {
        label: "Creative stuff",
        icon: "/assets/Sprite-art-light.png",
        children: [
          { label: "Art",     url: "/creative/art/" },
          { label: "Writing", url: "/creative/writing/" },
        ],
      },
      {
        label: "Credits",
        url: "/credits/",
        icon: "/assets/Sprite-credits-light.png",
      },
    ];
  });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "content",
      output: "public",
    },
  };
};
