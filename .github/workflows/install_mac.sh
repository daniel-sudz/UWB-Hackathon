npm install

# Build dependencies
#brew update
#brew install watchman
sudo gem install cocoapods --verbose
cd ios
pod install --verbose

brew install fastlane --verbose
brew upgrade fastlane --verbose
bundle install
bundle exec fastlane keychain --verbose
bundle exec fastlane beta --verbose
#npx react-native run-ios