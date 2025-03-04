#!/bin/bash

# Directory and file settings
PROJECT_ROOT="."
OUTPUT_FILE="./.notes/directory_structure.md"

# Directories to exclude
EXCLUDE_DIRS=("node_modules" ".git" "dist" "build")

# File extensions to exclude
EXCLUDE_EXTENSIONS=(".map" ".log")

# Ensure output directory exists
OUTPUT_DIR=$(dirname "$OUTPUT_FILE")
if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
    echo "Created directory: $OUTPUT_DIR"
fi

# Function to check if a directory should be excluded
should_exclude_dir() {
    local dir_name="$1"
    for exclude in "${EXCLUDE_DIRS[@]}"; do
        if [ "$dir_name" = "$exclude" ]; then
            return 0  # True, should exclude
        fi
    done
    return 1  # False, should not exclude
}

# Function to check if a file extension should be excluded
should_exclude_extension() {
    local filename="$1"
    local extension="${filename##*.}"
    if [ "$filename" = "$extension" ]; then
        # No extension
        return 1
    fi
    extension=".$extension"
    for exclude in "${EXCLUDE_EXTENSIONS[@]}"; do
        if [ "$extension" = "$exclude" ]; then
            return 0  # True, should exclude
        fi
    done
    return 1  # False, should not exclude
}

# Function to format directory structure
format_directory() {
    local path="$1"
    local indent="$2"
    local indent_str=""
    
    # Create indent string
    for ((i=0; i<indent; i++)); do
        indent_str="${indent_str}    "
    done
    
    local content=""
    
    # Loop through all items in the directory
    for item in "$path"/*; do
        # Skip if item doesn't exist (happens with empty dirs)
        [ ! -e "$item" ] && continue
        
        local basename=$(basename "$item")
        
        # Skip excluded directories
        if [ -d "$item" ] && should_exclude_dir "$basename"; then
            continue
        fi
        
        # Skip excluded file extensions
        if [ -f "$item" ] && should_exclude_extension "$basename"; then
            continue
        fi
        
        if [ -d "$item" ]; then
            # Directory
            content="${content}${indent_str}- **${basename}/**\n"
            # Recursively process subdirectory
            subdir_content=$(format_directory "$item" $((indent+1)))
            content="${content}${subdir_content}"
        else
            # File with size
            size_kb=$(du -k "$item" | cut -f1)
            if [ "$size_kb" -gt 0 ]; then
                content="${content}${indent_str}- ${basename} _(${size_kb} KB)_\n"
            else
                content="${content}${indent_str}- ${basename}\n"
            fi
        fi
    done
    
    echo -e "$content"
}

# Generate markdown content
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
DIRECTORY_STRUCTURE=$(format_directory "$PROJECT_ROOT" 0)
EXCLUDED_DIRS=$(printf ", %s" "${EXCLUDE_DIRS[@]}")
EXCLUDED_DIRS=${EXCLUDED_DIRS:2}  # Remove leading ", "
EXCLUDED_EXTENSIONS=$(printf ", %s" "${EXCLUDE_EXTENSIONS[@]}")
EXCLUDED_EXTENSIONS=${EXCLUDED_EXTENSIONS:2}  # Remove leading ", "

# Create markdown content
cat > "$OUTPUT_FILE" << EOF
# Chrome Extension Directory Structure
Generated on $TIMESTAMP

## Core Components

$DIRECTORY_STRUCTURE

## Notes
- Excluded directories: $EXCLUDED_DIRS
- Excluded file extensions: $EXCLUDED_EXTENSIONS
EOF

# Make script executable
chmod +x "$0"

echo "Directory structure updated in $OUTPUT_FILE" 