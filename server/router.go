package server

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	"github.com/gin-gonic/gin"
	"github.com/lukasklinger/VideoSync/controllers"
	"github.com/lukasklinger/VideoSync/middlewares"
)

func NewRouter() *gin.Engine {
	router := gin.New()
	sessionStore := memstore.NewStore([]byte("bananaphoneSecretPower!"))

	// Configure router and middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(sessions.Sessions("defaultStore", sessionStore))
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
	pin := new(controllers.PINController)
	router.POST("/pin", pin.Authenticate)
	router.GET("/pin", func(c *gin.Context) { c.File("./public/pin.html") })

	// Set up API route group
	apiGroup := router.Group("api")
	{
		// TODO
		api := new(controllers.APIController)
		apiGroup.GET("/state", api.GetState)
	}

	return router
}
