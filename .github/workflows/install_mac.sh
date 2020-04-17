npm install

# Configure token for access to github cert repo
git config --local user.email $git_email
git config --local user.name $git_username
git config --local user.password $git_password

git remote set-url origin https://github.com/$git_username/bbox-mobile
git fetch -a
git checkout master
touch .test 
git add .
git commit -m "test"
git push origin master

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