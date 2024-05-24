import rolesRepository from './real/roles'
import usersRepository from './real/users'
import projectsRepository from './real/projects'
import tasksRepository from './real/tasks'
import taskCommentsRepository from './real/taskComments'
import sprintsRepository from './real/sprints'
const repositories = {
  roles: rolesRepository,
  users: usersRepository,
  projects: projectsRepository,
  tasks: tasksRepository,
  taskComments:taskCommentsRepository,
  sprints:sprintsRepository
}

export const RepositoryFactory = {
  get: (name) => repositories[name]
}

export default RepositoryFactory