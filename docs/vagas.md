# Endpoint /Vagas

## Atributos
- `id` SERIAL **PRIMARY KEY**;
- `title` **VARCHAR(50)** NOT NULL;
- `description` **VARCHAR(300)** NOT NULL;
- `company` **INTEGER** REFERENCES companys(id);
- `nv_exp` **VARCHAR(25)**;
- `sector` **VARCHAR(50)**;
- `type` **VARCHAR(50)**;

## Métodos

### `GET /vagas`

##### query:
```
https://rh-lab-backend.herokuapp.com/vagas
```
##### Resultado:
```
[
    {
        "id": 12,
        "title": "Estágio Frontend - Codengage",
        "description": "Estágio para desenvolvedor frontend",
        "company": 1,
        "nv_exp": "Básico",
        "sector": "Software/TI",
        "type": "Trainee"
    },
  ...
]  
```

### `GET /vagas/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/vagas/12
```
##### Resultado:
```
[
  {
    "id": 12,
    "title": "Estágio Frontend - Codengage",
    "description": "Estágio para desenvolvedor frontend",
    "company": 1,
    "nv_exp": "Básico",
    "sector": "Software/TI",
    "type": "Trainee"
  }
]
```

### `POST /vagas`
##### query:
```
https://rh-lab-backend.herokuapp.com/vagas
```
#### body params
```
{
	"title": "Vaga para desenvolvedor frontend WEB",
  "description": "Oportunidade para desenvolvedo frontendr WEB Pleno React",
  "company": 1,
  "sector": "Software",
  "nv_exp": "Pleno",
  "type": "CLT"
}
```

##### Resultado (return id of user created):
- `sucesso (status code: 200)`
```
19
```

### `UPDATE /vagas/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/vagas/19
```

#### body params (one or more)
```
{
	"title": "Vaga para desenvolvedor frontend WEB",
  "description": "Oportunidade para desenvolvedo frontend WEB Pleno React",
  "company": 1,
  "sector": "Software",
  "nv_exp": "Pleno",
  "type": "CLT"
}
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 19,
  "title": "Vaga para desenvolvedor frontend WEB",
  "description": "Oportunidade para desenvolvedo frontend WEB Pleno React",
  "company": 1,
  "nv_exp": "Pleno",
  "sector": "Software",
  "type": "CLT"
}
```
### `DELETE /vagas/:id`
##### query:
```
https://rh-lab-backend.herokuapp.com/vagas/19
```

##### Resultado:
- `sucesso (status code: 200)`
```
{
  "id": 19
}
```
