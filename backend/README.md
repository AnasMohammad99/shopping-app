## Setup the project

### ExpressJS

```bash
npm install
cp env-example .env
```

Edit your `.env` file:

- Change `<postgres-username>` to your PostgreSQL server username
- Change `<postgres-password>` to your PostgreSQL server password

### Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

## API Reference

#### Base URL

```
http://localhost:5000/api/v1
```

## Product Endpoints

### Get all Products

```http
GET /product/
```

Retrieves all Products.

#### Response

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product A",
      "weight": 2.5,
      "price": 100.5,
      "quantity": 10,
      "picture": "uploads\\picture-1750056485459-991474521.png",
      "createdAt": "2025-06-16T06:48:05.614Z",
      "updatedAt": "2025-06-16T06:48:05.614Z"
    }
  ]
}
```

---

### Add Product

```http
POST /product/
```

| Body Parameter | Type      | Description                                          |
| :------------- | :-------- | :--------------------------------------------------- |
| `name`         | `string`  | **Required** Name of the product.                    |
| `weight`       | `float`   | **Required** Weight of the product (in kg or grams). |
| `price`        | `float`   | **Required** Price of the product.                   |
| `quantity`     | `integer` | **Required** Quantity of the product in stock.       |
| `picture`      | `file`    | **Required** Image of the product (uploaded file).   |

#### Response

```json
{
  "message": "Product added successfully!",
  "newProduct": {
    "id": 1,
    "name": "Product A",
    "weight": 2.5,
    "price": 100.5,
    "quantity": 10,
    "picture": "uploads\\picture-1750056485459-991474521.png",
    "createdAt": "2025-06-16T06:48:05.614Z",
    "updatedAt": "2025-06-16T06:48:05.614Z"
  }
}
```

---

### Update Product by ID

```http
PATCH /Product/{id}
```

| Path Parameter | Type      | Description                                            |
| :------------- | :-------- | :----------------------------------------------------- |
| `id`           | `integer` | **Required** The ID of the product you want to update. |

| Body Parameter | Type      | Description                                              |
| :------------- | :-------- | :------------------------------------------------------- |
| `name`         | `string`  | **Optional** New name of the product.                    |
| `weight`       | `float`   | **Optional** New weight of the product (in kg or grams). |
| `price`        | `float`   | **Optional** New price of the product.                   |
| `quantity`     | `integer` | **Optional** New quantity of the product in stock.       |

#### Response

```json
{
  "message": "Product updated successfully!",
  "updatedProduct": {
    "id": 1,
    "name": "Product A",
    "weight": 2.5,
    "price": 100.5,
    "quantity": 10,
    "picture": "uploads\\picture-1750056485459-991474521.png",
    "createdAt": "2025-06-16T06:48:05.614Z",
    "updatedAt": "2025-06-16T06:48:05.614Z"
  }
}
```

---

### Delete Product by ID

```http
DELETE /product/{id}
```

| Path Parameter | Type      | Description                                            |
| :------------- | :-------- | :----------------------------------------------------- |
| `id`           | `integer` | **Required** The ID of the product you want to delete. |

#### Response

```json
{
  "message": "Product deleted successfully!",
  "deletedProduct": {
    "id": 1,
    "name": "Product A",
    "weight": 2.5,
    "price": 100.5,
    "quantity": 10,
    "picture": "uploads\\picture-1750056485459-991474521.png",
    "createdAt": "2025-06-16T06:48:05.614Z",
    "updatedAt": "2025-06-16T06:48:05.614Z"
  }
}
```
