import urllib.request
import re
from bs4 import BeautifulSoup
import json

req = urllib.request.Request("https://chogoriadventure.com", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req, timeout=12) as response:
        html = response.read().decode("utf-8", errors="ignore")
        
        soup = BeautifulSoup(html, "html.parser")
        print("TITLE:", soup.title.string if soup.title else "")
        
        # header nav
        menu = []
        for nav in soup.select("header, .bravo_header, nav, ul.main-menu, .bravo_topbar"):
            for a in nav.find_all("a"):
                href = a.get("href", "")
                text = a.get_text(strip=True)
                if text and href and href != "#":
                    menu.append((text, href))
        print("MENU ITEMS FOUND:", len(menu))
        for t, h in menu[:40]:
            print(f"  {t} -> {h}")
            
        # check phone / email / social
        print("\nTOPBAR / CONTACT INFO:")
        for t in soup.select(".bravo_topbar, header, footer"):
            txt = t.get_text()
            emails = re.findall(r"[\w\.-]+@[\w\.-]+\.\w+", txt)
            phones = re.findall(r"\+?\d[\d\s-]{8,}\d", txt)
            if emails: print("  Emails:", set(emails))
            if phones: print("  Phones:", set(phones))
            break
            
        # check featured tours / sections
        print("\nSECTIONS / HEADINGS:")
        for h in soup.find_all(["h1", "h2", "h3"])[:25]:
            print("  H:", h.get_text(strip=True))

except Exception as e:
    print("Error:", e)
