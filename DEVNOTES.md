
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

# User Workflow

Possible Menu Options and pages

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

## Assumptions

### The relationship between 'Paint status' and 'stock (aka. the Kanban from the context)

No acceptance criteria, no user story...
* Available = paint > 6 stock.
* low stock = paint <= 5 stock.
* out of stock = paint = 0.

### Admin page

No Acceptance criteria.  What does it mean by 'manage users'.

* I assume it means updating the roles for each person.
* I'm also assuming disable/enable means that person can no longer login if disabled.
* Does it mean create / delete users?
  * That means, new forms, with passwords, username, etc.
  * Not enough time / might be beyond the scope of the project.  This can be a very large feature depending how it's interpreted.

* How I interpret it:
  * Admin can look at the CURRENT users as a list.
  * Admin can change their ROLE based on the user.
  * Admin can disable/enable the user.

### Painter

The story is similar to Jane, but it's phrased in such a way that painter should only allowed to consume units of paint (for houses), but not update the stock.

### Authentication
* Proper authentication takes some time to set up, and we don't know what the client wants as there is no story/acceptance criteria.  OAuth?  Alternative?
* Therefore, we will create a simple login screen and password that is stored in the backend .env file.
* We should at least encrypt / decrypt the pw.