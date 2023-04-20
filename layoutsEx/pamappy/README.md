# Pamappy

## Development Setup

Follow these steps to get everything that you need installed to build the
pamappy codebase on your computer.

### Common stuff

#### Install Node

Install `nvm` (allows you to manage multiple versions of Node) by following the
instructions here: [https://github.com/nvm-sh/nvm].

Once `nvm` is successfully installed, restart the terminal and run the following
commands to install the `npm` versions that [pamappy] will need:

```bash
# restart the terminal after installing nvm
nvm install 14
nvm alias default 14
```

### MacOS

#### Xcode CLI

Install the Xcode command line tools:

```bash
xcode-select --install
```

#### Homebrew

Install [Homebrew], the best way of managing packages on OSX:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Install Yarn

We use Yarn to build all of the [pamappy] repo. Install it using
[Homebrew](#homebrew):

```bash
brew install yarn
```

#### Install dependencies

    yarn install

    yarn start

#### Generate REST API

    yarn generate

#### Build localy with EAS_CLI

install dependencies globaly

    npm install --global expo-cli eas-cli

Generate APK build locally

    eas build --platform android --local --profile preview

### Trubleshooting

if you get an error like this:

Can't find the 'node' binary to build the React Native bundle.

try :

export NODE_BINARY=$(which node)
