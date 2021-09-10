@echo off
git add .
git commit -am "%RANDOM%"
git push heroku master
echo Deploy done!