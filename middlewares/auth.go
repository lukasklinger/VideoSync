package middlewares

import (
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		//adminPIN := config.GetAdminPIN()
		//watchPIN := config.GetWatchPIN()

		// TODO session

		//if strings.Contains(c.Request.URL.Path, "admin") {
		// TODO compare admin PIN from cookie
		//}

		//if strings.Contains(c.Request.URL.Path, "watch") {
		// TODO compare watch PIN from cookie
		//}

		// if key = config.GetString("http.auth.key"); len(strings.TrimSpace(key)) == 0 {
		// 	c.AbortWithStatus(500)
		// }

		// if secret = config.GetString("http.auth.secret"); len(strings.TrimSpace(secret)) == 0 {
		// 	c.AbortWithStatus(401)
		// }

		// if key != reqKey || secret != reqSecret {
		// 	c.AbortWithStatus(401)
		// 	return
		// }

		c.Next()
	}
}
