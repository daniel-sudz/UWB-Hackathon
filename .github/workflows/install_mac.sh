npm install

git config --global user.email $git_email
git config --global user.name $git_username
git config --global user.password $git_password

git clone https://github.com/daniel-sudz/certificates

# Build dependencies
#brew update
#brew install watchman
sudo gem install cocoapods
cd ios
pod install

brew install fastlane
brew upgrade fastlane
bundle install
bundle exec fastlane keychain --verbose
bundle exec fastlane beta --verbose
#npx react-native run-ios