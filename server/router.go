package server

import (
	"net/http"

	"github.com/chenjiandongx/ginprom"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	"github.com/gin-gonic/gin"
	"github.com/lukasklinger/VideoSync/controllers"
	"github.com/lukasklinger/VideoSync/middlewares"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func NewRouter() *gin.Engine {
	router := gin.New()

	// Configure router and middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(ginprom.PromMiddleware(nil))
	router.Use(sessions.Sessions("defaultStore", memstore.NewStore([]byte("bananaphoneSecretPower!"))))
	router.Use(middlewares.AuthMiddleware())

	// Set up static file paths
	router.Static("/assets", "./public/public/assets")
	router.Static("/css", "./public/public/css")
	router.Static("/js", "./public/public/js")
	router.Static("/video", "./public/video")

	// Set up basic routing
	router.GET("/", func(c *gin.Context) { c.Redirect(http.StatusFound, "/watch") })
	router.GET("/watch", func(c *gin.Context) { c.File("./public/index.html") })
	router.GET("/admin", func(c *gin.Context) { c.File("./public/admin.html") })
	router.GET("/health", new(controllers.HealthController).Status)

	// Set up authentication flow routing
	router.POST("/pin", new(controllers.PINController).Authenticate)
	router.GET("/pin", func(c *gin.Context) { c.File("./public/pin.html") })

	// Set up Prometheus export
	router.GET("/metrics", ginprom.PromHandler(promhttp.Handler()))

	// Set up websocket routing
	router.GET("/ws", new(controllers.WebSocketsController).Serve)

	// Set up API route group
	apiGroup := router.Group("api")
	{
		// TODO
		api := new(controllers.APIController)
		apiGroup.GET("/state", api.GetState)
	}

	return router
}
