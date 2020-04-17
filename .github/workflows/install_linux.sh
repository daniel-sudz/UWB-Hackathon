export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

npm install 

# install stable watchman from source
#git clone https://github.com/facebook/watchman.git -b v4.9.0 --depth 1
#cd watchman
#./autogen.sh
#./configure
#make
#sudo make install
#cd ..

# Build app
npx react-native run-android