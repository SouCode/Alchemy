<template>
    <div class="news-container">
      <h2>Trending News</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error occurred while fetching news</div>
      <div v-else>
        <ul>
          <li v-for="article in uniqueArticles" :key="article.title">
            <div class="article">
              <div class="article-title">{{ article.title }}</div>
              <a :href="article.url" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NewsSection',
    data() {
      return {
        articles: [],
        loading: false,
        error: false,
      };
    },
    mounted() {
      this.fetchNews();
    },
    computed: {
      uniqueArticles() {
        // Use Set to remove duplicates based on title
        return [...new Set(this.articles.map((article) => article.title))]
          .map((title) => this.articles.find((article) => article.title === title));
      },
    },
    methods: {
      async fetchNews() {
        this.loading = true;
        try {
          const response = await axios.get('/news');
          this.articles = response.data;
        } catch (error) {
          console.error(error);
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style>
  .news-container {
    position: absolute;
    width: 20vw;
    height: 3vh;
    left: 56vw;
    top: 66vh;

    background: rgba( 0, 0, 0, 0.85 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 0.5px );
    -webkit-backdrop-filter: blur( 0.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
  
  .news-container h2 {
    margin-bottom: 10px;
    color: #fff;
  }
  
  .article {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }
  
  .article-title {
    font-weight: bold;
    color: #000000;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  