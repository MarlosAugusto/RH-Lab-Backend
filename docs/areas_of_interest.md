# Endpoint /Areas_of_interest

## Atributos
- `id` SERIAL **PRIMARY KEY**;
- `name` **VARCHAR(25)** NOT NULL;
- `description` **VARCHAR(100)**;

## Métodos

### `GET /areas_of_interest`

##### query:
```
https://rh-lab-backend.herokuapp.com/areas_of_interest
```
##### Resultado:
```
[
  {
    "id": 1,
    "name": "software",
    "description": ""
  },
  ...
]  
```

### `GET /areas_of_interest/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/areas_of_interest/1
```
##### Resultado:
```
[
  {
    "id": 1,
    "name": "software",
    "description": ""
  }
]
```

### `POST /areas_of_interest`
##### query:
```
https://rh-lab-backend.herokuapp.com/areas_of_interest
```
#### body params
```
{
  "name": "software",
  "description": ""
}
```

##### Resultado (return id of user created):
- `sucesso (status code: 200)`
```
1
```

### `UPDATE /areas_of_interest/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/areas_of_interest/1
```

#### body params (one or more)
```
{
  "name": "software",
  "description": ""
}
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 1,
  "name": "software",
  "description": "software"
}
```
### `DELETE /areas_of_interest/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/areas_of_interest/1
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 1
}
```
