---
difficulty: 2
training: true
chapter: "Chapter 5: Services and Dependency Injection"
tags: angular
---

# Use a Service to Manage Favorite Movies

# Challenge Description
In this challenge, we want to be able to manage favorite movies in the app by:
- Adding a movie as a favorite by clicking on a "star" icon ☆
- Displaying current favorite movies by displaying their "star" icon in yellow color ⭐
- Removing a movie from our favorites by clicking again on the "star" icon ☆

## Requirements
- Edit the provided `src/services/favorites.service.ts`
- Use a Signal to store the list of current favorite movies (empty array by default)
- Implement a method `toggleFavorite` to toggle (add/remove) a movie from the list of favorites
> 💡 HINT: Not sure how to work with Signals? Head back to our section on Signals in Chapter 2
- Implement a method `isFavorite(movie)` that returns whether a movie is a favorite or not
- Add inputs/outputs to `movie-item.component.ts` to pass the information when a movie is a favorite, as well as emit an event when the "star" icon is clicked.
- Use the `active` CSS class to turn the ☆ icon into ⭐. Remove that class to do the opposite.
- Update `app.component.ts` to handle the interactions with `favorites.service.ts` and pass the favorite information to `movie-item.component.ts`.
> 🚨 PRO TIP: Using inputs/outputs to avoid injecting services in too many components is a fundamental architectural concept known as using [presentation and container components](https://www.angulartraining.com/daily-newsletter/container-vs-presentation-components/).



## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.

## Example of Finished Application

This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.

![Finished app in this challenge](https://images.certificates.dev/chapter51-screenshot.gif)
