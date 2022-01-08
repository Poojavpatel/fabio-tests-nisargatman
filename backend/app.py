from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from databases import Database

database = Database("sqlite:///example.db")

async def homepage(request):
  return JSONResponse({'hello': 'world'})

async def getDocuments(request):
  return JSONResponse({'cat': 'yes'})

async def updateDocuments(request):
  return JSONResponse({'yup': 'yes'})

app = Starlette(debug=True, routes=[
  Route('/', homepage),
  Route('/getDocuments', getDocuments),
  Route('/updateDocuments', updateDocuments, methods=['POST'])
])