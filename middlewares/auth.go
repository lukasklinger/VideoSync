package middlewares

import (
	"net/http"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/lukasklinger/VideoSync/config"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		adminPIN := config.GetAdminPIN()
		watchPIN := config.GetWatchPIN()
		session := sessions.Default(c)

		// protect watch interface
		if strings.Contains(c.Request.URL.Path, "watch") {
			if watchPIN != "" && watchPIN != session.Get("watchPIN") {
				c.Redirect(http.StatusFound, "/pin")
				c.Abort()
			}
		}

		// protect video folder
		if strings.Contains(c.Request.URL.Path, "video") {
			if watchPIN != "" && watchPIN != session.Get("watchPIN") {
				c.Redirect(http.StatusFound, "/pin")
				c.Abort()
			}
		}

		// protect admin interface
		if strings.Contains(c.Request.URL.Path, "admin") {
			if adminPIN != session.Get("adminPIN") {
				c.Redirect(http.StatusFound, "/pin")
				c.Abort()
			}
		}

		// all checks passed, proceed
		c.Next()
	}
}
