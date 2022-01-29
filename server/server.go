package server

import (
	"fmt"

	"github.com/lukasklinger/VideoSync/config"
)

func Init() {
	router := NewRouter()
	router.Run(fmt.Sprintf(":%d", config.GetPort()))
}
