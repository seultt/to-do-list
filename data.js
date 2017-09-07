let todoSeq = 1 // 직접 데이터베이스 구현하는 경우 식별자 변수를 두는 것이 좋다. 밖으로 공개 안함  data.js 안에서만 사용 가능
const todos = [
  {
    id: todoSeq++,
    title: "sample todo",
    complete: false
  },
  {
    id: todoSeq++,
    title: "completed todo",
    complete: true
  }
]

function addTodo({title}) {
  const newTodo = {
    id: todoSeq++,
    title,
    complete: false
  }
  todos.push(newTodo)
  return newTodo
}

function updateTodo(id, source) {
  const todo = todos.find(item => item.id === id)
  if (todo) {
    Object.assign(todo, source)
    return todo
  } else {
    throw new Error('해당 id를 갖는 요소가 없습니다.')
  }
}

function deleteTodo(id) {
  const index = todos.findIndex(item => item.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
  }
}

// 모듈.exprts 객체를 data.js를 밖에서 가져와서 쓸 수 있다.
module.exports = {
  todos,
  addTodo,
  updateTodo,
  deleteTodo
}
