
Node Js, React, Jest and Mongodb is used in this project.

Link to Heroku app: https://newsarticle-bdbcd6637463.herokuapp.com/ 
Link to my own repository since i don't have the rights to make the classroom-repository open: https://github.com/ismailahu/NewsArticles

Info on how to use the app in heroku: The app is deployed on heroku and runs, but there are a few thing i wish would be work better, I will explain a bit under here what I miss in the project and what I am happy about.

You can register, but you will get an internal Server Error when you register, so just try to log in with the login info you wrote even if it says "internal Server Error". I tried my best to make it work, but wasn't able to.

When page refreshes it will go blank, here I also struggled a lot. What i discovered was that the user was still logged in, but when i removed the words after the "/" it was went from a blank page to the article screen, so there is most likely a fault in the code that i haven't been able to track down.

What access you have on the react app is based on what category you chose when registering as a new user (as stated in the requirements).

When adding new articles you won't be able to publish without filling in the title and description. You will get an error if you try to publish an article with the same name as an existing article. Navigation happens through the navigationbar.

Jest cases in the project have a 100% pass rate, I was not able to get the test coverage in readme. I was able to run some through github action but they failed there.

Users can update articles if they would like to.
