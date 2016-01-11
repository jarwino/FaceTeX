# FaceTeX [![Build Status][travis-img]][travis-btn]

A tool that lets you communicate in LaTeX to your friends over Facebook chat. Simply add “Jaredbot Winowat” to your group chat and type `$yourLaTeXhere$` to get started.

## Instructions
### Heroku 

[![Deploy][heroku-img]][heroku-btn]

If you're deploying on Heroku, click the deploy button above then you only need to follow step 1 & 2 of the manual instructions

### Manual

1. Fork the repository and create a separate dummy account on Facebook
2. Set the environment variables `FB_USERNAME`, `FB_PASSWORD`, and `HEROKU_INSTANCE` accordingly OR replace the fields in `config.json`
3. Install dependencies with `npm install`
4. Run with `npm start`
5. After that you should be ready to go!

## Contributors
[@webfreak7](https://github.com/webfreak7/)

## Credits
Thank you to `facebook-chat-api` and `mathjax-node` for making the majority of this happen!

[travis-img]: https://travis-ci.org/jarwino/FaceTeX.svg?branch=master
[travis-btn]: https://travis-ci.org/jarwino/FaceTeX
[heroku-img]: https://www.herokucdn.com/deploy/button.svg
[heroku-btn]: https://heroku.com/deploy?template=https://github.com/jarwino/FaceTeX
