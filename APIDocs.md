# API Docs

BASE_URL: http://localhost:5000

## Album API

### `POST /albums`

Body Request:

```json
{
  "name": "string",
  "year": "number"
}
```

Response:

201 - Created

```json
{
  "status": "success",
  "data": {
    "albumId": "string"
  }
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "error message"
}
```

### `POST /albums/{albumId}/covers`

Body Request:

```
{
  "cover": "file<image/png, image/jpg, image/jpeg>"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

### `GET /albums/{albumId}`

Body Request: -

Response:

200 - OK

```json
{
  "status": "success",
  "data": {
    "album": {
      "id": "string",
      "name": "string",
      "year": 2008,
      "coverUrl": null,
      "songs": []
    }
  }
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Album not found!"
}
```

### `PUT /albums/{albumId}`

Body Request:

```json
{
  "name": "string",
  "year": "number"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "error message"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Album not found!"
}
```

### `DELETE /albums/{albumId}`

Body Request: -

Response:

200 - OK

```json
{
  "status": "success"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Album not found!"
}
```

## Song API

### `POST /songs`

Body Request:

```json
{
  "title": "string",
  "year": "number",
  "performer": "string",
  "genre": "string",
  "duration": "numbers"
}
```

Response:

201 - Created

```json
{
  "status": "success",
  "data": {
    "songId": "song-G6e-VlpX8MiBwGAs"
  }
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "\"field_name\" is required"
}
```

### `GET /songs`

Parameters:

```json
{
  "title": "<search song by title>",
  "performer": "<search song by performer>"
}
```

Body Request: -

Response:

200 - OK

```json
{
  "status": "success",
  "data": {
    "songs": [
      {
        "id": "string",
        "title": "string",
        "performer": "string"
      }
    ]
  }
}
```

### `GET /songs/{songId}`

Body Request: -

Response:

200 - OK

```json
{
  "status": "success",
  "data": {
    "song": {
      "id": "string",
      "title": "string",
      "year": "number",
      "performer": "string",
      "genre": "string",
      "duration": "number",
      "albumId": "album_id"
    }
  }
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Song not found!"
}
```

### `PUT /songs/{songId}`

Body Request:

```json
{
  "title": "string",
  "year": "number",
  "performer": "string",
  "genre": "string",
  "duration": "numbers"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Song not found"
}
```

### `DELETE /songs/{songId}`

Body Request: -

Response:

200 - OK

```json
{
  "status": "success"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Song not found"
}
```

## Register User API

### `POST /users`

Body Request:

```json
{
  "username": "string",
  "password": "string",
  "fullname": "string"
}
```

Response:

201 - Created

```json
{
  "status": "success",
  "data": {
    "userId": "string"
  }
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

## Authentication API

### `POST /authentications`

Body Request:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

201 - Created

```json
{
  "status": "success",
  "data": {
    "accessToken": "token",
    "refreshToken": "token"
  }
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

### `PUT /authentications`

Body Request:

```json
{
  "refershToken": "token"
}
```

Response:

200 - OK

```json
{
  "status": "success",
  "data": {
    "accessToken": "token"
  }
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

### `DELETE /authentications`

Body Request:

```json
{
  "refershToken": "token"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

## Playlists API

### `POST /playlists`

Headers

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request:

```json
{
  "name": "string"
}
```

Response:

201 - Created

```json
{
  "status": "success",
  "data": {
    "playlistId": "string"
  }
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

401 - Unauthorized

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Missing authentication"
}
```

### `GET /playlists`

Headers

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request: -

Response:

200 - OK

```json
{
  "status": "success",
  "data": {
    "playlists": [
      {
        "id": "string",
        "name": "string",
        "username": "string"
      },
      {
        "id": "string",
        "name": "string",
        "username": "string"
      }
    ]
  }
}
```

### `DELETE /playlists/{playlistId}`

Headers

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request: -

Response:

200 - OK

```json
{
  "status": "success"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Playlist not found"
}
```

403 - Forbidden

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

### `POST /playlists/{playlistId}/songs`

Description: add song to playlist

Headers

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request:

```json
{
  "songId": "string"
}
```

Response:

201 - Created

```json
{
  "status": "success"
}
```

400 - Bad Request

```json
{
  "status": "fail",
  "message": "<error message>"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "playlist not found"
}
```

403 - Forbidden

```json
{
  "status": "fail"
}
```

### `GET /playlists/{playlistId}/songs`

Description: Get all songs in playlist

Headers:

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request: -

Response:

200 - OK

```json
{
  "status": "success",
  "data": {
    "playlist": {
      "id": "string",
      "name": "string",
      "username": "string",
      "songs": [
        {
          "id": "string",
          "title": "string",
          "performer": "string"
        }
      ]
    }
  }
}
```

403 - Forbidden

```json
{
  "status": "fail"
}
```

### `DELETE /playlists/{playlistId}/songs`

Description: Delete song from playlist

Headers:

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request:

```json
{
  "songId": "string"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

403 - Forbidden

```json
{
  "status": "fail"
}
```

## Collaboration API

### `POST /collaborations`

Description: Add collaborator to playlist

Headers:

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

Body Request:

```json
{
  "playlistId": "string",
  "userId": "userId"
}
```

Response:

201 - Created

```json
{
  "status": "success",
  "data": {
    "collaborationId": "string"
  }
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "Playlist not found"
}
```

404 - Not Found

```json
{
  "status": "fail",
  "message": "User not found"
}
```

403 - Forbidden

```json
{
  "status": "failed"
}
```

### `DELETE /collaborations`

Description: Delete collaborator from playlist

Headers:

```json
{
  "Authorization": "Bearer <accessToken>"
}
```

Body Request:

```json
{
  "playlistId": "string",
  "userId": "userId"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

## Export Songs API

### `POST /export/playlists/{playlistId}`

Headers:

```json
{
  "Authorization": "Bearer + accessToken"
}
```

Body Request:

```json
{
  "targetEmail": "string"
}
```

Response:

200 - OK

```json
{
  "status": "success"
}
```

403 - Forbidden

```json
{
  "status": "fail"
}
```
