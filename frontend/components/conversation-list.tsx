"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Conversation {
  id: string
  title: string
  timestamp: string
}

interface ConversationListProps {
  conversations: Conversation[]
  onSelectConversation: (conversationId: string) => void
  onDeleteConversation: (conversationId: string) => void
  selectedConversationId?: string
}

export function ConversationList({
  conversations,
  onSelectConversation,
  onDeleteConversation,
  selectedConversationId
}: ConversationListProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>
      {conversations.length === 0 ? (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              No conversations yet. Start a new chat!
            </p>
          </CardContent>
        </Card>
      ) : (
        conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className={`cursor-pointer hover:bg-accent transition-colors ${
              selectedConversationId === conversation.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <CardHeader className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-medium truncate">
                    {conversation.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(conversation.timestamp)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteConversation(conversation.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))
      )}
      <Button 
        className="w-full" 
        onClick={() => onSelectConversation('new')}
      >
        New Conversation
      </Button>
    </div>
  )
}