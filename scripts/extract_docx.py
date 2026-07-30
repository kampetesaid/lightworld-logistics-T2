import sys
from zipfile import ZipFile
import xml.etree.ElementTree as ET

if len(sys.argv) < 2:
    print('Usage: extract_docx.py <docx-path> [output.txt]')
    sys.exit(1)

docx = sys.argv[1]
out = None
if len(sys.argv) >= 3:
    out = sys.argv[2]
else:
    out = 'img2/doc_text.txt'

text = []
with ZipFile(docx) as z:
    try:
        xml = z.read('word/document.xml')
    except KeyError:
        print('document.xml not found in', docx)
        sys.exit(1)
    root = ET.fromstring(xml)
    # WordprocessingML word/document.xml namespace
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    for para in root.findall('.//w:p', ns):
        texts = [node.text for node in para.findall('.//w:t', ns) if node.text]
        if texts:
            text.append(''.join(texts))

with open(out, 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(text))

print('Extracted', len(text), 'paragraphs to', out)
