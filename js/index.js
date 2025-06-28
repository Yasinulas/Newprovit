// Index page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tiny sliders for galleries
  if (typeof tns !== 'undefined') {
    CommonUtils.initTinySlider(".my-slider");
    CommonUtils.initTinySlider(".my-second-slider");
  }
}); 