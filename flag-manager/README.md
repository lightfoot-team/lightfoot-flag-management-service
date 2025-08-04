# Set up the Feature Flag Manager
1. Git clone our repository into an independent directory (not within your existing application)
2. Run npm install in each of the directories: "frontend", "backend"
3. Check the package.json file in the backend directory for available scripts
4. Next, you'll need to manually set up a database. 
  In the terminal navigate to the backend directory and enter `npm run setupdb` to create your database (i.e. flag_manager) and load the schema. 
  At the top level of the "backend" directory, create a `.env` file containing the following:
    ```
    DB_USER=<Your database username>
    DB_PASSWORD=<Your database password> 
    DB_HOST=<Your database host>
    DB_NAME=flag_manager
    TABLE_NAME=flags
    DB_PORT=<Your DB Port, currently set to 5432> 
    API_PORT=<The API Port, currently set to 3000>
    ```
5. Create a .env file in the top level of your "frontend" directory with the following:
    VITE_GRAFANA_TOKEN=<Your Grafana Token Here, remove brackets>
6. We'll discuss setting up the Grafana Token once the SDK is set up and running
7. To run each of the servers, open a new terminal for each and navigate to their respective directories ("frontend", "backend") and enter `npm run dev`. 
    If you run into Node version issues, switch to Node version 20.19.0 or later. 
8. This will start the servers locally in development for you to be able to explore functionality and UI. 