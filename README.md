# Library

An Odin project to practice HTML/CSS/JS skills.

It allows users track books that they have read or want to read.

Features include:
* Data persistence using Firebase, using login via email/password
* The ability to rate books using a star system
* Adding/deleting books from the library

This was my first time with Firebase/Firestore - it was more challenging than I'd been hoping for,
especially around updating and deleting records (having to cycle through all the documents was definitely weird, when I'd
been used to more straightforward data access with SQL). 

It was good to get some experience with setting up Auth (again using Firebase). This was pretty simple and the Firebase docs
are easy to use and comprehensive.

This was also my first time creating a modal dialog - [this article](https://css-tricks.com/considerations-styling-modal/) helped a lot, especially the part about creating an overlay which not only darkens the background but also enables the user
to click anywhere to close the modal.

I used:
* https://www.transparenttextures.com/ for the background
* https://fonts.google.com/ for the fonts
* https://fontawesome.com/ for the icons (e.g. read/haven't read icons, close button for modal dialog)
* https://unsplash.com/ for the header image

You can try it [here](https://alicee88.github.io/odin-library/).
