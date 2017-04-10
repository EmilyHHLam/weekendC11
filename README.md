
//**Basic Mode**//

--working on---
1. fix the getfavMovie selection (line 60 client.js)
2. fix the remove button for fav list : id doesn't pass properly to the server

[x] displays movie information made available from OMDB.
[x]submit button that sends the information to OMDB,
[x]the search information appears as soon as the response returns from the API.
[x]You MUST use an Angular factory to send the API call ($http).
[]'add to favorites' button on those results.

[x] When the 'add to favorites' button is clicked, it should record the information for the movie and store it into an array of favorites.
[] The other view should display the favorite movies selected by the user.

Hard Mode
[] When a favorite is added to the favorites list, store the favorites list in a Mongo Database.

Pro Mode
[x] Add the ability to remove a movie from the Mongo Database, and ensure that the favorites view updates as well.

Master Mode
[ ] Host the application on Heroku and mLabs. No need to do a data dump of an existing database.
