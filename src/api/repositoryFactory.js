import rolesRepository from './real/roles'
import usersRepository from './real/users'
import projectsRepository from './real/projects'
import tasksRepository from './real/tasks'
const repositories = {
  roles: rolesRepository,
  users: usersRepository,
  projects: projectsRepository,
  tasks: tasksRepository,
}

export const RepositoryFactory = {
  get: (name) => repositories[name]
}

export default RepositoryFactory