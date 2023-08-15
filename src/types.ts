export interface User {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  score: number
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string // User
  url: string
}

export interface RepoOwner {
  login: string
  id: number
  avatar_url: string
}

export interface Repo {
  archive_url: string
  archived: boolean
  assignees_url: string
  created_at: string
  description: string
  forks_count: number
  full_name: string
  id: number
  language: string
  name: string
  open_issues_count: number
  owner: RepoOwner
  private: boolean
  score: number
  size: number
  stargazers_count: number
  topics: string[]
  visibility: string
  watchers_count: number
}
