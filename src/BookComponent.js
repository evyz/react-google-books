import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '.';
import './BookComponent.css';

const BookComponent = observer(({ active, setActive }) => {
    const { store } = useContext(Context)

    return (
        <div className={active ? "Modal" : "Off Modal"} onClick={() => setActive(false)}>
            <div className="Content" onClick={e => e.stopPropagation()}>
                <div className="Block Left">
                    {store.book.volumeInfo && store.book.volumeInfo.imageLinks && <img src={store.book.volumeInfo.imageLinks.thumbnail} alt={store.book.volumeInfo.title} />}
                </div>
                <div className="Block Right">
                    <h2>{store.book.volumeInfo.title && store.book.volumeInfo.title}</h2>
                    <span className="Category">
                        Категории:
                        <ul>
                            {store.book.volumeInfo.categories.map(category =>
                                <li>{category}</li>
                            )}
                        </ul>
                    </span>

                    <span className="Author">
                        Авторы:
                        <ul>
                            {store.book.volumeInfo.authors.map(category =>
                                <li>{category}</li>
                            )}
                        </ul>
                    </span>

                    <span className="Description">
                        Описание:
                        <textarea value={store.book.volumeInfo.description} disabled />
                    </span>

                </div>
            </div>
        </div>
    )
})

export default BookComponent;