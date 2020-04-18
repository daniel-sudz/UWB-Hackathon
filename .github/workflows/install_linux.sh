# Path for android studio build tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Build locale for google play
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Project js dependencies
npm install 


# Build app
npx react-native run-android