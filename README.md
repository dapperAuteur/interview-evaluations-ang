# interview-evaluations-ang

##This project is the front end to the interview-evaluations project done in java.

##npm is used to launch the server on port 8080.
##you'll need to have node and npm install
##run the following command from app root directory in command line:
###`node node_modules/http-server/bin/http-server`
##to start the server on a port other than 8080 run the following command from app root directory in command line:
###`node node_modules/http-server/bin/http-server -p 80`
####This will run the server on port 80. You may choose any port you like changing the number following `...-p `
####The backward slashes (`\`) may need to be changed to forward slashes (`/`) on your local machine.

#Connecting To API
##Both the api and the ui need to have a server serve the data on separate ports
##You'll get an `xmlhttpRequest cannot load` error when connecting
##The solution is adding an annotation in the controller above the `@RestController` annotation
##Add `@CrossOrigin(origins = "*", maxAge = 3600)` above `@RestController` to resolve the issue
###This will allow any site to connect to the API for 3.6 seconds
###Replace the star (`*`) with your specific domain to restrict access.
