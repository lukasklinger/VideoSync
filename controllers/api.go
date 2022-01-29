package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lukasklinger/VideoSync/config"
	log "github.com/sirupsen/logrus"
)

type APIController struct{}

type APICommand struct {
	Command string `json:"command"`
	Value   string `json:"value"`
}

func (a APIController) GetState(c *gin.Context) {
	c.JSON(http.StatusOK, config.GetState())
	c.Abort()
}

func (a APIController) PostState(c *gin.Context) {
	var jsonObject APICommand

	body, err := c.GetRawData()
	if err != nil {
		log.Errorf("Error getting request body: %v", err)
		return
	}

	if err := json.Unmarshal(body, &jsonObject); err != nil {
		log.Errorf("Error unmarshalling JSON", err)
		return
	}

	updateState(jsonObject)

	c.JSON(http.StatusOK, config.GetState())
	c.Abort()
}

func updateState(command APICommand) {
	switch command.Command {
	case "start":
		config.StartPlayback()
	case "clientpause":
		pausePlayback(command)
	case "reset":
		config.ResetPlayback()
	case "title":
		config.SetVideoTitle(command.Value)
	case "time":
		seconds, _ := strconv.Atoi(command.Value)
		config.SetPlaybackSeconds(seconds)
	case "video":
		config.SetVideoPath(command.Value)
	case "subtitles":
		// TODO
	}
}

func pausePlayback(command APICommand) {
	// TODO
}

func setSubtitles() {
	// TODO
}
