# LIRI-node-app
## What is it?
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Screenshots
[https://github.com/MikePreston17/LIRI-node-app/tree/master/assets/screenies](Screenshots)

## Commands

Command | What it does
------------- | ------------
concert-this '<band/artist>' |  looks up an artist or band and returns concert times
movie-this '<band/artist>' |  looks up a movie and returns the details
spotify-this-song '<song name>' |  looks up a song and returns the details
do-what-it-says |  reads the local file 'random.txt' and executes the command stored within

## Example Usage

**Band Search:**

$```node liri concert-this 'Weird Al' ```

![Band Search](https://github.com/MikePreston17/LIRI-node-app/blob/master/assets/screenies/band-search.png)

**A Single Artist:**

$```node liri spotify-this-song 'Africa' ```

![Single Artists](https://github.com/MikePreston17/LIRI-node-app/blob/master/assets/screenies/spotify-search.png)

**Multiple Artists:**

$```node liri spotify-this-song 'Pump It' ```

![Multiple Artists](https://github.com/MikePreston17/LIRI-node-app/blob/master/assets/screenies/spotify-search_2.png)

**Movie Search:**

$```node liri movie-this 'The Matrix' ```

![Movie](https://github.com/MikePreston17/LIRI-node-app/blob/master/assets/screenies/movie-search.png)



