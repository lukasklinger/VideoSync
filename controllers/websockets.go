package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/lukasklinger/VideoSync/model"
	log "github.com/sirupsen/logrus"
)

type WebSocketsController struct {
	Pool *model.Pool
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func NewWebsocketController(pool *model.Pool) WebSocketsController {
	return WebSocketsController{Pool: pool}
}

func (w WebSocketsController) Serve(c *gin.Context) {
	connection, err := wsupgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Debug("Error upgrading websocket connection: %v", err)
	}

	client := &model.Client{Conn: connection, Pool: w.Pool}

	w.Pool.Register <- client
	client.Read()
}
