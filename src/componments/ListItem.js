const ListItems = ({ list, deleteItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {list.map(({ id, title }) => {
        return (
          <article className='grocery-item'>
            <div>
              <p>{title}</p>
            </div>

            <div className='btn-container'>
              <div className='div'>
                <button type='button' onClick={() => editItem(id)}>
                  Edit
                </button>
              </div>

              <div className='div'>
                <button type='button' onClick={() => deleteItem(id)}>
                  delete
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ListItems;
