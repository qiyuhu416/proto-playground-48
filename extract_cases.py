import os
import re
from pathlib import Path

# Get all case study files
routes_dir = Path("src/routes")
case_studies = []

for file in sorted(routes_dir.glob("*.tsx")):
    # Skip special files
    if file.name.startswith("_") or file.name in ["index.tsx", "haha.tsx", "think.tsx", "listen.tsx", "$slug.tsx"]:
        continue
    
    content = file.read_text()
    
    # Extract title from ARTICLE_META if exists
    title_match = re.search(r'ARTICLE_META\["([^"]+)"\]\.title', content)
    slug = title_match.group(1) if title_match else file.stem
    
    # Extract description from meta
    desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', content)
    description = desc_match.group(1) if desc_match else ""
    
    # Extract category/type
    category_match = re.search(r'<span[^>]*>[^<]*(Research|Implementation|Thoughts about|User-centered|Collection|AI workflow|Personalization|Bot for|Exploring|Understanding|0-1|Changing|Physical|Vocal)[^<]*</span>', content)
    category = category_match.group(1) if category_match else "Article"
    
    case_studies.append({
        'file': file.name,
        'slug': slug,
        'description': description,
        'category': category
    })

# Print for verification
for cs in case_studies:
    print(f"{cs['slug']}: {cs['description'][:60]}")
