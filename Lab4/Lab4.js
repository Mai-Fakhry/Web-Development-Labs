  const addButton = document.querySelector('.addBtn');
  const inputElement = document.querySelector('.inputElement');
  const list = document.querySelector('.to_do_items');
  const filterButtons = document.querySelectorAll('.filter');

 addButton.addEventListener('click', addToDoItem);

  let todoItems = [];
  let currentFilter = 'all';

  function render() {
    list.innerHTML = '';

    for (let i = 0; i < todoItems.length; i++) {
      const item = todoItems[i];

      if (
        (currentFilter === 'completed' && !item.done) ||
        (currentFilter === 'active' && item.done)
      ) {
        continue;
      }

      const row = document.createElement('div');
      row.className = 'todo-row';

      const li = document.createElement('li');
      li.textContent = item.text;
      li.className = item.done ? 'completed' : '';
      li.addEventListener('click', () => toggleComplete(i));

      const completeBtn = document.createElement('button');
      completeBtn.type = 'button';
      completeBtn.textContent = item.done ? 'Undo' : 'Complete';
      completeBtn.className = 'completeBtn';
      completeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleComplete(i);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'deleteBtn';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteItem(i);
      });

      row.appendChild(li);
      row.appendChild(completeBtn);
      row.appendChild(deleteBtn);
      list.appendChild(row); 
    }
  }
inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addToDoItem();
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter.active').classList.remove('active');
      btn.classList.add('active');
      currentFilter = btn.textContent.toLowerCase();
      render();
    });
  });

  function addToDoItem() {
    const input = inputElement.value;
    todoItems.push({ text: input, done: false });
    inputElement.value = '';
    render();
  }

  function toggleComplete(index) {
    todoItems[index].done = !todoItems[index].done;
    render();
  }

  function deleteItem(index) {
    todoItems.splice(index, 1);
    render();
  }

  render();
