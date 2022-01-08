# fabio-tests-nisargatman

## Setup 

From the `backend/` directory, create a new virtual environment, install the dependencies, and create the database:

```shell
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
python init_db.py
```

From the `frontend/` directory, install the dependencies:

```shell
npm install
```

## Running

### Backend

From the `backend` directory (using the virtual environment), enter the following:

```shell
uvicorn app:app
```

### Frontend
From the `frontend/` directory, enter the following:


```shell
npm start
```


Then visit http://localhost:3001.