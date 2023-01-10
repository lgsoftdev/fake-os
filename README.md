# Project: <a href="https://lgsoftdev.github.io/fake-os/" target="blank">FakeOS</a>

The goal of this project is to explore and consolidate my understanding of HTML, CSS and JavaScript. I replicated the layout and format of a Windows 10 desktop using CSS, add content via HTML and control the interactive elements using JavaScript. FakeOS links to a live version and a matching GitHub repository.
<br><br>

## Outline

<br>

### Features

<br>

- A Single Page Application (SPA)
- A wallpaper that fits the viewport of the desktop
- Selectable icons
- Selecting an icon opens a modal window with content for the app
- Ability to close the app
- Selectable menu
- Selecting the menu displays a list of text and icons
- Current time is displayed
  <br><br>

### Project Requirements

<br>
The following MVP requirements were addressed during the development of the FakeOS webpage:

- Wallpaper scales to fit the viewport
- 3 icons on the desktop
- The menu is positioned on the bottom left for Windows 10
- Apps look consistent
- Menu contains a flex with content inside it
- Apps contain texts, images or forms
  <br><br>

The following JavaScript challenges were addressed:

- JS code in separate files
- Icons and menu have add event listener for the click event
- Functions and variables have good names
- Arrow syntax was used to declare functions
  <br><br>

### Github

<br>

- A public repository on GitHub for the project (https://github.com/lgsoftdev/fake-os).
- A README.md in the repository with a short intro to the project.
  <br><br>

## Summary

<br>
I first created a design plan on how sections of my FakeOS SPA are going to be laid out. I chose only to include the minimum requirement of 3 Apps so I can spend time ensuring that forms and image carousels function properly. The forms I created allow for data entered by users to be saved in session storage and saved data can be viewed in list format or post its (or cards). Image file names are stored in an array and JavaScript loops through the array to dynamically build the photos carousel. More images can therefore be easily added by simply adding filenames to the file names array. Due to time constraint, I was not able to use json file for this but it is an improvement that I can apply in the future.  
<br><br>
FakeOS was built using HTML, CSS, SCSS, and JavaScript. BEM, variables and mixins were used to define styles. JavaScript iterators, modules, control-flow, FormData, and DOM manipulation were used.
<br><br>
I can refactor JavaScript code at some point. It might also be good to look into making the html file size smaller. 
<br><br>
