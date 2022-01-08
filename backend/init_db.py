import asyncio
from databases import Database


async def main() -> None:
    database = Database("sqlite:///example.db")
    await database.connect()

    query = """CREATE TABLE CatDocuments (id INTEGER PRIMARY KEY, title VARCHAR(100), type VARCHAR(100), position INTEGER)"""
    await database.execute(query=query)

    query = "INSERT INTO CatDocuments(title, type, position) VALUES (:title, :type, :position)"
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