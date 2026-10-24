"""Sprawdza składnię skryptu edytora: wycina <script> z HTML do pliku tymczasowego i uruchamia `node --check`.

Użycie:  python tools/check_js.py [edytor-rzutu.html]
"""
import os
import subprocess
import sys
import tempfile

path = sys.argv[1] if len(sys.argv) > 1 else 'edytor-rzutu.html'
s = open(path, encoding='utf-8').read()
js = s[s.index('<script>') + 8:s.index('</script>')]
fd, tmp = tempfile.mkstemp(suffix='.js')
with os.fdopen(fd, 'w', encoding='utf-8') as f:
    f.write(js)
try:
    r = subprocess.run(['node', '--check', tmp], capture_output=True, text=True, timeout=30)
except subprocess.TimeoutExpired:
    print('TIMEOUT: kontrola składni przekroczyła 30 s')
    sys.exit(1)
finally:
    os.remove(tmp)
if r.returncode:
    print(r.stderr)
    sys.exit(1)
print('SYNTAX_OK')
