export interface Email {
  id: string
  subject: string
  sender: string
  recipient: string
  body: string
  receivedAt: string
  read: boolean
  labels?: string[]
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

export interface Inbox {
  id: string
  address: string
  createdAt: string
  expiresAt?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

