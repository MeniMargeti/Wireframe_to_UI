import json
import re
import os

def ask(propertie, allow_empty=False, is_image=False, is_color=False, is_slug=False):
    while True:
        value = input(propertie).strip()
        
        if not value and not allow_empty:
            print("Your answer can't be empty.")
            continue
            
        # Έλεγχος για αρχείο εικόνας και αν αυτό υπάρχει στον δίσκο
        if is_image and value:
            if not value.lower().endswith(('.png', '.jpg', '.jpeg')):
                print(" Invalid format. Use .png, .jpg, or .jpeg.")
                continue
            if not os.path.exists(value):
                print(f" File not found at: {value}. Please check the path.")
                continue
        
        # Έλεγχος για Hex Color (#FFFFFF)
        if is_color and value:
            if not re.match(r'^#(?:[0-9a-fA-F]{3}){1,2}$', value):
                print(" Invalid Hex color. Example: #FFFFFF")
                continue

        # Έλεγχος για Slug (πρέπει να ξεκινάει με / και να μην έχει κενά)
        if is_slug and value:
            if not value.startswith('/'):
                print(" Slugs must start with a forward slash (/).")
                continue
            if not re.match(r'^/[a-zA-Z0-9\-/]*$', value):
                print(" Invalid slug. Use only letters, numbers, and dashes (no spaces).")
                continue
                
        return value

def main():
    project_json = {
        "title": ask("What's your project's title? "),
        "description": ask("Give a description for your project: "),
        "primary_color": ask("What's your primary color - in Hex? ", is_color=True),
        "screens": [] 
    }
    
    while True:
        add_screen = input("Do you want to add a screen; (y/n): ").lower()
        if add_screen == "n":
            break
        elif add_screen != "y":
            print(" Write only 'y' or 'n'.")
            continue 

        screen = {
            "image": ask("Full path to wireframe (.png): ", is_image=True),
            "description": ask("Description for this wireframe: "),
            "slug": ask("What's the slug? (e.g., /home): ", is_slug=True)
        }

        project_json["screens"].append(screen)
        
    with open("project.json", "w", encoding="utf-8") as f:
        json.dump(project_json, f, indent=4, ensure_ascii=False)

    print("\n Το αρχείο project.json δημιουργήθηκε με έγκυρα δεδομένα!")

if __name__ == "__main__":
    main()