# VideoSync
> Watch a video with friends in sync over the internet, only requiring a browser.

[![forthebadge](https://forthebadge.com/images/badges/as-seen-on-tv.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)

This Node.js app allows you to set up a simple server to watch a video with your friends, in sync. I took a lot of inspiration from [zorchenhimer/MovieNight](https://github.com/zorchenhimer/MovieNight), the main difference being that my version streams a video file directly from the server. Playback can be started and stopped from an admin interface and the stream can be protected with a PIN (Please be aware that this will not protect the video file from downloading). You can also chat directly on the page itself.

![image](https://git.lukasklinger.com/lukas/VideoSync/raw/branch/master/screenshots/interface.png)

![image](https://git.lukasklinger.com/lukas/VideoSync/raw/branch/master/screenshots/admin.png)

## Installation

Linux, Windows & macOS:

```sh
npm install
```

Then set *environment variables* as necessary. The following variables are available:
* **WATCH_PIN** (Sets the PIN users need to use to access the stream, default *NOT SET*)
* **ADMIN_PIN** (Sets the PIN for the admin interface, default *0000*)

## Usage

Run installation, then run

```sh
node index
```

If all environment variables are set correctly, VideoSync will run on port **3000**. Simply open the page, enter a PIN (if set) and you should be good to go. To start or reset playback, hover over **Options** and click on **Admin**. Then enter the admin PIN. Done.

## Docker
### Dockerfile
This repository also includes a Dockerfile (and a pre-built Docker image on Docker Hub: lukasklinger/videosync). Simply build it like this

```sh
docker build -t videosync .
```

and run it like this

```sh
docker run -p 3000:3000 [-e WATCH_PIN=dmx] -e ADMIN_PIN=4542 -v /path/to/video.mp4:/app/video/video.mp4 lukasklinger/videosync
```
Explanation:
* **-p 3000:3000**: Maps host port 3000 to the app's listening port 3000. Change first port to suit your setup.
* **-e WATCH_PIN**: [OPTIONAL], sets a PIN for the stream. If this is not provided, access will be open.
* **-e ADMIN_PIN**: Sets a PIN for the admin interface.
* **-v /path/to/video.mp4:/app/video/video.mp4**: Maps the video from a host directory into the container. Change first path to suit your setup.

### docker-compose
Running VideoSync using docker-compose will build the Docker image automatically. To run, modify *docker-compose.yml* to suit your setup (change port, change video path and update environment variables), then run:

```sh
docker-compose up -d
```

Stop the container like this:

```sh
docker-compose down
```

## Release History

* 1.0.0
    * First release
* 1.1.0
    * sanatize user input
    * added autosync
    * discard empty chat messages
    * sync more precise when starting playback
* 1.2.0
    * user can hide chat or video
    * subtitles supported (vtt)

## Meta

lukasklinger – [@cyaniccerulean](https://twitter.com/cyaniccerulean) – [lukasklinger.com](https://lukasklinger.com)

[https://github.com/lukasklinger](https://github.com/lukasklinger/)

[https://git.lukasklinger.com/lukas](https://git.lukasklinger.com/lukas)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
