# Command to run


`docker build -t react-billing-app .`

This means:

5174: The port on your local machine (host).

3000: The port inside the container.

So, in this example, when you visit http://localhost:5174 in your web browser, it will forward the request to port 3000 inside the container.

Key Points:

Host Port (5174): This is the port you use on your local machine (or the machine running Docker).

Container Port (3000): This is the port inside the container where your application is listening.


`docker run -p 5174:3000 react-billing-app`


How we only need to run 

`docker compose up`
