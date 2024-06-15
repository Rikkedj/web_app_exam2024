# Exam #1: "Meme Game"
## Student: s321521 JOHANSEN RIKKE DALJORD 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- POST `/api/logout`
- POST `/api/start-game` 
Response body:
[{
  "gameId": "1234",
  "round": 1,
  "meme": {
    "id": "meme1",
    "url": "https://example.com/meme1.jpg"
  },
  "captions": [
    { "id": "caption1", "text": "Correct caption 1" },
    { "id": "caption2", "text": "Correct caption 2" },
    { "id": "caption3", "text": "Incorrect caption 1" },
    { "id": "caption4", "text": "Incorrect caption 2" },
    { "id": "caption5", "text": "Incorrect caption 3" },
    { "id": "caption6", "text": "Incorrect caption 4" },
    { "id": "caption7", "text": "Incorrect caption 5" }
  ],
  "score": 0
}]
# Fetching next round
Request:
- GET `/api/next-round?gameId=1234`

# Submit a vote
- POST ``
- POST `/users/games/round`

- GET `/api/games/:gameID/rounds/:roundID/meme`
  - request parameters
  - response body content

- GET `/api/rounds/:roundID/meme`

- GET `/api/rounds/:roundID/captions`

- POST ``

- GET `/api/games/:gameID/rounds/:roundID`

- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains xx yy zz
- Table `games` - contains ww qq ss
- Table `rounds` - contains ww qq ss
- Table `memes` - contains ww qq ss
- Table `captions` - contains ww qq ss
- Table `memes_captions` - contains ww qq ss
- Table `rounds_captions` - contains ww qq ss

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
