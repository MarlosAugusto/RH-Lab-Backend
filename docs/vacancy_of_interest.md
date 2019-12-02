# Endpoint /Vacancy_of_interest

## Atributos
- `id` SERIAL **PRIMARY KEY**;
- `id_user` **INTEGER REFERENCES** users(id);
- `id_vaga` **INTEGER REFERENCES** vagas(id);

## Métodos

### `GET /vacancy_of_interest`

##### query:
```
https://rh-lab-backend.herokuapp.com/vacancy_of_interest
```
##### Resultado:
```
[
  {
    "id": 1,
    "id_user": 1,
    "id_vaga": 12
  },
  ...
]  
```

### `GET /vacancy_of_interest/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/vacancy_of_interest/1
```
##### Resultado:
```
{
        "id": 1,
        "id_user": 1,
        "id_vaga": 12
    }
```

### `POST /vacancy_of_interest`
##### query:
```
https://rh-lab-backend.herokuapp.com/vacancy_of_interest
```
#### body params
```
{
	"id_user": 2,
  "id_vaga": 12
}
```

##### Resultado (return id of user created):
- `sucesso (status code: 200)`
```
3
```

### `UPDATE /vacancy_of_interest/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/vacancy_of_interest/1
```

#### body params (one or more)
```
{
	"id_user": 2,
  "id_vaga": 12
}
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 2,
	"id_user": 2,
  "id_vaga": 12
}
```
### `DELETE /vacancy_of_interest/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/vacancy_of_interest/1
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 2
}
```
