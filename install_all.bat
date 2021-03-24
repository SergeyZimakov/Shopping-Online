@echo off
echo -------------------------- Client project --------------------------
cd client
call npm install
echo -------------------------- Server project ---------------------------
cd ..\server
call npm install

cd ..