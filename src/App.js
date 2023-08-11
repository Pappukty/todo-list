import { useState, useEffect } from 'react';
import ListItems from './componments/ListItem';
import Alert from './componments/Alert';

function getLocalStorage() {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}
const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [showAlert, setShowAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const deleteItem = (id) => {
    const updatedItems = list.filter((item) => item.id !== id);

    setList(updatedItems);
    setShowAlert({ show: true, type: 'danger', msg: 'deleted' });
  };

  const editItem = (id) => {
    const ItemToEdit = list.find((item) => item.id === id);

    setEditId(id);
    setIsEditing(true);
    setName(ItemToEdit.title);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim()) {
      if (isEditing) {
        const updatedList = list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          } else {
            return item;
          }
        });
        setList(updatedList);
        setIsEditing(false);
        setEditId('');
        setName('');
        setShowAlert({ show: true, type: 'success', msg: 'edited' });
      } else {
        const newItem = { id: new Date().getTime().toString(), title: name };

        //  shallow copying to adding item on list

        setList([...list, newItem]);

        setName('');
      }
    } else {
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert({ show: false }), 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div className='center'>
      {showAlert.show && <Alert type={showAlert.type} msg={showAlert.msg} />}

      <form className='form' onSubmit={submitHandler}>
        <h2>Grocery</h2>
        <div className='list-container'>
          <input
            type='text'
            className='grocery'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <ListItems list={list} deleteItem={deleteItem} editItem={editItem} />

          <button className='clear' onClick={() => setList([])}>
            clear
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
