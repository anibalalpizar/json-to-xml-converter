export const JSON_EXAMPLES = [
  {
    title: "Simple Object",
    json: `{
    "name": "John Doe",
    "age": 30,
    "city": "New York"
  }`,
  },
  {
    title: "Array of Objects",
    json: `{
    "users": [
      {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com"
      },
      {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com"
      }
    ]
  }`,
  },
  {
    title: "Nested Structure",
    json: `{
    "company": {
      "name": "Tech Corp",
      "location": {
        "city": "San Francisco",
        "country": "USA"
      },
      "employees": 500
    }
  }`,
  },
  {
    title: "Mixed Types",
    json: `{
    "product": {
      "id": "123",
      "name": "Laptop",
      "price": 999.99,
      "inStock": true,
      "tags": ["electronics", "computers"],
      "specs": {
        "cpu": "Intel i7",
        "ram": "16GB"
      }
    }
  }`,
  },
];
