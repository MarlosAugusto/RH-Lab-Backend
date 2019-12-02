# Endpoint /Users

## Atributos
- `id` SERIAL **PRIMARY KEY**;
- `name` **VARCHAR(120)** NOT NULL;
- `email` **VARCHAR(120)** NOT NULL;
- `CPF` **VARCHAR(14)** NOT NULL UNIQUE;
- `RG` **VARCHAR(12)** NOT NULL UNIQUE;
- `genre` **VARCHAR(25)**;
- `birth_date` **VARCHAR(20)**;
- `CEP` **VARCHAR(9)**;
- `city` **VARCHAR(100)**;
- `UF` **VARCHAR(2)**;
- `street` **VARCHAR(100)**;
- `number` **VARCHAR(10)**;
- `complement` **VARCHAR(100)**;
- `contacts` **VARCHAR(500)**;
- `areas_of_interest` **VARCHAR(200)**;
- `wage_claim` **DECIMAL(10,2)**;

## Métodos

### `GET /users`
<!-- #### query params
`filter` - clausa para restrisgir a consulta:

```
/plans?where={"id":"2"}`
```

`offset` - define a partir de qual registro retornar:
```
/plans?offset=2
```

`limit` - define a quantidade de registros retornados:
```
/plans?limit=5
```

`order`: - define a ordenação do retorno [ "desc" || "asc" ]:
```
/plans?order=[["id","desc"]]
``` -->

##### query:
```
https://rh-lab-backend.herokuapp.com/users
```
##### Resultado:
```
[
  {
    "id":1,
    "name":"Douglas Oliveira",
    "email":"teste@gmail.com",
    "cpf":"79516785204",
    "rg":"812146",
    "genre":"",
    "birth_date":"1999-10-28 00:00:00",
    "cep":"85660000",
    "city":"Dois Vizinhos",
    "uf":"PR",
    "street":"Rua Wenceslau Braz",
    "number":"714",
    "complement":"Apto 01",
    "contacts":"46999299939",
    "areas_of_interest":"TI, Software, Test",
    "wage_claim":"751.00"
  },
  ...
]  
```

### `GET /users/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/users/1
```
##### Resultado:
```
[
  {
    "id": 22,
    "name": "Marlos Augusto",
    "email": "marlos@teste.com",
    "cpf": "181.000.000-00",
    "rg": "10.000.818-0",
    "genre": "Masculino",
    "birth_date": "22/02/1997",
    "cep": "85660-000",
    "city": "Dois Vizinhos",
    "uf": "PR",
    "street": "Rua Wenceslau Braz",
    "number": "714",
    "complement": "Apto 01",
    "contacts": "46999299939",
    "areas_of_interest": "TI, Software, Test",
    "wage_claim": "1200.00"
  }
]
```

### `POST /users`
##### query:
```
https://rh-lab-backend.herokuapp.com/users
```
#### body params
```
{
  "name": "Marlos Augusto",
  "email": "marlos@teste.com",
  "CPF": "181.000.000-00",
  "RG":"10.000.818-0",
  "genre": "Masculino",
  "birth_date": "22/02/1997",
  "CEP": "85660-000",
  "city": "Dois Vizinhos",
  "UF": "PR",
  "street": "Rua Wenceslau Braz",
  "number":"714",
  "complement":"Apto 01",
  "contacts":"46999299939",
  "areas_of_interest":"TI, Software, Test",
  "wage_claim": 1200.00
}
```

##### Resultado (return id of user created):
- `sucesso (status code: 200)`
```
1
```

### `UPDATE /users/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/users/1
```

#### body params (one or more)
```
{
  "name": "Marlos Augusto",
  "email": "marlos@teste.com",
  "CPF": "181.000.000-00",
  "RG":"10.000.818-0",
  "genre": "Masculino",
  "birth_date": "22/02/1997",
  "CEP": "85660-000",
  "city": "Dois Vizinhos",
  "UF": "PR",
  "street": "Rua Wenceslau Braz",
  "number":"714",
  "complement":"Apto 01",
  "contacts":"46999299939",
  "areas_of_interest":"TI, Software, Test",
  "wage_claim": 1200.00
}
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 1,
  "name": "Marlos Augusto",
  "email": "marlos@teste.com",
  "cpf": "181.000.000-00",
  "rg": "10.000.818-0",
  "genre": "Masculino",
  "birth_date": "22/02/1997",
  "cep": "85660-000",
  "city": "Dois Vizinhos",
  "uf": "PR",
  "street": "Rua Wenceslau Braz",
  "number": "714",
  "complement": "Apto 01",
  "contacts": "46999299939",
  "areas_of_interest": "TI, Software, Test",
  "wage_claim": "1200.00"
}
```
### `DELETE /users/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/users/1
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 1
}
```

### `POST /users/auth/cadastro`
##### query:
```
https://rh-lab-backend.herokuapp.com/users/auth/cadastro
```
#### body params
```
{
	"email": "marlos@teste.com.br",
	"password": "123456"
}
```

##### Resultado:
```
{
  "success": true
}
```

### `POST /users/auth/login`
##### query:
```
https://rh-lab-backend.herokuapp.com/users/auth/login
```
#### body params
```
{
	"email": "marlos@teste.com.br",
	"password": "123456"
}
```

##### Resultado:
```
{
  "success": true
}
```

### `POST /users/auth/sair`
##### query:
```
https://rh-lab-backend.herokuapp.com/users/auth/sair
```

##### Resultado:
```
{
    "success": true
}
```

