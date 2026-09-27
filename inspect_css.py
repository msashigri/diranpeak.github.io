import urllib.request
import re

req = urllib.request.Request("https://chogoriadventure.com/dist/frontend/css/app.css?_ver=3.4.0", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
css = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")

with open("real_app.css", "w") as f:
    f.write(css)

print("Saved real_app.css. Length:", len(css))

# Look for color definitions, fonts, and header styling
for term in [".bravo_topbar", ".bravo_header", ".item-tour", ".mailchimp", ".main-footer"]:
    pos = css.find(term)
    if pos != -1:
        print(f"\n=== CSS FOR {term} ===")
        print(css[pos:pos+400])
