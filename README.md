# Item API (Spring Boot)

Simple REST API for managing items using an in-memory data store.

## Run

```bash
./mvnw spring-boot:run
```

App starts on `http://localhost:8080`.

## Endpoints

### Health check

`GET /healthz`

Returns `200 OK` with `{ "status": "ok" }`.

### Create item

`POST /api/items`

Example body:

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic 2.4G mouse",
  "category": "Electronics",
  "price": 599.0
}
```

Returns `201 Created` with the saved item (including generated `id`).

### Get item by id

`GET /api/items/{id}`

Example:

`GET /api/items/1`

Returns `200 OK` with the item or `404 Not Found` if the id does not exist.

### Get all items

`GET /api/items`

Returns `200 OK` with a JSON array (empty array if no items exist).

## Validation

Input validation is enabled:

- `name` is required and cannot be blank.
- `description` is required and cannot be blank.
- `price` must be zero or positive (optional field).

Invalid input returns `400 Bad Request` with validation errors.

## Notes

- Data is stored in memory using an `ArrayList`, so items reset when the app restarts.
