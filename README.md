# ChampStats

[View the deployed app on Heroku](https://champ-stats.herokuapp.com/)

(it may take a few seconds for Heroku to 'wake up')

Champ Stats is a single-page MEAN stack app that lets League of Legend players create and save Team Builds based on champions' base stats.

## Technologies Used

* Express.js
* Passport.js
* MongoDB for database
* Angular.js for front-end development
* Node.js
* HTML
* CSS (media queries for mobile/tablet devices)
* [Animate.css](https://daneden.github.io/animate.css/)

####Third Party APIs

* All statistics used are directly from [Riot's API](https://developer.riotgames.com/).
* All statistics are up-to-date so long as Riot updates their API.


##Future Implementations

* Instead of dynamically populating champ stats, would like to save champ stats server-side. This would save time to load, as Riot's API can take a while.

* User persistence: Currently, this app does not save user sessions and will break if you reload the page.

* Social sharing: would like to implement so that users can become 'friends' with other users and share their team builds, as well as restrict access so others can't see them.

* Items: Would like to include items, runes, and masteries information to add several more layers of team stats and make it a truly comprehensive tool to build teams.