package api

import (
	"key-value-cache/cache"
	"net/http" // Add this import if not already present

	"github.com/gin-gonic/gin"
)

// Server represents the HTTP server
type Server struct {
	router  *gin.Engine
	handler *Handler
}

// CORSMiddleware adds CORS headers to responses
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

// NewServer creates a new HTTP server
func NewServer(cache *cache.Cache) *Server {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	// Add CORS middleware
	router.Use(CORSMiddleware())

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
	s.router.GET("/", s.handler.HealthHandler)      // Health check endpoint
	s.router.GET("/health", s.handler.HealthHandler) // Alternative health check endpoint
	s.router.POST("/put", s.handler.PutHandler)
	s.router.GET("/get", s.handler.GetHandler)
}

// Start starts the HTTP server
func (s *Server) Start(addr string) error {
	return s.router.Run(addr)
}
