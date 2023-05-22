## Equivalent Exchange ~ Alchemy

## General app idea 

> To create a gamified Paper Trading stock application. Users will be able to practice trading stocks without using real money, allowing them to learn and refine their trading strategies. The app will provide a simulated trading environment where users can buy and sell stocks, track their portfolio performance, achieve milestone goals,


 **Technology Stack:** 
> Frontend: Vue.js, JavaScript, HTML, CSS
> Backend: Node.js, Express
> Database: MongoDB

 **Models and Field Names with Datatypes:**
> 
> User:
> Field Names:
>     Name (String)
>     Email (String)
>     Password (String)
>     Avatar (String or Image URL)
>     Balance (Number)
> 
> Stock:
>     Field Names:
>     Symbol (String)
>     Name (String)
>     CurrentPrice (Number)
>    Description (String)

**Routes:**

> User Routes:
> POST /api/users: Create a new user
> GET /api/users/:userId: Get user details
> PUT /api/users/:userId: Update user profile
> 
> Stock Routes:
> GET /api/stocks: Get a list of available stocks
> GET /api/stocks/:stockId: Get details of a specific stock
> 
> Transaction Routes:
> POST /api/transactions: Create a new transaction (buy or sell)
> GET /api/transactions/:userId: Get transaction history for a specific user
> 
> Milestone Routes:
> GET /api/milestones: Get a list of milestone goals
> PUT /api/milestones/:milestoneId: Update milestone details (e.g., achieved or in progress)

## Wireframes
> Wireframes with basic page layouts<br />
> 
![Capture](https://media.git.generalassemb.ly/user/46483/files/d19c01d3-7698-4484-ad17-7cec0e8e5fc2)
![Capture2](https://media.git.generalassemb.ly/user/46483/files/6e505a44-8e7b-4f8e-8503-fd67612f6f4d)
![Capture3](https://media.git.generalassemb.ly/user/46483/files/a5547d72-edc7-4d26-aa52-c2bf943082a5)
![Capture4](https://media.git.generalassemb.ly/user/46483/files/92c610ee-3cbc-4a9b-afba-ef76dd6419ad)
![Capture5](https://media.git.generalassemb.ly/user/46483/files/64d49384-0d9f-41b8-b7a6-8ac9f1ea4c6a)
![Capture6](https://media.git.generalassemb.ly/user/46483/files/2d2f9b93-4e73-45da-a8a0-7175a2d56787)
![Capture7](https://media.git.generalassemb.ly/user/46483/files/d08d9a25-b4fb-4155-9edc-5d4b32855038)


## Feasibility Study
> If you're using an external API or scraping a website, make sure you can get that data. If you're using a new language, framework, or tool, go through it's getting started tutorial. We *will* ask to see your results. If you are planning to use an API, please show an example of a successful fetch below to the API you wish to use in your project.

> 
> Alpaca API: Provides access to stock trading functionalities and market data. ~ Paper Trading 
> 
> Yahoo Finance API (Unofficial): Retrieves stock data and financial information from Yahoo Finance. ~ stock quotes
> 
> News API: Aggregates news articles from various sources for easy retrieval and integration ~ News
> 
> ECT: I will use more to avoid loading to many request on to one


## User Stories
> 
> As a new user, I want to create an account, so that I can start using the Paper Trading app.
> 
> As a user, I want to search for stocks and view their current prices, so that I can make informed trading decisions.
> 
> As a user, I want to simulate buying and selling stocks without using real money, so that I can practice and improve my trading skills.
> 
> As a user, I want to track the performance of my portfolio, so that I can monitor my investments and see how well I am doing.
> 
> As a user, I want to set milestone goals, such as reaching a specific portfolio value, so that I have targets to work towards.
> 
> As a user, I want to receive notifications or alerts when certain events happen, such as achieving a milestone or when a stock reaches a specific price.
> 

### MVP Goals

> User Registration and Authentication:

> * Allow users to create an account and log in securely.

> Stock Data Display:
> 
> * Fetch and display real-time stock prices for a selection of stocks.

> Paper Trading Functionality:
> 
>*  Simulate buying and selling stocks without using real money.
> * Track user's virtual portfolio and positions.

> Portfolio Performance:
> 
> * Calculate and display the current value of the user's virtual portfolio.

> Milestone Goals:
> 
> * Define milestone goals for users to achieve.
> * Track progress towards milestones and provide visual indicators.

> Notifications:
> 
> * Send basic notifications to users when they achieve a milestone or when there are important updates.
> 

### Stretch Goals

> Advanced Trading Features:
> 
> * Implement limit orders, stop-loss orders, or trailing stop orders.
> * Allow users to set price alerts for specific stocks.

> Expanded Stock Data:
> 
> * Provide additional stock data such as historical prices, company financials, and key ratios.
> * Include interactive stock charts with technical indicators.

> Social Features:
> 
> * Enable users to follow and interact with each other.
> * Implement a chat or discussion feature for users to share insights and strategies.
