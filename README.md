# ARIMA Time Series Model Simulator

Use the website [here](https://zhangwy324.github.io/arima-sim-fe/)!

**Note:** Backend server and API is deployed on Railway. The backend may be down because I cannot afford to keep it up running 24/7 :(

---

**How to use:**

- Use left side bar to add / remove ar, ma, sar, and sma parameters

  - Note only causal autoregressive and invertible moving average models are supported
  
- Use bottom inputs to add more characteristics to the model:

  - **d:** trend difference order
  
  - **D:** seasonal difference order (need seasonal period value S, see below)
  
  - **S:** seasonal period (number of time steps for a single seasonal period, required if any seasonal parameters were inputted)
  
  - **n:** length of the generated data
  
  - **burnin:** throw away the first how ever many data points
  
  - **seed:** set the seed of the noise in the model (click the `Randomize` button to randomize the seed)
  
- If using mobile device, please turn the screen sideways for best experience. 

---

**Tech Stack:**

- Frontend: React with Vite, Chart.js

- Server: Express.js deployed on Railway

- API: Plumber API written in R deployed using Docker on Railway


**Todo:** 

- Will better design the website. I know it's ugly. 

- Will add more features: better error handling and input validation, more statistics (ACF plot?), export data, etc...
