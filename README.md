# Open Music API

Submission Kelas Belajar Fundamental Aplikasi Back-End | Dicoding Academy

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
