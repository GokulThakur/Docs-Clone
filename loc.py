import os
import sys

# Configurable settings
LINES_PER_PAGE = 55  # Estimated lines per printed page at font size 11
VALID_EXTENSIONS = {".py", ".js", ".cpp", ".svelte", ".c", ".java", ".cs", ".php", ".html", ".css", ".ts", ".tsx" ,".js"}  # Add more as needed

def count_lines_of_code(directory):
    """Counts total lines of code in a given directory recursively."""
    total_lines = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in VALID_EXTENSIONS):
                try:
                    with open(os.path.join(root, file), "r", encoding="utf-8", errors="ignore") as f:
                        total_lines += sum(1 for _ in f)
                except Exception as e:
                    print(f"Skipping {file}: {e}")
    
    return total_lines

def main():
    if len(sys.argv) < 2:
        print("Usage: python count_lines.py <directory1> <directory2> ...")
        return
    
    total_lines_all = 0
    
    for directory in sys.argv[1:]:
        if not os.path.isdir(directory):
            print(f"Error: Invalid directory path '{directory}'")
            continue

        lines_in_dir = count_lines_of_code(directory)
        total_lines_all += lines_in_dir
        print(f"Lines in '{directory}': {lines_in_dir}")

    total_pages = total_lines_all / LINES_PER_PAGE

    print("\n====================")
    print(f"Total Lines of Code: {total_lines_all}")
    print(f"Estimated Pages Needed: {round(total_pages)}")

if __name__ == "__main__":
    main()