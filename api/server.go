package api

import (
    "key-value-cache/cache"

    "github.com/gin-gonic/gin"
)

// Server represents the HTTP server
type Server struct {
    router  *gin.Engine
    handler *Handler
}

// NewServer creates a new HTTP server
func NewServer(cache *cache.Cache) *Server {
    gin.SetMode(gin.ReleaseMode)
    router := gin.Default()
    handler := NewHandler(cache)

    server := &Server{
        router:  router,
        handler: handler,
    }

    server.setupRoutes()
    return server
}

// setupRoutes sets up the HTTP routes
func (s *Server) setupRoutes() {
    s.router.POST("/put", s.handler.PutHandler)
    s.router.GET("/get", s.handler.GetHandler)
}

// Start starts the HTTP server
func (s *Server) Start(addr string) error {
    return s.router.Run(addr)
}