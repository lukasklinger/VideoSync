package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukasklinger/VideoSync/config"
)

type APIController struct{}

func (a APIController) GetState(c *gin.Context) {
	c.JSON(http.StatusOK, config.GetState())
	c.Abort()
}
