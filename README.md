# Twitee

twitee is a mini and substandard runoff of Twitter. Users register and login and can
put up anything that crosses their mind. The whole world can view their twits and
comment on their twits /and like them.

---

FEATURES

---

1. User can register
2. User can log in
3. User can post twit
4. User can delete twit (if owned by user)
5. User can add comments under twits
6. User can like twit
7. User can view all twit

---

Tools

---

- Typescript
- Postgres
- Prisma
- Jest

## Documentation

Postman: [See documentation](https://documenter.getpostman.com/view/11724511/2s93CGSvsz)

## API Endpoints

```
====
Auth
====
POST /api/tsv1/auth/register
POST /api/v1/auth/login


===
Twiit
===

POST    /api/v1/twits
GET     /api/v1/twits
GET     /api/v1/twits/:twitId
GET     /api/v1/twits/users/:userId
POST    /api/v1/twits/likes/:twitId
POST    /api/v1/twits/comments/:twitId
```

## NOTE 📢

- A twit can have a comment
- A comment is a twit 😉

## Clone this project

```
git clone https://github.com/mr-chidex/Twitee.git
```

```
cd Twitee
```

## Configure the app

- Create a file named `.env` in the project root directory
- Add the environment variables as described in the `dev.env` file

## Install dependencies

```
yarn install
```

## Running this project locally

```
yarn dev
```
