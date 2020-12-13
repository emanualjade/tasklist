query GetAllTasks {
  tasks(limit: 5, cursor: "NWZkNThlZTM5MzEzMDA1ZGI5YmFjZWRk") {
    taskFeed {
      id
      name
      completed
      user {
        name
      }
    }
    pageInfo {
      nextPageCursor
      hasNextPage
    }
  }
}

query GetTaskById {
  task(id: "5fd56cb50cbc4d59514acb90") {
    id
    name
    completed
    user {
      id
      name
      email
    }
    createdAt
    updatedAt
  }
}

mutation CreateTask {
  createTask(input: { name: "Do the dishes", completed: false }) {
    id
    name
    completed
  }
}
mutation UpdateTask {
  updateTask(
    id: "5fd56cb50cbc4d59514acb90"
    input: { name: "My Updated Task", completed: true }
  ) {
    id
    name
    completed
  }
}
mutation DeleteTask {
  deleteTask(id: "5fd56caf0cbc4d59514acb8f") {
    id
    name
    completed
  }
}


query GetUser {
  user {
    id
    name
    email
    tasks {
      id
      name
      completed
    }
  }
}

mutation createUser {
  signup(
    input: {
      name: "ejade"
      email: "ejade@gmail.com"
      password: "asdfasdf"
    }
  ) {
    id
    name
    email
    createdAt
    updatedAt
  }
}

mutation Login {
  login(input: { email: "ejade@gmail.com", password: "asdfasdf" }) {
    token
  }
}

subscription {
  userCreated {
    id
    name
    email
    tasks {
      id
      name
    }
  }
}
