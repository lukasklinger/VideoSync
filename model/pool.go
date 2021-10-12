package model

import (
	log "github.com/sirupsen/logrus"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			log.Debug("Size of Connection Pool: ", len(pool.Clients))

			for client, _ := range pool.Clients {
				log.Debug(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}

		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			log.Debug("Size of Connection Pool: ", len(pool.Clients))

			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			}

		case message := <-pool.Broadcast:
			log.Debug("Sending message to all clients in Pool")

			for client, _ := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					log.Debug(err)
					return
				}
			}
		}
	}
}
