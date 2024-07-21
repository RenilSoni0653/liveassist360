// next.config.js

module.exports = {
  images: {
    domains: [
      "www.google.com",
      "lh3.googleusercontent.com",
      "images.pexels.com",
      "www.shutterstock.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:8090/",
          },
        ],
      },
    ];
  },
};
