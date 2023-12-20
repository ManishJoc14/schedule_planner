#include <iostream>
#include <cstring>

void handleMessage(const char *type, const char *data)
{
    if (strcmp(type, "addNote") == 0)
    {
        std::cout << "cpp output ==> Received note: " << data;
        // Handle the note as needed
    }
    // else if (strcmp(type, "otherType") == 0)
    // {
    // Handle other types
    // }

    else
    {
        std::cerr << "Unknown message type: " << type << std::endl;
    }
}

int main(int argc, char *argv[])
{
    // argument count argc
    // argument vector argv
    // argv[0] = ./schedule_planner.exe   : name of the file
    // argv[1] = type
    // argv[2] = data

    std::cout << std::endl
              << "C++ Main function executed..\n";

    if (argc > 1)
    {
        handleMessage(argv[1], argv[2]); // argv[1] = type , argv[2] = data
    }

    return 0;
}
