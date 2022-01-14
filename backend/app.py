import os
from dotenv import load_dotenv
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.requests import Request
from starlette.routing import Route
from starlette.middleware.cors import CORSMiddleware
from databases import Database

# populate env and config variables
load_dotenv()
CAT_DOCUMENT_TABLE = os.getenv('CAT_DOCUMENT_TABLE')
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_URL = os.getenv('DATABASE_URL')

# database connection
database = Database(DATABASE_URL)

async def homepage(request):
  return JSONResponse({'hello': 'world'})

async def getDocuments(request):
  query = f"SELECT * FROM {CAT_DOCUMENT_TABLE}"
  rows = await database.fetch_all(query=query)
  data = [dict(row) for row in rows]
  return JSONResponse(data)

async def addDocuments(request: Request):
  payload = await request.json()
  query = f"INSERT INTO {CAT_DOCUMENT_TABLE}(title, type, position) VALUES (:title, :type, :position)"
  await database.execute(query=query, values=payload)
  return JSONResponse({"message" : "Data inserted successfully"})

async def deleteDocuments(request: Request):
  payload = await request.json()
  deleteIds = ', '.join([str(element) for element in payload])
  query = f"DELETE FROM {CAT_DOCUMENT_TABLE} WHERE id IN ({deleteIds})"
  await database.execute(query=query)
  return JSONResponse({"message" : "Data deleted successfully"})

async def updateDocuments(request):
  try:
    payload = await request.json()
  except ValueError:
    return JSONResponse({'message': 'No data to update'})
  cases = ""
  for entry in payload:
    cases += f" WHEN {entry} THEN {payload[entry]}"
  query = f"UPDATE {CAT_DOCUMENT_TABLE} SET position = CASE id {cases} ELSE position END WHERE id IN ({', '.join([str(entry) for entry in payload])})"
  await database.execute(query=query)
  return JSONResponse({'message': 'Data updated successfully'})

# Define routes
app = Starlette(debug=True, routes=[
  Route('/', homepage),
  Route('/getDocuments', getDocuments),
  Route('/updateDocuments', updateDocuments, methods=['POST']),
  Route('/addDocuments', addDocuments, methods=['POST']),
  Route('/deleteDocuments', deleteDocuments, methods=['POST'])
])

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])