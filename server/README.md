# Server

## Models

### User

| Identifier |           Type            |
| :--------: | :-----------------------: |
|     ID     |             -             |
|    Name    | String [24 Bytes], unique |
|     -      |             -             |



### PK  Record

| Identifier |           Type            |
| :--------: | :-----------------------: |
|     ID     |             -             |
| User1.Name | String [24 Bytes], unique |
| User2.Name | String [24 Bytes], unique |
| User1Score |           int32           |
| User2Score |           int32           |
|     -      |             -             |



### Quiz

|  Identifier  |  Type  |
| :----------: | :----: |
|      ID      |   -    |
| QuestionType |  enum  |
|   Content    | String |
|    Answer    | String |
|    Image     | binary |
|      -       |   -    |



## Structure

```shell
BACKEND
├─models
├─controllers
├─config
│  └─db.js
├─socket
│  └─socket.js
├─routes
│  └─api.js
└─app.js
```

