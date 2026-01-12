
// Simple Client-Side Router for Moska
// Turns the static site into a SPA-like experience

document.addEventListener('DOMContentLoaded', () => {
  // Initialize router
  initRouter();
});

function initRouter() {
  // Handle navigation clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    // Ignore if not a link or has modifier keys
    if (!link || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    
    const href = link.getAttribute('href');
    
    // Ignore external links, anchors, or empty links
    if (!href || href.startsWith('http') || href.startsWith('https') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:')) return;
    
    // Prevent default page load
    e.preventDefault();
    
    // Navigate
    navigate(href);
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    loadPage(window.location.href, false, false);
  });
}

async function navigate(url) {
  await loadPage(url, true, true);
}

async function loadPage(url, scroll = true, push = true) {
  startLoading();

  try {
    // Check if protocol is file:// (local testing without server)
    // If so, fetch usually fails (CORS/Protocol). Fallback immediately.
    if (window.location.protocol === 'file:') {
       throw new Error('SPA routing disabled on file:// protocol');
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Page not found');
    
    const html = await response.text();
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, 'text/html');
    
    // 1. Swap Main Content
    const currentMain = document.querySelector('.page-content');
    const newMain = newDoc.querySelector('.page-content');
    if (currentMain && newMain) {
      currentMain.innerHTML = newMain.innerHTML;
    }
    
    // 2. Swap Sidebar Navigation (to update active state)
    const currentNav = document.querySelector('.sidebar-nav');
    const newNav = newDoc.querySelector('.sidebar-nav');
    if (currentNav && newNav) {
      currentNav.innerHTML = newNav.innerHTML;
    }
    
    // 3. Update Title
    document.title = newDoc.title;
    
    // 4. Update History State (Only if successful fetch)
    if (push) {
        history.pushState(null, '', url);
    }

    // 5. Scroll to top
    if (scroll) {
      window.scrollTo(0, 0);
      const mainContent = document.querySelector('.main-content');
      if (mainContent) mainContent.scrollTop = 0;
    }

  } catch (err) {
    console.warn('SPA Navigation failed, falling back to standard navigation:', err);
    // Fallback: standard navigation
    // We only change location if we haven't already pushed state (or if we are handling a click)
    // If we are in popstate (push=false), reload is actually correct to reset state, 
    // but usually popstate is triggered by history navigation which already changes URL.
    if (push) {
        window.location.href = url;
    } else {
        window.location.reload();
    }
  } finally {
    stopLoading();
  }
}

// Progress Bar Logic
function startLoading() {
  let bar = document.getElementById('progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'progress-bar';
    document.body.appendChild(bar);
  }
  
  // Force reflow
  bar.style.width = '0%';
  bar.style.opacity = '1';
  bar.offsetHeight; 
  
  bar.style.transition = 'width 0.2s ease';
  bar.style.width = '30%';
  
  // Simulate progress
  if (window._progressInterval) clearInterval(window._progressInterval);
  window._progressInterval = setInterval(() => {
    const w = parseFloat(bar.style.width);
    if (w < 90) {
      bar.style.width = (w + (90 - w) * 0.1) + '%';
    }
  }, 100);
}

function stopLoading() {
  const bar = document.getElementById('progress-bar');
  if (bar) {
    clearInterval(window._progressInterval);
    bar.style.width = '100%';
    setTimeout(() => {
      bar.style.opacity = '0';
      setTimeout(() => {
        bar.style.width = '0%';
      }, 200);
    }, 200);
  }
}
