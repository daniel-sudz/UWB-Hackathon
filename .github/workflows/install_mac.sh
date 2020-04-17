npm install

# Build dependencies
#brew update
#brew install watchman
sudo gem install cocoapods
cd ios
pod install

brew install fastlane
brew upgrade fastlane
bundle install
bundle exec fastlane beta
#npx react-native run-ios