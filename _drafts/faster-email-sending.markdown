---
layout: post
title: Send Email with Command Enter
---

I really like using **Command + Enter** to submit [github][] comments. It feels
very natural as a keyboard shortcut for form submission. When using Apple's Mail
application I found the default keyboard shortcut (**Shift + Command + D**) for
sending an email hard to remember and didn't feel very natural to use.

 [github]: https://github.com

Using the ***default*** command in the Terminal you can override the keyboard
shortcut for any application.

```bash
# Add the keyboard shortcut Command + Enter to send an email in Mail.app
defaults write com.apple.mail NSUserKeyEquivalents -dict-add "Send" "@\\U21a9"
```
