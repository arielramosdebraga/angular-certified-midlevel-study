---
difficulty: 1
training: true
chapter: "Chapter 2: Angular Components"
tags: angular
---

# Create a Component Driven by Inputs

# Challenge Description
In this challenge, let's create a movie item component that receives `Movie` information as an input.

## Requirements
- Open `src/movie-item/movie-item.component.ts`
- Add a required input of type `Movie` (see sample movie provided in `src/app.component.ts`)
- Update the provided HTML template to render the movie:
  - Title
  - Release date (no formatting needed)
  - Budget ($ {value} million - for instance: $ 50 million)
  - Duration ({value} min - for instance: 152 min)
- Update `src/app.component.html` to pass the sample `movie` as an input
- Ensure your component is displayed properly on the screen

> 💡 HINT: Review our self-study content if you get stuck at any step


## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.
- Mini.css is preinstalled with the default config. It might be helpful for you, if you want to have some styles. (Not required)

## Example of Finished Component

This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.

![Finished app in this challenge](https://api.certificates.dev/repositories/assets/QW5ndWxhci1DZXJ0aWZpY2F0aW9uL3RyYWluaW5nLWNvZGUtY2hhbGxlbmdlLWNoYXB0ZXIxLTEvc2NyZWVuc2hvdC5wbmc=)
