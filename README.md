# Open Music API

Submission Kelas Belajar Fundamental Aplikasi Back-End | Dicoding Academy

## API Docs

### POST `/albums`

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
    "albumId": "album-1i0PCtWxDQJ0Uu9g"
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
      "id": "album-1i0PCtWxDQJ0Uu9g",
      "name": "Viva la vida",
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

Request Body:

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

Request Body: -

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
