# ATX Food Scores

## Problem

Texas law doesn’t require establishments to post their inspection scores. A way individuals can look up establishment inspection scores in austin is on the governments site. But, it is hard to find and not user friendly.


## Solution

Develop an application that can inform users about restaurant inspection scores, in a user friendly way. Gather inspection scores from the source (atx gov), and other useful information from yelp. Allow users to create an account (google login), and save favorite restaurants.


[Link to app](https://morning-depths-76406.herokuapp.com)

[Link to repo](https://github.com/phillip0150/atx_health_scores)

## Technologies

ATX Food Scores was written with a `MERN` stack, `axios`, `mongoose`, `reactstrap`, `mapbox-gl`, `react-moment`, `react-bootstrap-table` , `react-google-login`, `react-dom`, and `react-rouer-dom`.

all images are provided by `Yelp.com`.
all data is provided by `Yelp.com` and `data.austintexas.gov`


## How to use


To use ATX Food Scores, [CLICK HERE](https://morning-depths-76406.herokuapp.com)


Once you enter the homescreen, you can click on the hamburger menu to view options. Click Home site will take you back to the homepage, User site will take you to the user login/homepage. To start viewing food establishments, scroll down to the table.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/1.png" width="250"/><img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/6.png" width="250"/>

From there, you can search each collum, sort the collums by clicking on the row, and view the establishment by clicking on the row.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/3.png" width="250"/><img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/4.png" width="250"/>

You can also change the number of results per page.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/5.png" width="250"/>

When you click on the User Site, it will either display the page or make you login.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/11.png" width="250"/><img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/12.png" width="250"/>

Once you login, your favs and inspection scores will appear.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/13.png" width="250"/>

To hide your favs list, press toggle favs.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/14.png" width="250"/>

Just like with non users, you can click on a row to view the establishment. The only difference in the page is that a button will appear to add or delete the establishment from your favs list.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/15.png" width="250"/>

Once you add or delete a establishment from your favs list, a modal will appear witht the appropriate message

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/16.png" width="250"/>

Once you add or delete a establishment from your favs list, the button on the page will update.

<img src="https://github.com/phillip0150/atx_health_scores/blob/master/client/public/images/17.png" width="250"/>


## Organization

### Routes

This program uses `express` and `react-router-dom` to create routing to different pages. Because of this, you will not see `.html` at the end of web page. 

## My role
Application developer
 
---------------------------------

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
