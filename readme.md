# rust-web

An example backend written in rust using rocket, diesel and juniper.

## Requires
1. rustup (curl https://sh.rustup.rs -sSf | sh)
2. rust nightly (rustup toolchain install nightly)
3. rustfmt (rustup component add rustfmt-preview)
4. rls (rustup component add rls-preview rust-analysis rust-src)
5. cargo-watch (cargo install -f cargo-watch)
6. cargo-make (cargo install -f cargo-make)
7. cargo-web (cargo install -f cargo-web)
8. cargo-release (cargo install -f cargo-release)
9. cargo-script (cargo install -f cargo-script)

## Using
1. cargo make setup
2. cargo watch run


# NCM App

## Requirements
1. [git](https://git-scm.com/) >= 2.15.0
2. [docker](https://docs.docker.com/engine/installation/) >= 17.03 
3. [node](https://github.com/creationix/nvm) >= 9.0.0
4. [Visual Studio Code](https://code.visualstudio.com/) >= 1.14.2 
   - Cucumber Plugin
   - Graphql Plugin
   - vscode-icons Plugin
   - Git Project Manager Plugin
5. Also make sure you setup your ssh keys for github

## Install
1. Run `git clone git@github.com:pyros2097/ncm.git`
2. Run `cd ncm`
3. Run `npm install -g yarn`
4. Run `yarn install` in the project folder

## Using
###  Frontend
1. Get the frontend server up and running `yarn web`
2. Open http://localhost:4000

### Android
1. `yarn android-emu`
2. `yarn android`

### Ios
1. `yarn ios-simulator`
2. `yarn ios`

### Backend
1. Get postgres up and running - `docker-compose up postgres`
2. Get the backend server up and running - `yarn dev`
3. Open http://localhost:3000/playground
4. Follow [Best practices](https://github.com/i0natan/nodebestpractices])
