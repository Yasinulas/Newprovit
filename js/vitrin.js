// Vitrin page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Vitrin page loaded, initializing filters...');
  
  // Initialize gallery filter
  CommonUtils.initGalleryFilter();
  
  // Initialize fullscreen viewer for images
  CommonUtils.initFullscreenViewer();
  
  console.log('Vitrin page initialization complete');
}); 