import os
from dotenv import load_dotenv
import asyncio
from databases import Database

# populate env and config variables
load_dotenv()
CAT_DOCUMENT_TABLE = os.getenv('CAT_DOCUMENT_TABLE')
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_URL = os.getenv('DATABASE_URL')

async def main() -> None:
    database = Database(DATABASE_URL)
    await database.connect()

    query = f"CREATE TABLE IF NOT EXISTS {CAT_DOCUMENT_TABLE} (id INTEGER PRIMARY KEY, title VARCHAR(100), type VARCHAR(100), position INTEGER)"
    await database.execute(query=query)

    query = f"INSERT INTO {CAT_DOCUMENT_TABLE}(title, type, position) VALUES (:title, :type, :position)"
    values = [
        {"title": "Bank Draft", "type": "bank-draft", "position": 0},
        {"title": "Bill of Lading", "type": "bill-of-lading", "position": 1},
        {"title": "Invoice", "type": "invoice", "position": 2},
        {"title": "Bank Draft 2", "type": "bank-draft-2", "position": 3},
        {"title": "Bill of Lading 2", "type": "bill-of-lading-2", "position": 4},
    ]
    await database.execute_many(query=query, values=values)

    await database.disconnect()


if __name__ == "__main__":
    asyncio.run(main())