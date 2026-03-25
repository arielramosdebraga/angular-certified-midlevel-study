---
difficulty: 2
training: true
chapter: "Chapter 6: Angular Router"
tags: angular
---

# Use the Router to Display Movie Details

# Challenge Description
In this challenge, we want to be able to display movie details by clicking on the "Details" button of any movie displayed on the screen, using the component router and lazy-loading.

## Requirements
- Edit the provided `src/home/home.component.ts` to make it the new landing page that displays the list of movies.
- Change `app.component.ts` to display just a `<router-outlet />`. The entire page will be controlled by the router.
- Change the router config in `app.routes.ts` by adding two routes:
  - A route for the default path "" goes to `HomeComponent` (landing page with movies list)
  - A route for the path "details/:id" lazy-loads `MovieDetailsComponent` (page with details for a single movie)
> 💡 HINT: Not sure how to use lazy-loading? Head back to our lesson section on lazy-loading
- Update the "Details" button in `MovieItemComponent` so it uses a `routerLink` to navigate to the proper movie details.


## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.

## Example of Finished Application

This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.

![Finished app in this challenge](https://images.certificates.dev/chapter61-screenshot.gif)
