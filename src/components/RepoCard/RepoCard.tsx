import * as React from "react"
import { Repo } from "../../types"
import Attribute from "../Attribute"

interface RepoCardProps {
  repo: Repo
}

const RepoCard: React.FC<RepoCardProps> = (props) => {
  const { repo } = props

  return (
    <div className="card">
      <img
        className="w-10 h-10"
        src={repo.owner.avatar_url}
        alt={repo.owner.login}
      />
      <div>
        <Attribute label="Author" value={repo.owner.login} />
        <Attribute label="Name" value={repo.name} />
        <Attribute label="Stars" value={repo.stargazers_count.toString()} />
        <Attribute label="Forks" value={repo.forks_count.toString()} />
        <Attribute label="Watchers" value={repo.watchers_count.toString()} />
        <Attribute
          label="Open Issues"
          value={repo.open_issues_count.toString()}
        />
      </div>
    </div>
  )
}

export default RepoCard
