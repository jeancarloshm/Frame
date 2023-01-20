# Frame🍿
Frame is a movie watchlist app that allows users to search for movies, add them to a watchlist. The app retrieves movie data from TMDB API and displays it in a user-friendly interface. Users can easily navigate through the app and keep track of the movies they want to watch. With this app, users can discover new movies, create a watchlist, and never miss a movie again.

                 


## Steps to use the app
1 - First, make sure you have Docker installed on your machine. You can download it from the official website ([https://www.docker.com/](https://www.docker.com/)).

2 - Once you have Docker installed, open your command line interface and run the following command:

               docker pull enmareynoso/frame-app

This will download the "frame-app" image from Docker Hub to your computer.
    
3 - Next, run the following command to start a container using the "frame-app" image:

        docker run -p  8080:8080 enmareynoso/frame-app


 This will start a container and map the container's port 8080 to your host machine's port 8080.

Once the container is running, you can access the app by navigating to [http://localhost:8080](http://localhost:8080/) in your web browser.

And that's it! 🎉 You are now running the "frame-app" inside a Docker container on your machine.

## Resources

[Install on Mac | Docker Documentation](https://docs.docker.com/desktop/install/mac-install/) 🍎

[Install on Windows | Docker Documentation](https://docs.docker.com/desktop/install/windows-install/) 🪟

[enmareynoso/frame-app - Docker Image | Docker Hub](https://hub.docker.com/r/enmareynoso/frame-app)

