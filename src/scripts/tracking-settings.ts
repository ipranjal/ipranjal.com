const input = document.getElementById('tracking-switch');
const trackingStatus = document.getElementById('tracking-status');
if (input instanceof HTMLInputElement && trackingStatus) {
  let saved = false;
  try {
    const preference = localStorage.getItem('site-tracking');
    saved = preference !== 'disabled';
    input.checked = saved;
    input.disabled = false;
    trackingStatus.textContent = `${preference === 'enabled' || preference === 'disabled' ? 'Saved. ' : ''}Tracking is ${saved ? 'enabled' : 'disabled'} on this browser.`;
  } catch (error) {
    console.warn('Could not read tracking preference.', error);
    trackingStatus.textContent = 'Browser storage is unavailable. Analytics tags will not load, and a preference cannot be saved.';
  }
  input.addEventListener('change', () => {
    try {
      localStorage.setItem('site-tracking', input.checked ? 'enabled' : 'disabled');
      saved = input.checked;
      input.disabled = true;
      trackingStatus.textContent = `Saved. Tracking is ${saved ? 'enabled' : 'disabled'} on this browser. Reloading to apply.`;
      location.reload();
    } catch (error) {
      input.checked = saved;
      console.warn('Could not save tracking preference.', error);
      trackingStatus.textContent = 'Your preference could not be saved. Check browser storage settings or use your browser tracking protection.';
    }
  });
}
