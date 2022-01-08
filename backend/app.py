from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.requests import Request
from starlette.routing import Route
from starlette.middleware.cors import CORSMiddleware
from databases import Database

database = Database("sqlite:///example.db")

async def homepage(request):
  return JSONResponse({'hello': 'world'})

async def getDocuments(request):
  query = "SELECT * FROM CatDocuments"
  rows = await database.fetch_all(query=query)
  data = [dict(row) for row in rows]
  return JSONResponse(data)

async def addDocuments(request: Request):
  payload = await request.json()
  query = "INSERT INTO CatDocuments(title, type, position) VALUES (:title, :type, :position)"
  await database.execute(query=query, values=payload)
  return JSONResponse({"message" : "Data inserted successfully"})

async def updateDocuments(request):
  return JSONResponse({'message': 'Data updated successfully'})

app = Starlette(debug=True, routes=[
  Route('/', homepage),
  Route('/getDocuments', getDocuments),
  Route('/updateDocuments', updateDocuments, methods=['POST']),
  Route('/addDocuments', addDocuments, methods=['POST'])
])

app.add_middleware(CORSMiddleware, allow_origins=["*"])