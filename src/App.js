import './App.css';
import './Loader.css';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from './index'
import axios from 'axios';
import BookComponent from './BookComponent';

const App = observer(() => {

  const { store } = useContext(Context)

  const API_KEY = 'AIzaSyAyKFRxA-xF9QRQ1CPxKCaGMlZAqWQZyGs'

  const [search, setSearch] = useState("")
  const pagination = 30
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState('relevance')
  const [total, setTotal] = useState(null)

  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState(false)

  const [index, setIndex] = useState(pagination)

  const [array, setArray] = useState([])

  const GenerateQuery = () => {
    let query;

    if (category === 'all' && sort === 'relevance') {
      query = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=' + API_KEY + '&maxResults=' + pagination;
      return query;
    }
    if (category === 'all' && sort === 'newest') {
      query = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&orderBy=newest' + '&key=' + API_KEY + '&maxResults=' + pagination;
      return query;
    }
    if (category && sort === "relevance") {
      query = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '+subject:' + category + '&key=' + API_KEY + '&maxResults=' + pagination;
      return query;
    }
    if (category && sort === "newest") {
      query = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '+subject:' + category + '&orderBy=newest' + '&key=' + API_KEY + '&maxResults=' + pagination;
      return query;
    }
  }

  const handleSubmit = () => {
    let result = GenerateQuery();

    if (!search) {
      alert('Укажите ключевое слово для поиска!')
    }
    else {
      setLoading(true)
      axios.get(result).then(data => {
        store.setBooks(data.data.items)
        setArray(data.data.items)
        setTotal(data.data.totalItems)
      }).finally(() => setLoading(false))
    }
  }

  function OpenBook(book) {
    setBook(true)
    store.setBook(book)
  }

  function AppendBooks() {
    setLoading(true)
    let result = GenerateQuery() + '&startIndex=' + index
    setIndex(index + pagination)
    axios.get(result).then(data => {
      store.setBooks(data.data.items)
      store.books.map(info => {
        array.push(info)
        return array
      })
    }).finally(() => setLoading(false))
  }

  return (
    <div className="App">
      <BookComponent active={book} setActive={setBook} />
      <div className="Content">

        <div className={loading ? "loader" : "off loader"}>
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

        <div className="Search-for-books">
          <h2>Search for books</h2>

          <div>
            <input
              className="clear-input search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Search</button>
          </div>

          <div className="Filters">
            <div>
              Categories:
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="all">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
              </select>
            </div>

            <div>
              Sorting by:
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="relevance">По актуальности</option>
                <option value="newest">По новизне</option>
              </select>
            </div>
          </div>

        </div>

        {total && <span className="Total">Total items: {total}</span>}

        <div className="Books">

          {store.books ?

            array.map(book =>
              <div
                className="Book"
                key={book.id}
                onClick={() => OpenBook(book)}
              >
                {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}
                <span className="Book-category">{book.volumeInfo.categories}</span>
                <h2 className="Book-title">{book.volumeInfo.title}</h2>
                <h3 className="Book-author">{book.volumeInfo.authors}</h3>
              </div>
            )
            :
            <div>Загрузка</div>
          }

        </div>

        {array.length > 1 &&
          <div className="Arrows">
            <button onClick={() => AppendBooks()}>Next</button>
          </div>
        }

      </div>
    </div>
  );
})

export default App;
