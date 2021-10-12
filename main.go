package main

import (
	"github.com/lukasklinger/VideoSync/config"
	"github.com/lukasklinger/VideoSync/server"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.Info("Hello, VideoSync v2!")

	// read config from environment
	config.Init()

	// start HTTP server
	server.Init()

	// update frontend

	// upload for videos and subtitles?

}
