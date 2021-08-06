import { makeAutoObservable } from 'mobx'

export default class Store {
    constructor() {
        this._isTest = false

        this._books = []
        this._book = {
            id: 1,
            volumeInfo: {
                title: 'Моковое название',
                authors: [
                    "Evyz"
                ],
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=MqRXAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                },
                categories: [
                    "Practice"
                ],
                description: "Тестовое задание"

            }
        }
        makeAutoObservable(this)
    }

    setIsTest(bool) {
        this._isTest = bool
    }

    setBooks(books) {
        this._books = books
    }
    setBook(book) {
        this._book = book
    }

    get test() {
        return this._isTest
    }

    get books() {
        return this._books
    }
    get book() {
        return this._book
    }

}