(function (window, document) {

  /**
   * 서버에서 할일 템플릿과 할일 데이터를 가져온 후, #todos 요소 안에 렌더링하는 함수
   */
  function loadTodos() {
    console.log('start loadTodos')
    // render 함수로 promis 반환 common.js의 render 함수를 불러온다.
    render({
      target: '#todos',
      templatePath: '/templates/todos.ejs',
      dataPath: '/api/todos'
    }).then(todosEl => {
      todosEl.querySelectorAll('.todo-item').forEach(todoItem => {
        const id = todoItem.dataset.id // dataset

        // 체크박스 클릭시
        // 낙관적 업데이트
        const checkboxEl = todoItem.querySelector('.todo-checkbox')
        checkboxEl.addEventListener('click', e => {
          axios.patch(`/api/todos/${id}`, {
            complete: e.currentTarget.checked
          }).then(res => {
            loadTodos()
          })
        })

        // 삭제 아이콘 클릭시
        // 비관적 업데이트
        const removeLink = todoItem.querySelector('.todo-remove')
        removeLink.addEventListener('click', e => {
          axios.delete(`/api/todos/${id}`).then(res => {
            loadTodos()
          })
        })
        // 수정 아이콘 클릭시
        // 비관적 업데이트
        // const modifyLink = todoItem.querySelector('.todo-modify')
        // modifyLink.addEventListener('click', e => {

        // }) // 완성하지 못함... ㅠㅠ
      })
    })
  }

  document.querySelector('#todo-form').addEventListener('submit', e => {
    // ** html의 기본동작을 취소하는 메소드 // e.stopPropagation() event bubbling여기서 더이상 작동하지 않게 멈춘다.
    e.preventDefault()
    // event.target e.currentTarget의 차이
    // event.target 이벤트를 발생시킨 놈?
    // e.currentTarget ?
    const form = e.currentTarget // 이벤트 핸들러가 걸려있는 form이 변수에 담긴다.

    // api 서버에 요청하면 promis가 반환된다.
    axios.post('/api/todos', {
      title: form.elements.title.value
    })
      .then(loadTodos)
      .then(() => {
        form.elements.title.value = null // 엔터를 누르면 input에 data를 비워줌
      })
  })

  loadTodos() // 최초의 한번을 그려준다. 사용자가 정보를 볼 수 있게 하기 위해

})(window, document)
