## Config description

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

**`season`**: String, the season number, used in the bottom page text.

**`guideurl`**: String, the URL used as the link to the guide.

**`votetypes`**: Array of objects describing vote options.

>**`label`**: String, name of vote option.

>**`value`**: Number, vote percentage, decimal from 0-1.

>**`includeInTotal`**: Boolean, true to include this vote total in the total vote count (only false for things like holding votes).

>**`type`**: String, one of: "will", "blessing", "wimdy", "other".  Will vote types can be hidden by Include Wills checkbox, Wimdy vote types show an asterisk to link to the list of wills.

>**`order`**: Number, used to sort display of votes.

**`wimdys`**: Array of strings with names of Blessing options as part of Wimdy%, randomized when displayed.

**`idols`**: Array of objects used for the random idol picker.

>**`id`**: String, player ID, used for direct link to player page.

>**`name`**: String, player name.

**`value`**: Number, lower bound of roll, possible values are 1-100 (first in idols array should be value=1, last in array will have odds of 100-value).


### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run deploy`

Compile and deploy code to the gh-pages branch for use by Github Pages.
