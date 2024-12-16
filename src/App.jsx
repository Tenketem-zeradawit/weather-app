import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
 
  const [query, setQuery] = useState(""); 
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  
  const API_KEY = "7689c1342169450bb5bd111f1d2fd245";
  const API_URL = "https://newsapi.org/v2/everything?q=technology&apiKey=7689c1342169450bb5bd111f1d2fd245";
  const fetchNews = async () => {
    if (!query) {
      setError("Please enter a search query!");
      return;
    }

    setLoading(true);
    setError(""); 

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: query,
          apiKey: API_KEY,
          pageSize: 6, 
        },
      });

      if (response.data.articles.length > 0) {
        setArticles(response.data.articles);
      } else {
        setArticles([]);
        setError("No articles found for the given search query.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">News Search App</h1>

      <form onSubmit={handleSearch} className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search for news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

    
      {loading && <div className="text-center">Loading...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

   
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
             
              <img
                src={
                  article.urlToImage
                    ? article.urlToImage
                    : "https://via.placeholder.com/150"
                }
                className="card-img-top"
                alt={article.title}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.description
                    ? article.description
                    : "No description available."}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && articles.length === 0 && !error && (
        <div className="text-center">No news articles to display.</div>
      )}
    </div>
  );
};

export default App;
