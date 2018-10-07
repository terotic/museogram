module.exports = {
  siteMetadata: {
    title: 'Museogram',
    language: 'en',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: "gatsby-source-flickr",
      options: {
        method: "flickr.photosets.getPhotos",
        api_key: "a6101681cd3f2e6eaa7c3f83ddc5c7f2",
        photoset_id: "72157676384900235",
        format: "json",
        per_page: "15"
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
  ],
};
