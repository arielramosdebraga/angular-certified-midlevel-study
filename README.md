---
difficulty: 2
training: true
chapter: "Chapter 7: RxJs Observables"
tags: angular
---

# Use RxJs Observables to Display Data

# Challenge Description
In this challenge, our lead developer decided to update `movies.service.ts` to make it return Observables instead of Signals.
As a result, we have to update our components to use Observables instead of Signals.

## Requirements
- Update `src/home/home.component.ts` to make it handle the new Observable and render the list of all movies.
> 💡 HINT: Remember the `async` pipe? Now is a good time to use it!
- Update `MovieDetailsComponent` to make it handle the new Observable and render movie details.
- The app should work just like it did before with no visible difference to the user.

## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.

## Example of Finished Application

This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.

![Finished app in this challenge](https://images.certificates.dev/chapter71-screenshot.gif)
