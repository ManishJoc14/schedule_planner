#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>
#include <cstring>

// Class to manage notes and perform operations
class NoteManager
{
private:
    std::vector<std::string> notes; // Vector to store notes

public:
    // Function to add a new note
    void addNote(const std::string &note)
    {
        notes.push_back(note); // Add the note to the vector
        std::cout << "Note: " << note << " added\n";
        saveToFile(); // Save notes to file
    }

    // Function to delete a note by index
    void deleteNote(int index)
    {
        if (index >= 0 && index < notes.size())
        {
            std::cout << "Note: " << notes[index] << " deleted\n";
            notes.erase(notes.begin() + index); // Remove the note at the specified index
            saveToFile();                       // Save notes to file
        }
        else
        {
            std::cerr << "Invalid index for deleting note\n";
        }
    }

    // Function to update a note by index
    void updateNote(int index, const std::string &newNote)
    {
        if (index >= 0 && index < notes.size())
        {
            std::cout << "Note: " << notes[index] << " updated to " << newNote << "\n";
            notes[index] = newNote; // Update the note at the specified index
            saveToFile();           // Save notes to file
        }
        else
        {
            std::cerr << "Invalid index for updating note\n";
        }
    }

    // Function to view all notes
    std::vector<std::string> viewNotes() const
    {
        return notes; // Return a copy of the notes vector
    }

    // Function to read notes from a file
    void readNotesFromFile()
    {
        notes.clear(); // Clear existing notes

        std::ifstream file("../cpp/notes.txt");
        if (file.is_open())
        {
            std::string line;
            while (std::getline(file, line))
            {
                notes.push_back(line); // Read each line from the file and add it to notes vector
            }
            file.close();
        }
    }

private:
    // Function to save notes to a file
    void saveToFile() const
    {
        std::ofstream file("../cpp/notes.txt", std::ios::app); // Open the file in truncate mode to clear existing content
        if (file.is_open())
        {
            for (const auto &note : notes)
            {
                file << note << "\n"; // Write each note to the file
            }
            file.close(); // Close the file
        }
    }
};

// Function to handle messages based on type and data
void handleMessage(const char *type, const std::vector<std::string> &args)
{
    NoteManager noteManager; // Create an instance of NoteManager

    if (strcmp(type, "addNote") == 0)
    {
        if (args.size() >= 3)
        {
            std::string category = args[0];
            std::string note = args[1];
            std::string createdAt = args[2];
            std::string fullNote = category + "~~~" + note + "~~~" + createdAt;
            noteManager.addNote(fullNote); // Add a note using provided data
        }
        else
        {
            std::cerr << "Insufficient arguments for addNote" << std::endl;
        }
    }
    else if (strcmp(type, "deleteNote") == 0)
    {
        if (args.size() >= 1)
        {
            int index = std::stoi(args[0]); // Convert data to integer (index)
            noteManager.deleteNote(index);  // Delete a note by index
        }
        else
        {
            std::cerr << "Insufficient arguments for deleteNote" << std::endl;
        }
    }
    else if (strcmp(type, "updateNote") == 0)
    {
        if (args.size() >= 2)
        {
            int index = std::stoi(args[0]); // Convert data to integer (index)
            std::string newNote = args[1];
            noteManager.updateNote(index, newNote); // Update a note by index
        }
        else
        {
            std::cerr << "Insufficient arguments for updateNote" << std::endl;
        }
    }
    else if (strcmp(type, "viewNote") == 0)
    {
        noteManager.readNotesFromFile();                          // Read notes from the file and store in notes vector
        std::vector<std::string> notes = noteManager.viewNotes(); // Retrieve a copy of notes vector
        for (const auto &note : notes)
        {
            std::cout << note << "\n"; // Print each note
        }
    }
    else
    {
        std::cerr << "Unknown message type: " << type << std::endl; // Handle unknown message types
    }
}

// Main function
int main(int argc, char *argv[])
{
    if (argc > 1)
    {
        // Assuming argv is an array of strings containing command-line arguments
        // for addNote  argv = ["schedule_planner.exe", "addNote", "Health", "Eat veggies", "2023-01-01 12:00:00"]
        // i.e [filename.exe, type, category, note, createdAt];

        const char *type = argv[1];
        std::vector<std::string> args(argv + 2, argv + argc); // Extract all arguments passed starting from index 2 and make a vector of strings and call it args
        handleMessage(type, args);                            // Call handleMessage with type and args from command-line arguments
    }

    return 0;
}
