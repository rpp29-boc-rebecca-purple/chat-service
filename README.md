## CHATLIST/CONVERSATION API 

### GET /chatlist [deployed]  

QUERY PARAMS :
- userId: INTEGER
> returns an array of objects containing information for each active chat for current user
```
[
    {
        CHATID: INT
        UID1: INT
        UID2: INT
        TIME: VARCHAR
        LASTSENDERID: INT
        UNREAD: INT
        UNREADPHOTO: BOOLEAN
    },
    ...
]
```


### GET /conversation [deployed]

QUERY PARAMS : 
- chatId: INTEGER
> returns an array of objects containing all information for each message in conversation
```
[
    {
        CHATID: INT
        MESSAGEID: INT
        SENDERID: INT
        BODY: VARCHAR
        PHOTOURL: VARCHAR
        DATE: VARCHAR
        READ: BOOLEAN
    },
   ...
]
```

### POST /new-conversation

BODY PARAMS : 
- senderId: INT
- userId2: INT
- body(optional): VARCHAR
- photo(optional): jpg file }
> returns an array of objects containing information for new active chat for user
```
[
    {
        CHATID: INT
        MESSAGEID: INT
        SENDERID: INT
        BODY: VARCHAR
        PHOTOURL: VARCHAR
        DATE: VARCHAR
        READ: BOOLEAN
    },
   ...
]
```

### POST /add-message

BODY PARAMS : 
- chatId: INT
- senderId: INT
- body: VARCHAR
- date: VARCHAR
> returns an array of objects containing information for current conversation with chatId including the newly added message
```
[
    {
        CHATID: INT
        MESSAGEID: INT
        SENDERID: INT
        BODY: VARCHAR
        PHOTOURL: VARCHAR
        DATE: VARCHAR
        READ: BOOLEAN
    },
   ...
]
```

### POST /add-photo

BODY PARAMS :
- chatId: INT
- senderId: INT
- photo: (photo file - must be jpg) 
> returns an array of objects containing information for current conversation with chatId including the newly added photos
```
[
    {
        CHATID: INT
        MESSAGEID: INT
        SENDERID: INT
        BODY: VARCHAR
        PHOTOURL: VARCHAR
        DATE: VARCHAR
        READ: BOOLEAN
    },
   ...
]
```

### DELETE /delete-photo

QUERY PARAMS :
- chatId: INT
- messageId: INT
> returns an array of objects containing information for current conversation with chatId excluding the newly deleted photo
```
[
    {
        CHATID: INT
        MESSAGEID: INT
        SENDERID: INT
        BODY: VARCHAR
        PHOTOURL: VARCHAR
        DATE: VARCHAR
        READ: BOOLEAN
    },
   ...
]
```


### CircleCI Build and Test

[![CircleCI](https://circleci.com/gh/rpp29-boc-rebecca-purple/chat-service/tree/main.svg?style=svg)](https://circleci.com/gh/rpp29-boc-rebecca-purple/chat-service/tree/main)

### Sonar Cloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rpp29-boc-rebecca-purple_chat-service&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rpp29-boc-rebecca-purple_chat-service)
