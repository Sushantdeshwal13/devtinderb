-js object vs json 
-add the express.json mw to your app
-make your signup api dynamic to recieve data from the end user
-user.findone with duplicate email ids, which object returned
- api - set user by email
- api - feed api - get/feed - geet all the users from the database
- create a delete user api
- diff between patch and put 
- create a update user api
- explore the mongoose documentation for model api/method
- what are options in a model.findoneandupdate method, exploreit 
- create a update api with email id
- explore schematype options from the documentation
- add required, unique, lowercase, min, minlength, trim
- add default
- create a cutom validate function for gender
- improve the db schemaa pull all appropriate validations
- add timestamps to userschema
- add api level validation on patch request and signup post api
- add api validation for each field 
- install validator
- explore validator livrary function and use it for paswd , email, photourl

-validate data in signup api
-install bcrypt package
=create passwordhash usning bcrypt.hash and save user 
- create login api
- compare passwords and throw errors if email or password is invalid
- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if u get the  cookie back
- install jsonwebtoken
- in login api, after email and password validation, create a jwt token and send it to user in cookies
- read the cookies inside your profile api and find the logged in user.
- userAuth mw
- add the userAuth mw in profile api and a new sendconnection api
- set the expiry of jwt token and cookies to 7 days
- create userschema method to getjwt()
- create userschmea method to compare password( password input by user)

-explore tinder APIs
-create a list of all apis you can think in dev tinder
- group multiple routes under respective routers
- read documentation for express.router
- create routes folder for managing auth, profile, request routers
- create authrouter, profilerouter, requestrouter
- import these routers in app.js

- create post/logout api
- create patch/profile/edit
- create patch/profile/password api => forgot password api
- make sure you validate all data in every post, patch apis. 

- create connection request schema
- send connection request api
- proper validation of data
- think about conrner cases
- $or query $and query in mongodb
- read logical queries 
- schema.pre("save") function
-  read more about indexes in mongodb
- why do we need index in db?
- adv. and dis of creating index?
- read about compound indexes

- write code with proper validations for post 
 /request/review/:status/:requestid
 - thought process - Post vs get
 - read about ref and populate 
 - create get /user/requests/received with all the checks 
 - create get /user/connections

 - logic for get / feed api
 - explore the $nin, $and, $ne and other query  parameters
 - pagination

 /feed?paage=1&limit=10 => 1-10
 /feed?paage=1&limit=10 => 10-20
 /feed?paage=1&limit=10 => 20-30

 .skip(0) & .limit(10) it will give first 10 users
 skip = (page-1)*limit;