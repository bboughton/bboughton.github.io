## brianboughton.com

This is my [jekyll][] powered blog. A place for me to express my opinion and
share my knowledge. Thanks for reading!

  [jekyll]: http://jekyllrb.com

## Getting Started

If you don't have jekyll installed you must do this first.

```
  gem install jekyll
```

## Have a great idea?

Creating a new draft is easy with rake.

```
  rake draft title="Wow that was easy"
```

## Ready to make it real?

Once you have something you are willing to post onto the internet where it will
live FOREVER, you can move it into the `_posts` director. Commit your new shiny
post to version control and push it into the cloud. BOOM just like magic.

```
  mv _drafts/wow-that-was-easy.markdown _posts/yyyy-mm-dd-wow-that-was-easy.markdown
  git add _posts/yyyy-mm-dd-wow-that-was-easy.markdown
  git commit -m "Post: Wow that was easy"
  git push origin master
```
