# Endpoint /Dbquery

## Atributos

### `POST /dbquery`
##### query:
```
https://rh-lab-backend.herokuapp.com/dbquery
```
#### body params
```
{
  "query": "SELECT * FROM users WHERE id > 5;",
  "key": "123456"
}
```

##### Resultado (return id of user created):
- `sucesso (status code: 200)`
```
[
  {
    "id": 37,
    "name": "Douglas Wender ",
    "email": "dglswender@gmail.com",
    "cpf": "79843209843",
    "rg": "198413219",
    "genre": null,
    "birth_date": "1997-01-27",
    "cep": "85660000",
    "city": "DV",
    "uf": "PR",
    "street": "Rua Wenceslau Braz",
    "number": "714",
    "complement": "Apto 01",
    "contacts": "46999299939",
    "areas_of_interest": "TI, Software, Mobile, Backend.",
    "wage_claim": "1350.00"
  },
  ...
]
```

- `erro valor de key incorreto (status code: 401)`
```
{
    "Error": "Você não possui autorização para realizar a operação."
}
```