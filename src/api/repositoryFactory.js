import rolesRepository from './real/roles'
import usersRepository from './real/users'
import projectsRepository from './real/projects'
import tasksRepository from './real/tasks'
import taskCommentsRepository from './real/taskComments'
const repositories = {
  roles: rolesRepository,
  users: usersRepository,
  projects: projectsRepository,
  tasks: tasksRepository,
  taskComments:taskCommentsRepository
}

export const RepositoryFactory = {
  get: (name) => repositories[name]
}

export default RepositoryFactory