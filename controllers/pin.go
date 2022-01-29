package controllers

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/lukasklinger/VideoSync/config"
)

type PINController struct{}

func (p PINController) Authenticate(c *gin.Context) {
	pin := c.PostForm("pin")
	session := sessions.Default(c)

	if pin == config.GetWatchPIN() {
		session.Set("watchPIN", pin)
		c.Redirect(http.StatusFound, "/watch")
	} else if pin == config.GetAdminPIN() {
		session.Set("adminPIN", pin)
		c.Redirect(http.StatusFound, "/admin")
	} else {
		// Wrong PIN, redirect back to PIN interface
		c.Redirect(http.StatusFound, "/pin")
	}

	session.Save()
	c.Abort()
}
