import re
import os

md_file_path = "JAX-SOD-IMAGE-PROMPTS.md"

def create_folders():
    if not os.path.exists(md_file_path):
        print(f"Error: {md_file_path} not found.")
        return

    with open(md_file_path, 'r') as f:
        content = f.read()

    # Regex to find categories like "## Category: sodCloseup"
    # Matches "## Category: " followed by the category name (word characters)
    category_pattern = re.compile(r"^## Category:\s+(\w+)", re.MULTILINE)
    
    categories = category_pattern.findall(content)
    
    print(f"Found {len(categories)} categories: {categories}")

    for category in categories:
        if not os.path.exists(category):
            os.makedirs(category)
            print(f"Created directory: {category}")
        else:
            print(f"Directory already exists: {category}")

if __name__ == "__main__":
    create_folders()
