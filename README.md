This service has been implemented for npm 10.9.2 on windows 10. The project has been setup to proxy the [Riksbanken API](https://developer.api.riksbank.se/).

To set up and run:

1. Install dependencies:
```
npm install
```
2. Build
```
npm run build
```
4. To run
```
npm start
```

4. Run tests with
```
npm test
```
Currently there are two endpoints: 

Forecasts:
http://localhost:3000/api/riksbank/forecasts

Series:
http://localhost:3000/api/riksbank/series

The implementation is rather barebones and there is a lot left to improve. If I had more time there are further improvements I would have liked to do:
1. Setup the response type to map with the response data.
2. Add more tests covering more edgecases.
3. More ways to filter data
4. Better ways to display the data, a graph for example.
5. Save the data fetched
