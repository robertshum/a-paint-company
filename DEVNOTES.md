# Live Deployment

* Back-end can be found deployed on AWS EC2 here: 
  * http://54.188.20.64:3000/api/users
  * http://54.188.20.64:3000/api/paints
  * http://54.188.20.64:3000/
* Front-end can be found deployed on Netlify here:
  * https://6601225f54edec885f95191b--helpful-lily-4141c3.netlify.app/
* !!NOTE!! Although they are both deployed, they have issues talking to each other as the back-end API is served over HTTP and the front end is over HTTPS.
* local deployments needed for testing (see Readme).


# Work Done / Missing
* I focused on the user stories / acceptance critera as the primary objective.
* The app is fully accessible by all users and they are not blocked based on their roles (see assumptions).
* CSS could use a little more work.
* Tried to build a CI/CD pipeline with Github Pages/Actions and Netlify but I could not get it to work.
* Did not have time to set up my HTTP API to serve HTTPS via. SSL.


# Stack:

## React 
* Easy to use.
* Reliable industry standard library.

## Vite 

* Handles pre bundling on the front end, so we can do this:

```js
import { someMethod } from 'my-dep'
```
* Fast and performant.
* Supports .ts out of the box.

## Express
* REST Endpoint set-up is fast, good for PT.

## DB
* The back-end API writes/reads a local db.json file.  Decided for this approach for development speed.

# REST Resources

* GET /api/paints
* PATCH /api/paints/

* GET /api/users
* PATCH /api/users/

# User Workflow

Possible Menu Options and pages (not final).

## John (Viewer)
* VIEW list of paint availability
* Show a list of paints, underneath categories such as 'low', 'out of stock' and 'available'.  Homepage.

## Jane (PaintAdmin)
* VIEW list of paint availability.
* UPDATE / EDIT paint availability.
* Same as above for showing list of paints.
* Another tab that allows one to edit paint quantity.
  * A list of paints with stock count and a 'up/down' counter to manage count.
  * save button -> saves new counts, redirects to view page.
  * cancel button -> reverts new counts, no redirect.

## Painter (Painter)
* VIEW list of paint availability.
* UPDATE / EDIT paint availability.
  * Allowed to 'consume' paint, not increase orders.
  * similar to paint admin but not allowed to increment paint count.

## Adam (Admin)
* Manage Users, their roles and permissions.
  * view, update/edit, disable/enable.
* a list of users with a dropdown of roles (see above)
* save button that saves the roles and redirects to admin
* cancel button -> reverts changes, no redirect.

# Assumptions

### The relationship between Kanban (swim lanes) for the paint stock and the actual stock is unknown.

* What happens if I 'drag' BLUE with 100 stock from available to low stock?  I'm not sure what that means for the actual stock afterwards.
* No acceptance criteria, no user story, so I will make up my ranges so that paint stock falls into 'swim lanes'.
  * Available, paint >= 6 stock.
  * low stock, paint > 0 <= 5 stock.
  * out of stock, paint = 0 stock.

### Admin page

No Acceptance criteria, hard to deduce what it means to 'manage users'.

* I assume it means updating the roles for each person.
* Does it mean create / delete users?
  * That means, new forms, with passwords, username, etc.
  * Not enough time / might be beyond the scope of the project.  This can be a very large feature depending how it's interpreted.
* I'm also assuming disable/enable means that person can no longer login if disabled.
* Also assuming it will disable certain pages based on roles/priviledges, but that also means we have to deal with user authentication or mock logging at they very least.

* I'm interpreting these as beyond the scope of the competition timeline.



### Painter

The story is similar to Jane, but it's phrased in such a way that painter should only allowed to consume units of paint (for houses), but not update the stock, by increasing the amount.  For simplicity both users, can increase/decrease the stock.

