#include <iostream>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <vector>
#include <cstring>
#include "json.hpp"

using json = nlohmann::json;

class NoteManager
{
private:
    json notes;

public:
    // Function to read notes from a JSON file into the vector
    void readFromFile()
    {
        // Open the file for reading
        std::ifstream file("../cpp/notes.json");
        if (file.is_open())
        {
            // Check if the file is not empty
            if (file.peek() != std::ifstream::traits_type::eof())
            {
                // Read JSON data from the file into the notes vector
                file >> notes;
            }
            else
            {
                // Print a message if the file is empty
                std::cerr << "File is empty." << std::endl;
            }
            // Close the file
            file.close();
        }
        else
        {
            // Print an error message if the file cannot be opened
            std::cerr << "Error opening file: " << std::endl;
        }
    }

    // Function to add a new note to the notes vector and save to file
    void addNote(const json &newNote)
    {
        try
        {
            // Add the new note to the notes vector
            notes.push_back(newNote);
            // Save the updated notes vector to the file
            saveToFile();
            // Print the details of the added note
            std::cout << newNote.dump(2);
        }
        catch (const std::exception &e)
        {
            // Print an error message if an exception occurs
            std::cerr << e.what() << '\n';
        }
    }

    // Function to mark a note as done based on its ID
    void checkNote(const std::string &id, const std::string &done)
    {
        // Iterate over notes to find the note with the specified ID
        for (auto &note : notes)
        {
            if (note["id"] == id)
            {
                // Update the "done" field for the found note
                note["done"] = done;
                // Save the updated notes vector to the file
                saveToFile();
                // Exit the loop after updating
                break;
            }
        }
    }

    // Function to delete a note based on its ID
    void deleteNote(const std::string &id)
    {
        // Remove the note with the specified ID from the notes vector
        notes.erase(std::remove_if(notes.begin(), notes.end(),
                                   [&id](const json &note)
                                   { return note["id"] == id; }),
                    notes.end());
        // Save the updated notes vector to the file
        saveToFile();
        // Print a message indicating the deletion
        std::cout << "Note with ID " << id << " deleted\n";
    }

    // Function to get the current notes vector
    json getNotes() const
    {
        return notes;
    }

    // Function to save the notes vector to a file
    void saveToFile()
    {
        // Open the file for writing
        std::ofstream file("../cpp/notes.json");
        if (file.is_open())
        {
            // Write the notes vector to the file in a pretty-printed format
            file << notes.dump(2);
            // Close the file
            file.close();
        }
        else
        {
            // Print an error message if the file cannot be opened for writing
            std::cerr << "Error opening file for writing." << std::endl;
        }
    }
};

// Function to handle different types of messages based on command-line arguments
void handleMessage(const char *type, const std::vector<std::string> &args)
{
    // Create an instance of the NoteManager class
    NoteManager noteManager;

    // Check the type of message and perform corresponding actions
    if (strcmp(type, "addNote") == 0)
    {
        // Handle 'addNote' message
        noteManager.readFromFile();
        if (args.size() >= 8)
        {
            // Extract parameters for adding a new note
            std::string note = args[0];
            std::string category = args[1];
            std::string startDate = args[2];
            std::string endDate = args[3];
            std::string description = args[4];
            std::string priority = args[5];
            std::string id = args[6];
            std::string done = args[7];

            // Create a JSON object for the new note
            json newNote = {
                {"id", id},
                {"note", note},
                {"category", category},
                {"startDate", startDate},
                {"endDate", endDate},
                {"description", description},
                {"done", done},
                {"priority", priority}};

            // Add the new note to the NoteManager
            noteManager.addNote(newNote);
        }
        else
        {
            // Print an error message for insufficient arguments
            std::cerr << "Insufficient arguments for addNote" << std::endl;
        }
    }
    else if (strcmp(type, "deleteNote") == 0)
    {
        // Handle 'deleteNote' message
        noteManager.readFromFile();
        if (args.size() >= 1)
        {
            // Extract parameter for deleting a note
            std::string id = args[0];
            // Delete the note with the specified ID
            noteManager.deleteNote(id);
        }
        else
        {
            // Print an error message for insufficient arguments
            std::cerr << "Insufficient arguments for deleteNote" << std::endl;
        }
    }
    else if (strcmp(type, "checkNote") == 0)
    {
        // Handle 'checkNote' message
        noteManager.readFromFile();
        if (args.size() >= 2)
        {
            // Extract parameters for checking a note
            std::string id = args[0];
            std::string done = args[1];
            // Mark the note with the specified ID as done or not done
            noteManager.checkNote(id, done);
        }
        else
        {
            // Print an error message for insufficient arguments
            std::cerr << "Insufficient arguments for checkNote" << std::endl;
        }
    }
    else if (strcmp(type, "viewNote") == 0)
    {
        // Handle 'viewNote' message
        noteManager.readFromFile();
        // Display the current notes in a pretty-printed format
        json notes = noteManager.getNotes();
        std::cout << notes.dump(2);
    }
    else
    {
        // Print an error message for an unknown message type
        std::cerr << "Unknown message type: " << type << std::endl;
    }
}

// Main function to process command-line arguments and handle messages
int main(int argc, char *argv[])
{
    if (argc > 1)
    {
        // Extract the message type and arguments from command-line arguments
        const char *type = argv[1];
        std::vector<std::string> args(argv + 2, argv + argc);
        // Handle the message based on its type
        handleMessage(type, args);
    }
    return 0;
}
