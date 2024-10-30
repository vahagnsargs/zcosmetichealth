if (Shopify.designMode) {
  /** Inspector */
  window.addEventListener('shopify:inspector:activate', function (event) {
    console.log('shopify:inspector:activate::event: ', event);
  });
  window.addEventListener('shopify:inspector:deactivate', function (event) {
    console.log('shopify:inspector:deactivate::event: ', event);
  });
  /** Section */
  window.addEventListener('shopify:section:load', function (event) {
    console.log('shopify:section:load::event: ', event);
  });
  window.addEventListener('shopify:section:unload', function (event) {
    console.log('shopify:section:unload::event: ', event);
  });
  window.addEventListener('shopify:section:select', function (event) {
    console.log('shopify:section:select::event: ', event);
    closeDrawer();
  });
  window.addEventListener('shopify:section:deselect', function (event) {
    console.log('shopify:section:deselect::event: ', event);
    closeDrawer();
  });
  window.addEventListener('shopify:section:reorder', function (event) {
    console.log('shopify:section:reorder::event: ', event);
    closeDrawer();
  });
  /** Block */
  window.addEventListener('shopify:block:select', function (event) {
    console.log('shopify:block:select::event: ', event);
    const itemIndex = event.target.parentElement.getAttribute('data-index');
    if (checkDrawer()) {
      document.querySelector('shoppable-drawer').openWithIndex(event, itemIndex);
      scrollToSection(event.target);
    } else if (document.querySelector('shoppable-drawer').getAttribute('data-content-mode') === 'scroll') {
      const tag = event.target.closest('.shoppable-drawer__tags').getAttribute('id').split('--')[1];
      document.querySelector('shoppable-drawer').openWithTag(event, tag);
      event.target.scrollIntoView({ behavior: 'instant', block: 'center' });
    } else {
      scrollToBlock(event.target);
    }
  });
  window.addEventListener('shopify:block:deselect', function (event) {
    console.log('shopify:block:deselect::event: ', event);
    closeDrawer();
    scrollToSection(event.target);
  });
}

function checkDrawer() {
  const layoutMode = document.querySelector('shoppable-drawer').getAttribute('data-layout-mode');
  const contentMode = document.querySelector('shoppable-drawer').getAttribute('data-content-mode');
  if (layoutMode !== 'single' && contentMode !== 'scroll') return true;
  return false;
}

function closeDrawer() {
  document.querySelector('shoppable-drawer').close();
}

function scrollToBlock(element) {
  if (!element) return;
  const y = element.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: y,
    // behavior: 'smooth'
  });
}

function scrollToSection(element) {
  if (!element) return;
  const sectionId = element.getAttribute('data-section-id');
  const section = document.getElementById(`section-${sectionId}`);
  scrollToBlock(section);
}
