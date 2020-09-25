# Emtropy News

This is a React JS application I built to consume the [GNews](https://gnews.io) API and supply a searchable list of top headlines from 3 countries (India, UK and US).

[Demo Link](https://emtropy-labs.netlify.app)

## The Aproach

This application uses [Material UI's React Library](https://material-ui.com) for design. Easy choice because of how fast and easy to implement it is. Also because of how great the documentation is.

I used React-Router for seamless page navigation.

I wrote a fetch function that gets a list of news items from the GNews API depending on the parameters passes in the function (search query and country) and then stores this value to React State.

In order to implement the like and hide functionality, after the fetch is done, I map the array that I received and append a like and a display item to each object in that array which are set to 0 and block by default, then these values are stored to local storage.

For likes, I wrote a function to increment the like count value by one and linked the function to the onClick event of the like button on each grid item. After each click, the new value is saved to state, and subsequently to localStorage.

For hiding news titles, I wrote a toggle function that reads the current value of the display field I appended to each array object and if its display is set to "block", the value is replaced with "none" and vice-versa. This value is then passed as a prop and assigned to the css display property of the component.

For search, I created an input component and wrote a function that passes the value in the text box to state when the enter key is pressed. This triggers a new fetch with the query parameter and returns only headlines related to the search query.

All these data are passed as array to each component/page and are then destructured, mapped through and rendered to create grids of all the items.

The application has CI setup with Netlify and auto deploys on every push.
