package controllers

import (
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
)

type WebSocketsController struct {
	melody *melody.Melody
}

func (w WebSocketsController) Serve(c *gin.Context) {
	if w.melody == nil {
		w.init()
	}

	w.melody.HandleRequest(c.Writer, c.Request)
}

func (w WebSocketsController) init() {
	w.melody = melody.New()

	w.melody.HandleMessage(func(s *melody.Session, msg []byte) {
		w.melody.Broadcast(msg)
	})
}
