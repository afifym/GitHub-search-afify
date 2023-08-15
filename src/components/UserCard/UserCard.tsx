import React from "react"
import { User } from "../../types"
import Attribute from "../Attribute"

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = (props) => {
  const { user } = props

  return (
    <div className="card">
      <img className="w-10 h-10" src={user.avatar_url} alt={user.login} />
      <div>
        <Attribute label="Name" value={user.login} />
        <Attribute label="Score" value={user.score.toString()} />

        <a href={`https://github.com/${user.login}`} className="underline">
          View Profile
        </a>
      </div>
    </div>
  )
}

export default UserCard
