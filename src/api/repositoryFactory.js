import rolesRepository from './real/roles'
import usersRepository from './real/users'
import projectsRepository from './real/projects'

const repositories = {
  roles: rolesRepository,
  users: usersRepository,
  projects: projectsRepository,
}

export const RepositoryFactory = {
  get: (name) => repositories[name]
}

export default RepositoryFactory