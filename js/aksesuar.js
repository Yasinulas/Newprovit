// Aksesuar page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Aksesuar page loaded, initializing filters...');
  
  // Initialize gallery filter
  CommonUtils.initGalleryFilter();
  
  // Initialize fullscreen viewer for images
  CommonUtils.initFullscreenViewer();
  
  console.log('Aksesuar page initialization complete');
}); 