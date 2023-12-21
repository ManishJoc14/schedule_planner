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
        std::cout << "Note :"
                  << note << "added\n";
        saveToFile(); // Save notes to file
    }

    // Function to delete a note by index
    void deleteNote(int index)
    {
        if (index >= 0 && index < notes.size())
        {
            notes.erase(notes.begin() + index); // Remove the note at the specified index
            saveToFile();                       // Save notes to file
        }
    }

    // Function to update a note by index
    void updateNote(int index, const std::string &newNote)
    {
        if (index >= 0 && index < notes.size())
        {
            notes[index] = newNote; // Update the note at the specified index
            saveToFile();           // Save notes to file
        }
    }

    // Function to view all notes
    std::vector<std::string> viewNotes() const
    {
        return notes; // Return a copy of the notes vector
    }

    void readNotesFromFile()
    {
        notes.clear(); // Clear existing notes

        std::ifstream file("../cpp/notes.txt");
        if (file.is_open())
        {
            std::string line;
            while (std::getline(file, line))
            {
                notes.push_back(line); // Read each line from the file and add it to notes
            }
            file.close();
        }
    }

private:
    // Function to save notes to a file
    void saveToFile() const
    {
        std::ofstream file("../cpp/notes.txt", std::ios::app); // Open the file in append mode
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
void handleMessage(const char *type, const char *data = "")
{
    NoteManager noteManager; // Create an instance of NoteManager

    if (strcmp(type, "addNote") == 0)
    {
        noteManager.addNote(data); // Add a note using provided data
    }
    else if (strcmp(type, "deleteNote") == 0)
    {
        int index = std::stoi(data);   // Convert data to integer (index)
        noteManager.deleteNote(index); // Delete a note by index
    }
    else if (strcmp(type, "updateNote") == 0)
    {
        std::istringstream ss(data);
        std::string indexStr, newNote;
        ss >> indexStr >> newNote; // Parse data into index and new note
        int index = std::stoi(indexStr);
        noteManager.updateNote(index, newNote); // Update a note by index
    }
    else if (strcmp(type, "viewNote") == 0)
    {
        noteManager.readNotesFromFile();                          // Read notes from the file
        std::vector<std::string> notes = noteManager.viewNotes(); // Retrieve all notes
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
        // argv[1] = type and argv[2] = data
        // there will be no data in case of viewNotes
        handleMessage(argv[1], (argc > 2) ? argv[2] : ""); // Call handleMessage with type and data from command-line arguments
    }

    return 0;
}
