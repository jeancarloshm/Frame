# Frame🍿
Frame is a movie watchlist app that allows users to search for movies and add them to a watchlist. The app retrieves movie data from TMDB API and displays it in a user-friendly interface. Users can easily navigate through the app and keep track of the movies they want to watch. With this app, users can discover new movies, create a watchlist, and never miss a movie again.

                 


## Steps to use the app
1 - First, make sure you have Docker installed on your machine. You can download it from the official website ([https://www.docker.com/](https://www.docker.com/)).

2 - Once you have Docker installed, open your command line interface and run the following command:

        docker pull jeancarloshm/frame

This will download the "frame-app" image from Docker Hub to your computer.
    
3 - Next, run the following command to start a container using the "frame-app" image:

        docker run -p  3000:3000 jeancarloshm/frame

  
 This will start a container and map the container's port 3000 to your host machine's port 3000.

Once the container is running, you can access the app by navigating to (http://localhost:3000) in your web browser.

And that's it! 🎉 You are now running the "frame-app" inside a Docker container on your machine.

## Resources

[Install on Mac | Docker Documentation](https://docs.docker.com/desktop/install/mac-install/) 🍎

[Install on Windows | Docker Documentation](https://docs.docker.com/desktop/install/windows-install/) 🪟

[jeancarloshm/frame - Docker Image | Docker Hub](https://hub.docker.com/r/jeancarloshm/frame)

