export interface ResAuthToken {
  token: string
  type: string
}

export interface ResAuthMessage {
  message: string
}

export interface ResAdminAuthState {
  id: string
  nickname: string | null
  avatar: string | null
}

export interface ResAdminLogin {
  token: string
  type: string
}

export interface ResAdminAuthStateResponse {
  isAuthenticated: boolean
  admin?: {
    id: string
    username: string
    nickname: string | null
    role: string[]
  }
}
