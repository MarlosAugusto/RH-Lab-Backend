# Endpoint /Companys

## Atributos
- `id` SERIAL **PRIMARY KEY**;
- `name` **VARCHAR(50)** NOT NULL;
- `city` **VARCHAR(50)**;
- `UF` **VARCHAR(2)**;
- `sector` **VARCHAR(50)**;
- `phone` **VARCHAR(15)**;
- `email` **VARCHAR(50)** NOT NULL;

## Métodos

### `GET /companys`

##### query:
```
https://rh-lab-backend.herokuapp.com/companys
```
##### Resultado:
```
[
  {
    "id": 1,
    "name": "codengage",
    "city": "Dois Vizinhos",
    "uf": "PR",
    "sector": "Software",
    "phone": "(46)999887766",
    "email": null
  },
  ...
]  
```

### `GET /companys/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/companys/1
```
##### Resultado:
```
[
  {
    "id": 1,
    "name": "codengage",
    "city": "Dois Vizinhos",
    "uf": "PR",
    "sector": "Software",
    "phone": "(46)999887766",
    "email": null
  }
]
```

### `POST /companys`
##### query:
```
https://rh-lab-backend.herokuapp.com/companys
```
#### body params
```
{
	"name":"codengage",
    "city":"Dois Vizinhos",
    "UF":"PR",
    "sector":"Software",
    "phone":"(46)999887766",
    "email":"company@teste.com"
}
```

##### Resultado (return id of user created):
- `sucesso (status code: 200)`
```
1
```

### `UPDATE /companys/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/companys/1
```

#### body params (one or more)
```
{
	"name":"codengage",
    "city":"Dois Vizinhos",
    "UF":"PR",
    "sector":"Software",
    "phone":"(46)999887766",
    "email":"company@teste.com"
}
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
    "id": 1,
    "name": "codengage",
    "city": "Dois Vizinhos",
    "uf": "PR",
    "sector": "Software",
    "phone": "(46)999887766",
    "email": "company@teste.com"
}
```
### `DELETE /companys/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/companys/1
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 1
}
```
