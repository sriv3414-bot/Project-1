(function(){
  const darkBtn = document.getElementById('darkModeBtn');
  const copyBtn = document.getElementById('copyBtn');
  const pngBtn  = document.getElementById('pngBtn');
  const printBtn= document.getElementById('printBtn');
  const capture = document.getElementById('captureArea');

  // Dark mode toggle with persistence
  const key = 'ttb_darkmode';
  const saved = localStorage.getItem(key);
  if(saved === '1'){ document.documentElement.classList.add('dark'); darkBtn.setAttribute('aria-pressed','true'); }

  darkBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(key, isDark ? '1' : '0');
    darkBtn.setAttribute('aria-pressed', String(isDark));
  });

  // Copy plain text
  copyBtn.addEventListener('click', async () => {
    try{
      const parts = [
        '1. School / College → Button 1',
        'School',
        '1) Select Std I – XII',
        '2) Select Hours/Periods',
        '3) Hours',
        '4) Select Subject (Std Wise)',
        '5) Selected subject shows on left side',
        '6) Right side – Staff Name entry by subject',
        '7) Submit → Create Time Table',
        '',
        '2. College → Button 2',
        'College',
        '1) Select UG/PG',
        '2) Select Year (I, II, III) / (I, II)',
        '3) Select Day Order (1–6)',
        '4) Select Hours/Periods → Timings',
        '5) Year-wise Subject entry',
        '6) Left side – Show subjects',
        '7) Right side – Show staff entries',
        '8) Create Time Table'
      ];
      await navigator.clipboard.writeText(parts.join('\n'));
      copyBtn.textContent = '✅ Copied';
      setTimeout(()=> copyBtn.textContent = '📋 Copy Plain Text', 1400);
    }catch(e){
      alert('Copy failed. Select the text manually.');
    }
  });

  // Download as PNG
  pngBtn.addEventListener('click', async () => {
    pngBtn.disabled = true;
    const old = pngBtn.textContent;
    pngBtn.textContent = 'Rendering…';
    try{
      await new Promise(r => requestAnimationFrame(()=> requestAnimationFrame(r)));
      const canvas = await html2canvas(capture, {
        scale: Math.min(window.devicePixelRatio, 2),
        backgroundColor: null,
        useCORS: true
      });
      const data = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = data;
      a.download = 'timetable-spec.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      pngBtn.textContent = '✅ PNG Saved';
    }catch(err){
      console.error(err);
      alert('Could not generate image. Try in a desktop browser.');
      pngBtn.textContent = old;
    }finally{
      pngBtn.disabled = false;
      setTimeout(()=> pngBtn.textContent = '⬇️ Download as PNG', 1400);
    }
  });

  // Print
  printBtn.addEventListener('click', () => window.print());
})();
