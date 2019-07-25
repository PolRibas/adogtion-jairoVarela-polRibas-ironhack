# ADOGTION

## Description

Express app for connecting animal shelters with users that want to adopt a new pet.

This app has two differents users:
    - User
    - Shelter
 
## User Stories

### Shared
- **404** - As a User and Animal Shelter I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a User and Shelter I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a User and Shelter I want to be able to access the homepage so that I see what the app is about and login and signup.
- **sign up & login** - As a User and Shelter I want to be able to sign up and get logged in automatically so I can get redirected to my feed.
- **logout** - As a User and Shelter I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **macth User & Shelter** - As an User and as an Animal Shelter, I want the contact information of both of us to be available to each other when we "Match", so we can get in touch and arrange things like the dog pickup date/time and any further details.

### Shelter
- **Dog create** - As an Shelter, I want to be able to create Dog items by filling a form so I can have multiple dogs on adoption at the same time.
- **Dog list** - As an Shelter, I want to be able to see a list of all the Dog items that belong to me.
- **Dog update** - As an Shelter, I want to be able to update the data of any dogs of my list.
- **Dog delete** - As an Shelter, I want to be able to delete Dog items by clicking a button on my Dogs items list.
- **Dog details** - As a Shelter, I want to be able to see details of the dog before liking it, like it's name, age, breed, size and animal shelter where it's being held.
- **userLikedDog notification** - As an Animal Shelter, I want to see the notification and see which user liked one of my dogs so I can be able to review his or her profile.
- **shelterLikedUser notification** - As an Animal Shelter, I want to be able to like back (or not) an user after reviewing his or her profile, so that he can receive a notification about it.

### User
- **Dog details** - As a User, I want to be able to see detailed info of the dog before liking it.
- **Dog search** - As a User, I want to be able to filter Dogs based on their data like age, size, breed.
- **likedDog notification** -As a User, I want a notification to be sent to the Animal Shelter when I like one of their dogs.


## Backlog

List of other features outside of the MVPs scope

### User profile:
- see my profile
- upload my profile picture
- list of dogs I've liked and it's status

### Shelter profile:
- add geolocation to the shelter
- show shelter in a map

### Homepage:
- Landing page explaining the app's purpose and what it's all about.


## ROUTES:

-isLoggedIn (access to all the application, except signup and login view)
-isNotLoggedIn (only access to signUp and LogIn. May include backlog to Landing Page)

 SignUp, Homepage

- Landing Page
- signUp
- logIn
- userFeed (only available for User)
- shelterFeed (only available for Shelter)
- winScreen

-Authorization and Authentication for both users.
-Password encryption

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to /feed if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to /feed if user logged in
  - body:
    - username
    - password
- GET /auth/login
  - redirects to /feed if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to /feed if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /feed
  - renders the appropiate feed for the user type
- GET /dogs/create
  - renders the dog create form
- POST /dogs/create 
  - redirects to / if user is anonymous
  - body: 
      - name
      - breed
      - size (enum: [small, medium, large, super large])
      - age (String -> aprox or exact) -> non required
      - image (url)
      - state (enum: [Like, Match, Accepted, Adopted], default: published)
- GET /dogs/:id
  - renders the dog detail page
  - includes data of the dog and shelter
  - like button if user, edit button if shelter
- POST /dogs/:id/edit
  - modifies data of dog(_id)
- GET /profile/:id/ 
  - renders form with preloaded values of user profile
- POST /profile/:id/edit 
  - redirects to / if user is anonymous
  - body: updated values from form

## Views

- Landing Page
- Login & Signup
- (Only for Regular User) -> User feed (settings, messages/notifications, filter, perfil)
- (Only for Animal Shelter) -> User feed (settings, messages/notifications, new adoptetive dog, corporative perfil)

## Models

### User
  - username (unique)
  - name -> non required
  - surname -> non required
  - password
   - phone 
  - email
  - age -> non required
  - city -> non required
  - ocupation -> non required
  - civilStatus -> non required
  - Array -> Notes Objectid
  
 ### Shelter
  -username (unique)
  - name
  - password
  - phone
  - email
  - webSite -> non required
  - Address
  - Array -> ObjectId from Dog
  - Array -> Notes Objectid

### Dog
  - name
  - breed
  - size (enum: [small, medium, large, super large])
  - age (String -> aprox or exact) -> non required
  - image (url)
  - state (enum: [Like, Match, Accepted, Adopted])
  
### Notifications
  - dogId -> ObjectId
  - message String
  
## Middlewares

-isLoggedIn (access to all the application, except signup and login view)
-isNotLoggedIn (only access to signUp and LogIn. May include backlog to Landing Page)

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/PolRibas/adogtion-jairoVarela-polRibas-ironhack)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
