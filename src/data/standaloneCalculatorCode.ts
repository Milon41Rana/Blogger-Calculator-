export const STANDALONE_CALCULATOR_HTML = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>স্মার্ট অনলাইন ক্যালকুলেটর - Smart Web Calculator</title>
  <meta name="description" content="দ্রুত, নির্ভুল ও আধুনিক বৈজ্ঞানিক এবং সাধারণ ক্যালকুলেটর ওয়েব অ্যাপ">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --surface: #1e293b;
      --surface-hover: #334155;
      --accent: #0ea5e9;
      --accent-hover: #38bdf8;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --op-bg: #f97316;
      --op-hover: #fb923c;
      --fn-bg: #334155;
      --fn-hover: #475569;
      --border: rgba(255, 255, 255, 0.08);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', 'Hind Siliguri', system-ui, sans-serif;
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px;
      overflow-x: hidden;
    }
    .calculator-wrapper {
      width: 100%;
      max-width: 420px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
    }
    .brand {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }
    .mode-toggle {
      background: var(--surface);
      border: none;
      color: var(--text-main);
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .mode-toggle:hover {
      background: var(--surface-hover);
    }
    /* Display Screen */
    .screen {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      min-height: 100px;
      position: relative;
    }
    .history-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--text-muted);
      min-height: 18px;
      word-break: break-all;
      text-align: right;
    }
    .main-display {
      font-family: 'JetBrains Mono', monospace;
      font-size: 38px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.5px;
      word-break: break-all;
      text-align: right;
      line-height: 1.1;
      margin-top: 6px;
      max-width: 100%;
      overflow-x: auto;
    }
    .copy-badge {
      position: absolute;
      top: 10px;
      left: 12px;
      font-size: 11px;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      transition: all 0.2s;
    }
    .copy-badge:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.12);
    }
    /* Scientific Row (collapsible) */
    .sci-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .sci-grid.show {
      max-height: 140px;
    }
    /* Keypad Grid */
    .keypad {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    button.key {
      height: 52px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-main);
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.08s ease, background 0.15s ease;
      touch-action: manipulation;
    }
    button.key:active {
      transform: scale(0.94);
    }
    button.key.sci {
      height: 38px;
      font-size: 13px;
      background: #1e293b;
      color: #94a3b8;
    }
    button.key.sci:hover {
      background: #334155;
      color: #f8fafc;
    }
    button.key.num {
      background: #1e293b;
      font-family: 'JetBrains Mono', monospace;
    }
    button.key.num:hover {
      background: #334155;
    }
    button.key.op {
      background: #f97316;
      color: #ffffff;
      font-size: 20px;
      border-color: rgba(249, 115, 22, 0.3);
    }
    button.key.op:hover {
      background: #fb923c;
    }
    button.key.fn {
      background: #334155;
      color: #cbd5e1;
    }
    button.key.fn:hover {
      background: #475569;
    }
    button.key.equals {
      background: #0ea5e9;
      color: #ffffff;
      font-size: 22px;
      border-color: rgba(14, 165, 233, 0.3);
    }
    button.key.equals:hover {
      background: #38bdf8;
    }
    /* Toast Alert */
    #toast {
      position: fixed;
      bottom: 24px;
      background: #10b981;
      color: #fff;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.25s ease;
      pointer-events: none;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      z-index: 100;
    }
    #toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>

  <div class="calculator-wrapper">
    <!-- Top Header -->
    <div class="top-bar">
      <div class="brand">
        <span class="brand-dot"></span>
        <span>স্মার্ট ক্যালকুলেটর</span>
      </div>
      <button class="mode-toggle" id="toggle-sci">বৈজ্ঞানিক মোড ▾</button>
    </div>

    <!-- Screen Display -->
    <div class="screen">
      <div class="copy-badge" id="copy-btn" title="কপি করুন">
        <span>📋 কপি</span>
      </div>
      <div class="history-text" id="history-display"></div>
      <div class="main-display" id="main-display">0</div>
    </div>

    <!-- Scientific Row -->
    <div class="sci-grid" id="sci-row">
      <button class="key sci" data-action="sin">sin</button>
      <button class="key sci" data-action="cos">cos</button>
      <button class="key sci" data-action="tan">tan</button>
      <button class="key sci" data-action="pi">π</button>
      <button class="key sci" data-action="sqrt">√x</button>
      <button class="key sci" data-action="sqr">x²</button>
      <button class="key sci" data-action="pow">x^y</button>
      <button class="key sci" data-action="log">log</button>
    </div>

    <!-- Standard Keypad -->
    <div class="keypad">
      <button class="key fn" data-action="clear-all">AC</button>
      <button class="key fn" data-action="delete">⌫</button>
      <button class="key fn" data-action="percent">%</button>
      <button class="key op" data-action="op" data-value="/">÷</button>

      <button class="key num" data-value="7">7</button>
      <button class="key num" data-value="8">8</button>
      <button class="key num" data-value="9">9</button>
      <button class="key op" data-action="op" data-value="*">×</button>

      <button class="key num" data-value="4">4</button>
      <button class="key num" data-value="5">5</button>
      <button class="key num" data-value="6">6</button>
      <button class="key op" data-action="op" data-value="-">−</button>

      <button class="key num" data-value="1">1</button>
      <button class="key num" data-value="2">2</button>
      <button class="key num" data-value="3">3</button>
      <button class="key op" data-action="op" data-value="+">+</button>

      <button class="key fn" data-action="sign">±</button>
      <button class="key num" data-value="0">0</button>
      <button class="key num" data-value=".">.</button>
      <button class="key equals" data-action="calculate">=</button>
    </div>
  </div>

  <div id="toast">ফলাফল কপি করা হয়েছে!</div>

  <script>
    (function() {
      let currentInput = '0';
      let previousInput = '';
      let operator = null;
      let shouldResetDisplay = false;

      const mainDisplay = document.getElementById('main-display');
      const historyDisplay = document.getElementById('history-display');
      const toast = document.getElementById('toast');
      const copyBtn = document.getElementById('copy-btn');
      const toggleSci = document.getElementById('toggle-sci');
      const sciRow = document.getElementById('sci-row');

      function updateDisplay() {
        mainDisplay.textContent = currentInput;
        if (operator && previousInput) {
          const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : '+';
          historyDisplay.textContent = previousInput + ' ' + opSymbol;
        } else {
          historyDisplay.textContent = previousInput;
        }

        // Parent Blogger URL Hash Sync (Optional Bridge)
        try {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              type: 'SYNC_CALC_STATE',
              result: currentInput
            }, '*');
          }
        } catch (e) {}
      }

      function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      }

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentInput).then(() => {
          showToast('ফলাফল ' + currentInput + ' কপি হয়েছে!');
        }).catch(() => {
          showToast('কপি করা যায়নি');
        });
      });

      toggleSci.addEventListener('click', () => {
        const isOpen = sciRow.classList.toggle('show');
        toggleSci.textContent = isOpen ? 'সাধারণ মোড ▴' : 'বৈজ্ঞানিক মোড ▾';
      });

      function handleNumber(num) {
        if (shouldResetDisplay) {
          currentInput = num === '.' ? '0.' : num;
          shouldResetDisplay = false;
        } else {
          if (num === '.' && currentInput.includes('.')) return;
          if (currentInput === '0' && num !== '.') {
            currentInput = num;
          } else {
            currentInput += num;
          }
        }
        updateDisplay();
      }

      function handleOperator(op) {
        if (operator && !shouldResetDisplay) {
          calculate();
        }
        previousInput = currentInput;
        operator = op;
        shouldResetDisplay = true;
        updateDisplay();
      }

      function calculate() {
        if (!operator || !previousInput) return;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
          case '+': result = prev + curr; break;
          case '-': result = prev - curr; break;
          case '*': result = prev * curr; break;
          case '/':
            if (curr === 0) {
              currentInput = 'Error';
              previousInput = '';
              operator = null;
              updateDisplay();
              return;
            }
            result = prev / curr;
            break;
          case '^': result = Math.pow(prev, curr); break;
          default: return;
        }

        // Floating precision cleanup
        result = Math.round(result * 1000000000) / 1000000000;
        historyDisplay.textContent = previousInput + ' ' + (operator === '*' ? '×' : operator === '/' ? '÷' : operator) + ' ' + currentInput + ' =';
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay();
      }

      function handleSci(action) {
        const val = parseFloat(currentInput);
        let res = 0;
        switch (action) {
          case 'sin': res = Math.sin(val * Math.PI / 180); break;
          case 'cos': res = Math.cos(val * Math.PI / 180); break;
          case 'tan': res = Math.tan(val * Math.PI / 180); break;
          case 'pi': currentInput = Math.PI.toFixed(8); updateDisplay(); return;
          case 'sqrt':
            if (val < 0) { currentInput = 'Error'; updateDisplay(); return; }
            res = Math.sqrt(val);
            break;
          case 'sqr': res = val * val; break;
          case 'pow':
            previousInput = currentInput;
            operator = '^';
            shouldResetDisplay = true;
            updateDisplay();
            return;
          case 'log':
            if (val <= 0) { currentInput = 'Error'; updateDisplay(); return; }
            res = Math.log10(val);
            break;
        }
        res = Math.round(res * 100000000) / 100000000;
        historyDisplay.textContent = action + '(' + currentInput + ')';
        currentInput = res.toString();
        shouldResetDisplay = true;
        updateDisplay();
      }

      document.querySelectorAll('button.key').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.action;
          const val = btn.dataset.value;

          if (val && !action) {
            handleNumber(val);
          } else if (action === 'op') {
            handleOperator(val);
          } else if (action === 'calculate') {
            calculate();
          } else if (action === 'clear-all') {
            currentInput = '0';
            previousInput = '';
            operator = null;
            updateDisplay();
          } else if (action === 'delete') {
            if (currentInput.length > 1 && currentInput !== 'Error') {
              currentInput = currentInput.slice(0, -1);
            } else {
              currentInput = '0';
            }
            updateDisplay();
          } else if (action === 'percent') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
          } else if (action === 'sign') {
            if (currentInput !== '0' && currentInput !== 'Error') {
              currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
              updateDisplay();
            }
          } else if (btn.classList.contains('sci')) {
            handleSci(action);
          }
        });
      });

      // Keyboard support
      window.addEventListener('keydown', (e) => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
          handleNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
          handleOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
          e.preventDefault();
          calculate();
        } else if (e.key === 'Backspace') {
          if (currentInput.length > 1 && currentInput !== 'Error') {
            currentInput = currentInput.slice(0, -1);
          } else {
            currentInput = '0';
          }
          updateDisplay();
        } else if (e.key === 'Escape') {
          currentInput = '0';
          previousInput = '';
          operator = null;
          updateDisplay();
        }
      });
    })();
  </script>
</body>
</html>`;
