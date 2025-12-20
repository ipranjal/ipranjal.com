#!/bin/bash

# Optimize article images
# Resize to max 1200px width and convert to WebP

cd "$(dirname "$0")/../public/images/articles" || exit 1

echo "Current directory: $(pwd)"
echo "Article images found:"
ls -lh *.jpg

echo ""
echo "Starting optimization..."
echo ""

for img in *.jpg; do
    if [ -f "$img" ]; then
        echo "Processing: $img"
        
        # Get original size
        original_size=$(ls -lh "$img" | awk '{print $5}')
        echo "  Original size: $original_size"
        
        # Backup original
        if [ ! -f "${img%.jpg}-original.jpg" ]; then
            cp "$img" "${img%.jpg}-original.jpg"
            echo "  Created backup: ${img%.jpg}-original.jpg"
        fi
        
        # Resize to max 1200px width (maintaining aspect ratio)
        sips -Z 1200 "$img" --out "${img%.jpg}-optimized.jpg" > /dev/null 2>&1
        
        # Convert to WebP with 85% quality
        cwebp -q 85 "${img%.jpg}-optimized.jpg" -o "${img%.jpg}.webp" 2>&1 | grep -E "(Saving|Output|File)"
        
        # Replace original with optimized JPEG
        mv "${img%.jpg}-optimized.jpg" "$img"
        
        # Get new sizes
        jpeg_size=$(ls -lh "$img" | awk '{print $5}')
        webp_size=$(ls -lh "${img%.jpg}.webp" | awk '{print $5}')
        
        echo "  Optimized JPEG: $jpeg_size"
        echo "  WebP: $webp_size"
        echo ""
    fi
done

echo "Optimization complete!"
echo ""
echo "Final sizes:"
ls -lh *.jpg *.webp
