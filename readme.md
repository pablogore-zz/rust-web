# NCM App

An example backend written in rust using rocket, diesel and juniper.

## Requirements
1. [git](https://git-scm.com/) >= 2.15.0
2. [docker](https://docs.docker.com/engine/installation/) >= 17.03 
3. [Visual Studio Code](https://code.visualstudio.com/) >= 1.14.2 
   - vscode-icons Plugin
   - Git Project Manager Plugin
4. Also make sure you setup your ssh keys for github

## Setup
1. rustup (curl https://sh.rustup.rs -sSf | sh)
2. rust nightly (rustup toolchain install nightly)
3. rustfmt (rustup component add rustfmt-preview)
4. rls (rustup component add rls-preview rust-analysis rust-src)
5. cargo-watch (cargo install -f cargo-watch)
6. cargo-make (cargo install -f cargo-make)
7. cargo-web (cargo install -f cargo-web)
8. cargo-release (cargo install -f cargo-release)
9. cargo-script (cargo install -f cargo-script)
10. node (wget http://nodejs.org/dist/v9.9.0/node-v9.9.0-linux-x64.tar.gz && sudo tar -C /usr/local --strip-components 1 -xzf node-v9.9.0-linux-x64.tar.gz)
11. yarn (curl -o- -L https://yarnpkg.com/install.sh | bash)

## Using
1. cargo make setup
2. cargo make run (http://localhost:8000/graphql)
3. yarn
4. yarn web (http://localhost:1234)

### Android
1. `yarn android-emu`
2. `yarn android`

### Ios
1. `yarn ios-emu`
2. `yarn ios`

"@shoutem/ui": "0.23.4",
"glamorous-native": "1.3.0",
"react-native-country-picker-modal": "0.5.1",
"react-native-form": "2.1.2",
"react-native-loading-spinner-overlay": "0.5.2",
"react-native-read-more-text": "^1.0.0",
"react-native-simple-onboarding": "0.1.1",
"react-navigation": "1.0.0",