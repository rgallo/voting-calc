
# Team Details

Returns limited stats, player IDs, and other information for a given team ID. Limited to a single team ID.

## Endpoint

`https://www.blaseball.com/database/team?id=:id`

## Response

```json
{
  "season": 17,
  "guideurl": "https://docs.google.com/document/d/1sTAq-BkZCnttEiJXHy-jFoRRwxl8sxywTATgrXprWLY/edit?usp=sharing",
  "votetypes": [
    {
      "label": "Reform Chorby Short's Unstable",
      "value": 0.22,
      "includeInTotal": true,
      "type": "will",
      "order": -2
    },
    {
      "label": "Move Albert Stink to the Shadows Rotation",
      "value": 0.22,
      "includeInTotal": true,
      "type": "will",
      "order": -1
    },
    {
      "label": "On Deck",
      "value": 0.21,
      "includeInTotal": true,
      "type": "blessing",
      "order": 2
    },
    {
      "label": "Wind Sprints",
      "value": 0.21,
      "includeInTotal": true,
      "type": "blessing",
      "order": 1
    },
    {
      "label": "WIMDY!",
      "value": 0.14,
      "includeInTotal": true,
      "type": "wimdy",
      "order": 100
    }
  ],
  "wimdys": [
    "Supply Runs",
    "Handcrafted Drops",
    "Crate Drops"
  ],
  "idols": [
    {
      "id": "766dfd1e-11c3-42b6-a167-9b2d568b5dc0",
      "name": "Sandie Turner",
      "value": 1
    },
    {
      "id": "4b3e8e9b-6de1-4840-8751-b1fb45dc5605",
      "name": "Thomas Dracaena",
      "value": 1
    }
  ]
}
```

## Field Descriptions

**`id`**: The ID of the team.

**`lineup`**: The IDs of the players that belong to the team's lineup.

**`rotation`**: The IDs of the players that belong to the team's pitching rotation.

**`bullpen`**: The IDs of the players that belong to the team's bullpen.

**`bench`**: The IDs of the players that belong to the team's bench.

**`fullName`**: The full name of the team.

**`location`**: The home city of the team.

**`mainColor`**: The hex code of the team's primary color.

**`nickname`**: The team's nickname.

**`secondaryColor`**: The hex code of the team's secondary color.

**`shorthand`**: The abbreviated team name.

**`emoji`**: The team's emoji.

**`slogan`**: The team's slogan.

**`shameRuns`**: The number of runs the team has given up while shamed.

**`totalShames`**: The number of times the team has been shamed across all seasons.

**`totalShamings`**: The number of times the team has shamed another team across all seasons.

**`seasonShames`**: The number of times the team has been shamed this season.

**`seasonShamings`**: The number of times the team has shamed another team across this season.

**`championships`**: The number of seasons the team has won.

**`rotationSlot`**: Determines which member of the team's rotation is currently pitching.

**`weekAttr`**: The IDs of attributes assigned to the team for this week.

**`gameAttr`**: The IDs of attributes assigned to the team for this game.

**`seasAttr`**: The IDs of attributes assigned to the team for this season.

**`permAttr`**: The IDs of attributes assigned to the team permanently.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
