---
layout: post
title: Benefits of TDD
---

While working on a side project, a feature was requested to allow users to
customize the body of an email message. Originally the email body contained only
a dynamically-generated link. Users needed to customize the email and the link
still needed to be dynamically inserted.

My initial thought of how to provide this functionality was with [Liquid][],
which I use extensively in my day job. However, before I dove in and started
implementing this feature, I decided to drive my design through Test Driven
Development.

I created a failing test to represent the expected outcome. Then I set off to
implement the minimum amount of code that would get the test to pass. My first
attempt led me to using string substitution with `gsub`.

This worked well and in fact I realized that I was done. I didn't need to use
Liquid after all. All I needed was this simple and straight forward solution. If
I would have gone with my first instinct and implemented Liquid, I would still
have solved the problem and written my code cleanly. However, I would have
unnecessarily added another dependency to the application and created a lot of
overhead.

TDD won't solve all your problems but it has value and is a great tool to have
in your tool box.

[Liquid]: http://liquidmarkup.org
