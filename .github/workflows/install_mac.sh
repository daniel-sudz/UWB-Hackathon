npm install

# Configure token for access to github cert repo
#git config --global user.email $git_email
#git config --global user.name $git_username
#git config --global user.password $git_password

#git remote set-url origin https://github.com/$git_username/bbox-mobile
#git fetch -a
#git checkout master
#touch .test 
#git add .
#git commit -m "test"
#git push origin master

#git clone https://github.com/daniel-sudz/certificates

# Build dependencies
#brew update
#brew install watchman
sudo gem install cocoapods
cd ios
pod install

cat ios/fastlane/Matchfile
echo $fastlane_git >> ios/fastlane/Matchfile
cat ios/fastlane/Matchfile

brew install fastlane
brew upgrade fastlane
bundle install
bundle exec fastlane keychain --verbose
bundle exec fastlane beta --verbose
#npx react-native run-ios