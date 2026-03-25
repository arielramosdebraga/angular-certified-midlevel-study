---
difficulty: 2
training: true
chapter: "Chapter 4: Directives and Pipes"
tags: angular
---

# Create Pipes to Improve Budget and Duration Formatting

# Challenge Description
In this challenge, we want to display movie budgets as follows using a custom pipe:
- If the budget is "175", render it as "$175 million"
- If the budget is a range such as "175-200", render it as "$175 to $200 million"
- Then create another custom pipe to format the movie duration so that "92" is displayed as "1h 32min"

## Requirements
- Edit the provided `src/pipes/million-dollar.pipe.ts`
- Implement the transform method to format input values as defined in the challenge description:
   - If the budget is "175", render it as "$175 million"
   - If the budget is a range such as "175-200", render it as "$175 to $200 million"
> 💡 HINT: Not sure how to parse strings in Javascript? Take a look at [string.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- Add your pipe to the template of `movie-item.component.ts` and ensure the movie budgets are displayed as required
- Edit the provided `src/pipes/min-to-duration.pipe.ts`
- Implement the transform method to format input values as defined in the challenge description:
   - "92" must be displayed as "1h 32min"
- Add your pipe to the template of `movie-item.component.ts` and ensure the movie durations are displayed as required
> 💡 HINT: This challenge can make use of a lot of modern Javascript features covered in the Javascript section of our training (template strings, ?? operator, and more)

## Other Considerations

- If you see the `data-test` attribute anywhere in the boilerplate don't remove it.

## Example of Finished Application

This is an example of what the functionality should look like for the completed exercise. If you’d like to mimic this style, feel free to do so, but it is not required.

![Finished app in this challenge](https://images.certificates.dev/chapter42-screenshot.png)
