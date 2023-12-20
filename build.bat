@echo off

rem Navigate to the cpp folder
cd cpp

rem Compile C++ code
g++ -o schedule_planner.exe schedule_planner.cpp

rem Move the compiled executable to the backend folder
move schedule_planner.exe ..\backend\schedule_planner.exe

rem Navigate back to the root folder
cd ..
