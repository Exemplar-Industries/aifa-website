// AFA Slide Inline Editor
// Injected into slide iframes when edit mode is active
(function() {
  if (window.__afa_editor_loaded) return;
  window.__afa_editor_loaded = true;

  let editMode = false;
  let hasChanges = false;

  // Text tags we allow editing
  const EDITABLE_TAGS = ['P','H1','H2','H3','H4','H5','H6','SPAN','DIV','LI','STRONG','EM','B','I'];

  function enableEditing() {
    editMode = true;
    document.body.style.cursor = 'text';

    // Make all text nodes editable
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      const el = node;
      // Skip elements that are purely structural (no direct text)
      const hasDirectText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 0);
      if (hasDirectText && EDITABLE_TAGS.includes(el.tagName)) {
        el.contentEditable = 'true';
        el.style.outline = 'none';
        el.style.cursor = 'text';
        el.addEventListener('focus', () => {
          el.style.outline = '2px solid rgba(227,30,36,0.6)';
          el.style.outlineOffset = '2px';
        });
        el.addEventListener('blur', () => {
          el.style.outline = 'none';
          hasChanges = true;
          notifyParent();
        });
        el.addEventListener('input', () => {
          hasChanges = true;
          notifyParent();
        });
      }
    }
    notifyParent('edit_enabled');
  }

  function disableEditing() {
    editMode = false;
    document.body.style.cursor = '';
    const editables = document.querySelectorAll('[contenteditable="true"]');
    editables.forEach(el => {
      el.contentEditable = 'false';
      el.style.outline = '';
      el.style.cursor = '';
    });
    notifyParent('edit_disabled');
  }

  function getHTML() {
    return document.documentElement.outerHTML;
  }

  function notifyParent(type) {
    window.parent.postMessage({
      type: type || 'slide_changed',
      hasChanges: hasChanges
    }, '*');
  }

  // Listen for messages from parent
  window.addEventListener('message', (e) => {
    if (e.data.action === 'enable_edit') enableEditing();
    if (e.data.action === 'disable_edit') disableEditing();
    if (e.data.action === 'get_html') {
      window.parent.postMessage({ type: 'slide_html', html: getHTML() }, '*');
    }
  });

  // Tell parent we're ready
  window.parent.postMessage({ type: 'editor_ready' }, '*');
})();
