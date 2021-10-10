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

	// provide HTTP server and router
	server.Init()

	// provide access management

	// provide socket.io server

	// upload for videos and subtitles?
}
