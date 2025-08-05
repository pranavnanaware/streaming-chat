"use client"

import React, { useState, useEffect } from "react"
import { ConversationList } from "@/components/conversation-list"
import { ChatWindow } from "@/components/chat-window"

interface Conversation {
  id: string
  title: string
  timestamp: string
}

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Hello, how can I help you today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: "2", 
      title: "Questions about React and Next.js",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: "3",
      title: "Help with TypeScript interfaces",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    }
  ])

  const [selectedConversationId, setSelectedConversationId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock messages for demo purposes
  const mockMessages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        content: "Hello! How can I help you today?",
        role: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "2",
        content: "Hi! I'm looking for help with my React application.",
        role: "user", 
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      },
      {
        id: "3",
        content: "I'd be happy to help! What specific issue are you facing with your React application?",
        role: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
      }
    ],
    "2": [
      {
        id: "4",
        content: "Can you explain the difference between React and Next.js?",
        role: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "5",
        content: "Great question! React is a JavaScript library for building user interfaces, while Next.js is a full-stack framework built on top of React that provides additional features like server-side rendering, routing, and API routes.",
        role: "assistant",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 30000).toISOString(),
      }
    ],
    "3": [
      {
        id: "6",
        content: "How do I properly define TypeScript interfaces for my React props?",
        role: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      }
    ]
  }

  const handleSelectConversation = (conversationId: string) => {
    if (conversationId === 'new') {
      // Create new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: "New Conversation",
        timestamp: new Date().toISOString()
      }
      setConversations(prev => [newConversation, ...prev])
      setSelectedConversationId(newConversation.id)
      setMessages([])
    } else {
      setSelectedConversationId(conversationId)
      setMessages(mockMessages[conversationId] || [])
    }
  }

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId))
    if (selectedConversationId === conversationId) {
      setSelectedConversationId(undefined)
      setMessages([])
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedConversationId) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    // Update conversation title if it's a new conversation
    if (messages.length === 0) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversationId 
            ? { ...conv, title: content.slice(0, 50) + (content.length > 50 ? '...' : '') }
            : conv
        )
      )
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. This is a mock response for demonstration purposes. In a real application, this would be connected to your backend API.",
        role: "assistant",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Conversation Sidebar - 20% */}
      <div className="w-1/5 border-r bg-card">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>

      {/* Chat Window - 80% */}
      <div className="w-4/5">
        <ChatWindow
          conversationId={selectedConversationId}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}