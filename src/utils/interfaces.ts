export interface User {
  username: string;
  email: string;
  password: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  done: 'complete' | 'created' | 'in-progress' | ''
}
