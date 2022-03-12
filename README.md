# 08-library

Live Preview: https://embryonicdev.github.io/library/
 
Simple app to capture book details: 
 - Title
 - Author
 - Page Count
 - Read Status

Summary display: 
 - Total books in library
 - Total books read
 - Total books unread

Buttons: 
 - Add a single new book
 - Add 20 suggested books, max 5 at a time
 - Clear all books from library
 - Delete a single book

Functions:
 - Sort by: 
    -  Title (a-z / z-a)
    -  Author (a-z / z-a)
    -  Page Count (high first / low first)
    -  Read Status (read first / unread first)

Storage:
 - Data added on the page is saved to _LocalStorage_ & will only be deleted when: 
    - The _Clear All_ button is used
    - Browser specific instructions are followed to clear the browser's _LocalStorage_
    - 
