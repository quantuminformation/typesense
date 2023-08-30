import fetch from "node-fetch";

const BASE_URL = "http://localhost:8108";
const API_KEY = "xyz";

async function createCollection() {
  const response = await fetch(`${BASE_URL}/collections`, {
    method: "POST",
    headers: {
      "X-TYPESENSE-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "books",
      fields: [
        { name: "title", type: "string" },
        { name: "author", type: "string" },
        { name: "ratings", type: "int32" },
      ],
      default_sorting_field: "ratings",
    }),
  });

  return response.json();
}

async function importDocuments() {
  const documents = [
    { title: "Book 1", author: "Author1", ratings: 24 },
    { title: "Book 2", author: "Author2", ratings: 31 },
    { title: "Book 3", author: "Author3", ratings: 30 },
  ];

  const response = await fetch(
    `${BASE_URL}/collections/books/documents/import`,
    {
      method: "POST",
      headers: {
        "X-TYPESENSE-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documents),
    }
  );

  return response.json();
}

/* (async function () {
  try {
    const collectionResponse = await createCollection();
    console.log("Collection Created:", collectionResponse);

    const importResponse = await importDocuments();
    console.log("Documents Imported:", importResponse);
  } catch (error) {
    console.error("Error:", error);
  }
})(); */

async function searchDocuments(query) {
  const endpoint = `${BASE_URL}/collections/books/documents/search?query_by=title,author&q=${query}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "X-TYPESENSE-API-KEY": API_KEY,
    },
  });

  return response.json();
}

(async function () {
  try {
    const searchQuery = "boo";
    const searchResponse = await searchDocuments(searchQuery);
    console.log("Search Results:", searchResponse);
  } catch (error) {
    console.error("Error:", error);
  }
})();
