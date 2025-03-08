sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Writes something in the text field and press SAVE button
    Note left of browser: Here the browser creates a new note
    Note left of browser: and adds to the list of notes
    browser->>browser: Reload the page
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201: Created
    deactivate server
    browser-->>user: Updated page
